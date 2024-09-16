"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  BookUser,
  Copy,
  DoorOpen,
  Edit,
  Loader2,
  LockOpen,
  MoreHorizontal,
  Trash2,
  TriangleAlert,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import { Label } from "@/components/ui/label";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export type BedRooms = {
  id: string;
  roomno: string;
  isAvailabel: boolean;
  typeof: string;
  aadhar: string;
  bookedby: string;
  updatedAt: Date;
};
const formSchema = z.object({
  id: z.string(),
  roomno: z.string(),
  typeof: z.string(),
  isavailabel: z.boolean().default(false).optional(),
  bookedby: z.string().optional(),
  aadhar: z.union([z.string().length(12), z.literal("null")]).optional(),
});
export const columns: ColumnDef<BedRooms>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "roomId",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Room id
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: "roomno",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Room no
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const roomno = String(row.getValue("roomno"));
      
      const statusClass ="bg-blue-100 text-blue-700"
      return (
        <div
          className={`flex items-center gap-2 ${statusClass} px-4  py-1 rounded-full font-semibold`}
        >
          <BookUser className="h-5 w-5"></BookUser>
          {roomno}
        </div>
      );
    },
  },
  {
    accessorKey: "typeof",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type of Room
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  
  {
    accessorKey: "isAvailabel",
  },

  {
    accessorKey: "bookedBy",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Booked by
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = String(row.getValue("bookedBy"));
      if (amount === "Unbooked") {
        return (
          <div className="flex  gap-2 font-semibold items-center  text-blue-600 bg-blue-100 px-4  py-1 rounded-full drop-shadow-sm">
            <LockOpen className="h-5 w-5"></LockOpen>
            Unbooked
          </div>
        );
      }
      return (
        <div className=" font-medium  flex gap-1 items-center drop-shadow-sm">
          <User></User>
          {amount}
        </div>
      );
    },
  },
  {
    accessorKey: "aadhar",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Patient Aadhar no
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = String(row.getValue("aadhar"));
      const isAvailable = String(row.getValue("isAvailabel"));
      if (isAvailable === "true" || amount === "null") {
        return (
          <div className="flex  gap-2 font-semibold items-center  text-yellow-600 bg-yellow-100 px-4  py-1 rounded-full drop-shadow-sm">
            <TriangleAlert className="h-5 w-5"></TriangleAlert>
            Data Unavailable
          </div>
        );
      }
      return (
        <div className=" font-medium  flex gap-1 items-center drop-shadow-sm">
          {amount}
        </div>
      );
    },
  },
  {
    accessorKey: "bookedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Booking Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("bookedAt"));
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }).format(date);
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "checkout",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Checkout Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const checkoutValue = row.getValue("checkout");

      // Explicitly check for null, undefined, or empty string values
      if (!checkoutValue) {
        // If the checkout value is null, undefined, or an empty string, render this block
        return (
          <div className="flex gap-2 font-semibold items-center text-yellow-600 bg-yellow-100 px-4 py-1 rounded-full drop-shadow-sm">
            <TriangleAlert className="h-5 w-5" />
            Yet to checkout
          </div>
        );
      }

      const date = new Date(row.getValue("checkout"));

      // Now check if the date is invalid (i.e., not a valid date)
      if (isNaN(date.getTime())) {
        // Handle invalid dates (just in case checkoutValue is something that can’t be parsed as a date)
        return (
          <div className="flex gap-2 font-semibold items-center text-yellow-600 bg-yellow-100 px-4 py-1 rounded-full drop-shadow-sm">
            <TriangleAlert className="h-5 w-5" />
            Yet to checkout
          </div>
        );
      }

      // If the date is valid, format and display the date
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }).format(date);

      return <span>{formattedDate}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const BedRooms = row.original;
      const router = useRouter();
      const [isPending, startTransition] = useTransition();

      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          id: BedRooms.id,
          roomno: BedRooms.roomno,
          typeof: BedRooms.typeof,
          isavailabel: BedRooms.isAvailabel,
          bookedby: BedRooms.bookedby,
          aadhar: BedRooms.aadhar || "null",
        },
      });

      const { watch, reset } = form;
      const watchAvailable = watch("isavailabel");

      // Update form values when row.original changes
      useEffect(() => {
        reset({
          id: BedRooms.id,
          roomno: BedRooms.roomno,
          typeof: BedRooms.typeof,
          isavailabel: BedRooms.isAvailabel,
          bookedby: BedRooms.bookedby,
          aadhar: BedRooms.aadhar || "",
        });
      }, [BedRooms, reset]);

      async function onSubmit(values: z.infer<typeof formSchema>) {
        if (watchAvailable) values.bookedby = "Unbooked";
        startTransition(async () => {
          const roomId = BedRooms.id;
          console.log(values);
          const res = await fetch(`/api/editroom/${id}`, {
            method: "POST",
            body: JSON.stringify({ values, roomId }),
          });
          const data = await res.json();
          console.log(data);
          if (data.success) {
            toast.success("Room edited successfully");
            setIsEditDialogOpen(false);
          } else {
            toast.error("Unable to edit room");
            router.push(`/hospital-dash/${id}/rooms/manage`);
          }
        });
      }

      const params = useParams();
      const { id } = params;
      // const watchAvailable = form.watch("isavailabel");
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      // const [roomno,setRoomNo]=useState(BedRooms.roomno)

      if (isEditDialogOpen) {
        return (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Room</DialogTitle>
                <DialogDescription>
                  Make changes to your Room here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="roomno"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room no</FormLabel>
                        <FormControl>
                          <Input placeholder="A-101" {...field} />
                        </FormControl>
                        <FormDescription className="opacity-70">
                          This is your public display room name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="typeof"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type of Room</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified type to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ICU">ICU</SelectItem>
                            <SelectItem value="General Ward">
                              General Ward
                            </SelectItem>
                            <SelectItem value="Single Room">
                              Single Room
                            </SelectItem>
                            <SelectItem value="Shared Room">
                              Shared Room
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isavailabel"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="h-5 w-5"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Is the room currently Available ?
                          </FormLabel>
                          <FormDescription>
                            You can manage your room status while creating it.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  {
                    <FormField
                      disabled={watchAvailable}
                      control={form.control}
                      name="bookedby"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Booked by</FormLabel>
                          <FormControl>
                            {!watchAvailable ? (
                              <Input placeholder="Ravi Prasad" {...field} />
                            ) : (
                              <Input
                                placeholder="Ravi Prasad"
                                {...field}
                                value="Unbooked"
                              />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  }
                  {
                    <FormField
                      disabled={watchAvailable}
                      control={form.control}
                      name="aadhar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Patient Aadhar no</FormLabel>
                          <FormControl>
                            {!watchAvailable ? (
                              <Input placeholder="Aadhar no" {...field} />
                            ) : (
                              <Input
                                placeholder="Aadhar no"
                                {...field}
                                value="null"
                              />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  }
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending && (
                      <Loader2 className="animate-spin px-1"></Loader2>
                    )}
                    Submit
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        );
      }
      if (isDeleteDialogOpen) {
        return (
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete Room</DialogTitle>
                <DialogDescription>
                  You are about to delete Room no {BedRooms.roomno}. Are you
                  Sure ?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="flex gap-1.5">
                <Button
                  type="submit"
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(BedRooms.id)}
            >
              <Copy className="h-7 w-7 pr-2"></Copy>Copy BedRooms ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
              <Edit className="h-7 w-7 pr-2"></Edit>Edit Room
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash2 className="h-7 w-7 pr-2"></Trash2>Delete Room
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
