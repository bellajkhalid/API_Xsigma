import { motion } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

export type Feature = { title: string; description: string };

type SolutionPageProps = {
  title: string;
  subtitle?: string;
  description?: string;
  features?: Feature[];
  highlight?: { label: string; value: string }[];
};

const SolutionPage = ({ title, subtitle, description, features = [], highlight = [] }: SolutionPageProps) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors`}>
      <ThemeToggle />
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[60vh] pt-28 pb-16 overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-4">
              <span className={`finance-caption px-3 py-1 rounded-full ${isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'} border ${isDark ? 'border-blue-800' : 'border-blue-200'}`}>
                Production-Tested
              </span>
            </div>
            <h1 className="finance-heading text-4xl md:text-5xl mb-4">{title}</h1>
            {subtitle && <div className={`finance-subheading text-lg ${isDark ? 'text-blue-300' : 'text-blue-700'} mb-3`}>{subtitle}</div>}
            {description && <p className={`finance-body text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-4xl mx-auto`}>{description}</p>}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className={`finance-button ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-xsigma-navy text-white hover:bg-opacity-90'} rounded-none px-8 py-3`}
                onClick={() => navigate('/register-interest')}
              >
                <span className="relative z-10">Request Demo</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`finance-button ${isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-xsigma-navy text-xsigma-navy hover:bg-xsigma-navy hover:text-white'} rounded-none px-8 py-3`}
                onClick={() => window.open('/sphinx-doc/xsigma-1.1-3/index.html', '_blank')}
              >
                <span className="relative z-10">Technical Documentation</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      {!!highlight.length && (
        <section className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-12`}
        >
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {highlight.map((h) => (
                <div key={h.label} className={`text-center p-4 border ${isDark ? 'border-gray-700' : 'border-gray-200'} rounded-lg`}> 
                  <div className={`text-2xl font-semibold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>{h.value}</div>
                  <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{h.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features + Illustrations */}
      {!!features.length && (
        <section className={`${isDark ? 'bg-black' : 'bg-white'} py-16`}>
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto items-center">
              <div className="space-y-6">
                {features.map((f) => (
                  <div key={f.title}>
                    <h3 className={`text-xl font-medium ${isDark ? 'text-white' : 'text-black'}`}>{f.title}</h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mt-2`}>{f.description}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* Soft gradient image placeholders */}
                <div className="aspect-video rounded-xl" style={{ background: isDark ? 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.15))' : 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(6,182,212,0.18))' }} />
                <div className="aspect-video rounded-xl" style={{ background: isDark ? 'linear-gradient(135deg, rgba(139,92,246,0.18), rgba(16,185,129,0.15))' : 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(16,185,129,0.18))' }} />
                <div className="aspect-square rounded-xl" style={{ background: isDark ? 'radial-gradient(circle at 30% 30%, rgba(59,130,246,0.25), transparent 60%)' : 'radial-gradient(circle at 30% 30%, rgba(59,130,246,0.35), transparent 60%)' }} />
                <div className="aspect-square rounded-xl" style={{ background: isDark ? 'radial-gradient(circle at 70% 70%, rgba(6,182,212,0.25), transparent 60%)' : 'radial-gradient(circle at 70% 70%, rgba(6,182,212,0.35), transparent 60%)' }} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA strip */}
      <section className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-16`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-light mb-4">Prêt à démarrer ?</h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>Contactez‑nous pour une démonstration et un accès API.</p>
            <Button
              size="lg"
              className={`${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} rounded-none`}
              onClick={() => navigate('/register-interest')}
            >
              Register Interest
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionPage;

