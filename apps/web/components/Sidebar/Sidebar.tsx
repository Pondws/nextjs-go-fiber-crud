"use client"

import { useState } from 'react'
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "components/ui/collapsible"

import {
  ChevronRight,
  ChevronsUpDown,
  LogOut,
  Settings,
} from 'lucide-react'

import { LAYOUT_OPTIONS } from "consts"
import Link from "next/link"
import { useSelectedLayoutSegment } from 'next/navigation'
import { useAuth } from 'hooks'

export function Sidebar() {
  const { isMobile } = useSidebar()
  const { logout } = useAuth()
  const segment = useSelectedLayoutSegment()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const toggleMenu = (menuId: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId]
    }))
  }

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
              <SidebarMenu>
                {item.menus.map((menu) => {
                  const isParentActive = menu.id === segment || menu.items?.some((m) => m.id === segment);
                  const isOpen = openMenus[menu.id] ?? isParentActive

                  return (
                    <Collapsible
                      key={menu.id}
                      asChild
                      className="group/collapsible"
                      open={isOpen}
                      onOpenChange={() => toggleMenu(menu.id)}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          {menu.items?.length ? (
                            <SidebarMenuButton
                              tooltip={menu.title}
                              isActive={isParentActive}
                            >
                              {menu.icon && <menu.icon strokeWidth={isParentActive ? 2.5 : 2} />}
                              <span>{menu.title}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          ) : (
                            <SidebarMenuButton
                              asChild
                              tooltip={menu.title}
                              isActive={isParentActive}
                            >
                              <Link href={menu.url || '/'}>
                                {menu.icon && <menu.icon strokeWidth={isParentActive ? 2.5 : 2} />}
                                <span>{menu.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          )}
                        </CollapsibleTrigger>

                        {menu.items?.length ? (
                          <CollapsibleContent>
                            {menu.items.map((item) => {
                              const isActive = item.id === segment
                              return (
                                <SidebarMenuSub
                                  key={item.id}
                                  className={`relative ${isActive ? 'border-l border-primary' : ''
                                    }`}
                                >
                                  <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                      asChild
                                      isActive={isActive}
                                      className={isActive ? 'font-medium' : ''}
                                    >
                                      <Link href={item.url}>
                                        <item.icon strokeWidth={isActive ? 2.5 : 2} />
                                        <span>{item.title}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                </SidebarMenuSub>
                              )
                            })}
                          </CollapsibleContent>
                        ) : null}
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                })}
              </SidebarMenu>
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
                sideOffset={!isMobile ? 16 : 4}
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
                <DropdownMenuItem
                  onClick={() => logout()}
                >
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