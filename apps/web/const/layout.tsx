import { Inbox, LayoutGrid } from "lucide-react"

export const LAYOUT_OPTIONS = [
  {
    label: '',
    menu: [
      {
        id: "dashboard",
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutGrid,
        items: []
      },
      {
        id: "post",
        title: "Post",
        url: "/post",
        icon: Inbox,
      }, 
    ]
  }
]