"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { TopBar } from "@/components/top-bar"
import { Sidebar } from "@/components/sidebar"
import { UserAuthModal } from "@/components/user-auth-modal"
import { NewPortfolioModal } from "@/components/new-portfolio-modal"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
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

  const [activeTab, setActiveTab] = useState(getActiveTabFromPathname(pathname))
  const [selectedPortfolio, setSelectedPortfolio] = useState<string | null>(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalType, setAuthModalType] = useState<"login" | "signup">("login")
  const [isNewPortfolioModalOpen, setIsNewPortfolioModalOpen] = useState(false)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handlePortfolioSelect = (portfolio: string | null) => {
    setSelectedPortfolio(portfolio)
  }

  const handleNewPortfolio = () => {
    setIsNewPortfolioModalOpen(true)
  }

  const handleAuthModalOpen = (type: "login" | "signup") => {
    setAuthModalType(type)
    setIsAuthModalOpen(true)
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar
        selectedPortfolio={selectedPortfolio}
        onPortfolioSelect={handlePortfolioSelect}
        onNewPortfolio={handleNewPortfolio}
        onAuthModalOpen={handleAuthModalOpen}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
      <UserAuthModal isOpen={isAuthModalOpen} type={authModalType} onClose={() => setIsAuthModalOpen(false)} />
      <NewPortfolioModal
        isOpen={isNewPortfolioModalOpen}
        onClose={() => setIsNewPortfolioModalOpen(false)}
        onPortfolioCreate={(name) => {
          setSelectedPortfolio(name)
          setIsNewPortfolioModalOpen(false)
        }}
      />
    </div>
  )
}

