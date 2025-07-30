"use client";
import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/ui/sidebar";
import { routeConfig } from "@/navigation/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";

const data = {
  user: {
    name: "admin",
    email: "admin@example.com",
    avatar: "",
  },
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: routeConfig["admin"] || [], // Default to admin if no role is specified
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const ROLE:string=useSelector((state: any) => state?.data?.userdata?.user?.role);
    console.log(data.navMain, "NAVMAIN");
    
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1"
            >
              <span>
                <Image src="/images/Saviour-Logo.png" alt="" width={200} height={100} />
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
