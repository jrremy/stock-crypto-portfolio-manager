"use client"

export function NewsEvents({ limit = 5 }) {
  // Mock data - would come from API in real app
  const newsArticles = [
    {
      id: "1",
      title: "Apple announces new AI features for iOS 18",
      source: "TechCrunch",
      description: "Apple's latest iOS update brings significant AI enhancements to iPhone users.",
      url: "#",
      date: "2023-06-15T10:30:00Z",
      relatedAssets: ["AAPL"],
    },
    {
      id: "2",
      title: "Bitcoin surges past $35,000 as institutional adoption grows",
      source: "CoinDesk",
      description:
        "Bitcoin's price has increased significantly as more financial institutions add it to their portfolios.",
      url: "#",
      date: "2023-06-14T14:45:00Z",
      relatedAssets: ["BTC"],
    },
    {
      id: "3",
      title: "Microsoft's cloud revenue exceeds expectations in Q2",
      source: "CNBC",
      description: "Microsoft reported better-than-expected cloud revenue, driving stock price higher.",
      url: "#",
      date: "2023-06-13T09:15:00Z",
      relatedAssets: ["MSFT"],
    },
    {
      id: "4",
      title: "Ethereum completes major network upgrade",
      source: "The Block",
      description: "Ethereum's latest upgrade aims to improve scalability and reduce transaction fees.",
      url: "#",
      date: "2023-06-12T16:20:00Z",
      relatedAssets: ["ETH"],
    },
    {
      id: "5",
      title: "NVIDIA unveils next-generation AI chips",
      source: "Reuters",
      description:
        "NVIDIA's new AI chips promise significant performance improvements for machine learning applications.",
      url: "#",
      date: "2023-06-11T11:05:00Z",
      relatedAssets: ["NVDA"],
    },
  ]

  const displayedArticles = newsArticles.slice(0, limit)

  return (
    <div className="space-y-4">
      {displayedArticles.map((article) => (
        <div key={article.id} className="group cursor-pointer">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{article.source}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{new Date(article.date).toLocaleDateString()}</span>
            </div>
            <h3 className="font-medium group-hover:text-primary transition-colors">{article.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>
            <div className="flex gap-1 pt-1">
              {article.relatedAssets.map((asset) => (
                <span
                  key={asset}
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                >
                  {asset}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

