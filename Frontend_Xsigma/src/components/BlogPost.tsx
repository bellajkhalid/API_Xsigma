import { motion } from "framer-motion";
import { Calendar, Clock, User, Tag, ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/ThemeToggle";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

interface BlogPostProps {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
}

const BlogPost = ({ post }: { post: BlogPostProps }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleBackToBlog = () => {
    navigate('/blog');
  };

  const renderContent = () => {
    if (post.content.startsWith('http')) {
      return (
        <div className="text-center py-12">
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
            This article is available as an external publication.
          </p>
          <Button
            onClick={() => window.open(post.content, '_blank')}
            className={`${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} rounded-lg px-6 py-3`}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Read Full Paper
          </Button>
        </div>
      );
    }

    return (
      <div 
        className={`prose prose-lg max-w-none ${isDark ? 'prose-invert' : ''}`}
        dangerouslySetInnerHTML={{ __html: post.content }}
        style={{
          '--tw-prose-body': isDark ? '#e5e7eb' : '#374151',
          '--tw-prose-headings': isDark ? '#ffffff' : '#111827',
          '--tw-prose-links': isDark ? '#60a5fa' : '#2563eb',
          '--tw-prose-bold': isDark ? '#ffffff' : '#111827',
          '--tw-prose-counters': isDark ? '#9ca3af' : '#6b7280',
          '--tw-prose-bullets': isDark ? '#9ca3af' : '#6b7280',
          '--tw-prose-hr': isDark ? '#374151' : '#e5e7eb',
          '--tw-prose-quotes': isDark ? '#e5e7eb' : '#111827',
          '--tw-prose-quote-borders': isDark ? '#374151' : '#e5e7eb',
          '--tw-prose-captions': isDark ? '#9ca3af' : '#6b7280',
          '--tw-prose-code': isDark ? '#e5e7eb' : '#111827',
          '--tw-prose-pre-code': isDark ? '#e5e7eb' : '#e5e7eb',
          '--tw-prose-pre-bg': isDark ? '#1f2937' : '#f9fafb',
          '--tw-prose-th-borders': isDark ? '#374151' : '#d1d5db',
          '--tw-prose-td-borders': isDark ? '#374151' : '#e5e7eb',
        } as React.CSSProperties}
      />
    );
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300`}>
      <ThemeToggle />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] pt-32 pb-20">
        <AnimatedBackground />
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <Button
                variant="ghost"
                onClick={handleBackToBlog}
                className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} p-0 h-auto mb-4`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className={`px-3 py-1 text-sm font-medium ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'} rounded-full`}>
                {post.category}
              </span>
              <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString()}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-4xl md:text-5xl font-light ${isDark ? 'text-white' : 'text-black'} mb-6 leading-tight`}
            >
              {post.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`flex items-center gap-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-8`}
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}
            >
              {post.excerpt}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className={`py-16 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className={`${isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} border rounded-none p-8 md:p-12`}
            >
              {renderContent()}
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Tag className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-xs ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'} rounded-full`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
