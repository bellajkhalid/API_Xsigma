import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  TrendingUp, Users, Eye, MessageCircle, Share2,
  Calendar, Target, Award, Globe, BarChart3,
  ArrowUp, ArrowDown, RefreshCw, Download
} from "lucide-react";
import {
  LineChart as RechartsLineChart,
  AreaChart,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  Bar,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function LinkedInAnalytics() {
  const { isDark } = useTheme();
  const [timeRange, setTimeRange] = useState('30d');
  const [isLoading, setIsLoading] = useState(false);

  // Mock analytics data - in real app, this would come from LinkedIn Analytics API
  const analyticsData = {
    overview: {
      profileViews: { current: 1247, change: 23.5, trend: 'up' },
      postImpressions: { current: 15420, change: 18.2, trend: 'up' },
      engagement: { current: 8.7, change: -2.1, trend: 'down' },
      followers: { current: 892, change: 12.3, trend: 'up' },
      connections: { current: 534, change: 5.8, trend: 'up' },
      searchAppearances: { current: 89, change: 34.2, trend: 'up' }
    },
    
    chartData: {
      profileViews: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        views: Math.floor(Math.random() * 50) + 20 + (i * 2),
        uniqueViews: Math.floor(Math.random() * 30) + 15 + i
      })),
      
      postPerformance: [
        { name: 'Research Posts', impressions: 4200, engagement: 380, clicks: 89 },
        { name: 'Product Updates', impressions: 3800, engagement: 420, clicks: 156 },
        { name: 'Industry Insights', impressions: 3200, engagement: 290, clicks: 78 },
        { name: 'Company News', impressions: 2100, engagement: 180, clicks: 45 },
        { name: 'Thought Leadership', impressions: 2900, engagement: 340, clicks: 92 }
      ],
      
      audienceGrowth: Array.from({ length: 12 }, (_, i) => ({
        month: new Date(Date.now() - (11 - i) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' }),
        followers: 450 + (i * 35) + Math.floor(Math.random() * 20),
        connections: 300 + (i * 20) + Math.floor(Math.random() * 15)
      })),
      
      demographics: [
        { name: 'Financial Services', value: 35, count: 312 },
        { name: 'Technology', value: 28, count: 250 },
        { name: 'Consulting', value: 15, count: 134 },
        { name: 'Academia', value: 12, count: 107 },
        { name: 'Other', value: 10, count: 89 }
      ]
    },
    
    topPosts: [
      {
        id: 1,
        content: "Excited to announce our new volatility modeling API! 🚀",
        date: "2024-01-15",
        impressions: 2840,
        engagement: 187,
        clicks: 45,
        engagementRate: 6.6
      },
      {
        id: 2,
        content: "Key insights from our latest quantitative research...",
        date: "2024-01-12",
        impressions: 2156,
        engagement: 143,
        clicks: 32,
        engagementRate: 6.6
      },
      {
        id: 3,
        content: "Speaking at FinTech Innovation Summit next week...",
        date: "2024-01-10",
        impressions: 1923,
        engagement: 98,
        clicks: 28,
        engagementRate: 5.1
      }
    ],
    
    competitors: [
      { name: 'QuantLib', followers: 2340, engagement: 4.2 },
      { name: 'Bloomberg API', followers: 8920, engagement: 3.8 },
      { name: 'Refinitiv', followers: 12450, engagement: 2.9 },
      { name: 'Alpha Architect', followers: 1890, engagement: 5.1 }
    ]
  };

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const MetricCard = ({ title, value, change, trend, icon: Icon, format = 'number' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
        <div className={`flex items-center gap-1 text-sm ${
          trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500'
        }`}>
          {trend === 'up' ? <ArrowUp className="w-4 h-4" /> : trend === 'down' ? <ArrowDown className="w-4 h-4" /> : null}
          {Math.abs(change)}%
        </div>
      </div>
      <div className="text-3xl font-bold mb-1">
        {format === 'percentage' ? `${value}%` : value.toLocaleString()}
      </div>
      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{title}</div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">LinkedIn Analytics</h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Track your professional presence and content performance
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'}`}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button
            onClick={refreshData}
            disabled={isLoading}
            variant="outline"
            className="rounded-lg"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" className="rounded-lg">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <MetricCard
          title="Profile Views"
          value={analyticsData.overview.profileViews.current}
          change={analyticsData.overview.profileViews.change}
          trend={analyticsData.overview.profileViews.trend}
          icon={Eye}
        />
        <MetricCard
          title="Post Impressions"
          value={analyticsData.overview.postImpressions.current}
          change={analyticsData.overview.postImpressions.change}
          trend={analyticsData.overview.postImpressions.trend}
          icon={BarChart3}
        />
        <MetricCard
          title="Engagement Rate"
          value={analyticsData.overview.engagement.current}
          change={analyticsData.overview.engagement.change}
          trend={analyticsData.overview.engagement.trend}
          icon={MessageCircle}
          format="percentage"
        />
        <MetricCard
          title="Followers"
          value={analyticsData.overview.followers.current}
          change={analyticsData.overview.followers.change}
          trend={analyticsData.overview.followers.trend}
          icon={Users}
        />
        <MetricCard
          title="Connections"
          value={analyticsData.overview.connections.current}
          change={analyticsData.overview.connections.change}
          trend={analyticsData.overview.connections.trend}
          icon={Globe}
        />
        <MetricCard
          title="Search Appearances"
          value={analyticsData.overview.searchAppearances.current}
          change={analyticsData.overview.searchAppearances.change}
          trend={analyticsData.overview.searchAppearances.trend}
          icon={Target}
        />
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Profile Views Chart */}
        <div className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
          <h3 className="text-lg font-semibold mb-4">Profile Views Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData.chartData.profileViews}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="date" stroke={isDark ? '#9ca3af' : '#6b7280'} fontSize={12} />
              <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px'
                }}
              />
              <Area type="monotone" dataKey="views" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Area type="monotone" dataKey="uniqueViews" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Post Performance */}
        <div className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
          <h3 className="text-lg font-semibold mb-4">Post Performance by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={analyticsData.chartData.postPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="name" stroke={isDark ? '#9ca3af' : '#6b7280'} fontSize={12} />
              <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="impressions" fill="#3b82f6" />
              <Bar dataKey="engagement" fill="#10b981" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Audience Growth & Demographics */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Audience Growth */}
        <div className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
          <h3 className="text-lg font-semibold mb-4">Audience Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={analyticsData.chartData.audienceGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="month" stroke={isDark ? '#9ca3af' : '#6b7280'} fontSize={12} />
              <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="followers" stroke="#3b82f6" strokeWidth={3} />
              <Line type="monotone" dataKey="connections" stroke="#10b981" strokeWidth={3} />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>

        {/* Audience Demographics */}
        <div className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
          <h3 className="text-lg font-semibold mb-4">Audience by Industry</h3>
          <div className="grid grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={analyticsData.chartData.demographics}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ value }) => `${value}%`}
                >
                  {analyticsData.chartData.demographics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {analyticsData.chartData.demographics.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5] }}
                    ></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{item.count}</div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Posts & Competitor Analysis */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Performing Posts */}
        <div className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
          <h3 className="text-lg font-semibold mb-4">Top Performing Posts</h3>
          <div className="space-y-4">
            {analyticsData.topPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm line-clamp-2 flex-1">{post.content}</p>
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} ml-4`}>{post.date}</span>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="font-medium">{post.impressions.toLocaleString()}</div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Impressions</div>
                  </div>
                  <div>
                    <div className="font-medium">{post.engagement}</div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Engagement</div>
                  </div>
                  <div>
                    <div className="font-medium">{post.clicks}</div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Clicks</div>
                  </div>
                  <div>
                    <div className="font-medium text-green-500">{post.engagementRate}%</div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Rate</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Competitor Analysis */}
        <div className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
          <h3 className="text-lg font-semibold mb-4">Competitor Benchmarking</h3>
          <div className="space-y-4">
            {analyticsData.competitors.map((competitor, i) => (
              <motion.div
                key={competitor.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{competitor.name}</span>
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="font-medium">{competitor.followers.toLocaleString()}</span>
                      <span className={`ml-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>followers</span>
                    </div>
                    <div>
                      <span className="font-medium">{competitor.engagement}%</span>
                      <span className={`ml-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>engagement</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className={`flex-1 h-2 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: `${Math.min((competitor.followers / 15000) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className={`flex-1 h-2 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                    <div
                      className="h-2 bg-green-500 rounded-full"
                      style={{ width: `${(competitor.engagement / 6) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
