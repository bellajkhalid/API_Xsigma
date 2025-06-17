// Performance testing utilities for animations

export interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  animationCount: number;
  cpuUsage: number;
  renderTime: number;
}

export class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private isMonitoring = false;
  private animationId?: number;
  private callbacks: ((metrics: PerformanceMetrics) => void)[] = [];

  start() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.monitor();
  }

  stop() {
    this.isMonitoring = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  onMetricsUpdate(callback: (metrics: PerformanceMetrics) => void) {
    this.callbacks.push(callback);
  }

  private monitor = () => {
    if (!this.isMonitoring) return;

    this.frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - this.lastTime >= 1000) {
      const metrics = this.calculateMetrics(currentTime);
      this.callbacks.forEach(callback => callback(metrics));
      
      this.frameCount = 0;
      this.lastTime = currentTime;
    }
    
    this.animationId = requestAnimationFrame(this.monitor);
  };

  private calculateMetrics(currentTime: number): PerformanceMetrics {
    const fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
    
    // Memory usage (if available)
    const memory = (performance as any).memory;
    const memoryUsage = memory ? Math.round(memory.usedJSHeapSize / 1024 / 1024) : 0;
    
    // Count active animations
    const animationCount = document.querySelectorAll('[data-framer-motion]').length;
    
    // Estimate CPU usage based on frame timing
    const frameTime = (currentTime - this.lastTime) / this.frameCount;
    const cpuUsage = Math.min(100, Math.max(0, (frameTime - 16.67) / 16.67 * 100));
    
    // Render time estimation
    const renderTime = frameTime;

    return {
      fps,
      memoryUsage,
      animationCount,
      cpuUsage,
      renderTime
    };
  }
}

// Utility functions for performance testing
export const performanceUtils = {
  // Test animation performance
  testAnimationPerformance: async (duration: number = 10000): Promise<PerformanceMetrics[]> => {
    const monitor = new PerformanceMonitor();
    const metrics: PerformanceMetrics[] = [];
    
    monitor.onMetricsUpdate((metric) => {
      metrics.push(metric);
    });
    
    monitor.start();
    
    return new Promise((resolve) => {
      setTimeout(() => {
        monitor.stop();
        resolve(metrics);
      }, duration);
    });
  },

  // Check if device can handle complex animations
  canHandleComplexAnimations: (): boolean => {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
    
    // Check device capabilities
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const hasWebGL = !!gl;
    
    // Check memory (if available)
    const memory = (performance as any).memory;
    const hasEnoughMemory = !memory || memory.jsHeapSizeLimit > 1000000000; // 1GB
    
    // Check CPU cores (rough estimation)
    const hasPowerfulCPU = navigator.hardwareConcurrency >= 4;
    
    return hasWebGL && hasEnoughMemory && hasPowerfulCPU;
  },

  // Get recommended animation settings
  getRecommendedSettings: () => {
    const canHandle = performanceUtils.canHandleComplexAnimations();
    
    return {
      particleCount: canHandle ? 20 : 10,
      animationDuration: canHandle ? 'normal' : 'fast',
      enableBlur: canHandle,
      enableShadows: canHandle,
      enableGradients: canHandle,
      maxConcurrentAnimations: canHandle ? 50 : 25
    };
  },

  // Log performance report
  logPerformanceReport: (metrics: PerformanceMetrics[]) => {
    if (metrics.length === 0) return;
    
    const avgFps = metrics.reduce((sum, m) => sum + m.fps, 0) / metrics.length;
    const avgMemory = metrics.reduce((sum, m) => sum + m.memoryUsage, 0) / metrics.length;
    const maxAnimations = Math.max(...metrics.map(m => m.animationCount));
    
    console.group('🎭 Animation Performance Report');
    console.log(`📊 Average FPS: ${avgFps.toFixed(1)}`);
    console.log(`💾 Average Memory: ${avgMemory.toFixed(1)}MB`);
    console.log(`🎬 Max Animations: ${maxAnimations}`);
    console.log(`⚡ Performance Rating: ${avgFps >= 55 ? '🟢 Excellent' : avgFps >= 45 ? '🟡 Good' : '🔴 Poor'}`);
    console.groupEnd();
  }
};

export default PerformanceMonitor;
