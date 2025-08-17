"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { 
  Home, 
  Target, 
  Flag, 
  BarChart3, 
  User, 
  Menu,
  Settings,
  Trophy,
  Plus
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
    description: "Vista general de tu progreso"
  },
  {
    title: "Hábitos",
    href: "/habits",
    icon: Target,
    description: "Gestiona tus hábitos diarios"
  },
  {
    title: "Metas",
    href: "/goals",
    icon: Flag,
    description: "Define y sigue tus objetivos"
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    description: "Analiza tu rendimiento"
  },
  {
    title: "Perfil",
    href: "/profile",
    icon: User,
    description: "Logros y estadísticas"
  }
]

export function Navigation({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav className={cn("space-y-2", className)}>
      {navigationItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        
        return (
          <Link key={item.href} href={item.href}>
            <Button
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-12",
                isActive && "bg-primary text-primary-foreground shadow-sm"
              )}
            >
              <Icon className="w-5 h-5" />
              <div className="flex-1 text-left">
                <div className="font-medium">{item.title}</div>
                <div className="text-xs opacity-70 hidden lg:block">
                  {item.description}
                </div>
              </div>
            </Button>
          </Link>
        )
      })}
    </nav>
  )
}

export function MobileNavigation() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <div className="py-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold">Personal Tracker</h2>
              <p className="text-sm text-muted-foreground">Tu sistema de seguimiento</p>
            </div>
          </div>
          
          <Navigation />
          
          <div className="mt-8 pt-8 border-t">
            <Link href="/habits">
              <Button className="w-full gap-2" onClick={() => setOpen(false)}>
                <Plus className="w-4 h-4" />
                Nuevo Hábito
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}