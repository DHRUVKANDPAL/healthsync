"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { hospitalLogout } from "@/app/(main)/hospital-auth/authhos.actions";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  Building2,
  History,
  LogOut,
  Menu,
  PlusSquare,
  Settings,
  Home,
  Search,
} from "lucide-react";
import Link from "next/link";
import { title } from "process";
import Logo from "@/components/Logo";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState("home");
  const handleLogout = async () => {
    try {
      await hospitalLogout();
      toast.success("Logged out successfully");
      router.push("/hospital-auth");
    } catch (error) {
      toast.error("Error logging out. Try again!");
    }
  };
  const navItems = [
    {
      title: "Home",
      href: `/hospital-dash/${id}`,
      icon: Home,
      section: "home",
    },
    {
      title: "Search Patient",
      href: `/hospital-dash/${id}/rooms/search`,
      icon: Search,
      section: "search",
    },
    {
      title: "Create Rooms",
      href: `/hospital-dash/${id}/rooms`,
      icon: PlusSquare,
      section: "rooms",
    },
    {
      title: "Manage Rooms",
      href: `/hospital-dash/${id}/rooms/manage`,
      icon: Settings,
      section: "manage",
    },
    {
      title: "Room History",
      href: `/hospital-dash/${id}/rooms/bookinghistory`,
      icon: History,
      section: "history",
    },
  ];

  return (
    <div className="flex h-[calc(100vh)]  ">
      <aside className="hidden w-64  shadow-md bg-white dark:bg-slate-800 lg:flex lg:flex-col ">
        {/* <div className="flex items-center justify-center p-6 border-b mx-5 mb-4">
          <Building2 className="h-8 w-8 text-teal-300 dark:text-white" />
          <h1 className="ml-2 text-2xl font-bold  text-white">
            Hospital Dashboard
          </h1>
        </div> */}
        <div className="flex items-center justify-between p-2 pt-6   mx-5 mb-4">
          <Logo className="sm:text-2xl"></Logo>
          <DarkModeToggle></DarkModeToggle>
        </div>
        <p className="border-b border-gray-200 dark:border-gray-700 w-full"></p>
        <ScrollArea className="flex-1 px-3">
          <nav className="flex flex-col space-y-1 pt-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setActiveSection(item.section)}
                className={`flex items-center w-full p-2 rounded-md transition-colors ${
                  activeSection === item.section
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <item.icon size={20} className="mr-3" />
                <span className="ml-3">{item.title}</span>
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="sticky bottom-0 p-4 bg-transparent">
          <Button
            onClick={handleLogout}
            className="flex items-center justify-center pr-4 w-full p-2 rounded-md bg-rose-500 text-teal-50 dark:text-gray-200 hover:bg-rose-600 dark:hover:bg-rose-600 transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </Button>
        </div>
      </aside>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className=" left-4 top-4 lg:hidden h-full"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-64 p-0 bg-gradient-to-b from-blue-50 to-teal-50"
        >
          <SheetHeader className="p-6">
            <SheetTitle className="flex items-center">
              <Building2 className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-xl">Hospital Dashboard</span>
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-1 px-3  ">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-blue-100 hover:text-blue-800"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="ml-3">{item.title}</span>
                </Link>
              ))}
            </nav>
          </ScrollArea>
          <div className="sticky bottom-0 p-4 bg-gradient-to-b from-blue-50 to-teal-50">
            <Button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <main className="flex-1 overflow-x-auto bg-white min-h-screen">
        {children}
      </main>
    </div>
  );
}
