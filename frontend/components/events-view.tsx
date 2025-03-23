"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function EventsView() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data - would come from API in real app
  const newsArticles = [
    {
      id: "1",
      title: "Apple announces new AI features for iOS 18",
      source: "TechCrunch",
      description:
        "Apple's latest iOS update brings significant AI enhancements to iPhone users, including improved Siri capabilities, on-device processing for privacy, and new developer APIs for AI integration. The update is expected to roll out next month to all compatible devices.",
      url: "https://example.com/article1",
      date: "2023-06-15T10:30:00Z",
      relatedAssets: ["AAPL"],
    },
    {
      id: "2",
      title: "Bitcoin surges past $35,000 as institutional adoption grows",
      source: "CoinDesk",
      description:
        "Bitcoin's price has increased significantly as more financial institutions add it to their portfolios. This surge comes after several major banks announced new cryptocurrency custody services and investment products aimed at high-net-worth clients and institutional investors.",
      url: "https://example.com/article2",
      date: "2023-06-14T14:45:00Z",
      relatedAssets: ["BTC"],
    },
    {
      id: "3",
      title: "Microsoft's cloud revenue exceeds expectations in Q2",
      source: "CNBC",
      description:
        "Microsoft reported better-than-expected cloud revenue, driving stock price higher. Azure revenue grew by 27% year-over-year, surpassing analyst estimates. The company also highlighted strong growth in its AI services, which are now being used by over 10,000 organizations worldwide.",
      url: "https://example.com/article3",
      date: "2023-06-13T09:15:00Z",
      relatedAssets: ["MSFT"],
    },
    {
      id: "4",
      title: "Ethereum completes major network upgrade",
      source: "The Block",
      description:
        "Ethereum's latest upgrade aims to improve scalability and reduce transaction fees. The upgrade introduces several technical improvements to the network's infrastructure, including changes to how transactions are processed and validated, which should result in faster confirmation times and lower gas fees.",
      url: "https://example.com/article4",
      date: "2023-06-12T16:20:00Z",
      relatedAssets: ["ETH"],
    },
    {
      id: "5",
      title: "NVIDIA unveils next-generation AI chips",
      source: "Reuters",
      description:
        "NVIDIA's new AI chips promise significant performance improvements for machine learning applications. The new GPUs offer twice the performance of the previous generation while consuming 30% less power, making them ideal for data centers and high-performance computing environments focused on AI workloads.",
      url: "https://example.com/article5",
      date: "2023-06-11T11:05:00Z",
      relatedAssets: ["NVDA"],
    },
    {
      id: "6",
      title: "Apple's services revenue hits all-time high",
      source: "Bloomberg",
      description:
        "Apple's services segment, which includes App Store, Apple Music, and Apple TV+, reported record revenue in the latest quarter. The growth in services is becoming increasingly important to Apple's overall business strategy as hardware sales growth slows in mature markets.",
      url: "https://example.com/article6",
      date: "2023-06-10T08:30:00Z",
      relatedAssets: ["AAPL"],
    },
    {
      id: "7",
      title: "Tesla announces new battery technology",
      source: "Electrek",
      description:
        "Tesla has unveiled a new battery technology that promises to increase range and reduce costs. The new cells feature a tabless design and improved chemistry that allows for faster charging, longer life cycles, and higher energy density, potentially enabling electric vehicles with over 500 miles of range.",
      url: "https://example.com/article7",
      date: "2023-06-09T13:45:00Z",
      relatedAssets: ["TSLA"],
    },
    {
      id: "8",
      title: "Crypto market sees $100B inflow as regulations clarify",
      source: "CryptoNews",
      description:
        "The cryptocurrency market experienced a significant influx of capital following regulatory clarity from several major economies. The new regulatory frameworks provide clearer guidelines for cryptocurrency businesses while maintaining consumer protections, reducing uncertainty for institutional investors.",
      url: "https://example.com/article8",
      date: "2023-06-08T15:20:00Z",
      relatedAssets: ["BTC", "ETH"],
    },
  ]

  // Filter articles based on search query
  const filteredArticles = newsArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.relatedAssets.some((asset) => asset.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">News & Events</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search news..."
              className="w-[250px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSearchQuery("")}>All News</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchQuery("AAPL")}>Apple</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchQuery("MSFT")}>Microsoft</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchQuery("BTC")}>Bitcoin</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchQuery("ETH")}>Ethereum</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArticles.map((article) => (
          <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" className="block h-full">
            <Card className="h-full transition-all hover:shadow-md">
              <CardContent className="p-4 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-muted-foreground">{article.source}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{new Date(article.date).toLocaleDateString()}</span>
                </div>
                <h3 className="font-medium text-lg mb-2">{article.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">{article.description}</p>
                <div className="flex gap-1 mt-auto">
                  {article.relatedAssets.map((asset) => (
                    <span
                      key={asset}
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                    >
                      {asset}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  )
}

