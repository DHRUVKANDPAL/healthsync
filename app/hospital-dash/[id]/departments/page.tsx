"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DepartmentCard from "@/components/DepartmentCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useParams } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, "Department name is required"),
  hod: z.string().min(1, "HOD name is required"),
  noOfDoctors: z.string().min(1, "Number of doctors is required"),
  doctorsAvailable: z.string().min(1, "Available doctors count is required"),
});

type Department = z.infer<typeof formSchema> & { did: string };

const departmentsData: Department[] = [
  {
    did: "cardiology",
    name: "Cardiology",
    hod: "Dr. Sharma",
    noOfDoctors: "10",
    doctorsAvailable: "7",
  },
  {
    did: "neurology",
    name: "Neurology",
    hod: "Dr. Verma",
    noOfDoctors: "8",
    doctorsAvailable: "5",
  },
  {
    did: "orthopedics",
    name: "Orthopedics",
    hod: "Dr. Gupta",
    noOfDoctors: "12",
    doctorsAvailable: "9",
  },
];

// function DepartmentCard({ dept }: { dept: Department }) {
//   return (
//     <Card className="shadow-lg rounded-xl p-6 border border-gray-300 hover:shadow-2xl transition-all bg-white">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-gray-900">
//           {dept.name}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="text-gray-700 space-y-2">
//         <p>
//           <strong>HOD:</strong> {dept.hod}
//         </p>
//         <p>
//           <strong>No. of Doctors:</strong> {dept.noOfDoctors}
//         </p>
//         <p>
//           <strong>Doctors Available:</strong> {dept.doctorsAvailable}
//         </p>
//       </CardContent>
//     </Card>
//   );
// }

export default function Departments() {
  const [search, setSearch] = useState("");
  const [departments, setDepartments] = useState(departmentsData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { id } = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      hod: "",
      noOfDoctors: "",
      doctorsAvailable: "",
    },
  });

  const handleAddDepartment = (values: z.infer<typeof formSchema>) => {
    setDepartments([
      ...departments,
      { did: (departments.length + 1).toString(), ...values },
    ]);
    setIsDialogOpen(false);
    form.reset();
  };

  const filteredDepartments = departments
    .filter((dept) => dept.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6">
        <Button
          className="bg-teal-600 text-white px-6 py-2 rounded-lg shadow-md"
          onClick={() => setIsDialogOpen(true)}
        >
          Add Department
        </Button>
        <Input
          placeholder="Search departments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-full shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((dept) => (
          <DepartmentCard key={dept.did} dept={dept} id={id} />
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Department</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAddDepartment)}
              className="space-y-4"
            >
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter department name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="hod"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HOD</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter HOD name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="noOfDoctors"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. of Doctors</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter number of doctors" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="doctorsAvailable"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doctors Available</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter available doctors count"
                      />
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
    </div>
  );
}
