import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  animationCount: number;
}

const AnimationDebugger: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    animationCount: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measurePerformance = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // Get memory usage if available
        const memory = (performance as any).memory;
        const memoryUsage = memory ? Math.round(memory.usedJSHeapSize / 1024 / 1024) : 0;
        
        // Count active animations (approximation)
        const animationCount = document.querySelectorAll('[data-framer-motion]').length;
        
        setMetrics({
          fps,
          memoryUsage,
          animationCount
        });
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measurePerformance);
    };

    if (isVisible) {
      measurePerformance();
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isVisible]);

  // Show debugger only in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-mono"
        style={{ fontSize: '12px' }}
      >
        🔧 Debug
      </button>

      {/* Debug panel */}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-16 right-4 z-50 bg-black/90 text-white p-4 rounded-lg font-mono text-sm"
          style={{ minWidth: '200px' }}
        >
          <div className="mb-2 font-bold text-green-400">Animation Metrics</div>
          
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>FPS:</span>
              <span className={metrics.fps < 30 ? 'text-red-400' : metrics.fps < 50 ? 'text-yellow-400' : 'text-green-400'}>
                {metrics.fps}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>Memory:</span>
              <span className={metrics.memoryUsage > 100 ? 'text-red-400' : 'text-green-400'}>
                {metrics.memoryUsage}MB
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>Animations:</span>
              <span className={metrics.animationCount > 50 ? 'text-red-400' : 'text-green-400'}>
                {metrics.animationCount}
              </span>
            </div>
          </div>
          
          <div className="mt-3 pt-2 border-t border-gray-600">
            <div className="text-xs text-gray-400">
              Performance Tips:
              <ul className="mt-1 space-y-1">
                <li>• FPS should be 60+</li>
                <li>• Memory &lt; 100MB</li>
                <li>• Animations &lt; 50</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default AnimationDebugger;
