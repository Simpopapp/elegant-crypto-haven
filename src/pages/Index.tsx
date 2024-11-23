import { Card } from "@/components/ui/card";
import { ArrowUpRight, Wallet, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

declare global {
  interface Window {
    TradingView: any;
  }
}

const fetchCryptoData = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true');
  return response.json();
};

const Index = () => {
  const { data: cryptoData, isLoading } = useQuery({
    queryKey: ['cryptoPrices'],
    queryFn: fetchCryptoData,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        width: "100%",
        height: 400,
        symbol: "BINANCE:BTCUSDT",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#1A1F2C",
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        container_id: "tradingview_chart",
        studies: ["RSI@tv-basicstudies", "MASimple@tv-basicstudies"]
      });
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background animate-fade-in dark">
      <div className="dashboard-container">
        <h1 className="text-4xl font-semibold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="stats-card col-span-2">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Portfolio Value</h2>
                <p className="text-sm text-muted-foreground mt-1">Real-time market data</p>
              </div>
              <button className="text-primary flex items-center text-sm hover:opacity-80 transition-opacity">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                Connect Wallet
              </button>
            </div>
            <div id="tradingview_chart" className="w-full h-[400px] rounded-lg overflow-hidden" />
          </Card>
          
          <Card className="stats-card">
            <h2 className="text-xl font-semibold mb-6">Market Overview</h2>
            <div className="space-y-4">
              {isLoading ? (
                <p className="text-sm text-muted-foreground">Loading market data...</p>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Wallet className="w-5 h-5 mr-2 text-primary" />
                      <span>BTC/USD</span>
                    </div>
                    <div className="text-right">
                      <div className="font-mono">${cryptoData?.bitcoin?.usd.toLocaleString()}</div>
                      <div className={`text-xs ${cryptoData?.bitcoin?.usd_24h_change >= 0 ? 'text-accent' : 'text-destructive'}`}>
                        {cryptoData?.bitcoin?.usd_24h_change?.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-accent" />
                      <span>ETH/USD</span>
                    </div>
                    <div className="text-right">
                      <div className="font-mono">${cryptoData?.ethereum?.usd.toLocaleString()}</div>
                      <div className={`text-xs ${cryptoData?.ethereum?.usd_24h_change >= 0 ? 'text-accent' : 'text-destructive'}`}>
                        {cryptoData?.ethereum?.usd_24h_change?.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>

        <Card className="stats-card">
          <h2 className="text-xl font-semibold mb-6">Market Overview</h2>
          <p className="text-sm text-muted-foreground">Connect your wallet to view detailed market data</p>
        </Card>
      </div>
    </div>
  );
};

export default Index;