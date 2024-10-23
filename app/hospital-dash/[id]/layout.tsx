"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { hospitalLogout } from "@/app/(main)/hospital-auth/authhos.actions";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";
import DarkModeToggle from "@/components/DarkModeToggle";

const CollapsibleSidebar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const { id } = useParams();
  const [isCollapsed, setIsCollapsed] = useState(false);
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

  const SidebarContent = ({ isMobile = false }) => (
    <>
      <div
        className={cn(
          "p-2",
          isCollapsed && !isMobile
            ? "justify-center"
            : "flex items-center p-2 pt-6 mx-5 mb-4"
        )}
      >
        {(!isCollapsed || isMobile) && <Logo className="" />}
      </div>
      <div
        className={`flex items-center justify-between px-5 ${
          isCollapsed ? "flex-col" : "flex-row"
        }`}
      >
        <DarkModeToggle />
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className=" mb-2"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      <p className="border-b border-gray-200 dark:border-gray-700 w-full" />

      <ScrollArea className="flex-1 px-3">
        <nav className="flex flex-col space-y-1 pt-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setActiveSection(item.section)}
              className={cn(
                "flex items-center justify-center p-2 rounded-md transition-colors group relative",
                activeSection === item.section
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <item.icon size={20} className={cn("min-w-[20px]")} />
              {(!isCollapsed || isMobile) && (
                <span className="ml-3">{item.title}</span>
              )}
              {isCollapsed && !isMobile && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                  {item.title}
                </div>
              )}
            </Link>
          ))}
        </nav>
      </ScrollArea>

      <div className="sticky bottom-0 p-4 bg-transparent">
        <Button
          onClick={handleLogout}
          className={cn(
            "flex items-center justify-center rounded-md bg-rose-500 text-teal-50 dark:text-gray-200 hover:bg-rose-600 dark:hover:bg-rose-600 transition-colors",
            isCollapsed && !isMobile ? "p-2" : "p-2 pr-4 w-full"
          )}
        >
          <LogOut
            size={20}
            className={cn((!isCollapsed || isMobile) && "mr-3")}
          />
          {(!isCollapsed || isMobile) && "Logout"}
        </Button>
      </div>
    </>
  );

  return (
    <>
      <div className="flex h-[calc(100vh)]">
        {/* Desktop Sidebar */}
        <aside
          className={cn(
            "hidden lg:flex flex-col bg-white dark:bg-slate-800 shadow-md transition-all duration-300",
            isCollapsed ? "w-20" : "w-64"
          )}
        >
          <SidebarContent />
        </aside>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="left-4 top-4 lg:hidden h-full"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-64 p-0 bg-white dark:bg-slate-800"
          >
            <SidebarContent isMobile={true} />
          </SheetContent>
        </Sheet>
        <main className="flex-1 overflow-x-auto bg-gray-50 dark:bg-gray-900 min-h-screen">
          <div className="lg:p-8 p-4">{children}</div>
        </main>
      </div>
    </>
  );
};

export default CollapsibleSidebar;
