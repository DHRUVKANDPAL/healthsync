"use client";

import { useEffect, useState } from "react";
import { CalendarClock, Mail, Phone, Stethoscope } from "lucide-react";
import { format, parseISO } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Script from "next/script";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

// Sample time slots
const timeSlots = [
  { start: "2024-11-15T11:00:00.000Z", end: "2024-11-15T12:00:00.000Z" },
  { start: "2024-11-15T13:00:00.000Z", end: "2024-11-15T14:00:00.000Z" },
  { start: "2024-11-15T15:00:00.000Z", end: "2024-11-15T16:00:00.000Z" },
];

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function DoctorBillingPage() {
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState<{
    start: string;
    end: string;
  } | null>(null);

  
  const { id } = useParams();
  const [doctor, setDoctor] = useState<any>(null);
  const [patient, setPatient] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchDoctorAndPatientData = async () => {
      try {
        const [doctorResult, patientResult] = await Promise.allSettled([
          fetch(`/api/billing/doctor`, {
            method: "POST",
            body: JSON.stringify({ id }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => res.json()),

          fetch(`/api/billing/patient`).then((res) => res.json()),
        ]);

        if (doctorResult.status === "fulfilled" && doctorResult.value.success) {
          setDoctor(doctorResult.value.doctorData);
        } else {
          console.error(
            "Error fetching doctor data:",
            (doctorResult as PromiseRejectedResult).reason
          );
        }

        if (
          patientResult.status === "fulfilled" &&
          patientResult.value.success
        ) {
          setPatient(patientResult.value.user);
        } else {
          console.error(
            "Error fetching patient data:",
            (patientResult as PromiseRejectedResult).reason
          );
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchDoctorAndPatientData();
  }, []);

  const handleTimeSlotChange = (value: string) => {
    const [start, end] = value.split(",");
    setTimeSlot({ start, end });
  };

  const formatTimeSlot = (start: string, end: string) => {
    return `${format(parseISO(start), "HH:mm")} - ${format(
      parseISO(end),
      "HH:mm"
    )}`;
  };

  const createOrderId = async () => {
    try {
      const response = await fetch("/api/billing/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: doctor.consultationFee * 100,
          currency: "INR",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.orderId;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  const processPayment = async (e: any) => {
    e.preventDefault();
    try {
      const orderId: string = await createOrderId();
      const options = {
        key: process.env.key_id,
        amount: doctor.consultationFee * 100,
        currency: "INR",
        name: "HealthSync Patient ",
        description: "Thank You! Have a great time using our services.",
        order_id: orderId,
        handler: async function (response: any) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await fetch("/api/billing/verify", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          });
          const res = await result.json();
          if (res.isOk) {
            // alert("payment succeed");
            const result = await fetch("/api/billing/updateTransaction", {
              method: "POST",
              body: JSON.stringify({
                data,
                amount: doctor.consultationFee,
                patientId: patient.id,
                doctorId: doctor.id,
                to: timeSlot?.end,
                from: timeSlot?.start,
                depId: doctor.depId,
              }),
              headers: { "Content-Type": "application/json" },
            });
            toast.success("Payment success");
          } else {
            alert(res.message);
          }
        },
        prefill: {
          name: "data?.firstName",
          email: "data?.emailAddress",
          contact: 1234567890,
        },
        theme: {
          color: "#8b5cf6",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        alert(response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };

  if (doctor == null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-4 md:p-8 flex items-center justify-center">
        <Card className="w-full max-w-3xl shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">
              Doctor Appointment Billing
            </CardTitle>
            <CardDescription>
              Book your appointment and process payment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-primary">
                    Doctor Not Found
                  </h2>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (patient == null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-4 md:p-8 flex items-center justify-center">
        <Card className="w-full max-w-3xl shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">
              Doctor Appointment Billing
            </CardTitle>
            <CardDescription>
              Book your appointment and process payment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-16">
                <div className="text-center space-y-6 pt-4">
                  <h2 className="text-3xl font-semibold font-ubuntu-font text-primary p-4">
                    Seems like you are not logged in!!!
                  </h2>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" onClick={() => router.push("/patient-auth")}>Login</Button>
                    <Button variant="destructive" onClick={() => router.push("/emergency")}>
                      Try Emergency
                    </Button>
                  </div>
                  <div className="text-muted-foreground font-medium text-red-500 pb-4">Note : Patient is required to login to book an appointment. Exception is made while using emergency services. Extra charges may apply on using emergency services.</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8 flex items-center justify-center">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <Card className="w-full max-w-3xl shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="text-center p-6 bg-gray-50">
          <CardTitle className="text-3xl font-extrabold text-primary-600 mb-2">
            Doctor Appointment Billing
          </CardTitle>
          <CardDescription className="text-gray-500">
            Book your appointment and process payment securely
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <img
                src={doctor.image || "/placeholder.svg"}
                alt={doctor.name}
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-200 shadow-md"
              />
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {doctor.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {doctor.allDept?.map((d: any) => d.dept.name).join(", ")}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>{doctor.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span>{doctor.contact}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Stethoscope className="w-5 h-5 text-blue-400" />
                  <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-200">
                    {doctor.department}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Select Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-gray-500"
                      )}
                    >
                      <CalendarClock className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 mt-1">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Select Time Slot
                </label>
                <Select onValueChange={handleTimeSlotChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot, index) => (
                      <SelectItem
                        key={index}
                        value={`${slot.start},${slot.end}`}
                      >
                        {formatTimeSlot(slot.start, slot.end)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {date && timeSlot && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Selected Appointment:
                  </h4>
                  <p className="text-gray-600">
                    {format(date, "MMMM d, yyyy")}
                  </p>
                  <p className="text-gray-600">
                    {formatTimeSlot(timeSlot.start, timeSlot.end)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Start: {timeSlot.start}
                  </p>
                  <p className="text-xs text-gray-500">End: {timeSlot.end}</p>
                </div>
              )}
            </div>
          </div>
          <div className="bg-blue-50 p-5 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Consultation Fee
            </h3>
            <p className="text-3xl font-extrabold text-blue-600">
              &#8377;{doctor.consultationFee.toFixed(2)}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-6 bg-gray-50">
          <Button
            className="w-full text-lg font-semibold rounded-md shadow-md"
            size="lg"
            disabled={!date || !timeSlot}
            onClick={processPayment}
          >
            Pay Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
