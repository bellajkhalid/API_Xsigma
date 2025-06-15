import { Github, Twitter } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "@/contexts/ThemeContext";

const Footer = () => {
  const { getThemeClasses } = useTheme();
  const theme = getThemeClasses();

  return (
    <footer className="w-full py-12 mt-20">
      <div className="container px-4">
        <div className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border rounded-xl p-8`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className={`font-medium text-lg ${theme.text}`}>XsigmaSolution</h3>
              <p className={`text-sm ${theme.textMuted}`}>
                Empowering traders with advanced crypto trading solutions.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Github className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className={`font-medium ${theme.text}`}>Trading</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className={`text-sm ${theme.textMuted} hover:text-primary transition-colors`}>
                    Markets
                  </a>
                </li>
                <li>
                  <a href="#pricing" className={`text-sm ${theme.textMuted} hover:text-primary transition-colors`}>
                    Trading Fees
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className={`font-medium ${theme.text}`}>Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className={`text-sm ${theme.textMuted} hover:text-primary transition-colors`}>
                    Trading Guide
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-sm ${theme.textMuted} hover:text-primary transition-colors`}>
                    Market Analysis
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className={`font-medium ${theme.text}`}>Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className={`text-sm ${theme.textMuted} hover:text-primary transition-colors`}>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-sm ${theme.textMuted} hover:text-primary transition-colors`}>
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className={`mt-8 pt-8 border-t ${theme.borderColor}`}>
            <p className={`text-sm ${theme.textMuted} text-center`}>
              © {new Date().getFullYear()} Rezaul Arif. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;