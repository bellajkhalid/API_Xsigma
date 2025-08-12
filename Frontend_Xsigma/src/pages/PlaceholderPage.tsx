import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/ThemeToggle";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useTheme } from "@/contexts/ThemeContext";

const PlaceholderPage = ({ title, description }: { title: string; description?: string }) => {
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <ThemeToggle />
      <Navigation />
      <section className="relative min-h-[60vh] pt-28 pb-16">
        <AnimatedBackground />
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light mb-4">{title}</h1>
            {description && (
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-lg`}>{description}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlaceholderPage;

