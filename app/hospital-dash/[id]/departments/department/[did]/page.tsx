"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formSchema = z.object({
  licenceNo: z.string().min(1, "Licence Number is required"),
});

export default function DoctorDetails() {
  const { id, did } = useParams(); // Extract hospital and doctor IDs from URL
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [doctors, setDoctors] = useState<any>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licenceNo: "",
    },
  });

  // Fetch doctors when the component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`/api/doctodept/${did}`);
        const data = await res.json();
        if (data.success) {
          setDoctors(data.doctor || []);
        } else {
          toast.error("Failed to fetch doctors.");
        }
      } catch (error) {
        toast.error("Error fetching doctors.");
      }
    };

    fetchDoctors();
  }, []);

  // Handle adding a new doctor
  async function handleAddDoctor(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/doctodept/${did}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const data = await res.json();
        if (data.success) {
          setDoctors(data.doctor || []);
          toast.success("Doctor added successfully.");
          setIsDialogOpen(false);
          form.reset();
        } else {
          toast.error("Unable to add doctor.");
        }
      } catch (error) {
        toast.error("Error adding doctor.");
      }
    });
  }
  console.log(doctors);
  // Filter doctors based on the search term
  const filteredDoctors = doctors?.filter((doctor: any) =>
    doctor.doctor?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );
  console.log(filteredDoctors);
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-teal-700">Doctor Details</h1>
      <p className="mt-2 text-gray-700">
        Showing details for Doctor <span className="font-semibold">{did}</span>{" "}
        in hospital <span className="font-semibold">{id}</span>.
      </p>

      <div className="flex gap-4 my-6">
        <Button
          className="bg-teal-600 text-white px-6 py-2 rounded-lg shadow-md"
          onClick={() => setIsDialogOpen(true)}
        >
          Add Doctor
        </Button>
        <input
          type="text"
          placeholder="Search doctors..."
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Doctor</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAddDoctor)}
              className="space-y-4"
            >
              <FormField
                name="licenceNo"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Licence Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Licence Number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md"
                >
                  Add
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800">Doctors List</h2>
        <div className="mt-4 space-y-4">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor: any) => (
              <div
                key={doctor.id}
                className="p-4 border border-gray-200 rounded-lg shadow-sm flex items-center space-x-4"
              >
                <Avatar className="w-24 h-24 rounded-lg border-4 border-teal-100 dark:border-slate-700">
                  <AvatarImage
                    src={doctor.doctor.imageUrl || "/placeholder-avatar.png"}
                    alt={doctor.doctor.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-lg bg-gradient-to-br from-teal-500 to-blue-500 text-white">
                    {doctor.doctor.name
                      .split(" ")
                      .map((n: any) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    {doctor.doctor.name}
                  </h3>
                  <p className="text-gray-600">
                    Licence No: {doctor.doctor.licenceNo}
                  </p>
                  <p className="text-gray-600">
                    Contact: {doctor.doctor.contactno}
                  </p>
                  <p className="text-gray-600">Email: {doctor.doctor.email}</p>
                  <p
                    className={`text-sm font-semibold ${
                      doctor.isAvailable ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {doctor.isAvailable ? "Available" : "Unavailable"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No doctors found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
