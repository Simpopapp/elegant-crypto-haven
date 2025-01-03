import { Card } from "@/components/ui/card";
import { ArrowUpRight, Wallet, TrendingUp, Activity, DollarSign, Maximize2, Minimize2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

declare global {
  interface Window {
    TradingView: any;
  }
}

const fetchCryptoData = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,cardano&vs_currencies=usd&include_24hr_change=true');
  if (!response.ok) {
    throw new Error('Failed to fetch crypto data');
  }
  return response.json();
};

const Index = () => {
  const { toast } = useToast();
  const [isChartFullscreen, setIsChartFullscreen] = useState(false);
  const { data: cryptoData, isLoading, error } = useQuery({
    queryKey: ['cryptoPrices'],
    queryFn: fetchCryptoData,
    refetchInterval: 30000,
    meta: {
      onError: () => {
        toast({
          title: "Error fetching data",
          description: "Could not fetch latest crypto prices",
          variant: "destructive",
        });
      },
    },
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        width: "100%",
        height: isChartFullscreen ? window.innerHeight : 500,
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
  }, [isChartFullscreen]);

  const getCryptoIcon = (name: string) => {
    switch (name) {
      case 'bitcoin': return <DollarSign className="w-5 h-5 text-yellow-500" />;
      case 'ethereum': return <Activity className="w-5 h-5 text-purple-500" />;
      case 'ripple': return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case 'cardano': return <Wallet className="w-5 h-5 text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen bg-background-dark text-foreground-dark animate-fade-in ${
      isChartFullscreen ? 'fixed inset-0 z-50 overflow-hidden' : ''
    }`}>
      <div className={`dashboard-container ${isChartFullscreen ? 'h-full p-0' : ''}`}>
        {!isChartFullscreen && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Crypto Dashboard
                </h1>
                <p className="text-muted-foreground mt-2">Real-time cryptocurrency market data</p>
              </div>
              <button className="glass-card px-4 py-2 flex items-center gap-2 hover:bg-white/20 transition-all">
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
              {!isLoading && cryptoData && Object.entries(cryptoData).map(([crypto, data]: [string, any]) => (
                <Card key={crypto} className="stats-card hover:scale-105 transition-transform duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getCryptoIcon(crypto)}
                      <span className="capitalize font-medium text-sm md:text-base">{crypto}</span>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      data.usd_24h_change >= 0 ? 'bg-accent/20 text-accent' : 'bg-destructive/20 text-destructive'
                    }`}>
                      {data.usd_24h_change?.toFixed(2)}%
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-lg md:text-2xl font-bold">${data.usd.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground mt-1">Last 24h</div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        <div className={`${isChartFullscreen ? 'fixed inset-0 bg-background-dark p-2' : 'grid grid-cols-1 lg:grid-cols-3 gap-6'}`}>
          <Card className={`stats-card ${isChartFullscreen ? 'h-full w-full rounded-lg border-none' : 'col-span-2'}`}>
            <div className="flex justify-between items-start p-2">
              {!isChartFullscreen && (
                <div>
                  <h2 className="text-2xl font-bold">BTC/USDT</h2>
                  <p className="text-sm text-muted-foreground mt-1">Real-time chart</p>
                </div>
              )}
              <button 
                onClick={() => setIsChartFullscreen(!isChartFullscreen)}
                className="text-primary flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors"
              >
                {isChartFullscreen ? (
                  <>
                    <X className="w-4 h-4" />
                    <span className="text-sm">Exit</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-4 h-4" />
                    <span className="text-sm">Fullscreen</span>
                  </>
                )}
              </button>
            </div>
            <div 
              id="tradingview_chart" 
              className={`w-full rounded-lg overflow-hidden glass-card ${
                isChartFullscreen ? 'h-[calc(100vh-48px)]' : 'h-[500px]'
              }`} 
            />
          </Card>
          
          {!isChartFullscreen && (
            <Card className="stats-card">
              <h2 className="text-xl font-bold mb-6">Market Overview</h2>
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 bg-muted-dark rounded-lg" />
                  ))}
                </div>
              ) : error ? (
                <div className="text-center text-muted-foreground">
                  Failed to load market data
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(cryptoData || {}).map(([crypto, data]: [string, any]) => (
                    <div key={crypto} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted-dark transition-colors">
                      <div className="flex items-center gap-2">
                        {getCryptoIcon(crypto)}
                        <span className="capitalize">{crypto}/USD</span>
                      </div>
                      <div className="text-right">
                        <div className="font-mono">${data.usd.toLocaleString()}</div>
                        <div className={`text-xs ${data.usd_24h_change >= 0 ? 'text-accent' : 'text-destructive'}`}>
                          {data.usd_24h_change?.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
