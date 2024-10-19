import React from "react";
import Image from "next/image";
import {
  IoNotifications,
  IoQrCode,
  IoCalendar,
  IoDocumentText,
  IoSearch,
  IoMedkit,
} from "react-icons/io5";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
// import { features } from "process";

const features = [
  {
    icon: <IoNotifications className="w-8 h-8 sm:w-12 sm:h-12 " />,
    title: "Notifications System",
    description:
      "Stay updated with real-time alerts about appointments, prescriptions, and health tips.",
  },
  {
    icon: <IoQrCode className="w-8 h-8 sm:w-12 sm:h-12 " />,
    title: "OPD Queuing",
    description:
      "Efficient queue management for outpatient departments, reducing wait times.",
  },
  {
    icon: <IoCalendar className="w-8 h-8 sm:w-12 sm:h-12 " />,
    title: "Bed Availability",
    description:
      "Easy-to-use system for booking and managing hospital bed occupancy.",
  },

  {
    icon: <IoSearch className="w-8 h-8 sm:w-12 sm:h-12 " />,
    title: "Hospitals Search",
    description:
      "Find and compare hospitals based on services, ratings, and proximity.",
  },
  {
    icon: <IoDocumentText className="w-8 h-8 sm:w-12 sm:h-12 " />,
    title: "Patient History ",
    description:
      "Comprehensive view of patient medical history, treatments, and progress.",
  },
  {
    icon: <IoMedkit className="w-8 h-8 sm:w-12 sm:h-12 " />,
    title: "Pharmacy Inventory ",
    description:
      "Streamlined inventory control for pharmacies, ensuring medication availability.",
  },
];
const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: any;
  title: any;
  description: any;
}) => (
  // <div className="bg-white bg-opacity-90 dark:bg-slate-900 dark:bg-opacity-80 rounded-lg shadow-md p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 backdrop-blur-sm">
  //   <div className="text-teal-600 dark:text-teal-400 mb-4">{icon}</div>
  //   <h3 className="text-xl font-semibold text-blue-900 dark:text-slate-100 mb-2">
  //     {title}
  //   </h3>
  //   <p className="text-gray-700 dark:text-slate-300">{description}</p>
  <CarouselItem className="basis-1/2 lg:basis-1/3 h-full">
    <div className="p-1 w-full h-full">
      <div className="bg-blue-950 bg-opacity-90 rounded-lg shadow-md p-4 sm:p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 backdrop-blur-sm h-full min-h[80px] sm:min-h-[250px] ">
        <div className="text-teal-400 mb-4">{icon}</div> {/* Icon section */}
        <h3 className="text-sm sm:text-xl font-semibold text-slate-100 mb-2">
          {title}
        </h3>{" "}
        {/* Title */}
        <p className="text-slate-300 line-clamp-3 hidden sm:block">
          {description}
        </p>{" "}
        {/* Description with max 3 lines */}
      </div>
    </div>
  </CarouselItem>

  // </div>
);

const FeatureSlider = () => {
  return (
    // <section className="relative py-20 px-4 overflow-hidden">
    //   <div className="relative max-w-6xl mx-auto z-10">
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    //       {features.map((feature, index) => (
    //         <FeatureCard key={index} {...feature} />
    //       ))}
    //     </div>
    //   </div>
    // </section>
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="h-full">
        {" "}
        {/* Ensure full height */}
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:block" />
      <CarouselNext className="hidden md:block" />
    </Carousel>
  );
};

export default FeatureSlider;
