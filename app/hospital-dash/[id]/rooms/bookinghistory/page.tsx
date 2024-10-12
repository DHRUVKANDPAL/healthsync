"use client";
import { hospitalLogout } from "@/app/(main)/hospital-auth/authhos.actions";
import { Button } from "@/components/ui/button";
import { pusherClient } from "@/lib/pusher";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Input } from "@/components/ui/input";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterIcon } from "lucide-react";
import DatePickerWithRangePresets from "@/components/Rangefilter";
import { DateRange } from "react-day-picker";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const ManageRooms = () => {
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const router = useRouter();
  const { id } = useParams();
  const [userData, setUserData] = useState<any>(null);
  const [roomno, setRoomno] = useState<Checked>(true);
  const [bookedBy, setBookedBy] = useState<Checked>(false);
  const [bookedAt, setBookedAt] = useState<Checked>(false);
  const [aadhar, setAadhar] = useState<Checked>(false);
  const [roomid, setRoomid] = useState<Checked>(false);
  const [checkout, setCheckout] = useState<Checked>(false);
  const [type, setType] = useState<Checked>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [pdata, setpdata] = useState<any>(null);
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(`/api/hospital/${id}`);
        const data = await res.json();
        if (!data.success) {
          router.push("/hospital-auth");
        } else {
          setUserExists(true);
          setUserData(data.user);
          setFilteredData(data.user.roomHistory);
        }
      } catch (error) {
        toast.error("Error checking Hospital.");
        router.push("/hospital-auth");
      }
    };
    checkUser();
  }, [id, router]);

  useEffect(() => {
    pusherClient.subscribe("rooms");
    pusherClient.bind("room-history", (data: { message: any }) => {
      setUserData(data.message);
      if (data.message && data.message.roomHistory) {
        setFilteredData(data.message.roomHistory);
      }
    });
    return () => pusherClient.unsubscribe("rooms");
  }, []);

  const handleLogout = async () => {
    try {
      await hospitalLogout();
      toast.success("Logged out successfully");
      router.push("/hospital-auth");
    } catch (error) {
      toast.error("Error logging out. Try again!");
    }
  };

  const formatDate = (date: Date) => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    return formatter.format(date);
  };

  const filterData = () => {
    if (!userData || !userData.roomHistory) return [];

    const searchLower = searchTerm.toLowerCase();

    const filtered = userData.roomHistory.filter((item: any) => {
      let match = false;

      if (roomno && item.roomno.toLowerCase().includes(searchLower)) {
        match = true;
      }

      if (
        bookedBy &&
        item.bookedBy &&
        item.bookedBy.toLowerCase().includes(searchLower)
      ) {
        match = true;
      }

      if (bookedAt && item.bookedAt) {
        const formattedDate = formatDate(new Date(item.bookedAt));
        if (formattedDate.toLowerCase().includes(searchLower)) {
          match = true;
        }
      }

      if (checkout && item.checkout) {
        const formattedCheckout = formatDate(new Date(item.checkout));
        if (formattedCheckout.toLowerCase().includes(searchLower)) {
          match = true;
        }
      }
      if (
        type &&
        item.typeof &&
        item.typeof.toLowerCase().includes(searchLower)
      ) {
        match = true;
      }
      if (
        roomid &&
        item.roomId &&
        item.roomId.toLowerCase().includes(searchLower)
      ) {
        match = true;
      }
      if (
        aadhar &&
        item.aadhar &&
        item.aadhar.toLowerCase().includes(searchLower)
      ) {
        match = true;
      }
      const bookedDate = new Date(item.bookedAt);
      const checkoutDate = item.checkout ? new Date(item.checkout) : null;
      let fromDate: Date | null = null;
      let toDate: Date | null = null;

      if (dateRange?.from) {
        fromDate = new Date(dateRange.from);
        fromDate.setHours(0, 0, 0, 0);
      }

      if (dateRange?.to) {
        toDate = new Date(dateRange.to);
        toDate.setHours(23, 59, 59, 999);
      }
      const withinDateRange =
        !fromDate ||
        !toDate ||
        (bookedDate >= fromDate && bookedDate <= toDate) ||
        (checkoutDate && checkoutDate >= fromDate && checkoutDate <= toDate);

      return match && withinDateRange;
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData();
  }, [
    searchTerm,
    roomno,
    bookedBy,
    bookedAt,
    checkout,
    type,
    roomid,
    aadhar,
    dateRange,
  ]);

  const sortedData = filteredData.sort(
    (a: any, b: any) =>
      new Date(b.bookedAt).getTime() - new Date(a.bookedAt).getTime()
  );
  if (userExists === null || !filteredData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <div className=" px-10 space-x-10 pt-10">
        {/* <Button onClick={handleLogout}>Logout</Button> */}
        <h1 className="text-5xl font-extrabold underline ">Manage Rooms</h1>
      </div>

      <div className="container mx-auto py-10  rounded-lg dark:bg-slate-900">
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <DatePickerWithRangePresets
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default">
                <span className="px-2">Filter by</span>
                <FilterIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80">
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="grid grid-cols-2 ">
                <DropdownMenuCheckboxItem
                  checked={roomno}
                  onCheckedChange={() => setRoomno((prev) => !prev)}
                >
                  Room no
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={bookedBy}
                  onCheckedChange={() => setBookedBy((prev) => !prev)}
                >
                  Booked By
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={bookedAt}
                  onCheckedChange={() => setBookedAt((prev) => !prev)}
                >
                  Booked At
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={aadhar}
                  onCheckedChange={() => setAadhar((prev) => !prev)}
                >
                  Aadhar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={roomid}
                  onCheckedChange={() => setRoomid((prev) => !prev)}
                >
                  Room ID
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={checkout}
                  onCheckedChange={() => setCheckout((prev) => !prev)}
                >
                  Checkout
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={type}
                  onCheckedChange={() => setType((prev) => !prev)}
                >
                  Type of Room
                </DropdownMenuCheckboxItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DataTable columns={columns} data={sortedData} />
      </div>
    </div>
  );
};

export default ManageRooms;
