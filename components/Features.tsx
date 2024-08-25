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

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: any;
  title: any;
  description: any;
}) => (
  <div className="bg-white bg-opacity-90 dark:bg-slate-800 dark:bg-opacity-90 rounded-lg shadow-md p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 backdrop-blur-sm">
    <div className="text-teal-600 dark:text-teal-400 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-blue-900 dark:text-slate-100 mb-2">
      {title}
    </h3>
    <p className="text-gray-700 dark:text-slate-300">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: <IoNotifications className="w-12 h-12" />,
      title: "Notifications System",
      description:
        "Stay updated with real-time alerts about appointments, prescriptions, and health tips.",
    },
    {
      icon: <IoQrCode className="w-12 h-12" />,
      title: "OPD Queuing",
      description:
        "Efficient queue management for outpatient departments, reducing wait times.",
    },
    {
      icon: <IoCalendar className="w-12 h-12" />,
      title: "Bed Booking",
      description:
        "Easy-to-use system for booking and managing hospital bed occupancy.",
    },
    {
      icon: <IoDocumentText className="w-12 h-12" />,
      title: "Patient History Dashboard",
      description:
        "Comprehensive view of patient medical history, treatments, and progress.",
    },
    {
      icon: <IoSearch className="w-12 h-12" />,
      title: "Hospitals Search",
      description:
        "Find and compare hospitals based on services, ratings, and proximity.",
    },
    {
      icon: <IoMedkit className="w-12 h-12" />,
      title: "Pharmacy Inventory Management",
      description:
        "Streamlined inventory control for pharmacies, ensuring medication availability.",
    },
  ];

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <Image
        src="https://i.imghippo.com/files/B9VWw1724063218.jpg"
        alt="Healthcare background"
        className="absolute inset-0 w-full h-full object-cover"
        width={1227}
        height={629}
      />
      <div className="absolute inset-0 bg-blue-900 bg-opacity-70 dark:bg-slate-900 dark:bg-opacity-90"></div>
      <div className="relative max-w-6xl mx-auto z-10">
        <h2 className="text-4xl font-bold text-center text-white mb-12 dark:text-slate-100">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
