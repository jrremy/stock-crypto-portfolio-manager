"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, ArrowUpDown, MoreHorizontal, X } from "lucide-react"
// First, import the Combobox component
import { Combobox } from "@/components/ui/combobox"

export function TransactionsView() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [isViewMode, setIsViewMode] = useState(true)
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Add state for the selected ticker
  const [selectedTicker, setSelectedTicker] = useState("")
  const [assetType, setAssetType] = useState("stock")

  // Add state for the new transaction
  const [newAssetType, setNewAssetType] = useState("stock")
  const [newTicker, setNewTicker] = useState("")

  // Mock ticker data for the searchable select
  // In the TransactionsView component, add this mock data
  const stockTickers = [
    { value: "AAPL", label: "AAPL - Apple Inc." },
    { value: "MSFT", label: "MSFT - Microsoft Corporation" },
    { value: "GOOGL", label: "GOOGL - Alphabet Inc." },
    { value: "AMZN", label: "AMZN - Amazon.com Inc." },
    { value: "TSLA", label: "TSLA - Tesla Inc." },
    { value: "NVDA", label: "NVDA - NVIDIA Corporation" },
    { value: "META", label: "META - Meta Platforms Inc." },
    { value: "NFLX", label: "NFLX - Netflix Inc." },
  ]

  const cryptoTickers = [
    { value: "BTC", label: "BTC - Bitcoin" },
    { value: "ETH", label: "ETH - Ethereum" },
    { value: "SOL", label: "SOL - Solana" },
    { value: "ADA", label: "ADA - Cardano" },
    { value: "DOT", label: "DOT - Polkadot" },
    { value: "AVAX", label: "AVAX - Avalanche" },
    { value: "MATIC", label: "MATIC - Polygon" },
    { value: "LINK", label: "LINK - Chainlink" },
  ]

  // Update the ticker options based on the selected asset type
  const tickerOptions = assetType === "stock" ? stockTickers : cryptoTickers

  // Mock data - would come from API in real app
  const transactions = [
    {
      id: "1",
      assetType: "stock",
      ticker: "AAPL",
      transactionType: "buy",
      quantity: 10,
      price: 175.23,
      timestamp: "2023-06-15T10:30:00Z",
    },
    {
      id: "2",
      assetType: "crypto",
      ticker: "BTC",
      transactionType: "sell",
      quantity: 0.5,
      price: 30245.67,
      timestamp: "2023-06-14T14:45:00Z",
    },
    {
      id: "3",
      assetType: "stock",
      ticker: "MSFT",
      transactionType: "buy",
      quantity: 5,
      price: 325.12,
      timestamp: "2023-06-13T09:15:00Z",
    },
    {
      id: "4",
      assetType: "crypto",
      ticker: "ETH",
      transactionType: "swap",
      quantity: 2,
      price: 1845.34,
      timestamp: "2023-06-12T16:20:00Z",
    },
    {
      id: "5",
      assetType: "stock",
      ticker: "NVDA",
      transactionType: "buy",
      quantity: 3,
      price: 420.78,
      timestamp: "2023-06-11T11:05:00Z",
    },
    {
      id: "6",
      assetType: "stock",
      ticker: "TSLA",
      transactionType: "buy",
      quantity: 2,
      price: 245.34,
      timestamp: "2023-06-10T13:25:00Z",
    },
    {
      id: "7",
      assetType: "crypto",
      ticker: "SOL",
      transactionType: "buy",
      quantity: 15,
      price: 58.92,
      timestamp: "2023-06-09T09:45:00Z",
    },
    {
      id: "8",
      assetType: "stock",
      ticker: "AMZN",
      transactionType: "sell",
      quantity: 3,
      price: 178.45,
      timestamp: "2023-06-08T14:15:00Z",
    },
  ]

  // Filter transactions based on active tab and search query
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "stocks" && transaction.assetType === "stock") ||
      (activeTab === "crypto" && transaction.assetType === "crypto")

    const matchesSearch =
      searchQuery === "" ||
      transaction.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.transactionType.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesSearch
  })

  const handleRowClick = (transaction: any) => {
    setSelectedTransaction(transaction)
    setIsViewMode(true)
  }

  const handleEdit = () => {
    setIsViewMode(false)
  }

  const handleDelete = () => {
    // Handle delete logic here
    setSelectedTransaction(null)
  }

  const handleSave = () => {
    // Handle save logic here
    setIsViewMode(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Button onClick={() => setIsNewTransactionOpen(true)} className="gap-1">
          <Plus className="h-4 w-4" />
          New Transaction
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] pl-8"
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
                <DropdownMenuItem>Filter by Date</DropdownMenuItem>
                <DropdownMenuItem>Filter by Value</DropdownMenuItem>
                <DropdownMenuItem>Filter by Type</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Sort by Date (Newest)</DropdownMenuItem>
                <DropdownMenuItem>Sort by Date (Oldest)</DropdownMenuItem>
                <DropdownMenuItem>Sort by Value (High to Low)</DropdownMenuItem>
                <DropdownMenuItem>Sort by Value (Low to High)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent value="all" className="mt-4">
          <TransactionsTable
            transactions={filteredTransactions}
            onRowClick={handleRowClick}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </TabsContent>
        <TabsContent value="stocks" className="mt-4">
          <TransactionsTable
            transactions={filteredTransactions}
            onRowClick={handleRowClick}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </TabsContent>
        <TabsContent value="crypto" className="mt-4">
          <TransactionsTable
            transactions={filteredTransactions}
            onRowClick={handleRowClick}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </TabsContent>
      </Tabs>

      {/* Transaction Detail Dialog */}
      <Dialog
        open={!!selectedTransaction}
        onOpenChange={(open) => {
          if (!open) setSelectedTransaction(null)
          if (!open && !isViewMode) setIsViewMode(true)
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isViewMode ? "Transaction Details" : "Edit Transaction"}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => setSelectedTransaction(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-4">
              {isViewMode ? (
                // View Mode
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Asset Type</p>
                    <p className="font-medium capitalize">{selectedTransaction.assetType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ticker</p>
                    <p className="font-medium">{selectedTransaction.ticker}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Transaction Type</p>
                    <p className="font-medium capitalize">{selectedTransaction.transactionType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="font-medium">{selectedTransaction.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">${selectedTransaction.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{new Date(selectedTransaction.timestamp).toLocaleString()}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="font-medium">
                      ${(selectedTransaction.quantity * selectedTransaction.price).toLocaleString()}
                    </p>
                  </div>
                </div>
              ) : (
                // Edit Mode
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="asset-type">Asset Type</Label>
                      <select
                        id="asset-type"
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        value={assetType}
                        onChange={(e) => {
                          setAssetType(e.target.value)
                          setSelectedTicker("") // Reset ticker when asset type changes
                        }}
                      >
                        <option value="stock">Stock</option>
                        <option value="crypto">Crypto</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ticker">Ticker</Label>
                      <Combobox
                        options={assetType === "stock" ? stockTickers : cryptoTickers}
                        value={selectedTicker || selectedTransaction.ticker}
                        onChange={setSelectedTicker}
                        placeholder="Select ticker"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transaction-type">Transaction Type</Label>
                      <select
                        id="transaction-type"
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        defaultValue={selectedTransaction.transactionType}
                      >
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                        <option value="swap">Swap</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input id="quantity" type="number" defaultValue={selectedTransaction.quantity} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price</Label>
                      <Input id="price" type="number" defaultValue={selectedTransaction.price} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="datetime-local"
                        defaultValue={new Date(selectedTransaction.timestamp).toISOString().slice(0, 16)}
                      />
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter>
                {isViewMode ? (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleDelete}>
                      Delete
                    </Button>
                    <Button onClick={handleEdit}>Edit</Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsViewMode(true)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New Transaction Dialog */}
      <Dialog open={isNewTransactionOpen} onOpenChange={setIsNewTransactionOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>New Transaction</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-asset-type">Asset Type</Label>
                <select
                  id="new-asset-type"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={newAssetType}
                  onChange={(e) => {
                    setNewAssetType(e.target.value)
                    setNewTicker("") // Reset ticker when asset type changes
                  }}
                >
                  <option value="stock">Stock</option>
                  <option value="crypto">Crypto</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-ticker">Ticker</Label>
                <Combobox
                  options={newAssetType === "stock" ? stockTickers : cryptoTickers}
                  value={newTicker}
                  onChange={setNewTicker}
                  placeholder="Select ticker"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-transaction-type">Transaction Type</Label>
                <select
                  id="new-transaction-type"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                  <option value="swap">Swap</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-quantity">Quantity</Label>
                <Input id="new-quantity" type="number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-price">Price</Label>
                <Input id="new-price" type="number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-date">Date</Label>
                <Input id="new-date" type="datetime-local" defaultValue={new Date().toISOString().slice(0, 16)} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewTransactionOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsNewTransactionOpen(false)}>Add Transaction</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface TransactionsTableProps {
  transactions: any[]
  onRowClick: (transaction: any) => void
  handleEdit: () => void
  handleDelete: () => void
}

function TransactionsTable({ transactions, onRowClick, handleEdit, handleDelete }: TransactionsTableProps) {
  return (
    <div className="rounded-lg bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                No transactions found
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow key={transaction.id} className="cursor-pointer" onClick={() => onRowClick(transaction)}>
                <TableCell className="font-medium">{transaction.ticker}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      transaction.transactionType === "buy"
                        ? "default"
                        : transaction.transactionType === "sell"
                          ? "destructive"
                          : "outline"
                    }
                    className="capitalize"
                  >
                    {transaction.transactionType}
                  </Badge>
                </TableCell>
                <TableCell>{transaction.quantity}</TableCell>
                <TableCell>${transaction.price.toLocaleString()}</TableCell>
                <TableCell>${(transaction.quantity * transaction.price).toLocaleString()}</TableCell>
                <TableCell>{new Date(transaction.timestamp).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onRowClick(transaction)
                        }}
                      >
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onRowClick(transaction)
                          handleEdit()
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onRowClick(transaction)
                          handleDelete()
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

