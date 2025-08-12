import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

// Reusable Animated Background extracted from Home page
const AnimatedBackground = () => {
  const { isDark } = useTheme();
  const [scrollY, setScrollY] = useState(0);

  const networkNodes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: (i * 23 + 15) % 85 + 10,
    y: (i * 31 + 20) % 70 + 15,
    size: Math.random() * 4 + 2,
    speed: Math.random() * 0.5 + 0.2
  }));

  const flowingParticles = Array.from({ length: 25 }, (_, i) => i);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isDark
            ? [
                'radial-gradient(ellipse 120% 80% at 50% 0%, rgba(59, 130, 246, 0.15) 0%, rgba(6, 182, 212, 0.1) 30%, rgba(20, 184, 166, 0.08) 60%, rgba(0, 0, 0, 1) 100%)',
                'radial-gradient(ellipse 100% 90% at 30% 20%, rgba(6, 182, 212, 0.15) 0%, rgba(20, 184, 166, 0.1) 30%, rgba(59, 130, 246, 0.08) 60%, rgba(0, 0, 0, 1) 100%)',
                'radial-gradient(ellipse 110% 85% at 70% 10%, rgba(20, 184, 166, 0.15) 0%, rgba(59, 130, 246, 0.1) 30%, rgba(6, 182, 212, 0.08) 60%, rgba(0, 0, 0, 1) 100%)',
              ]
            : [
                'radial-gradient(ellipse 120% 80% at 50% 0%, rgba(59, 130, 246, 0.25) 0%, rgba(6, 182, 212, 0.18) 30%, rgba(20, 184, 166, 0.15) 60%, rgba(240, 249, 255, 1) 100%)',
                'radial-gradient(ellipse 100% 90% at 30% 20%, rgba(6, 182, 212, 0.25) 0%, rgba(20, 184, 166, 0.18) 30%, rgba(59, 130, 246, 0.15) 60%, rgba(236, 254, 255, 1) 100%)',
                'radial-gradient(ellipse 110% 85% at 70% 10%, rgba(20, 184, 166, 0.25) 0%, rgba(59, 130, 246, 0.18) 30%, rgba(6, 182, 212, 0.15) 60%, rgba(240, 253, 255, 1) 100%)',
              ]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0"
        animate={{
          background: isDark
            ? [
                'linear-gradient(45deg, transparent 0%, rgba(59, 130, 246, 0.1) 25%, transparent 50%, rgba(6, 182, 212, 0.08) 75%, transparent 100%)',
                'linear-gradient(135deg, transparent 0%, rgba(6, 182, 212, 0.1) 25%, transparent 50%, rgba(20, 184, 166, 0.08) 75%, transparent 100%)',
                'linear-gradient(225deg, transparent 0%, rgba(20, 184, 166, 0.1) 25%, transparent 50%, rgba(59, 130, 246, 0.08) 75%, transparent 100%)',
                'linear-gradient(315deg, transparent 0%, rgba(59, 130, 246, 0.1) 25%, transparent 50%, rgba(6, 182, 212, 0.08) 75%, transparent 100%)',
              ]
            : [
                'linear-gradient(45deg, transparent 0%, rgba(59, 130, 246, 0.15) 25%, transparent 50%, rgba(6, 182, 212, 0.12) 75%, transparent 100%)',
                'linear-gradient(135deg, transparent 0%, rgba(6, 182, 212, 0.15) 25%, transparent 50%, rgba(20, 184, 166, 0.12) 75%, transparent 100%)',
                'linear-gradient(225deg, transparent 0%, rgba(20, 184, 166, 0.15) 25%, transparent 50%, rgba(59, 130, 246, 0.12) 75%, transparent 100%)',
                'linear-gradient(315deg, transparent 0%, rgba(59, 130, 246, 0.15) 25%, transparent 50%, rgba(6, 182, 212, 0.12) 75%, transparent 100%)',
              ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <svg className="absolute inset-0 w-full h-full opacity-30">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#3b82f6" : "#1d4ed8"} stopOpacity="0.6" />
            <stop offset="50%" stopColor={isDark ? "#06b6d4" : "#0891b2"} stopOpacity="0.4" />
            <stop offset="100%" stopColor={isDark ? "#14b8a6" : "#0d9488"} stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {networkNodes.map((node, index) => {
          const nextNode = networkNodes[(index + 1) % networkNodes.length];
          const connectionNode = networkNodes[(index + 3) % networkNodes.length];
          return (
            <g key={`connections-${index}`}>
              <motion.line
                x1={`${node.x}%`} y1={`${node.y}%`}
                x2={`${nextNode.x}%`} y2={`${nextNode.y}%`}
                stroke="url(#connectionGradient)" strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 0], opacity: [0, 0.8, 0],
                  x1: `${node.x + Math.sin(Date.now() * 0.001 + index) * 5}%`,
                  y1: `${node.y + Math.cos(Date.now() * 0.001 + index) * 3}%`,
                }}
                transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
              />
              <motion.line
                x1={`${node.x}%`} y1={`${node.y}%`}
                x2={`${connectionNode.x}%`} y2={`${connectionNode.y}%`}
                stroke="url(#connectionGradient)" strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 0], opacity: [0, 0.5, 0] }}
                transition={{ duration: 6 + index * 0.3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
              />
            </g>
          );
        })}
      </svg>

      {networkNodes.map((node, index) => (
        <motion.div
          key={`node-${index}`}
          className="absolute rounded-full"
          style={{
            left: `${node.x}%`, top: `${node.y}%`, width: node.size * 3, height: node.size * 3,
            background: isDark
              ? `radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(6, 182, 212, 0.4) 70%, transparent 100%)`
              : `radial-gradient(circle, rgba(59, 130, 246, 0.9) 0%, rgba(6, 182, 212, 0.5) 70%, transparent 100%)`
          }}
          animate={{ x: [0, Math.sin(index * 0.5) * 30, 0], y: [0, Math.cos(index * 0.7) * 20, 0], scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8 + index * 0.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
        />
      ))}

      {flowingParticles.map((particle) => {
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const particleSize = Math.random() * 6 + 3;
        const flowDirection = particle % 3;
        return (
          <motion.div
            key={`particle-${particle}`}
            className="absolute rounded-full blur-sm"
            style={{
              width: particleSize, height: particleSize,
              background: isDark
                ? `radial-gradient(circle, rgba(${particle % 2 === 0 ? '59, 130, 246' : '6, 182, 212'}, 0.7) 0%, transparent 70%)`
                : `radial-gradient(circle, rgba(${particle % 2 === 0 ? '59, 130, 246' : '6, 182, 212'}, 0.8) 0%, transparent 70%)`
            }}
            initial={{ x: `${startX}%`, y: `${startY}%`, opacity: 0, scale: 0 }}
            animate={{
              x: flowDirection === 0 ? [`${startX}%`, `${(startX + 50) % 100}%`, `${startX}%`] : [`${startX}%`, `${(startX + 20) % 100}%`, `${startX}%`],
              y: flowDirection === 1 ? [`${startY}%`, `${(startY + 60) % 100}%`, `${startY}%`] : [`${startY}%`, `${(startY + 30) % 100}%`, `${startY}%`],
              opacity: [0, 0.8, 0.4, 0.9, 0],
              scale: [0, 1, 1.3, 0.8, 0],
            }}
            transition={{ duration: 12 + Math.random() * 8, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 10 }}
          />
        );
      })}

      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-40"
        style={{ left: '10%', top: '20%' }}
        animate={{
          x: [0, 100, -50, 80, 0], y: [0, -60, 40, -30, 0], scale: [1, 1.4, 0.8, 1.2, 1],
          background: isDark
            ? [
                'radial-gradient(ellipse, rgba(59, 130, 246, 0.4) 0%, rgba(6, 182, 212, 0.2) 50%, transparent 100%)',
                'radial-gradient(ellipse, rgba(6, 182, 212, 0.4) 0%, rgba(20, 184, 166, 0.2) 50%, transparent 100%)',
                'radial-gradient(ellipse, rgba(20, 184, 166, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)',
              ]
            : [
                'radial-gradient(ellipse, rgba(59, 130, 246, 0.5) 0%, rgba(6, 182, 212, 0.3) 50%, transparent 100%)',
                'radial-gradient(ellipse, rgba(6, 182, 212, 0.5) 0%, rgba(20, 184, 166, 0.3) 50%, transparent 100%)',
                'radial-gradient(ellipse, rgba(20, 184, 166, 0.5) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)',
              ]
        }}
        transition={{
          x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 25, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 15, repeat: Infinity, ease: "easeInOut" },
          background: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-30"
        style={{ right: '15%', bottom: '25%' }}
        animate={{
          x: [0, -80, 60, -40, 0], y: [0, 70, -45, 35, 0], scale: [1, 0.7, 1.3, 0.9, 1],
          background: isDark
            ? [
                'radial-gradient(ellipse, rgba(20, 184, 166, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)',
                'radial-gradient(ellipse, rgba(59, 130, 246, 0.4) 0%, rgba(6, 182, 212, 0.2) 50%, transparent 100%)',
                'radial-gradient(ellipse, rgba(6, 182, 212, 0.4) 0%, rgba(20, 184, 166, 0.2) 50%, transparent 100%)',
              ]
            : [
                'radial-gradient(ellipse, rgba(20, 184, 166, 0.5) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)',
                'radial-gradient(ellipse, rgba(59, 130, 246, 0.5) 0%, rgba(6, 182, 212, 0.3) 50%, transparent 100%)',
                'radial-gradient(ellipse, rgba(6, 182, 212, 0.5) 0%, rgba(20, 184, 166, 0.3) 50%, transparent 100%)',
              ]
        }}
        transition={{
          x: { duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 },
          y: { duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 },
          scale: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 7 },
          background: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.15)'} 50%, transparent 100%)` }}
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute inset-0 opacity-15"
        style={{ background: `linear-gradient(45deg, transparent 0%, ${isDark ? 'rgba(6, 182, 212, 0.08)' : 'rgba(6, 182, 212, 0.12)'} 50%, transparent 100%)` }}
        animate={{ x: ['100%', '-100%'], y: ['-50%', '50%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
      />

      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: isDark
            ? [
                'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 30%)',
                'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.1) 0%, transparent 70%)',
                'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 30%)',
              ]
            : [
                'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 30%)',
                'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 70%)',
                'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 30%)',
              ]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{ backgroundPosition: ['0px 0px', '50px 50px', '0px 0px'] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(45deg, rgba(16, 185, 129, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 60px 60px, 30px 30px'
        }}
      />
    </div>
  );
};

export default AnimatedBackground;

