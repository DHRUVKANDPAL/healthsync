"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Globe,
  Languages,
  Mail,
  MapPin,
  Phone,
  Star,
  Video,
  Building2,
  Clock3,
  MessageCircle,
  Share2,
  Heart,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

interface Department {
  deptId: string;
  dept: {
    name: string;
  };
}

interface Doctor {
  id: string;
  userId: string;
  name: string;
  imageUrl?: string;
  dob?: string;
  aadharNo?: string;
  licenceNo: string;
  contactno?: string;
  email?: string;
  createdAt?: string;
  departments: Department[];
}

// Fallback data for missing API fields
const fallbackData = {
  experience: 15,
  ratings: 4.8,
  totalReviews: 234,
  bio: "An experienced medical professional dedicated to patient care.",
  languages: ["English"],
  hospital: {
    name: "General Hospital",
    address: "123 Medical Street",
    timings: "Mon-Sat: 9:00 AM - 5:00 PM",
  },
  fees: {
    online: 1000,
    offline: 1500,
  },
  achievements: [
    "Experienced Medical Professional",
    "Certified Specialist",
    "Dedicated to Patient Care",
  ],
};

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(`/api/fetchDoctorCardData/${id}`);
        const data = await response.json();
        console.log(data.data);
        setDoctor(data.data);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        setError("Failed to load doctor profile");
      } finally {
        setIsLoading(false);
      }
    };
    // setTimeout(fetchDoctorData, 1000);
    fetchDoctorData();
    // if(id){
    //   fetchDoctorData();
    // }
  }, [id]); // Added id to the dependency array

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-blue-600 dark:text-blue-400">Loading...</div>
      </div>
    );
  }

  // if (error || !doctor) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-red-600 dark:text-red-400">
  //         {error || "Doctor not found"}
  //       </div>
  //     </div>
  //   );
  // }

  // Merge API data with fallback data for optional fields
  const profileData = {
    ...fallbackData,
    name: doctor?.name,
    imageUrl: doctor?.imageUrl,
    email: doctor?.email || fallbackData.hospital.name,
    contactno: doctor?.contactno || "Contact not available",
    departments: doctor?.departments || [],
  };

  const InfoCard = ({ icon: Icon, title, content }: any) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
    >
      <Icon className="text-blue-600 dark:text-blue-400" size={24} />
      <div>
        <p className="font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </p>
        <p className="text-gray-600 dark:text-gray-300">{content}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl space-y-8">
        {/* Header Section */}
        <Card className="border-none shadow-xl bg-white dark:bg-gray-800 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
              {/* Left Column - Avatar and Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full lg:w-1/4 space-y-4"
              >
                <div className="relative group">
                  <Avatar className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-2xl shadow-lg">
                    <AvatarImage
                      src={profileData.imageUrl}
                      alt={profileData.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-4xl bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">
                      {profileData?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute top-2 right-2 space-x-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-10 w-10 rounded-full opacity-90 hover:opacity-100 bg-white dark:bg-gray-800 shadow-md"
                    >
                      <Heart className="h-5 w-5 text-red-500" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-10 w-10 rounded-full opacity-90 hover:opacity-100 bg-white dark:bg-gray-800 shadow-md"
                    >
                      <Share2 className="h-5 w-5 text-blue-500" />
                    </Button>
                  </div>
                </div>

                {/* Rating Badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-lg shadow-md"
                >
                  <Star className="text-white" size={24} />
                  <div>
                    <span className="text-2xl font-bold text-white">
                      {profileData.ratings}
                    </span>
                    <p className="text-sm text-yellow-100">
                      ({profileData.totalReviews} reviews)
                    </p>
                  </div>
                </motion.div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg text-center shadow-md"
                  >
                    <Building2 className="mx-auto text-white mb-2" size={24} />
                    <p className="text-xs font-medium text-blue-100">
                      Experience
                    </p>
                    <p className="text-lg font-bold text-white">
                      {profileData.experience}+ Yrs
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-lg text-center shadow-md"
                  >
                    <MessageCircle
                      className="mx-auto text-white mb-2"
                      size={24}
                    />
                    <p className="text-xs font-medium text-green-100">
                      Consults
                    </p>
                    <p className="text-lg font-bold text-white">10,000+</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Column - Doctor Info and Booking */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:w-3/4 space-y-6"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
                      Dr. {profileData.name}
                    </h1>
                    <Badge
                      variant="secondary"
                      className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                    >
                      Verified ✓
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {profileData.departments.map((dept) => (
                      <Badge
                        key={dept.deptId}
                        variant="outline"
                        className="text-sm px-3 py-1 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors"
                      >
                        {dept.dept.name}
                      </Badge>
                    ))}
                  </div>

                  <ScrollArea className="h-24 mb-4">
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {profileData.bio}
                    </p>
                  </ScrollArea>
                </div>

                <Separator className="my-6" />

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Mobile View - Consultation Sheet */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        className="w-full sm:hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                        size="lg"
                      >
                        <Video className="mr-2 h-5 w-5" />
                        Book Consultation
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-96">
                      <div className="space-y-6 pt-6">
                        <h3 className="text-xl font-semibold text-center mb-4">
                          Choose Consultation Type
                        </h3>
                        <div className="grid gap-4">
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-14 text-lg shadow-md">
                            <Video className="mr-3 h-6 w-6" />
                            Online Consultation (₹{profileData.fees.online})
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full border-blue-600 dark:border-blue-500 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 h-14 text-lg shadow-sm"
                          >
                            <Calendar className="mr-3 h-6 w-6" />
                            In-person Visit (₹{profileData.fees.offline})
                          </Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Desktop View - Direct Buttons */}
                  <Button className="hidden sm:flex bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-12 text-lg shadow-lg">
                    <Video className="mr-2 h-5 w-5" />
                    Book Online Consultation
                  </Button>
                  <Button
                    variant="outline"
                    className="hidden sm:flex border-blue-600 dark:border-blue-500 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 h-12 text-lg shadow-md"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Schedule In-person Visit
                  </Button>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-blue-100 dark:bg-blue-900/50 rounded-lg p-1">
                <TabsTrigger
                  value="about"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-blue-800 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-200 rounded-md transition-all duration-300"
                >
                  About
                </TabsTrigger>
                <TabsTrigger
                  value="practice"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-blue-800 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-200 rounded-md transition-all duration-300"
                >
                  Practice
                </TabsTrigger>
                <TabsTrigger
                  value="location"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-blue-800 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-200 rounded-md transition-all duration-300"
                >
                  Location
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-blue-800 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-200 rounded-md transition-all duration-300"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6 mt-6">
                <Card className="bg-white dark:bg-gray-800 shadow-lg">
                  <CardContent className="space-y-6 p-6">
                    <InfoCard
                      icon={Languages}
                      title="Languages Spoken"
                      content={profileData.languages.join(", ")}
                    />
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Key Achievements
                      </h3>
                      {profileData.achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center gap-3 text-gray-600 dark:text-gray-300"
                        >
                          <div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                          <span>{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="practice" className="space-y-6 mt-6">
                <Card className="bg-white dark:bg-gray-800 shadow-lg">
                  <CardContent className="space-y-6 p-6">
                    <InfoCard
                      icon={Globe}
                      title="Hospital"
                      content={profileData.hospital.name}
                    />
                    <InfoCard
                      icon={Clock3}
                      title="Timings"
                      content={profileData.hospital.timings}
                    />
                    <InfoCard
                      icon={Phone}
                      title="Phone"
                      content={doctor?.contactno}
                    />
                    <InfoCard
                      icon={Mail}
                      title="Email"
                      content={doctor?.email}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="location">
                <Card className="bg-white dark:bg-gray-800 shadow-lg">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="aspect-video bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center overflow-hidden">
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="text-center"
                        >
                          <MapPin className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                          <span className="text-gray-600 dark:text-gray-300 text-lg">
                            Google Maps Integration
                          </span>
                        </motion.div>
                      </div>
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-blue-50/50 dark:bg-blue-900/30 p-6 rounded-lg shadow-inner"
                      >
                        <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100 mb-3">
                          Address
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                          {profileData.hospital.address}
                        </p>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card className="bg-white dark:bg-gray-800 shadow-lg">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow-md"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex items-center gap-3">
                            <Star className="text-yellow-300" size={40} />
                            <span className="text-4xl font-bold text-white">
                              {profileData.ratings}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className="text-blue-100">
                              out of 5 ({profileData.totalReviews} verified
                              reviews)
                            </div>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className="text-yellow-300"
                                  size={20}
                                  fill={
                                    star <= Math.floor(profileData.ratings)
                                      ? "currentColor"
                                      : "none"
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Sample Reviews */}
                      {[1, 2, 3].map((review) => (
                        <motion.div
                          key={review}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: review * 0.1 }}
                          className="border border-gray-100 dark:border-gray-700 rounded-lg p-6 space-y-3 hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-colors shadow-md"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-12 w-12">
                                <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                                  P{review}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                                  Patient {review}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  2 weeks ago
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className="text-yellow-400"
                                  size={16}
                                  fill={star <= 5 ? "currentColor" : "none"}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-lg">
                            Great experience with Dr. {profileData.name}. Very
                            professional and knowledgeable. The consultation was
                            thorough and they explained everything clearly.
                          </p>
                        </motion.div>
                      ))}

                      <Button
                        variant="outline"
                        className="w-full border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-lg h-12 shadow-md"
                      >
                        View All Reviews
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Side Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-6"
          >
            <Card className="bg-white dark:bg-gray-800 sticky top-6 shadow-xl">
              <CardHeader className="border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  Consultation Fees
                </h2>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Video className="text-white" size={32} />
                      <div>
                        <div className="font-semibold text-white text-lg">
                          Online Consultation
                        </div>
                        <div className="text-sm text-blue-100">
                          Video call with doctor
                        </div>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-white">
                      ₹{profileData.fees.online}
                    </div>
                  </div>
                  <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 text-lg h-12 shadow-md">
                    Book Online
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="text-white" size={32} />
                      <div>
                        <div className="font-semibold text-white text-lg">
                          In-person Visit
                        </div>
                        <div className="text-sm text-green-100">
                          Visit at clinic
                        </div>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-white">
                      ₹{profileData.fees.offline}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-white text-white hover:bg-green-400/20 text-lg h-12 shadow-md"
                  >
                    Book Visit
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg shadow-inner"
                >
                  <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100 mb-4">
                    Available Time Slots
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"].map(
                      (time) => (
                        <motion.div
                          key={time}
                          whileHover={{ scale: 1.05 }}
                          className="text-center p-3 border border-blue-200 dark:border-blue-700 rounded-lg bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                          {time}
                        </motion.div>
                      )
                    )}
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
