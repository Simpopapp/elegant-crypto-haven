import { Card } from "@/components/ui/card";
import { ArrowUpRight, Wallet, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="dashboard-container">
        <h1 className="text-4xl font-semibold mb-8">Dashboard</h1>
        
        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="stats-card col-span-2">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Portfolio Value</h2>
                <p className="text-sm text-muted-foreground mt-1">Connect your wallet to view your portfolio</p>
              </div>
              <button className="text-primary flex items-center text-sm hover:opacity-80 transition-opacity">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                Connect Wallet
              </button>
            </div>
          </Card>
          
          <Card className="stats-card">
            <h2 className="text-xl font-semibold mb-6">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Wallet className="w-5 h-5 mr-2 text-primary" />
                  <span>Total Assets</span>
                </div>
                <span className="text-sm text-muted-foreground">-</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-accent" />
                  <span>Active Trades</span>
                </div>
                <span className="text-sm text-muted-foreground">-</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Market Overview */}
        <div className="stats-card">
          <h2 className="text-xl font-semibold mb-6">Market Overview</h2>
          <p className="text-sm text-muted-foreground">Connect your wallet to view market data</p>
        </div>
      </div>
    </div>
  );
};

export default Index;