'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start"
        disabled
      >
        <Sun className="h-4 w-4 mr-2" />
        <span>Theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "w-full justify-start",
        "hover:bg-accent hover:text-accent-foreground"
      )}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <>
          <Sun className="h-4 w-4 mr-2" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 mr-2" />
          <span>Dark Mode</span>
        </>
      )}
    </Button>
  )
}
