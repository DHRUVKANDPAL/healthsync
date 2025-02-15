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
import { useParams } from "next/navigation";

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

  // Sample doctor data
  // const doctor = {
  //   name: "Dr. Jane Smith",
  //   email: "jane.smith@example.com",
  //   contact: "+1 (555) 123-4567",
  //   department: "Cardiology",
  //   consultationFee: 150,
  //   image: "/placeholder.svg?height=200&width=200",
  // };
  const {id}=useParams();
  const [doctor, setDoctor] = useState<any>(null);
  const [patient, setPatient] = useState<any>(null);
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
          console.error("Error fetching doctor data:", (doctorResult as PromiseRejectedResult).reason);
        }

        if (
          patientResult.status === "fulfilled" &&
          patientResult.value.success
        ) {
          setPatient(patientResult.value.user);
        } else {
          console.error("Error fetching patient data:", (patientResult as PromiseRejectedResult).reason);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }


      
    };

    fetchDoctorAndPatientData();
  }, [])

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
                to:timeSlot?.end,
                from:timeSlot?.start,
                depId:doctor.depId
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

  if(doctor==null){
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

  // if(patient==null){
  //   return <div>Try Emergency</div>;
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-4 md:p-8 flex items-center justify-center">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
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
              <img
                src={doctor.image || "/placeholder.svg"}
                alt={doctor.name}
                className="w-32 h-32 rounded-full mx-auto border-4 border-primary shadow-md"
              />
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-primary">
                  {doctor.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {doctor.department}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>{doctor.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{doctor.contact}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Stethoscope className="w-4 h-4 text-primary" />
                  <span>{doctor.department}</span>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Select Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarClock className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
                <div className="mt-4 p-3 bg-primary/10 rounded-md">
                  <h4 className="font-semibold mb-2">Selected Appointment:</h4>
                  <p>{format(date, "MMMM d, yyyy")}</p>
                  <p>{formatTimeSlot(timeSlot.start, timeSlot.end)}</p>
                  <p className="text-xs text-muted-foreground">
                    Start: {timeSlot.start}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    End: {timeSlot.end}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="bg-primary/10 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Consultation Fee</h3>
            <p className="text-3xl font-bold text-primary">
              &#8377;{doctor.consultationFee.toFixed(2)}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full text-lg"
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
