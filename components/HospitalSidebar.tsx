"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Building2,
  Frame,
  Home,
  LifeBuoy,
  Map,
  History,
  PieChart,
  PlusSquare,
  Search,
  Send,
  Settings,
  Settings2,
  SquareTerminal,
  Stethoscope,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function HospitalSidebar({ ...props }: any) {
  const { id } = props;
  const { handleLogout } = props;
  const navItems = [
    {
      title: "Home",
      href: `/hospital-dash/${id}`,
      icon: Home,
      section: "home",
    },
    {
      title: "Departments",
      href: `/hospital-dash/${id}/departments`,
      icon: Stethoscope,
      section: "departments",
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

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },

    navMain: [
      {
        title: "Home",
        url: `/hospital-dash/${id}`,
        icon: Home,
        isActive: true,
      },
      {
        title: "Departments",
        url: `/hospital-dash/${id}/departments`,
        icon: Stethoscope,
      },
      {
        title: "Search",
        url: `/hospital-dash/${id}/rooms/search`,
        icon: Search,
        items: [
          {
            title: "Search Patient",
            url: `/hospital-dash/${id}/rooms/search`,
          },
          {
            title: "Search Doctors",
            url: "#",
          },
        ],
      },
      {
        title: "Create Rooms",
        url: `/hospital-dash/${id}/rooms`,
        icon: PlusSquare,
      },
      {
        title: "Manage Rooms",
        url: `/hospital-dash/${id}/rooms/manage`,
        icon: Settings2,
      },
      {
        title: "Room History",
        url: `/hospital-dash/${id}/rooms/bookinghistory`,
        icon: History,
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ],
  };

  return (
    <Sidebar
      variant="inset"
      {...props}
      collapsible="icon"
      className="dark:bg-slate-950"
    >
      <SidebarHeader className="dark:bg-slate-950">
        <SidebarMenu className="dark:bg-slate-950">
          <SidebarMenuItem className="dark:bg-slate-950">
            <SidebarMenuButton
              size="lg"
              asChild
              className="dark:hover:bg-slate-800"
            >
              <Link href="../">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-slate-700 text-teal-50">
                  <Building2 className="size-6" />
                </div>
                <div className="grid flex-1 text-left text-2xl leading-tight">
                  <span className="truncate font-semibold text-teal-500">
                    Health
                    <span className="text-teal-700 font-extrabold">Sync</span>
                  </span>
                  {/* <span className="truncate text-xs">Enterprise</span> */}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="dark:bg-slate-950">
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="dark:bg-slate-950">
        <NavUser user={data.user} handlelogout={handleLogout} />
      </SidebarFooter>
    </Sidebar>
  );
}
