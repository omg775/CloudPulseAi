"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Zap, 
  Target, 
  ArrowUpRight,
  MoreHorizontal,
  Cloud,
  Database,
  ShieldCheck,
  Cpu
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const spendData = [
  { name: "May 1", amount: 400 },
  { name: "May 5", amount: 600 },
  { name: "May 10", amount: 550 },
  { name: "May 15", amount: 800 },
  { name: "May 20", amount: 1100 },
  { name: "May 25", amount: 950 },
  { name: "May 30", amount: 1240 },
];

export default function DashboardOverview() {
  const [summary, setSummary] = useState<any>(null);
  const [spendData, setSpendData] = useState<any[]>([]);
  const [serviceData, setServiceData] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, spendRes, serviceRes, recsRes] = await Promise.all([
          fetch('http://localhost:8080/api/dashboard/summary'),
          fetch('http://localhost:8080/api/dashboard/charts/daily-spend'),
          fetch('http://localhost:8080/api/dashboard/charts/service-breakdown'),
          fetch('http://localhost:8080/api/recommendations')
        ]);

        const summaryData = await summaryRes.json();
        const dailySpendData = await spendRes.json();
        const serviceBreakdownData = await serviceRes.json();
        const recommendationsData = await recsRes.json();

        setSummary(summaryData);
        setSpendData(dailySpendData);
        setServiceData(serviceBreakdownData);
        setRecommendations(recommendationsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGenerateReport = () => {
    alert("Generating your cloud cost report... Check your downloads in a few seconds.");
  };

  const handleApplyRecommendations = () => {
    alert("Applying AI recommendations to your AWS environment. This will take a moment...");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground font-medium">Crunching your cloud data...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Alex. Here's your cloud at a glance.</p>
        </div>
        <div className="flex gap-3">
          <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none cursor-pointer hover:bg-white/10 transition-colors">
            <option className="bg-black">Last 30 Days</option>
            <option className="bg-black">Last 7 Days</option>
            <option className="bg-black">Year to Date</option>
          </select>
          <button 
            onClick={handleGenerateReport}
            className="bg-primary text-black px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-all hover:scale-105 active:scale-95"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Monthly Spend" 
          value={`$${summary?.totalMonthlySpend?.toLocaleString() || '0'}`} 
          trend={summary?.trend || '0%'} 
          trendUp={summary?.trend?.startsWith('+')} 
          icon={DollarSign}
          color="primary"
        />
        <StatCard 
          title="AI Savings Est." 
          value={`$${summary?.aiSavingsEstimate?.toLocaleString() || '0'}`} 
          trend="-8.2%" 
          trendUp={false} 
          icon={Zap}
          color="lime"
        />
        <StatCard 
          title="Budget Usage" 
          value={`${summary?.budgetUsagePercent || '0'}%`} 
          trend="On Track" 
          trendUp={false} 
          icon={Target}
          color="blue"
        />
        <StatCard 
          title="Active Resources" 
          value={summary?.activeResourcesCount?.toString() || '0'} 
          trend="+4 new" 
          trendUp={true} 
          icon={Cpu}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass rounded-3xl p-8 border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Daily Spending Trend</h3>
            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Actual Spend</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <span>Predicted</span>
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendData}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#666', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#666', fontSize: 12 }}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: 'var(--primary)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="var(--primary)" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSpend)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Advisor Card */}
        <div className="bg-gradient-to-b from-primary/10 to-accent/5 border border-primary/20 rounded-3xl p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
              <Zap className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">CloudPulse Advisor</h3>
              <p className="text-[10px] text-primary font-bold uppercase tracking-widest">AI Engine Active</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {recommendations.map((rec, index) => (
              <div 
                key={index}
                onClick={() => alert(`Details for: ${rec.title}`)}
                className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">{rec.title}</p>
                  <span className={cn(
                    "text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase",
                    rec.impact === 'HIGH' ? "bg-red-400/20 text-red-400" : "bg-primary/20 text-primary"
                  )}>
                    {rec.impact}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{rec.description}</p>
                <div className="mt-3 text-xs font-bold text-primary flex items-center gap-1">
                  Save ${rec.potentialSavings}/mo <ArrowUpRight size={12} />
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={handleApplyRecommendations}
            className="mt-auto w-full py-4 bg-primary text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
          >
            Apply Recommendations
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cost by Service */}
        <div className="glass rounded-3xl p-8 border border-white/5">
          <h3 className="text-xl font-bold mb-8">Cost by Service</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#fff', fontSize: 14, fontWeight: 600 }}
                />
                <Tooltip 
                   cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                   contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
                <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={32}>
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Resources Table */}
        <div className="glass rounded-3xl p-8 border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Top Resources</h3>
            <button 
              onClick={() => alert("Redirecting to full resources list...")}
              className="text-xs text-muted-foreground hover:text-white transition-colors active:scale-95"
            >
              View All
            </button>
          </div>
          <div className="space-y-6">
            <ResourceItem name="prod-db-cluster" type="RDS" cost="$1,240.50" change="+2.4%" status="healthy" />
            <ResourceItem name="api-server-group" type="EC2" cost="$980.20" change="-1.2%" status="healthy" />
            <ResourceItem name="static-assets-cdn" type="CloudFront" cost="$450.00" change="+14.5%" status="warning" />
            <ResourceItem name="ml-training-node" type="EC2" cost="$320.10" change="0.0%" status="healthy" />
            <ResourceItem name="archive-storage" type="S3" cost="$280.40" change="-5.2%" status="healthy" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, trendUp, icon: Icon, color }: any) {
  const colors: any = {
    primary: "text-primary bg-primary/10",
    lime: "text-lime-400 bg-lime-400/10",
    blue: "text-blue-400 bg-blue-400/10",
    purple: "text-purple-400 bg-purple-400/10",
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass rounded-3xl p-6 border border-white/5 flex flex-col gap-4 relative overflow-hidden group"
    >
      <div className="flex items-center justify-between">
        <div className={cn("p-3 rounded-2xl", colors[color] || colors.primary)}>
          <Icon size={24} />
        </div>
        <div className={cn("text-xs font-bold px-2 py-1 rounded-lg", trendUp ? "text-red-400 bg-red-400/10" : "text-primary bg-primary/10")}>
          {trend}
        </div>
      </div>
      <div>
        <div className="text-sm font-medium text-muted-foreground mb-1">{title}</div>
        <div className="text-3xl font-bold">{value}</div>
      </div>
      <div className="absolute -bottom-6 -right-6 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all">
        <Icon size={120} />
      </div>
    </motion.div>
  );
}

function ResourceItem({ name, type, cost, change, status }: any) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors",
          status === 'warning' ? 'border-orange-400/50' : ''
        )}>
          {type === 'EC2' && <Cpu size={18} className="text-blue-400" />}
          {type === 'RDS' && <Database size={18} className="text-purple-400" />}
          {type === 'S3' && <Cloud size={18} className="text-primary" />}
          {type === 'CloudFront' && <Zap size={18} className="text-orange-400" />}
        </div>
        <div>
          <div className="text-sm font-bold group-hover:text-primary transition-colors">{name}</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{type}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-bold">{cost}</div>
        <div className={cn("text-[10px] font-bold", change.startsWith('+') ? 'text-red-400' : 'text-primary')}>
          {change}
        </div>
      </div>
    </div>
  );
}
