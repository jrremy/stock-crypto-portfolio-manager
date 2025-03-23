"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface NewPortfolioModalProps {
  isOpen: boolean
  onClose: () => void
  onPortfolioCreate: (name: string) => void
}

export function NewPortfolioModal({ isOpen, onClose, onPortfolioCreate }: NewPortfolioModalProps) {
  const [portfolioName, setPortfolioName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!portfolioName.trim()) {
      setError("Portfolio name is required")
      return
    }

    // Here you would check if the portfolio name already exists
    // For now, we'll just simulate it with a mock check
    const existingPortfolios = ["Main Portfolio", "Crypto Only", "Long-term Investments"]
    if (existingPortfolios.includes(portfolioName)) {
      setError("A portfolio with this name already exists")
      return
    }

    onPortfolioCreate(portfolioName)
    setPortfolioName("")
    setError("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Portfolio</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="portfolio-name">Portfolio Name</Label>
            <Input
              id="portfolio-name"
              value={portfolioName}
              onChange={(e) => {
                setPortfolioName(e.target.value)
                setError("")
              }}
              placeholder="My Portfolio"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Portfolio</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

