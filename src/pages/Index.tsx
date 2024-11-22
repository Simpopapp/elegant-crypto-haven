import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp } from "lucide-react";

const mockData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
];

const cryptoData = [
  { name: "Bitcoin", price: "$42,890", change: "+5.6%", isPositive: true },
  { name: "Ethereum", price: "$2,890", change: "+3.2%", isPositive: true },
  { name: "Solana", price: "$890", change: "-2.1%", isPositive: false },
];

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
                <p className="text-4xl font-bold mt-2">$124,892.00</p>
              </div>
              <span className="text-accent flex items-center">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                8.12%
              </span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={mockData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8989DE" 
                  strokeWidth={2}
                  dot={false}
                />
                <XAxis dataKey="name" hide />
                <YAxis hide />
              </LineChart>
            </ResponsiveContainer>
          </Card>
          
          <Card className="stats-card">
            <h2 className="text-xl font-semibold mb-6">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Wallet className="w-5 h-5 mr-2 text-primary" />
                  <span>Total Assets</span>
                </div>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-accent" />
                  <span>Active Trades</span>
                </div>
                <span className="font-semibold">5</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Crypto List */}
        <div className="stats-card">
          <h2 className="text-xl font-semibold mb-6">Top Cryptocurrencies</h2>
          <div className="space-y-4">
            {cryptoData.map((crypto) => (
              <div key={crypto.name} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                <div>
                  <h3 className="font-semibold">{crypto.name}</h3>
                  <p className="text-sm text-muted-foreground">{crypto.price}</p>
                </div>
                <span className={`flex items-center ${crypto.isPositive ? 'text-accent' : 'text-destructive'}`}>
                  {crypto.isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {crypto.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;