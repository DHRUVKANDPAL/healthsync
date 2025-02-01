"use client";

import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "Department name is required"),
  hod: z.string().min(1, "HOD name is required"),
});

type Department = z.infer<typeof formSchema> & { did: string };

export default function Departments() {
  const [search, setSearch] = useState("");
  const [departments, setDepartments] = useState<Department[] | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { id } = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      hod: "",
    },
  });

  // Fetch departments on mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch(`/api/dept/?id=${id}`);
        const data = await res.json();
        if (data.success) {
          setDepartments(data.getDept);
        } else {
          toast.error("Failed to fetch departments.");
        }
      } catch (error) {
        toast.error("Error fetching departments.");
      }
    };
    fetchDepartments();
  }, []);

  // Handle adding a new department
  async function handleAddDepartment(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const res = await fetch("/api/dept", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ values, id }),
        });
        const data = await res.json();
        if (data.success) {
          setDepartments(data.getDept);
          toast.success("Department added successfully.");
          setIsDialogOpen(false);
          form.reset();
        } else {
          toast.error("Unable to add department.");
        }
      } catch (error) {
        toast.error("Error adding department.");
      }
    });
  }

  const filteredDepartments = departments
    ?.filter((dept) => dept.name.toLowerCase().includes(search.toLowerCase()))
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
        {filteredDepartments?.length ? (
          filteredDepartments.map((dept: any) => (
            <DepartmentCard key={dept.did} dept={dept} id={id} />
          ))
        ) : (
          <div className="text-center col-span-full text-gray-600">
            No departments found. Add a new department.
          </div>
        )}
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
