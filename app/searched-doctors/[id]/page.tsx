"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
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
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

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
        const response = await fetch(
          `/api/fetchDoctorCardData/${id}`
        );
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
  }, []);

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
    <div className="flex items-center gap-3 bg-blue-50/50 dark:bg-blue-950/30 p-4 rounded-lg hover:bg-blue-100/50 dark:hover:bg-blue-950/50 transition-colors">
      <Icon className="text-blue-600 dark:text-blue-400" size={24} />
      <div>
        <p className="font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </p>
        <p className="text-gray-600 dark:text-gray-300">{content}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4">
      <div className="container mx-auto px-4 max-w-7xl space-y-6">
        {/* Header Section */}
        <Card className="border-none shadow-lg bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start">
              {/* Left Column - Avatar and Stats */}
              <div className="w-full lg:w-1/4 space-y-3">
                <div className="relative group">
                  <Avatar className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-lg">
                    <AvatarImage
                      src={profileData.imageUrl}
                      alt={profileData.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-3xl bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">
                      {profileData?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute top-2 right-2 space-x-1">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full opacity-90 hover:opacity-100"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full opacity-90 hover:opacity-100"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg">
                  <Star className="text-yellow-400" size={20} />
                  <div>
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {profileData.ratings}
                    </span>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      ({profileData.totalReviews} reviews)
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg text-center">
                    <Building2
                      className="mx-auto text-blue-600 dark:text-blue-400 mb-1"
                      size={18}
                    />
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      Experience
                    </p>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {profileData.experience}+ Yrs
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg text-center">
                    <MessageCircle
                      className="mx-auto text-blue-600 dark:text-blue-400 mb-1"
                      size={18}
                    />
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      Consults
                    </p>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      10,000+
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Doctor Info and Booking */}
              <div className="lg:w-3/4 space-y-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                      Dr. {profileData.name}
                    </h1>
                    <Badge variant="secondary" className="text-xs">
                      Verified ✓
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {profileData.departments.map((dept) => (
                      <Badge
                        key={dept.deptId}
                        variant="outline"
                        className="text-xs bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/50"
                      >
                        {dept.dept.name}
                      </Badge>
                    ))}
                  </div>

                  <ScrollArea className="h-20">
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {profileData.bio}
                    </p>
                  </ScrollArea>
                </div>

                <Separator className="my-4" />

                <div className="grid sm:grid-cols-2 gap-3">
                  {/* Mobile View - Consultation Sheet */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        className="w-full sm:hidden bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
                        size="sm"
                      >
                        <Video className="mr-2 h-4 w-4" />
                        Book Consultation
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-80">
                      <div className="space-y-4 pt-4">
                        <h3 className="text-lg font-semibold text-center mb-4">
                          Choose Consultation Type
                        </h3>
                        <div className="grid gap-3">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white h-12">
                            <Video className="mr-2 h-4 w-4" />
                            Online Consultation (₹{profileData.fees.online})
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 h-12"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            In-person Visit (₹{profileData.fees.offline})
                          </Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Desktop View - Direct Buttons */}
                  <Button className="hidden sm:flex bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white h-11">
                    <Video className="mr-2 h-4 w-4" />
                    Book Online Consultation
                  </Button>
                  <Button
                    variant="outline"
                    className="hidden sm:flex border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 h-11"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule In-person Visit
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-blue-50 dark:bg-blue-950/30">
                <TabsTrigger
                  value="about"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500"
                >
                  About
                </TabsTrigger>
                <TabsTrigger
                  value="practice"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500"
                >
                  Practice
                </TabsTrigger>
                <TabsTrigger
                  value="location"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500"
                >
                  Location
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-4 mt-6">
                <Card className="bg-white dark:bg-gray-800">
                  <CardContent className="space-y-6 p-6">
                    <InfoCard
                      icon={Languages}
                      title="Languages Spoken"
                      content={profileData.languages.join(", ")}
                    />
                    <div className="grid gap-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Key Achievements
                      </h3>
                      {profileData.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                        >
                          <div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="practice" className="space-y-4 mt-6">
                <Card className="bg-white dark:bg-gray-800">
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
                <Card className="bg-white dark:bg-gray-800">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="aspect-video bg-blue-50 dark:bg-blue-950/30 rounded-lg flex items-center justify-center">
                        <MapPin className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                        <span className="text-gray-600 dark:text-gray-300 ml-2">
                          Google Maps Integration
                        </span>
                      </div>
                      <div className="bg-blue-50/50 dark:bg-blue-950/30 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          Address
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {profileData.hospital.address}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews">
                <Card className="bg-white dark:bg-gray-800">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="bg-blue-50/50 dark:bg-blue-950/30 p-6 rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Star className="text-yellow-400" size={32} />
                            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                              {profileData.ratings}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className="text-gray-600 dark:text-gray-300">
                              out of 5 ({profileData.totalReviews} verified
                              reviews)
                            </div>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className="text-yellow-400"
                                  size={16}
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
                      </div>

                      {/* Sample Reviews */}
                      {[1, 2, 3].map((review) => (
                        <div
                          key={review}
                          className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 space-y-3 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                                  P{review}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
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
                                  size={14}
                                  fill={star <= 5 ? "currentColor" : "none"}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300">
                            Great experience with Dr. Gulati. Very professional
                            and knowledgeable. The consultation was thorough and
                            he explained everything clearly.
                          </p>
                        </div>
                      ))}

                      <Button
                        variant="outline"
                        className="w-full border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                      >
                        View All Reviews
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 sticky top-6">
              <CardHeader className="border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Consultation Fees
                </h2>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="bg-blue-50/50 dark:bg-blue-950/30 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Video
                        className="text-blue-600 dark:text-blue-400"
                        size={28}
                      />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          Online Consultation
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Video call with doctor
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ₹{profileData.fees.online}
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                    Book Online
                  </Button>
                </div>

                <div className="bg-blue-50/50 dark:bg-blue-950/30 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Calendar
                        className="text-blue-600 dark:text-blue-400"
                        size={28}
                      />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          In-person Visit
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Visit at clinic
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ₹{profileData.fees.offline}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                  >
                    Book Visit
                  </Button>
                </div>

                <div className="p-4 bg-blue-50/50 dark:bg-blue-950/30 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Available Time Slots
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"].map(
                      (time) => (
                        <div
                          key={time}
                          className="text-center p-2 border border-blue-200 dark:border-blue-800 rounded bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm"
                        >
                          {time}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
