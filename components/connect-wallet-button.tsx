"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, CheckCircle, Copy, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock wallet connection state and functions
export function useWallet() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState("")
  const [balance, setBalance] = useState("0")
  const { toast } = useToast()

  const connectWallet = async () => {
    // Mock wallet connection process
    toast({
      title: "Connecting wallet...",
      description: "Please confirm the connection in your wallet",
    })

    // Simulate connection delay
    setTimeout(() => {
      setIsConnected(true)
      setAddress("0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4")
      setBalance("2.45")
      toast({
        title: "Wallet connected!",
        description: "Successfully connected to MetaMask",
      })
    }, 2000)
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setAddress("")
    setBalance("0")
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(address)
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard",
    })
  }

  return {
    isConnected,
    address,
    balance,
    connectWallet,
    disconnectWallet,
    copyAddress,
  }
}

interface ConnectWalletButtonProps {
  className?: string
}

export function ConnectWalletButton({ className }: ConnectWalletButtonProps) {
  const { isConnected, address, balance, connectWallet, disconnectWallet, copyAddress } = useWallet()

  if (isConnected) {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-chart-3" />
              <CardTitle className="text-lg">Wallet Connected</CardTitle>
            </div>
            <Badge variant="secondary" className="bg-chart-3/10 text-chart-3">
              Connected
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Address:</span>
              <div className="flex items-center gap-2">
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </code>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyAddress}>
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Balance:</span>
              <span className="text-sm font-mono">{balance} ETH</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={disconnectWallet}>
              Disconnect
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-1" />
              View on Explorer
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Wallet className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>Connect Your Wallet</CardTitle>
        <CardDescription>Connect your Web3 wallet to start tracking expenses and earning rewards</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <Button size="lg" className="w-full" onClick={connectWallet}>
          <Wallet className="h-4 w-4 mr-2" />
          Connect Wallet
        </Button>
        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <Wallet className="h-4 w-4" />
            </div>
            MetaMask
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <Wallet className="h-4 w-4" />
            </div>
            WalletConnect
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <Wallet className="h-4 w-4" />
            </div>
            Coinbase
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
