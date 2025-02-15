// app/api/hospitals-by-departments/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    // console.log("1");
    const body = await req.json();
    const { departments,latitude,longitude } = body;
    console.log(departments);
    // console.log("2");
    if (!Array.isArray(departments) || departments.length === 0) {
      return NextResponse.json(
        { error: "Invalid departments array" },
        { status: 400 }
      );
    }
// console.log("3");
    const hospitalsWithoutDistance = await prisma.hospital.findMany({
      where: {
        hospitaldep: {
          some: {
            name: {
              in: departments,
              mode:"insensitive",
            },
            doctors: {
              some: {
                isAvailable: true,
              },
            },
          },
        },
      },
      include: {
        hospitaldep: {
          where: {
            name: {
              in: departments,
              mode:"insensitive",
            },
            doctors: {
              some: {
                isAvailable: true,
              },
            },
          },
          include: {
            doctors: {
              where: {
                isAvailable: true,
              },
              include: {
                doctor: true,
              },
            },
          },
        },
      },
    });
// console.log("4");

 if (!latitude || !longitude) {
   return NextResponse.json(
     { error: "Latitude and longitude are required to calculate distance" },
     { status: 400 }
   );
 }

 const userLat = parseFloat(latitude);
 const userLon = parseFloat(longitude);

 if (isNaN(userLat) || isNaN(userLon)) {
   return NextResponse.json(
     { error: "Invalid latitude or longitude values" },
     { status: 400 }
   );
 }
 
 const hospitals = hospitalsWithoutDistance.map((hospital) => {
   const hospitalLat = hospital.latitude;
   const hospitalLon = hospital.longitude;
  // console.log(userLat, userLon);
  // console.log(hospitalLat, hospitalLon);
   if (isNaN(hospitalLat!!) || isNaN(hospitalLon!!)) {
     return { ...hospital, dist: null }; // Alias distance to dist and handle null case
   }

   // Haversine formula
   const R = 6371; // Earth's radius in kilometers
   const lat1 = (userLat * Math.PI) / 180; // Convert degrees to radians
   const lon1 = (userLon * Math.PI) / 180;
   const lat2 = (hospitalLat!! * Math.PI) / 180;
   const lon2 = (hospitalLon!! * Math.PI) / 180;

   const dLat = lat2 - lat1;
   const dLon = lon2 - lon1;

   const a =
     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
     Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
   let distance = R * c; // Distance in kilometers
   if(distance>1000) distance*=1.17
   else if(distance>450) distance*=1.26
   else if(distance>350) distance*=1.18
   else if(distance>250) distance*=1.25
   else distance *=1.37

   if(distance>400 && distance<450) distance-=15;

   return {
     ...hospital,
     dist: distance, // Alias distance to dist
   };
 });
//  console.log(latitude,longitude);
//  console.log("hospitalsWithDistance", hospitals);


    const totalRoomsPromise = hospitals.map(async (hospital: any) => {
      const roomCounts = await prisma.room.groupBy({
        by: ["typeof"],
        where: { userId: hospital.id },
        _count: {
          typeof: true,
        },
      });

      // Organize room counts into the respective categories
      const roomData = {
        singleRoom: roomCounts.find((room) => room.typeof === "Single Room")?._count
          .typeof || 0,
        ICU: roomCounts.find((room) => room.typeof === "ICU")?._count.typeof || 0,
        GeneralWard: roomCounts.find((room) => room.typeof === "General Ward")?._count
          .typeof || 0,
        SharedRoom: roomCounts.find((room) => room.typeof === "Shared Room")?._count
          .typeof || 0,
      };

      // Calculate the total rooms
      const total = roomData.singleRoom +
        roomData.ICU +
        roomData.GeneralWard +
        roomData.SharedRoom;

      return { total: { ...roomData, total } };
    });
    const totalRooms = await Promise.all(totalRoomsPromise);

    // Add this for debugging
   //  console.log(
   //    "First hospital departments:",
   //    hospitals.length > 0 ? hospitals[0].hospitaldep[0].doctors : "No hospitals found"
   //  );

    // Process the results with detailed hospital information and statistics
    const processedHospitals = hospitals.map((hospital:any,index:number) => {
      const roomsData = totalRooms[index]?.total || {
        singleRoom: 0,
        ICU: 0,
        GeneralWard: 0,
        SharedRoom: 0,
        total: 0,
      };
      const departmentsWithStats = hospital.hospitaldep.map((dept:any) => {
        const fees = dept.doctors.map((doc:any) => doc.consulatationFees || 0);
        const availableDoctors = dept.doctors.filter((doc:any) => doc.isAvailable);

        return {
          departmentId: dept.id,
          departmentName: dept.name,
          hod: dept.hod,
         //  createdAt: dept.createdAt,
          statistics: {
            minFees: Math.min(...fees),
            maxFees: Math.max(...fees),
            averageFees: fees.reduce((a:any, b:any) => a + b, 0) / fees.length,
            totalDoctors: dept.doctors.length,
            availableDoctors: availableDoctors.length,
          },
          doctors: dept.doctors.map((doc:any) => ({
            doctorId: doc.doctor.id,
            name: doc.doctor.name,
            imageUrl: doc.doctor.imageUrl,
            // dob: doc.doctor.dob,
            // licenceNo: doc.doctor.licenceNo,
            contactno: doc.doctor.contactno,
            email: doc.doctor.email,
            consulationFees: doc.consulatationFees,
            isAvailable: doc.isAvailable,
            ratings: doc.doctor.ratings,
            // assignedAt: doc.assignedAt,
            // createdAt: doc.doctor.createdAt,
          })),
        };
      });

      return {
        hospitalInfo: {
          id: hospital.id,
          dist: hospital.dist,
          latitude: hospital.latitude,
          longitude: hospital.longitude,
          name: hospital.name,
          imageUrl: hospital.imageUrl,
          licenceno: hospital.licenceno,
          estyear: hospital.estyear,
          Website: hospital.Website,
          contactno: hospital.contactno,
          alternatecontactno: hospital.alternatecontactno,
          email: hospital.email,
          address: hospital.address,
          City: hospital.City,
          State: hospital.State,
          Zipcode: hospital.Zipcode,
          facilities: {
            beds: {
              total: totalRooms[0].total,
              available: hospital.bedsAvailable,
              shared: hospital.sharedAvailable,
              generalWard: hospital.generalWardAvailable,
            },
            opd: {
              total: 10, //hospital.noofopds,
              available: hospital.opdsAvailable,
            },
            icu: {
              total: roomsData.ICU,
              available: hospital.icuAvailable,
            },
            singleRoom: {
              total:roomsData.singleRoom,
              available: hospital.bedsAvailable,
            },
            // labs: {
            //   total: hospital.nooflabs,
            //   available: hospital.labsAvailable,
            // },
            // doctors: {
            //   total: hospital.noofdoctorsregistered,
            //   available: hospital.doctorsAvailable,
            // },
          },
          anyotherdetails: hospital.anyotherdetails,
         //  idToLogin: hospital.idToLogin,
          isVerified: hospital.isVerified,
         //  createdAt: hospital.createdAt,
         //  updatedAt: hospital.updatedAt,
        },
        statistics: {
          totalRelevantDepartments: departmentsWithStats.length,
          totalRelevantDoctors: departmentsWithStats.reduce(
            (sum:any, dept:any) => sum + dept.doctors.length,
            0
          ),
          averageFeesAcrossDepartments:
            departmentsWithStats.reduce(
              (sum:any, dept:any) => sum + dept.statistics.averageFees,
              0
            ) / departmentsWithStats.length,
          // occupancyRates: {
          //   beds: (
          //     ((hospital.noofbeds - (hospital.bedsAvailable || 0)) /
          //       hospital.noofbeds) *
          //     100
          //   ).toFixed(1),
          //   opd: (
          //     ((hospital.noofopds - (hospital.opdsAvailable || 0)) /
          //       hospital.noofopds) *
          //     100
          //   ).toFixed(1),
          //   icu: (
          //     ((hospital.nooficu - (hospital.icuAvailable || 0)) /
          //       hospital.nooficu) *
          //     100
          //   ).toFixed(1),
          //   labs: (
          //     ((hospital.nooflabs - (hospital.labsAvailable || 0)) /
          //       hospital.nooflabs) *
          //     100
          //   ).toFixed(1),
          // },
        },
        departments: departmentsWithStats,
        
      };
    });
    // console.log(processedHospitals);
    return NextResponse.json({
      totalHospitals: processedHospitals.length,
      hospitals: processedHospitals,
    });
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
