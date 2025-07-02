---
type: "manual"
---

# Specific API XSigma Rules

## @python-service
When Python service errors occur:
- Check if virtual environment exists in Backend_Xsigma/venv/
- Verify Python packages are installed (numpy, pandas, scipy)
- Provide commands to create venv and install dependencies
- Test Python service separately before API calls

## @port-conflicts
When encountering port binding errors:
- Check vite.config.ts for hardcoded IPs
- Suggest localhost for local development
- Provide different ports for different environments
- Explain the difference between local and remote configurations

## @mcp-integration
When setting up or using MCP tools:
- Always place MCP configurations in C:\augmented-tools\
- Build MCP tools before attempting to use them
- Provide both automated setup scripts and manual instructions
- Test MCP tools after integration

## @documentation
When creating guides or documentation:
- Use markdown format with clear headings
- Include both quick start and detailed instructions
- Provide examples with actual project URLs
- Create files in appropriate locations (guides in project, configs in tools directory)