---
type: "manual"
---

# API Development Rules

## @api-testing
When user mentions testing APIs or endpoints:
- Always suggest using the MCP api-testing-monitor tools
- Provide examples with actual URLs (http://51.83.47.117/ for production, http://localhost:5173/ for dev)
- Include both individual endpoint testing and batch testing options

## @deployment-check
When user asks about deployment status:
- Check both frontend and backend services
- Verify PM2 status, nginx status, and port availability
- Test actual endpoints with curl or MCP tools
- Provide comprehensive status report

## @mcp-tools
When user needs testing, monitoring, or screenshots:
- Prioritize using available MCP tools over manual commands
- Suggest test_api for API testing
- Suggest take_screenshot for documentation
- Suggest batch_test_apis for comprehensive testing

## @remote-server
When working with remote server (51.83.47.117):
- Always use SSH with proper credentials
- Check services status before making changes
- Provide both development and production URLs
- Remember Python virtual environment setup requirements

## @frontend-dev
When user has frontend issues:
- Check vite.config.ts for host/port conflicts
- Suggest localhost for local development
- Provide both local and remote access options
- Remember to check for build vs dev mode differences