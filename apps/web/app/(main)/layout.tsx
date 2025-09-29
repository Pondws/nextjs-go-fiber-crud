import {
  SidebarProvider,
  SidebarInset
} from 'components/ui'

import {
  Sidebar
} from "components"
import { Header } from "components"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}