import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardSpotlight } from "./CardSpotlight";
import { useTheme } from "@/contexts/ThemeContext";

const PricingTier = ({
  name,
  price,
  description,
  features,
  isPopular,
  theme,
  isDark,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  theme: any;
  isDark: boolean;
}) => (
  <CardSpotlight className={`h-full ${isPopular ? "border-primary" : theme.borderColor} border-2 ${isDark ? 'bg-gray-900/80' : 'bg-white/95'} pricing-card-hover`}>
    <div className="relative h-full p-6 flex flex-col">
      {isPopular && (
        <span className="text-xs font-medium bg-primary/10 text-primary rounded-full px-3 py-1 w-fit mb-4">
          Most Popular
        </span>
      )}
      <h3 className={`text-xl font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{name}</h3>
      <div className="mb-4">
        <span className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{price}</span>
        {price !== "Custom" && <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>/month</span>}
      </div>
      <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" />
            <span className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="button-gradient w-full">
        Get Started
      </Button>
    </div>
  </CardSpotlight>
);

export const PricingSection = () => {
  const { getThemeClasses, isDark } = useTheme();
  const theme = getThemeClasses();

  return (
    <section className="container px-4 py-24">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-5xl md:text-6xl font-normal mb-6`}
        >
          <span className={isDark ? 'text-white' : 'text-black'}>Choose Your</span>{" "}
          <span className="text-gradient font-medium">XSigma Package</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className={`text-lg ${theme.textMuted}`}
        >
          Select the perfect XSigma configuration for your quantitative analysis needs
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <PricingTier
          name="Academic"
          price="Free"
          description="Perfect for research and educational use"
          features={[
            "Core mathematical libraries",
            "Basic Python bindings",
            "Documentation access",
            "Community support"
          ]}
          theme={theme}
          isDark={isDark}
        />
        <PricingTier
          name="Professional"
          price="Contact"
          description="Advanced features for quantitative analysts"
          features={[
            "Full C++ framework",
            "GPU acceleration (CUDA)",
            "Parallel processing (MPI)",
            "Professional support",
            "Performance optimization"
          ]}
          isPopular
          theme={theme}
          isDark={isDark}
        />
        <PricingTier
          name="Enterprise"
          price="Custom"
          description="Enterprise-grade solutions for institutions"
          features={[
            "Custom deployment solutions",
            "Unlimited computational resources",
            "High-frequency trading support",
            "Dedicated engineering team",
            "Custom module development",
            "24/7 enterprise support"
          ]}
          theme={theme}
          isDark={isDark}
        />
      </div>
    </section>
  );
};