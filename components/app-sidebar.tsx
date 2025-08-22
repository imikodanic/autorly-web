"use client";

import { Home, Calendar, BarChart3, User, LogOut } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const menuItems = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    // {
    //     title: "Posts",
    //     url: "/dashboard/posts",
    //     icon: FileText,
    // },
    {
        title: "Schedule",
        url: "/dashboard/schedule",
        icon: Calendar,
    },
    {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: BarChart3,
        badge: "Coming Soon",
    },
];

export function AppSidebar() {
    const router = useRouter();

    return (
        <Sidebar>
            <SidebarHeader className="border-b border-sidebar-border">
                <div className="flex items-center gap-3 px-2 py-2">
                    <Image
                        src="/logo-light.svg"
                        alt="Autorly Logo"
                        width={32}
                        height={32}
                        className="w-30 h-auto"
                    />
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild={!item.badge}
                                        disabled={!!item.badge}
                                    >
                                        {item.badge ? (
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center gap-2">
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </div>
                                                <Badge
                                                    variant="secondary"
                                                    className="text-xs bg-orange-100 text-orange-700 hover:bg-orange-100"
                                                >
                                                    {item.badge}
                                                </Badge>
                                            </div>
                                        ) : (
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        )}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* <SidebarSeparator /> */}

                {/* <SidebarGroup>
                    <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {quickActions.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup> */}
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <User />
                            <Link href="/dashboard/profile" className="w-full">
                                Profile
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    {/* <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Settings />
                            <Link href="/dashboard/settings" className="w-full">
                                Settings
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem> */}
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() => {
                                const supabase = createClient();
                                void supabase.auth.signOut();
                                router.push("/login");
                            }}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                            <LogOut />
                            <span>Log Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
