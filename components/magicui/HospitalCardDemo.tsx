import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Calendar,
  Check,
  ChevronRight,
  Globe,
  IndianRupee,
  LandPlot,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";

// Define the Hospital type
interface Hospital {
  hospitalInfo: {
    id: string;
    name: string;
    imageUrl: string;
    isVerified: boolean;
    City: string;
    State: string;
    estyear: string;
    contactno: string;
    email: string;
    Website: string;
    dist: number;
    facilities: {
      singleRoom: { available: number; total: number };
      icu: { available: number; total: number };
    };
  };
  departments: Array<{
    departmentId: string;
    departmentName: string;
    statistics: {
      minFees: number;
      maxFees: number;
    };
  }>;
  statistics: {
    totalRelevantDoctors: number;
    averageFeesAcrossDepartments: number;
  };
}

// Sample departments for URL
const departmentSuggestions = ["cardiology", "neurology", "orthopedics"];

const HospitalCard = () => {
  // Dummy data for one hospital
  const hospital: Hospital = {
    hospitalInfo: {
      id: "h123",
      name: "City Memorial Hospital",
      imageUrl:
        "https://www.apollohospitals.com/bangalore/wp-content/uploads/2021/08/Bannerghatta-Road-Banglore.jpg ",
      isVerified: true,
      City: "Bangalore",
      State: "Karnataka",
      estyear: "1985",
      contactno: "+91 80 2234 5678",
      email: "contact@citymemorial.in",
      Website: "www.citymemorial.in",
      dist: 3.2,
      facilities: {
        singleRoom: { available: 12, total: 20 },
        icu: { available: 5, total: 8 },
      },
    },
    departments: [
      {
        departmentId: "d1",
        departmentName: "Cardiology",
        statistics: {
          minFees: 1500,
          maxFees: 5000,
        },
      },
      {
        departmentId: "d2",
        departmentName: "Neurology",
        statistics: {
          minFees: 2000,
          maxFees: 7500,
        },
      },
      {
        departmentId: "d3",
        departmentName: "Orthopedics",
        statistics: {
          minFees: 1200,
          maxFees: 4500,
        },
      },
    ],
    statistics: {
      totalRelevantDoctors: 35,
      averageFeesAcrossDepartments: 3450,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={`/searched-hospitals/${
          hospital.hospitalInfo.id
        }/${departmentSuggestions.join(",")}`}
        passHref
      >
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
          <Card className="group h-full transition-all duration-300 hover:shadow-lg dark:hover:shadow-blue-500/10 hover:-translate-y-1 relative overflow-hidden">
            {/* Background Image with Gradient */}
            {hospital.hospitalInfo.imageUrl && (
              <div className="absolute inset-0 z-0">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${hospital.hospitalInfo.imageUrl})`,
                    maskImage:
                      "linear-gradient(to bottom, white 50%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, white 50%, transparent 100%)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-60% to-white dark:to-slate-950" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white dark:to-slate-950" />
              </div>
            )}

            {/* Card Content - Positioned Relatively */}
            <div className="relative z-10">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                      >
                        <CardTitle className="text-xl font-semibold text-primary">
                          {hospital.hospitalInfo.name}
                        </CardTitle>
                      </motion.div>
                      {hospital.hospitalInfo.isVerified && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4, duration: 0.3 }}
                        >
                          <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-300 dark:bg-blue-500/20">
                            <Check className="w-3 h-3 mr-1.5" />
                            Verified
                          </Badge>
                        </motion.div>
                      )}
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <div className="flex items-center text-muted-foreground font-semibold">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">
                          {hospital.hospitalInfo.City},{" "}
                          {hospital.hospitalInfo.State}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    <Badge
                      variant="outline"
                      className="self-start whitespace-nowrap border-2 border-slate-800/25"
                    >
                      <Calendar className="w-3 h-3 mr-1.5" />
                      Est. {hospital.hospitalInfo.estyear}
                    </Badge>
                  </motion.div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="flex flex-wrap gap-2"
                >
                  {hospital.departments.map((dept, index) => (
                    <motion.div
                      key={dept.departmentId}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-blue-500/5 text-blue-700 dark:text-blue-300 hover:bg-blue-500/10 transition-colors"
                      >
                        {dept.departmentName}
                        <span className="ml-1.5 text-xs opacity-70">
                          ₹{dept.statistics.minFees}-{dept.statistics.maxFees}
                        </span>
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">
                        {hospital.statistics.totalRelevantDoctors} Doctors
                        Available
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">
                        {hospital.hospitalInfo.contactno}
                      </span>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="space-y-2"
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="truncate">
                              {hospital.hospitalInfo.email}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{hospital.hospitalInfo.email}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="truncate">
                              {hospital.hospitalInfo.Website}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{hospital.hospitalInfo.Website}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </motion.div>
                </div>
              </CardContent>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                <CardFooter className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-b-lg">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="bg-background/50">
                      Single Rooms:{" "}
                      {hospital.hospitalInfo.facilities.singleRoom.available}/
                      {hospital.hospitalInfo.facilities.singleRoom.total}
                    </Badge>
                    <Badge variant="outline" className="bg-background/50">
                      ICU: {hospital.hospitalInfo.facilities.icu.available}/
                      {hospital.hospitalInfo.facilities.icu.total}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-end">
                    <Badge className="mr-1.5 bg-teal-500/10 text-teal-700 dark:text-teal-300 dark:bg-teal-500/20">
                      <LandPlot className="w-3 h-3 mr-1" />
                      {hospital.hospitalInfo.dist.toFixed(1) + " km"}
                    </Badge>
                    <Badge className="mr-1.5 bg-blue-500/10 text-blue-700 dark:text-blue-300 dark:bg-blue-500/20">
                      <IndianRupee className="w-3 h-3 mr-1" />
                      Avg.{" "}
                      {Math.round(
                        hospital.statistics.averageFeesAcrossDepartments
                      )}
                    </Badge>
                    <motion.div
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-blue-500/10 hover:text-blue-700 dark:hover:text-blue-300"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>
                </CardFooter>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default HospitalCard;
