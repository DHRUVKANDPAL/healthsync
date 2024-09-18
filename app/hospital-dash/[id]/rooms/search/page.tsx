"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { pusherClient } from "@/lib/pusher";
import { Divide, Hotel, Loader2, Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

import { User, Phone, Mail, Heart, MapPin, FileText } from "lucide-react";
import Rooms from "../(create)/page";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [patientData, setPatientData] = useState<any>(null);
  const [roomBooked, setRoomBooked] = useState<any>([]); // Ensure it's an array
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState("details");

  function InfoCard({ icon: Icon, label, value, className = "" }: any) {
    return (
      <Card className={`overflow-hidden ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-full bg-primary/10">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">
                {label}
              </p>
              <p className="text-sm font-semibold mt-1">{value}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  const { id } = useParams();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const fetchPatient = async (values: {
    amount: string;
    id: string | string[];
  }) => {
    console.log("Fetching Patient");
    try {
      startTransition(async () => {
        console.log(values.amount);
        console.log(values.id);

        const res = await fetch(`/api/roomhis/patientdata/${values.id}`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const d = await res.json();
        console.log("API Response:", d); // Log the entire response

        if (d.success) {
          // console.log(d.data);
          setPatientData(d.data);
          setRoomBooked(d.data2 || []); // Ensure `d.data2` is assigned correctly
          toast.success("Patient found");
        } else {
          setPatientData(null);
          setRoomBooked([]);
          toast.error("Patient not found");
        }
      });
    } catch (error) {
      setPatientData(null);
      setRoomBooked([]);
      console.error("Error fetching patient:", error);
      toast.error("An error occurred");
    }
  };

  useEffect(() => {
    // Setup Pusher and handle bed availability and patient data
    const channel = pusherClient.subscribe("rooms");

    channel.bind("room-history", async (data: { message: any }) => {
      console.log("Received room-history event:", data);
      const amount = searchTerm;
      await fetchPatient({ amount, id });
    });

    return () => {
      channel.unbind("room-history");
      pusherClient.unsubscribe("rooms");
    };
  }, [searchTerm, id]); // Added dependencies to ensure useEffect runs correctly

  const handleSubmit = async () => {
    console.log("Searching for:", searchTerm);
    const amount = searchTerm;
    await fetchPatient({ amount, id });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  // Sorting rooms based on `bookedAt`
  const sortedRooms = roomBooked?.sort(
    (a: any, b: any) =>
      new Date(b.bookedAt).getTime() - new Date(a.bookedAt).getTime()
  );
  if (!patientData && roomBooked.length === 0) {
    return (
      <div className="py-20">
        <Card className="w-full max-w-5xl mx-auto shadow-lg ">
          <CardHeader className="pb-4 pt-8">
            <CardTitle className="text-3xl font-bold text-center flex justify-center gap-x-2 items-center">
              <Search></Search>Search Patient
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Search for a patient to view their details
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex w-full justify-center items-center space-x-2 p-10 pt-2">
              <div className="relative flex-grow w-full max-w-4xl ">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 pr-4 py-2 border-2 border-gray-300 dark:border-gray-700 rounded-l-full focus:border-gray-900 focus:ring-gray-300 focus:ring-offset-0 focus:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-gray-800"
                  value={searchTerm}
                  onKeyPress={handleKeyPress}
                  onChange={handleSearchChange}
                />
              </div>
              <Button
                type="button"
                onClick={handleSubmit}
                className="rounded-r-full px-6"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="animate-spin h-5 w-5"></Loader2>
                ) : (
                  <span>Search</span>
                )}
              </Button>
            </div>
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
              </TabsList>
              <ScrollArea className=" max-h-[300px] pr-4">
                <TabsContent value="details">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Name",
                      "Age",
                      "Gender",
                      "Contact",
                      "Email",
                      "Address",
                    ].map((item) => (
                      <Card key={item} className="p-4">
                        <CardTitle className="text-sm font-medium text-muted-foreground mb-2">
                          {item}
                        </CardTitle>
                        <div className="h-4 bg-muted rounded"></div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="history">
                  <Card>
                    <CardHeader>
                      <CardTitle>Medical History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="h-4 bg-muted rounded w-full"
                          ></div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="appointments">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Visit</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Upcoming Appointment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="rooms">
                  <Card>
                    <CardHeader>
                      <CardTitle>Rooms Booked</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Room No</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Booked At</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[1, 2].map((i) => (
                            <TableRow key={i}>
                              <TableCell className="font-medium">
                                <div className="h-4 bg-muted rounded w-12"></div>
                              </TableCell>
                              <TableCell>
                                <div className="h-4 bg-muted rounded w-20"></div>
                              </TableCell>
                              <TableCell>
                                <div className="h-4 bg-muted rounded w-32"></div>
                              </TableCell>
                              <TableCell>
                                <div className="h-4 bg-muted rounded w-16"></div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </CardContent>
          <CardFooter className="bg-muted/50 py-2">
            <Button variant="outline" className="ml-auto" disabled>
              <FileText className="mr-2 h-4 w-4" /> Generate Report
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  return (
    <>
      <div className="py-20 ">
        <Card className="w-full max-w-5xl mx-auto shadow-lg">
          <CardHeader className="pb-4 pt-8">
            <CardTitle className="text-3xl font-bold text-center flex justify-center gap-x-2 items-center">
              <Search></Search>Search Patient
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Search for a patient to view their details
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex w-full justify-center items-center space-x-2 p-10 pt-2">
              <div className="relative flex-grow w-full max-w-4xl ">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 pr-4 py-2 border-2 border-gray-300 dark:border-gray-700 rounded-l-full focus:border-gray-900 focus:ring-gray-300 focus:ring-offset-0 focus:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-gray-800"
                  value={searchTerm}
                  onKeyPress={handleKeyPress}
                  onChange={handleSearchChange}
                />
              </div>

              <Button
                type="button"
                onClick={handleSubmit}
                className="rounded-r-full px-6"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="animate-spin h-5 w-5"></Loader2>
                ) : (
                  <span>Search</span>
                )}
              </Button>
            </div>
            <div className="pb-10">
              {patientData && (
                <Card className="w-full max-w-5xl mx-auto  shadow-none ">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-24 h-24 border-2 border-primary">
                        <AvatarImage src={patientData?.imageUrl} />
                        <AvatarFallback>
                          {patientData?.name
                            .split(" ")
                            .map((n: any) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-3xl font-bold">
                          {patientData.name}
                        </CardTitle>
                        <div className="flex items-center mt-2 space-x-2">
                          <Badge
                            variant="secondary"
                            className="h-7 text-sm font-normal"
                          >
                            {patientData.gender}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="h-7 text-sm font-normal"
                          >
                            {patientData.dob}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="h-7 text-sm font-normal"
                          >
                            {patientData.bloodgroup}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs
                      value={activeTab}
                      onValueChange={setActiveTab}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-4 mb-4 ">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="history">History</TabsTrigger>
                        <TabsTrigger value="appointments">
                          Appointments
                        </TabsTrigger>
                        <TabsTrigger value="rooms">Rooms</TabsTrigger>
                      </TabsList>
                      <ScrollArea className="h-[320px]  pr-4 pb-2">
                        <TabsContent value="details">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InfoCard
                              icon={User}
                              label="Aadhar No"
                              value={patientData.aadharno}
                            />
                            <InfoCard
                              icon={Phone}
                              label="Contact No"
                              value={patientData.contactno}
                            />
                            <InfoCard
                              icon={Mail}
                              label="Email"
                              value={patientData.email}
                            />
                            <InfoCard
                              icon={Heart}
                              label="Emergency Contact"
                              value={patientData.emergencycontact}
                            />
                            <InfoCard
                              icon={MapPin}
                              label="Address"
                              value={patientData.address}
                              className="md:col-span-2"
                            />
                          </div>
                        </TabsContent>
                        <TabsContent value="history">
                          <Card>
                            <CardHeader>
                              <CardTitle>Medical History</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p>{patientData.prevHis}</p>
                            </CardContent>
                          </Card>
                        </TabsContent>
                        <TabsContent value="appointments">
                          <div className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Recent Visit</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p>
                                  {patientData.recentVisit ||
                                    "No recent visits"}
                                </p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader>
                                <CardTitle>Upcoming Appointment</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p>
                                  {patientData.upcomingAppointment ||
                                    "No upcoming appointments"}
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                        </TabsContent>
                        <TabsContent value="rooms">
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Hotel className="mr-2 h-4 w-4" />
                                  Rooms Booked
                                </div>
                                <Badge variant="outline">
                                  {sortedRooms.length} Room(s)
                                </Badge>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Room No</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Booked At</TableHead>
                                    <TableHead>Checkout</TableHead>
                                    <TableHead>Status</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {sortedRooms.map((room: any) => (
                                    <TableRow key={room.id}>
                                      <TableCell className="font-medium">
                                        {room.roomno}
                                      </TableCell>
                                      <TableCell>{room.typeof}</TableCell>
                                      <TableCell>
                                        {new Date(
                                          room.bookedAt
                                        ).toLocaleString()}
                                      </TableCell>
                                      <TableCell>
                                        {room.checkout
                                          ? new Date(
                                              room.checkout
                                            ).toLocaleString()
                                          : "N/A"}
                                      </TableCell>
                                      <TableCell>
                                        <Badge
                                          variant={
                                            room.checkout
                                              ? "secondary"
                                              : "default"
                                          }
                                        >
                                          {room.checkout
                                            ? "Checked Out"
                                            : "Active"}
                                        </Badge>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </ScrollArea>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="bg-muted/50 py-2">
                    <Button variant="outline" className="ml-auto">
                      <FileText className="mr-2 h-4 w-4" /> Generate Report
                    </Button>
                  </CardFooter>
                </Card>
              )}
              {!patientData && searchTerm != "" && roomBooked.length != 0 && (
                <Card className="w-full max-w-5xl mx-auto shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-24 h-24 border-2 border-primary">
                        <AvatarImage
                          src={`https://placehold.jp/400x400.png?text=User`}
                        />
                      </Avatar>
                      <div>
                        <CardTitle className="text-3xl font-bold">
                          Aadhar no: {searchTerm}
                        </CardTitle>
                        <div className="flex items-center mt-2 space-x-2">
                          <Badge
                            variant="destructive"
                            className="h-7 text-sm font-normal"
                          >
                            Details not Available. Please ask user to register
                            on our portal.
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="rooms" className="w-full">
                      <TabsList className="grid w-full grid-cols-4 mb-4">
                        <TabsTrigger value="rooms">Rooms</TabsTrigger>
                        <TabsTrigger value="history">History</TabsTrigger>
                        <TabsTrigger value="appointments">
                          Appointments
                        </TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                      </TabsList>
                      <ScrollArea className="max-h-[450px] pr-4 pb-2">
                        <TabsContent value="details" className="p-6 px-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoCard
                              icon={User}
                              label="Message"
                              value={
                                "Please ask user to register on our portal to get details."
                              }
                              className="md:col-span-2"
                            />
                          </div>
                        </TabsContent>
                        <TabsContent value="history" className="p-6">
                          <Card>
                            <CardHeader>
                              <CardTitle>Medical History</CardTitle>
                            </CardHeader>
                            <CardContent>
                              {/* <p>{patientData.prevHis}</p> */}
                            </CardContent>
                          </Card>
                        </TabsContent>
                        <TabsContent value="appointments" className="p-6">
                          <div className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Recent Visit</CardTitle>
                              </CardHeader>
                              <CardContent>
                                {/* <p>{patientData.recentVisit}</p> */}
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader>
                                <CardTitle>Upcoming Appointment</CardTitle>
                              </CardHeader>
                              <CardContent>
                                {/* <p>{patientData.upcomingAppointment}</p> */}
                              </CardContent>
                            </Card>
                          </div>
                        </TabsContent>
                        <TabsContent value="rooms" className="p-0">
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Hotel className="mr-2 h-4 w-4" />
                                  Rooms Booked
                                </div>
                                <Badge variant="outline">
                                  {sortedRooms.length} Room(s)
                                </Badge>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Room No</TableHead>
                                    <TableHead>Type</TableHead>
                                    {/* <TableHead>Booked By</TableHead> */}
                                    <TableHead>Booked At</TableHead>
                                    <TableHead>Checkout</TableHead>
                                    <TableHead>Status</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {sortedRooms.map((room: any) => (
                                    <TableRow key={room.id}>
                                      <TableCell className="font-medium">
                                        {room.roomno}
                                      </TableCell>
                                      <TableCell>{room.typeof}</TableCell>
                                      {/* <TableCell>{room.bookedBy}</TableCell> */}
                                      <TableCell>
                                        {new Date(
                                          room.bookedAt
                                        ).toLocaleString()}
                                      </TableCell>
                                      <TableCell>
                                        {room.checkout
                                          ? new Date(
                                              room.checkout
                                            ).toLocaleString()
                                          : "N/A"}
                                      </TableCell>
                                      <TableCell>
                                        <Badge
                                          variant={
                                            room.checkout
                                              ? "secondary"
                                              : "default"
                                          }
                                        >
                                          {room.checkout
                                            ? "Checked Out"
                                            : "Active"}
                                        </Badge>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </ScrollArea>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="bg-muted/50 py-2">
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" /> Generate Report
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
