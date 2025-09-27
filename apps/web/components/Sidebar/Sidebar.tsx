"use client"

import {
  Sidebar as SidebarBase,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "components/ui/sidebar"
import {
  Avatar,
  AvatarFallback,
  // AvatarImage,
} from "components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"

import {
  ChevronsUpDown,
  LogOut,
  Settings,
} from 'lucide-react'

import { LAYOUT_OPTIONS } from "const"
import Link from "next/link"

export function Sidebar() {
  const { isMobile } = useSidebar()

  return (
    <SidebarBase collapsible="icon">
      <SidebarHeader>
        <div className="flex">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
            {/* <activeTeam.logo className="size-4" /> */}
          </div>
          {/* <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">OMS</span>
            <span className="truncate text-xs">{activeTeam.plan}</span>
          </div> */}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {LAYOUT_OPTIONS.map((item, index) => (
          <SidebarGroup key={index}>
            {item.label && (
              <SidebarGroupLabel>
                {item.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              {item.menu.map((m) => (
                <SidebarMenu key={m.id}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href={m.url}>
                        <m.icon />
                        <span>{m.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    {/* <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span> */}
                    test
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      {/* <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span> */}
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuGroup>
                  <Link href="/setting">
                    <DropdownMenuItem>
                      <Settings />
                      Setting
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarBase>
  )
}