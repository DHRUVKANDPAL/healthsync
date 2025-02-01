// app/api/hospitals-by-departments/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { departments } = body;

    if (!Array.isArray(departments) || departments.length === 0) {
      return NextResponse.json(
        { error: "Invalid departments array" },
        { status: 400 }
      );
    }

    const hospitals = await prisma.hospital.findMany({
      where: {
        hospitaldep: {
          some: {
            name: {
              in: departments,
            },
            doctors: {
              some: {
                isAvailable: true,
              },
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        address: true,
        contactno: true,
        email: true,
        imageUrl: true,
        createdAt: true,
        hospitaldep: {
          where: {
            name: {
              in: departments,
            },
            doctors: {
              some: {
                isAvailable: true,
              },
            },
          },
          select: {
            id: true,
            name: true,
            hod: true,
            createdAt: true,
            doctors: {
              where: {
                isAvailable: true,
              },
              select: {
                doctor: {
                  select: {
                    id: true,
                    name: true,
                    imageUrl: true,
                    dob: true,
                    licenceNo: true,
                    contactno: true,
                    email: true,
                    createdAt: true,
                  },
                },
                consulatationFees: true,
                isAvailable: true,
                assignedAt: true,
              },
            },
          },
        },
      },
    });

    // Process the results to include department and doctor statistics
    const processedHospitals = hospitals.map((hospital:any) => {
      const departmentsWithStats = hospital.departments.map((dept:any) => {
        const fees = dept.doctors.map((doc:any) => doc.consulatationFees || 0);
        const availableDoctors = dept.doctors.filter((doc:any) => doc.isAvailable);

        return {
          departmentId: dept.id,
          departmentName: dept.name,
          hod: dept.hod,
          createdAt: dept.createdAt,
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
            dob: doc.doctor.dob,
            licenceNo: doc.doctor.licenceNo,
            contactno: doc.doctor.contactno,
            email: doc.doctor.email,
            consulationFees: doc.consulatationFees,
            isAvailable: doc.isAvailable,
            assignedAt: doc.assignedAt,
            createdAt: doc.doctor.createdAt,
          })),
        };
      });

      return {
        hospitalInfo: {
          id: hospital.id,
          name: hospital.name,
          address: hospital.address,
          contactNo: hospital.contactNo,
          email: hospital.email,
          imageUrl: hospital.imageUrl,
          createdAt: hospital.createdAt,
        },
        statistics: {
          totalDepartments: departmentsWithStats.length,
          totalDoctors: departmentsWithStats.reduce(
            (sum:any, dept:any) => sum + dept.doctors.length,
            0
          ),
          averageFeesAcrossDepartments:
            departmentsWithStats.reduce(
              (sum:any, dept:any) => sum + dept.statistics.averageFees,
              0
            ) / departmentsWithStats.length,
        },
        departments: departmentsWithStats,
      };
    });

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
