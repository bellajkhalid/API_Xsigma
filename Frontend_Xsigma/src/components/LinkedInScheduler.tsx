import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  Calendar, Clock, Send, Save, Image, Link,
  Hash, Users, Globe, Eye, Plus, Edit3,
  Trash2, Copy, BarChart3, Target, Zap
} from "lucide-react";

export default function LinkedInScheduler() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('compose');
  const [showTemplates, setShowTemplates] = useState(false);

  // Mock scheduled posts data
  const [scheduledPosts, setScheduledPosts] = useState([
    {
      id: 1,
      content: "Excited to share our latest research on volatility forecasting! Our new ensemble method improves VIX prediction accuracy by 23%. 📊\n\n#QuantitativeFinance #Research #MachineLearning",
      scheduledDate: "2024-01-20T10:00:00",
      status: "scheduled",
      type: "research",
      media: null,
      hashtags: ["QuantitativeFinance", "Research", "MachineLearning"],
      targetAudience: "Financial Professionals"
    },
    {
      id: 2,
      content: "🚀 Product Update: Our real-time volatility API now supports SABR and Heston models with sub-millisecond latency!\n\nKey features:\n• Real-time calibration\n• Enterprise-grade reliability\n• Comprehensive documentation\n\n#ProductLaunch #API #FinTech",
      scheduledDate: "2024-01-22T14:30:00",
      status: "scheduled",
      type: "product",
      media: "https://via.placeholder.com/400x200/3b82f6/ffffff?text=API+Launch",
      hashtags: ["ProductLaunch", "API", "FinTech"],
      targetAudience: "Developers & CTOs"
    },
    {
      id: 3,
      content: "Speaking at the FinTech Innovation Summit next week! 🎤\n\nI'll be discussing 'The Future of Quantitative APIs' and how we're democratizing access to institutional-grade tools.\n\nSee you there! #FinTechSummit #Speaking",
      scheduledDate: "2024-01-25T09:15:00",
      status: "draft",
      type: "event",
      media: null,
      hashtags: ["FinTechSummit", "Speaking"],
      targetAudience: "Industry Leaders"
    }
  ]);

  const [newPost, setNewPost] = useState({
    content: "",
    scheduledDate: "",
    scheduledTime: "",
    type: "insight",
    hashtags: [],
    targetAudience: "All",
    media: null
  });

  // Content templates
  const templates = {
    research: {
      title: "Research Announcement",
      content: "💡 Excited to share our latest research findings!\n\nOur team has discovered [KEY_FINDING] which shows [IMPACT_PERCENTAGE]% improvement in [METRIC].\n\nKey insights:\n• [INSIGHT_1]\n• [INSIGHT_2]\n• [INSIGHT_3]\n\nFull research available: [LINK]\n\n#QuantitativeFinance #Research #DataScience",
      hashtags: ["QuantitativeFinance", "Research", "DataScience"]
    },
    product: {
      title: "Product Launch",
      content: "🚀 Product Launch Alert!\n\nWe're thrilled to announce [PRODUCT_NAME]!\n\n✨ Key features:\n• [FEATURE_1]\n• [FEATURE_2]\n• [FEATURE_3]\n\nThis represents [TIME_PERIOD] of development to bring [VALUE_PROPOSITION].\n\nTry it now: [LINK]\n\n#ProductLaunch #Innovation #FinTech",
      hashtags: ["ProductLaunch", "Innovation", "FinTech"]
    },
    insight: {
      title: "Market Insight",
      content: "📈 Market Insight:\n\n[OBSERVATION] suggests that [TREND] is emerging in [MARKET_SEGMENT].\n\nWhat this means:\n• [IMPLICATION_1]\n• [IMPLICATION_2]\n• [IMPLICATION_3]\n\nWhat are your thoughts on this trend?\n\n#MarketInsights #FinanceInsights #TradingInsights",
      hashtags: ["MarketInsights", "FinanceInsights", "TradingInsights"]
    },
    achievement: {
      title: "Achievement/Milestone",
      content: "🏆 Milestone Alert!\n\nProud to announce that [ACHIEVEMENT]!\n\n[DETAILS_OR_STORY]\n\nThis wouldn't have been possible without [ACKNOWLEDGMENTS].\n\nThank you to everyone who made this possible! 🙏\n\n#Achievement #Milestone #Grateful",
      hashtags: ["Achievement", "Milestone", "Grateful"]
    }
  };

  const handleSchedulePost = () => {
    const post = {
      id: Date.now(),
      content: newPost.content,
      scheduledDate: `${newPost.scheduledDate}T${newPost.scheduledTime}:00`,
      status: "scheduled",
      type: newPost.type,
      media: newPost.media,
      hashtags: newPost.hashtags,
      targetAudience: newPost.targetAudience
    };
    
    setScheduledPosts([...scheduledPosts, post]);
    setNewPost({
      content: "",
      scheduledDate: "",
      scheduledTime: "",
      type: "insight",
      hashtags: [],
      targetAudience: "All",
      media: null
    });
  };

  const useTemplate = (template) => {
    setNewPost({
      ...newPost,
      content: template.content,
      hashtags: template.hashtags
    });
    setShowTemplates(false);
  };

  const addHashtag = (hashtag) => {
    if (!newPost.hashtags.includes(hashtag)) {
      setNewPost({
        ...newPost,
        hashtags: [...newPost.hashtags, hashtag]
      });
    }
  };

  const removeHashtag = (hashtag) => {
    setNewPost({
      ...newPost,
      hashtags: newPost.hashtags.filter(h => h !== hashtag)
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'text-blue-500 bg-blue-100 dark:bg-blue-900';
      case 'draft': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900';
      case 'published': return 'text-green-500 bg-green-100 dark:bg-green-900';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-900';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'research': return BarChart3;
      case 'product': return Zap;
      case 'event': return Calendar;
      case 'insight': return Target;
      default: return Globe;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Content Scheduler</h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Plan and schedule your LinkedIn content for maximum impact
          </p>
        </div>
        <Button
          onClick={() => setShowTemplates(!showTemplates)}
          variant="outline"
          className="rounded-lg"
        >
          <Copy className="w-4 h-4 mr-2" />
          Templates
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className={`flex gap-1 p-1 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
        {[
          { id: 'compose', label: 'Compose', icon: Edit3 },
          { id: 'scheduled', label: 'Scheduled', icon: Calendar },
          { id: 'analytics', label: 'Performance', icon: BarChart3 }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md transition-all ${
                activeTab === tab.id
                  ? isDark ? 'bg-black text-white shadow-lg' : 'bg-white text-black shadow-lg'
                  : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Templates Modal */}
      <AnimatePresence>
        {showTemplates && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowTemplates(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`max-w-4xl w-full max-h-[80vh] overflow-y-auto rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-6">Content Templates</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(templates).map(([key, template]) => (
                    <div
                      key={key}
                      className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'} cursor-pointer hover:border-blue-500 transition-colors`}
                      onClick={() => useTemplate(template)}
                    >
                      <h4 className="font-medium mb-2">{template.title}</h4>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3 line-clamp-3`}>
                        {template.content.substring(0, 100)}...
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {template.hashtags.slice(0, 3).map((hashtag) => (
                          <span key={hashtag} className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                            #{hashtag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'compose' && (
          <motion.div
            key="compose"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}
          >
            <h3 className="text-lg font-semibold mb-6">Compose New Post</h3>
            
            <div className="space-y-6">
              {/* Content Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Content Type</label>
                <select
                  value={newPost.type}
                  onChange={(e) => setNewPost({ ...newPost, type: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'}`}
                >
                  <option value="insight">Market Insight</option>
                  <option value="research">Research Announcement</option>
                  <option value="product">Product Update</option>
                  <option value="achievement">Achievement/Milestone</option>
                  <option value="event">Event/Speaking</option>
                </select>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium mb-2">Post Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="What would you like to share with your professional network?"
                  rows={8}
                  className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} resize-none`}
                />
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                  {newPost.content.length}/3000 characters
                </div>
              </div>

              {/* Hashtags */}
              <div>
                <label className="block text-sm font-medium mb-2">Hashtags</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {newPost.hashtags.map((hashtag) => (
                    <span
                      key={hashtag}
                      className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'} flex items-center gap-2`}
                    >
                      #{hashtag}
                      <button
                        onClick={() => removeHashtag(hashtag)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {['QuantitativeFinance', 'FinTech', 'Research', 'Innovation', 'API', 'DataScience'].map((hashtag) => (
                    <button
                      key={hashtag}
                      onClick={() => addHashtag(hashtag)}
                      className={`px-3 py-1 rounded-full text-sm border ${isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'} transition-colors`}
                    >
                      #{hashtag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scheduling */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Schedule Date</label>
                  <input
                    type="date"
                    value={newPost.scheduledDate}
                    onChange={(e) => setNewPost({ ...newPost, scheduledDate: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Schedule Time</label>
                  <input
                    type="time"
                    value={newPost.scheduledTime}
                    onChange={(e) => setNewPost({ ...newPost, scheduledTime: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Target Audience</label>
                  <select
                    value={newPost.targetAudience}
                    onChange={(e) => setNewPost({ ...newPost, targetAudience: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'}`}
                  >
                    <option value="All">All Connections</option>
                    <option value="Financial Professionals">Financial Professionals</option>
                    <option value="Developers & CTOs">Developers & CTOs</option>
                    <option value="Industry Leaders">Industry Leaders</option>
                    <option value="Researchers">Researchers</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  onClick={handleSchedulePost}
                  disabled={!newPost.content || !newPost.scheduledDate || !newPost.scheduledTime}
                  className={`${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg`}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Post
                </Button>
                <Button variant="outline" className="rounded-lg">
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button variant="outline" className="rounded-lg">
                  <Send className="w-4 h-4 mr-2" />
                  Post Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'scheduled' && (
          <motion.div
            key="scheduled"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {scheduledPosts.map((post, i) => {
              const TypeIcon = getTypeIcon(post.type);
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <TypeIcon className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                      <div>
                        <div className="font-medium capitalize">{post.type} Post</div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {new Date(post.scheduledDate).toLocaleDateString()} at {new Date(post.scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4 line-clamp-3`}>
                    {post.content}
                  </p>
                  
                  {post.media && (
                    <img src={post.media} alt="" className="w-full h-32 object-cover rounded-lg mb-4" />
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.hashtags.slice(0, 3).map((hashtag) => (
                        <span key={hashtag} className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                          #{hashtag}
                        </span>
                      ))}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Target: {post.targetAudience}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
