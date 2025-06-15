"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { useTheme } from "@/contexts/ThemeContext";

const testimonials = [
  {
    name: "Dr. Michael Chen",
    role: "Quantitative Analyst",
    image: "https://avatars.githubusercontent.com/u/1234567?v=4",
    content: "XSigma's high-performance computing capabilities have revolutionized our quantitative models. The C++ framework with Python bindings provides the perfect balance of speed and flexibility."
  },
  {
    name: "Sarah Johnson",
    role: "Risk Management Director",
    image: "https://avatars.githubusercontent.com/u/2345678?v=4",
    content: "The modular architecture of XSigma allows us to customize our risk calculations precisely. The GPU acceleration has reduced our computation time by 80%."
  },
  {
    name: "Dr. David Wilson",
    role: "Computational Finance Researcher",
    image: "https://avatars.githubusercontent.com/u/3456789?v=4",
    content: "XSigma's mathematical libraries are exceptionally robust. The PDE solvers and Monte Carlo simulations have enabled breakthrough research in our derivatives pricing models."
  },
  {
    name: "Emily Zhang",
    role: "Algorithmic Trading Lead",
    image: "https://avatars.githubusercontent.com/u/4567890?v=4",
    content: "The parallel processing capabilities via MPI have transformed our high-frequency trading infrastructure. XSigma handles massive computational loads with remarkable efficiency."
  },
  {
    name: "Prof. James Rodriguez",
    role: "Financial Engineering Professor",
    image: "https://avatars.githubusercontent.com/u/5678901?v=4",
    content: "We've integrated XSigma into our academic curriculum. The comprehensive documentation and Python bindings make it accessible for students while maintaining professional-grade performance."
  },
  {
    name: "Lisa Thompson",
    role: "Portfolio Optimization Specialist",
    image: "https://avatars.githubusercontent.com/u/6789012?v=4",
    content: "XSigma's vectorization capabilities have accelerated our portfolio optimization algorithms significantly. The seamless integration with our existing Python workflows is outstanding."
  }
];

const TestimonialsSection = () => {
  const { getThemeClasses } = useTheme();
  const theme = getThemeClasses();

  return (
    <section className={`py-20 overflow-hidden ${theme.background}`}>
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className={`text-5xl font-corporate font-normal mb-4 ${theme.text}`}>Trusted by Quants</h2>
          <p className={`${theme.textMuted} text-lg font-clean`}>
            Join leading quantitative finance professionals using XSigma
          </p>
        </motion.div>

        <div className="relative flex flex-col antialiased">
          <div className="relative flex overflow-hidden py-4">
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={`${index}-1`} className={`w-[400px] shrink-0 ${theme.cardBg} backdrop-blur-xl ${theme.borderColor} hover:border-primary/20 transition-all duration-300 p-8`}>
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className={`font-corporate font-medium ${theme.text}`}>{testimonial.name}</h4>
                      <p className={`text-sm ${theme.textMuted} font-clean`}>{testimonial.role}</p>
                    </div>
                  </div>
                  <p className={`${theme.textSecondary} leading-relaxed font-clean`}>
                    {testimonial.content}
                  </p>
                </Card>
              ))}
            </div>
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={`${index}-2`} className={`w-[400px] shrink-0 ${theme.cardBg} backdrop-blur-xl ${theme.borderColor} hover:border-primary/20 transition-all duration-300 p-8`}>
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className={`font-corporate font-medium ${theme.text}`}>{testimonial.name}</h4>
                      <p className={`text-sm ${theme.textMuted} font-clean`}>{testimonial.role}</p>
                    </div>
                  </div>
                  <p className={`${theme.textSecondary} leading-relaxed font-clean`}>
                    {testimonial.content}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;