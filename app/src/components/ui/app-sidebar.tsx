import * as React from "react";
import { cookies } from "next/headers";
import { getMeAPI } from "@/api/auth"

import {
  Sidebar,
} from "@/components/ui/sidebar";
import { AppSidebarContent } from "./app-sidebar-content";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {

  try {
    const cookieStore = await cookies();
    const data = await getMeAPI(undefined, {
    Cookie: await cookieStore.toString()
  });

    if (!data) throw new Error("User not found");

    return (
      <Sidebar collapsible="icon" {...props}>
        <AppSidebarContent
          data={data || null}
        />
      </Sidebar>
    );
  } catch (error) {
    console.log("error", error);
    // If there's an error, show only non-protected navigation
    return (
      <Sidebar collapsible="icon" {...props}>
        <AppSidebarContent
          data={null}
        />
      </Sidebar>
    );
  }
}
