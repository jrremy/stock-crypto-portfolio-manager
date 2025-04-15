"use client";

import { usePortfolio } from "@/hooks/use-portfolio";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { getPortfolios } from "@/lib/api";
import { Portfolio } from "@/types";
import { NewPortfolioModal } from "@/components/new-portfolio-modal";

export function TopBar() {
  const queryClient = useQueryClient();
  const { data: portfolios, isLoading } = useQuery({
    queryKey: ["portfolios"],
    queryFn: getPortfolios,
  });
  const { currentPortfolio, setCurrentPortfolio } = usePortfolio();
  const [open, setOpen] = useState(false);
  const [isNewPortfolioModalOpen, setIsNewPortfolioModalOpen] = useState(false);

  const handlePortfolioSelect = (portfolio: Portfolio) => {
    setCurrentPortfolio(portfolio);
    setOpen(false);
  };

  const handleNewPortfolio = () => {
    setOpen(false);
    setIsNewPortfolioModalOpen(true);
  };

  return (
    <>
      <div className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <h1 className="text-xl font-bold text-primary">Portfolio Manager</h1>
        <div className="relative">
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-auto justify-start">
                {currentPortfolio ? (
                  <>
                    <span className="truncate">{currentPortfolio.name}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground">
                    Select Portfolio
                  </span>
                )}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              {isLoading ? (
                <div className="p-2 text-center text-sm">Loading...</div>
              ) : portfolios && portfolios.length > 0 ? (
                <>
                  {portfolios.map((portfolio) => (
                    <DropdownMenuItem
                      key={portfolio.id}
                      onClick={() => handlePortfolioSelect(portfolio)}
                    >
                      {portfolio.name}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                </>
              ) : (
                <div className="p-2 text-center text-sm">
                  No portfolios found
                </div>
              )}
              <DropdownMenuItem onClick={handleNewPortfolio}>
                <Plus className="mr-2 h-4 w-4" />
                New Portfolio
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <NewPortfolioModal
        isOpen={isNewPortfolioModalOpen}
        onClose={() => setIsNewPortfolioModalOpen(false)}
        onPortfolioCreate={() => {
          setIsNewPortfolioModalOpen(false);
          queryClient.invalidateQueries({ queryKey: ["portfolios"] });
        }}
      />
    </>
  );
}
