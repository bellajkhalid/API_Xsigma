'use strict';

/**
 * Cache Service
 * Simple in-memory caching with TTL support
 * Following Backend_Xsigma structure pattern
 * 
 * @module CacheService
 * @version 2.1.0
 */

const crypto = require('crypto');

/**
 * Simple cache implementation with TTL
 */
class CacheService {
  constructor() {
    this.cache = new Map();
    this.timers = new Map();
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
      clears: 0
    };
  }

  /**
   * Generate a cache key from service name and parameters
   * @param {string} service - Service name
   * @param {Object} params - Parameters object
   * @returns {string} Generated cache key
   */
  generateKey(service, params) {
    // Create a deterministic string representation by sorting keys recursively
    const sortedParams = this._sortObjectKeys(params);
    const paramString = JSON.stringify(sortedParams);
    const hash = crypto.createHash('md5').update(paramString).digest('hex');
    return `${service}:${hash}`;
  }

  /**
   * Recursively sort object keys for deterministic serialization
   * @param {*} obj - Object to sort
   * @returns {*} Object with sorted keys
   */
  _sortObjectKeys(obj) {
    if (obj === null || typeof obj !== 'object' || obj instanceof Array) {
      return obj;
    }

    const sorted = {};
    Object.keys(obj).sort().forEach(key => {
      sorted[key] = this._sortObjectKeys(obj[key]);
    });

    return sorted;
  }

  /**
   * Get value from cache
   * @param {string} key - Cache key
   * @returns {*} Cached value or null if not found
   */
  get(key) {
    if (this.cache.has(key)) {
      const item = this.cache.get(key);
      
      // Check if item has expired
      if (item.expires && Date.now() > item.expires) {
        this.delete(key);
        this.stats.misses++;
        console.log(`❌ Cache EXPIRED: ${key}`);
        return null;
      }
      
      this.stats.hits++;
      console.log(`✅ Cache HIT: ${key}`);
      return item.value;
    }
    
    this.stats.misses++;
    console.log(`❌ Cache MISS: ${key}`);
    return null;
  }

  /**
   * Set value in cache with optional TTL
   * @param {string} key - Cache key
   * @param {*} value - Value to cache
   * @param {number} ttl - Time to live in seconds (default: 300)
   */
  set(key, value, ttl = 300) {
    // Clear existing timer if any
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
      this.timers.delete(key);
    }

    const expires = ttl > 0 ? Date.now() + (ttl * 1000) : null;
    
    this.cache.set(key, {
      value,
      expires,
      created: Date.now()
    });

    // Set expiration timer if TTL is specified
    if (ttl > 0) {
      const timer = setTimeout(() => {
        this.delete(key);
      }, ttl * 1000);
      
      this.timers.set(key, timer);
    }

    this.stats.sets++;
    console.log(`📦 Cache SET: ${key} (TTL: ${ttl}s)`);
  }

  /**
   * Delete value from cache
   * @param {string} key - Cache key
   * @returns {boolean} True if key existed and was deleted
   */
  delete(key) {
    const existed = this.cache.has(key);
    
    if (existed) {
      this.cache.delete(key);
      
      // Clear timer if exists
      if (this.timers.has(key)) {
        clearTimeout(this.timers.get(key));
        this.timers.delete(key);
      }
      
      this.stats.deletes++;
      console.log(`🗑️ Cache DELETE: ${key}`);
    }
    
    return existed;
  }

  /**
   * Check if key exists in cache
   * @param {string} key - Cache key
   * @returns {boolean} True if key exists and is not expired
   */
  has(key) {
    if (!this.cache.has(key)) {
      return false;
    }

    const item = this.cache.get(key);
    
    // Check if expired
    if (item.expires && Date.now() > item.expires) {
      this.delete(key);
      return false;
    }
    
    return true;
  }

  /**
   * Clear all cache entries
   */
  clear() {
    // Clear all timers
    for (const timer of this.timers.values()) {
      clearTimeout(timer);
    }
    
    this.cache.clear();
    this.timers.clear();
    this.stats.clears++;
    
    console.log('🧹 Cache CLEARED');
  }

  /**
   * Get cache statistics
   * @returns {Object} Cache statistics
   */
  getStats() {
    const totalRequests = this.stats.hits + this.stats.misses;
    const hitRate = totalRequests > 0 ? (this.stats.hits / totalRequests * 100).toFixed(2) : 0;
    
    return {
      ...this.stats,
      totalRequests,
      hitRate: `${hitRate}%`,
      size: this.cache.size,
      memoryUsage: this.getMemoryUsage()
    };
  }

  /**
   * Get approximate memory usage
   * @returns {string} Memory usage estimate
   */
  getMemoryUsage() {
    let totalSize = 0;
    
    for (const [key, item] of this.cache) {
      totalSize += key.length * 2; // Approximate string size
      totalSize += JSON.stringify(item.value).length * 2; // Approximate object size
    }
    
    if (totalSize < 1024) {
      return `${totalSize} bytes`;
    } else if (totalSize < 1024 * 1024) {
      return `${(totalSize / 1024).toFixed(2)} KB`;
    } else {
      return `${(totalSize / (1024 * 1024)).toFixed(2)} MB`;
    }
  }

  /**
   * Get all cache keys
   * @returns {Array} Array of cache keys
   */
  keys() {
    return Array.from(this.cache.keys());
  }

  /**
   * Get cache size
   * @returns {number} Number of cached items
   */
  size() {
    return this.cache.size;
  }

  /**
   * Clean up expired entries
   */
  cleanup() {
    const now = Date.now();
    const expiredKeys = [];
    
    for (const [key, item] of this.cache) {
      if (item.expires && now > item.expires) {
        expiredKeys.push(key);
      }
    }
    
    for (const key of expiredKeys) {
      this.delete(key);
    }
    
    if (expiredKeys.length > 0) {
      console.log(`🧹 Cache cleanup: removed ${expiredKeys.length} expired entries`);
    }
  }
}

// Create singleton instance
const cacheService = new CacheService();

// Periodic cleanup every 5 minutes
setInterval(() => {
  cacheService.cleanup();
}, 5 * 60 * 1000);

module.exports = cacheService;
