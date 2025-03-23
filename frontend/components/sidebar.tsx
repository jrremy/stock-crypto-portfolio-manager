"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BarChart2,
  PieChart,
  LineChart,
  Newspaper,
  DollarSign,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function Sidebar({ activeTab: propActiveTab, onTabChange }: SidebarProps) {
  const pathname = usePathname()

  // Determine active tab based on pathname
  const getActiveTabFromPathname = (path: string | null) => {
    if (!path) return "dashboard"
    if (path.includes("/dashboard")) return "dashboard"
    if (path.includes("/transactions")) return "transactions"
    if (path.includes("/statistics/composition")) return "composition"
    if (path.includes("/statistics/performance")) return "performance"
    if (path.includes("/events")) return "events"
    return "dashboard"
  }

  const [activeTab, setActiveTab] = useState(propActiveTab || getActiveTabFromPathname(pathname))
  const [isStatsOpen, setIsStatsOpen] = useState(
    activeTab === "composition" || activeTab === "performance" || pathname?.includes("/statistics"),
  )

  // Update active tab when pathname changes
  useEffect(() => {
    const newActiveTab = getActiveTabFromPathname(pathname)
    setActiveTab(newActiveTab)
    if (onTabChange) {
      onTabChange(newActiveTab)
    }
  }, [pathname, onTabChange])

  // Update stats open state when active tab changes
  useEffect(() => {
    if (activeTab === "composition" || activeTab === "performance") {
      setIsStatsOpen(true)
    }
  }, [activeTab])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (onTabChange) {
      onTabChange(tab)
    }
  }

  return (
    <div className="w-64 bg-muted/20 h-full flex flex-col">
      <div className="flex flex-col gap-2 p-4 flex-1">
        <SidebarItem
          icon={<LayoutDashboard className="h-5 w-5" />}
          label="Dashboard"
          isActive={activeTab === "dashboard"}
          onClick={() => handleTabChange("dashboard")}
          href="/dashboard"
        />

        <SidebarItem
          icon={<DollarSign className="h-5 w-5" />}
          label="Transactions"
          isActive={activeTab === "transactions"}
          onClick={() => handleTabChange("transactions")}
          href="/transactions"
        />

        {/* Statistics dropdown button */}
        <div className="space-y-1">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2 px-3 py-2 text-left font-normal",
              (activeTab === "composition" || activeTab === "performance") && "bg-accent text-accent-foreground",
            )}
            onClick={() => setIsStatsOpen(!isStatsOpen)}
          >
            <BarChart2 className="h-5 w-5" />
            <span>Statistics</span>
            {isStatsOpen ? <ChevronDown className="ml-auto h-4 w-4" /> : <ChevronRight className="ml-auto h-4 w-4" />}
          </Button>

          {/* Sub-items that show/hide based on isStatsOpen state */}
          <div className={cn("pl-10 space-y-1", isStatsOpen ? "block" : "hidden")}>
            <SidebarSubItem
              icon={<PieChart className="h-4 w-4" />}
              label="Composition"
              isActive={activeTab === "composition"}
              onClick={() => handleTabChange("composition")}
              href="/statistics/composition"
            />
            <SidebarSubItem
              icon={<LineChart className="h-4 w-4" />}
              label="Performance"
              isActive={activeTab === "performance"}
              onClick={() => handleTabChange("performance")}
              href="/statistics/performance"
            />
          </div>
        </div>

        <SidebarItem
          icon={<Newspaper className="h-5 w-5" />}
          label="Events"
          isActive={activeTab === "events"}
          onClick={() => handleTabChange("events")}
          href="/events"
        />
      </div>

      <div className="p-4">
        <div className="text-xs text-muted-foreground">Portfolio Manager v1.0</div>
      </div>
    </div>
  )
}

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
  href: string
}

function SidebarItem({ icon, label, isActive, onClick, href }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className="block"
      onClick={(e) => {
        onClick()
      }}
    >
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 px-3 py-2 text-left font-normal",
          isActive && "bg-accent text-accent-foreground",
        )}
      >
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  )
}

function SidebarSubItem({ icon, label, isActive, onClick, href }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className="block"
      onClick={(e) => {
        onClick()
      }}
    >
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "w-full justify-start gap-2 px-3 py-1.5 text-left font-normal",
          isActive && "bg-accent text-accent-foreground",
        )}
      >
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  )
}

