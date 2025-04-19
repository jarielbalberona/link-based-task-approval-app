"use client";

import * as React from "react";
import Image from "next/image";
import { useSidebar } from "@/components/ui/sidebar";
import { navigation } from "@/config/nav";
import { NavUser } from "@/components/ui/nav-user";
import { ListTodo } from "lucide-react";

import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useProfile } from "@/hooks/react-queries/auth";
import Link from "next/link";
interface AppSidebarContentProps {
  data?: any;
}

const iconMap = {
  ListTodo: ListTodo,
};

const getIconComponent = (iconName: string) => {
  const Icon = iconMap[iconName as keyof typeof iconMap];
  return Icon ? <Icon /> : null;
};

export function AppSidebarContent({ data }: AppSidebarContentProps) {
  const { state } = useSidebar();
  const { data: profile } = useProfile(data);
  return (
    <div className="transition-all duration-300 ease-in-out">
      <SidebarHeader className="transition-all duration-300 ease-in-out">
        <Link href="/tasks">
           {state === "expanded" ? (
          <Image
            src="/images/lbta-app.png"
            alt="Image"
            className="object-cover transition-all duration-300 ease-in-out rounded-md"
            width={300}
            height={50}
          />
        ) : (
          <Image
            src="/images/lbta-app-min.png"
            alt="App Icon"
            className="object-cover transition-all duration-300 ease-in-out rounded-md"
            width={30}
            height={10}
          />
        )}
          </Link>
      </SidebarHeader>
      <SidebarContent className="transition-all duration-300 ease-in-out">
        <SidebarGroup>
          <SidebarMenu>
            {/* TODO: add navigation items */}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="transition-all duration-300 ease-in-out">
        <NavUser initialData={profile || null} />
      </SidebarFooter>
      <SidebarRail />
    </div>
  );
}
