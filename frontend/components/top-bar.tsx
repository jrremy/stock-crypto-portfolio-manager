"use client"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TopBarProps {
  selectedPortfolio: string | null
  onPortfolioSelect: (portfolio: string | null) => void
  onNewPortfolio: () => void
  onAuthModalOpen: (type: "login" | "signup") => void
}

export function TopBar({ selectedPortfolio, onPortfolioSelect, onNewPortfolio, onAuthModalOpen }: TopBarProps) {
  // Mock portfolio data - would come from API in real app
  const portfolios = [
    { id: "1", name: "Main Portfolio" },
    { id: "2", name: "Crypto Only" },
    { id: "3", name: "Long-term Investments" },
  ]

  return (
    <header className="bg-background shadow-sm">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-4 flex-1">
          <h1 className="text-xl font-bold text-primary">Portfolio Manager</h1>

          <div className="ml-8 w-[250px]">
            <Select
              value={selectedPortfolio || ""}
              onValueChange={(value) => {
                if (value === "new") {
                  onNewPortfolio()
                } else {
                  onPortfolioSelect(value)
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a portfolio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new" className="text-primary font-medium">
                  + New Portfolio
                </SelectItem>
                {portfolios.map((portfolio) => (
                  <SelectItem key={portfolio.id} value={portfolio.name}>
                    {portfolio.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onAuthModalOpen("login")}>Log In</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAuthModalOpen("signup")}>Sign Up</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

