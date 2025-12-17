'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  MapPin, 
  Wifi, 
  BarChart3,
  Database
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Locations',
    href: '/dashboard/locations',
    icon: MapPin,
  },
  {
    name: 'Access Points',
    href: '/dashboard/access-points',
    icon: Wifi,
  },
  {
    name: 'Performance',
    href: '/dashboard/performance',
    icon: BarChart3,
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <Database className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-semibold">Wayfi Admin</span>
      </div>
      
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/dashboard' && pathname?.startsWith(item.href))
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      
      <Separator />
      
      <div className="p-4">
        <div className="text-xs text-muted-foreground">
          Wayfi Admin Dashboard
        </div>
      </div>
    </div>
  )
}