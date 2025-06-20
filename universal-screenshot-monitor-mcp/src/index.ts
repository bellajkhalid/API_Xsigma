#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import puppeteer, { Browser, Page } from 'puppeteer';
import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import cron from 'node-cron';

interface ScreenshotConfig {
  url: string;
  outputDir?: string;
  viewport?: { width: number; height: number };
  fullPage?: boolean;
  waitFor?: number;
  selector?: string;
  schedule?: string;
}

interface ErrorDetectionResult {
  hasErrors: boolean;
  errors: Array<{
    type: 'console' | 'network' | 'visual' | 'performance';
    message: string;
    severity: 'low' | 'medium' | 'high';
    timestamp: string;
  }>;
  screenshot: string;
  metrics?: {
    loadTime: number;
    domContentLoaded: number;
    firstContentfulPaint?: number;
  };
}

class UniversalScreenshotMonitor {
  private browser: Browser | null = null;
  private scheduledJobs: Map<string, cron.ScheduledTask> = new Map();

  async initBrowser(): Promise<void> {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: 'new',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ]
      });
    }
  }

  async takeScreenshot(config: ScreenshotConfig): Promise<string> {
    await this.initBrowser();
    const page = await this.browser!.newPage();
    
    try {
      // Set viewport
      if (config.viewport) {
        await page.setViewport(config.viewport);
      }

      // Navigate to URL
      await page.goto(config.url, { waitUntil: 'networkidle2' });

      // Wait if specified
      if (config.waitFor) {
        await page.waitForTimeout(config.waitFor);
      }

      // Wait for specific selector if provided
      if (config.selector) {
        await page.waitForSelector(config.selector, { timeout: 10000 });
      }

      // Take screenshot
      const outputDir = config.outputDir || './screenshots';
      await fs.ensureDir(outputDir);
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `screenshot-${timestamp}.png`;
      const filepath = path.join(outputDir, filename);

      await page.screenshot({
        path: filepath,
        fullPage: config.fullPage || true
      });

      return filepath;
    } finally {
      await page.close();
    }
  }

  async detectErrors(config: ScreenshotConfig): Promise<ErrorDetectionResult> {
    await this.initBrowser();
    const page = await this.browser!.newPage();
    
    const errors: ErrorDetectionResult['errors'] = [];
    const startTime = Date.now();
    let domContentLoadedTime = 0;

    try {
      // Listen for console errors
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push({
            type: 'console',
            message: msg.text(),
            severity: 'high',
            timestamp: new Date().toISOString()
          });
        }
      });

      // Listen for network failures
      page.on('response', (response) => {
        if (response.status() >= 400) {
          errors.push({
            type: 'network',
            message: `Failed to load ${response.url()} - Status: ${response.status()}`,
            severity: response.status() >= 500 ? 'high' : 'medium',
            timestamp: new Date().toISOString()
          });
        }
      });

      // Listen for page errors
      page.on('pageerror', (error) => {
        errors.push({
          type: 'console',
          message: error.message,
          severity: 'high',
          timestamp: new Date().toISOString()
        });
      });

      // Set viewport
      if (config.viewport) {
        await page.setViewport(config.viewport);
      }

      // Navigate and measure performance
      const response = await page.goto(config.url, { waitUntil: 'domcontentloaded' });
      domContentLoadedTime = Date.now() - startTime;

      // Wait for network idle
      await page.waitForTimeout(2000);
      const loadTime = Date.now() - startTime;

      // Additional wait if specified
      if (config.waitFor) {
        await page.waitForTimeout(config.waitFor);
      }

      // Check for visual errors (missing images, broken layouts)
      const visualErrors = await page.evaluate(() => {
        const errors = [];
        
        // Check for broken images
        const images = document.querySelectorAll('img');
        images.forEach((img, index) => {
          if (!img.complete || img.naturalWidth === 0) {
            errors.push(`Broken image found: ${img.src || `Image ${index}`}`);
          }
        });

        // Check for elements with error classes
        const errorElements = document.querySelectorAll('[class*="error"], [class*="Error"]');
        if (errorElements.length > 0) {
          errors.push(`Found ${errorElements.length} elements with error classes`);
        }

        return errors;
      });

      visualErrors.forEach(error => {
        errors.push({
          type: 'visual',
          message: error,
          severity: 'medium',
          timestamp: new Date().toISOString()
        });
      });

      // Take screenshot
      const screenshotPath = await this.takeScreenshot(config);

      return {
        hasErrors: errors.length > 0,
        errors,
        screenshot: screenshotPath,
        metrics: {
          loadTime,
          domContentLoaded: domContentLoadedTime
        }
      };

    } finally {
      await page.close();
    }
  }

  async scheduleMonitoring(config: ScreenshotConfig & { jobId: string }): Promise<string> {
    if (!config.schedule) {
      throw new Error('Schedule is required for monitoring');
    }

    // Stop existing job if it exists
    if (this.scheduledJobs.has(config.jobId)) {
      this.scheduledJobs.get(config.jobId)?.stop();
    }

    // Create new scheduled job
    const job = cron.schedule(config.schedule, async () => {
      try {
        console.log(chalk.blue(`🔍 Running scheduled monitoring for ${config.url}`));
        const result = await this.detectErrors(config);
        
        if (result.hasErrors) {
          console.log(chalk.red(`❌ Errors detected on ${config.url}:`));
          result.errors.forEach(error => {
            const color = error.severity === 'high' ? chalk.red : 
                         error.severity === 'medium' ? chalk.yellow : chalk.gray;
            console.log(color(`  - [${error.type}] ${error.message}`));
          });
        } else {
          console.log(chalk.green(`✅ No errors detected on ${config.url}`));
        }
        
        // Save report
        const reportPath = path.join(config.outputDir || './screenshots', `report-${config.jobId}-${Date.now()}.json`);
        await fs.writeJson(reportPath, result, { spaces: 2 });
        
      } catch (error) {
        console.error(chalk.red(`Error in scheduled monitoring: ${error}`));
      }
    }, {
      scheduled: false
    });

    job.start();
    this.scheduledJobs.set(config.jobId, job);

    return `Monitoring scheduled for ${config.url} with pattern: ${config.schedule}`;
  }

  async stopMonitoring(jobId: string): Promise<string> {
    const job = this.scheduledJobs.get(jobId);
    if (job) {
      job.stop();
      this.scheduledJobs.delete(jobId);
      return `Monitoring stopped for job: ${jobId}`;
    }
    return `No monitoring job found with ID: ${jobId}`;
  }

  async cleanup(): Promise<void> {
    // Stop all scheduled jobs
    this.scheduledJobs.forEach(job => job.stop());
    this.scheduledJobs.clear();

    // Close browser
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

const monitor = new UniversalScreenshotMonitor();

// Define available tools
const tools: Tool[] = [
  {
    name: 'take_screenshot',
    description: 'Take a screenshot of any website',
    inputSchema: {
      type: 'object',
      properties: {
        url: { type: 'string', description: 'Website URL to screenshot' },
        outputDir: { type: 'string', description: 'Output directory (optional)' },
        viewport: {
          type: 'object',
          properties: {
            width: { type: 'number' },
            height: { type: 'number' }
          },
          description: 'Viewport size (optional)'
        },
        fullPage: { type: 'boolean', description: 'Take full page screenshot (default: true)' },
        waitFor: { type: 'number', description: 'Wait time in milliseconds (optional)' },
        selector: { type: 'string', description: 'Wait for specific CSS selector (optional)' }
      },
      required: ['url']
    }
  },
  {
    name: 'detect_errors',
    description: 'Detect errors on a website and take screenshot',
    inputSchema: {
      type: 'object',
      properties: {
        url: { type: 'string', description: 'Website URL to check' },
        outputDir: { type: 'string', description: 'Output directory (optional)' },
        viewport: {
          type: 'object',
          properties: {
            width: { type: 'number' },
            height: { type: 'number' }
          },
          description: 'Viewport size (optional)'
        },
        waitFor: { type: 'number', description: 'Wait time in milliseconds (optional)' },
        selector: { type: 'string', description: 'Wait for specific CSS selector (optional)' }
      },
      required: ['url']
    }
  }
];

// Create MCP server
const server = new Server(
  {
    name: 'universal-screenshot-monitor',
    version: '1.0.0',
    capabilities: {
      tools: {},
    },
  }
);

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'take_screenshot': {
        const config = args as unknown as ScreenshotConfig;
        if (!config.url) {
          throw new Error('URL is required for screenshot');
        }
        const screenshotPath = await monitor.takeScreenshot(config);
        return {
          content: [
            {
              type: 'text',
              text: `Screenshot saved to: ${screenshotPath}`
            }
          ]
        };
      }

      case 'detect_errors': {
        const config = args as unknown as ScreenshotConfig;
        if (!config.url) {
          throw new Error('URL is required for error detection');
        }
        const result = await monitor.detectErrors(config);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : String(error)}`
        }
      ],
      isError: true
    };
  }
});

// Handle cleanup on exit
process.on('SIGINT', async () => {
  await monitor.cleanup();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await monitor.cleanup();
  process.exit(0);
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Universal Screenshot Monitor MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
