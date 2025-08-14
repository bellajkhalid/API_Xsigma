# 🏦 XSigma Financial Models API - Wiki

Welcome to the comprehensive documentation for XSigma Financial Models API!

## 🚀 Quick Navigation

### 📊 **Financial Models**
- [ZABR Models](ZABR-Models) - Zero correlation SABR models
- [HJM Models](HJM-Models) - Heath-Jarrow-Morton interest rate models
- [XVA Engine](XVA-Engine) - Valuation adjustments
- [ASV Calibration](ASV-Calibration) - Analytical Sigma Volatility

### 💻 **Technical Documentation**
- [API Reference](API-Reference) - Complete API documentation
- [Installation Guide](Installation-Guide) - Setup instructions
- [Development Guide](Development-Guide) - Contributing guidelines
- [Performance Guide](Performance-Guide) - Optimization tips

### 🎯 **User Guides**
- [Getting Started](Getting-Started) - First steps
- [Model Usage](Model-Usage) - How to use financial models
- [Frontend Guide](Frontend-Guide) - UI components and features
- [Troubleshooting](Troubleshooting) - Common issues and solutions

## 🏗️ **Architecture Overview**

```
XSigma Platform
├── 🖥️  Frontend (React TypeScript)
│   ├── Interactive Charts
│   ├── Real-time Calculations
│   └── Professional UI
├── 🔧 Backend API (Node.js)
│   ├── RESTful Endpoints
│   ├── Python Integration
│   └── Caching Layer
└── 🐍 Python Services
    ├── Financial Models
    ├── Numerical Algorithms
    └── Data Processing
```

## 📈 **Key Features**

### 🎯 **Real-time Financial Modeling**
- **Interactive Parameters** - Adjust model parameters with live updates
- **Dynamic Visualizations** - Real-time charts and volatility surfaces
- **Performance Optimized** - Sub-second calculations with caching

### 🔬 **Advanced Models**
- **ZABR Classic** - Analytical solutions for volatility modeling
- **ZABR PDE** - Numerical PDE solutions for complex scenarios
- **ZABR Mixture** - Hybrid models for negative rates
- **HJM Framework** - Complete interest rate modeling

### 🎨 **Professional Interface**
- **Modern Design** - Clean, responsive UI with dark/light themes
- **Interactive Charts** - Powered by Recharts with zoom and pan
- **Real-time Updates** - Debounced calculations for smooth UX

## 🚀 **Quick Start**

### 1. **Installation**
```bash
# Clone repository
git clone https://github.com/bellajkhalid/API_Xsigma.git
cd API_Xsigma

# Setup Backend
cd Backend_Xsigma && npm install && npm start

# Setup Frontend
cd Frontend_Xsigma && npm install && npm run dev
```

### 2. **First API Call**
```javascript
// ZABR Classic calculation
const response = await fetch('/api/zabr-variables-impact/calculate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model_type: 'zabr_classic',
    parameters: {
      expiry: 10,
      forward: 0.0325,
      alpha: 0.0873,
      beta: 0.7,
      nu: 0.47,
      rho: -0.48
    }
  })
});
```

### 3. **Access Frontend**
- **Frontend**: http://localhost:8081
- **API**: http://localhost:5005
- **Documentation**: http://localhost:5005/api-docs

## 📊 **Model Categories**

### **Volatility Models**
| Model | Type | Use Case | Complexity |
|-------|------|----------|------------|
| ZABR Classic | Analytical | Standard options | Low |
| ZABR PDE | Numerical | Complex payoffs | Medium |
| ZABR Mixture | Hybrid | Negative rates | High |

### **Interest Rate Models**
| Model | Framework | Applications | Status |
|-------|-----------|--------------|--------|
| HJM | Multi-factor | Yield curve modeling | ✅ Active |
| Hull-White | Single-factor | Bond pricing | 🔄 Planned |
| LMM | LIBOR Market | Caps/Floors | 🔄 Planned |

## 🤝 **Community**

### **Contributing**
- 📋 [Contributing Guidelines](../CONTRIBUTING.md)
- 🐛 [Report Issues](https://github.com/bellajkhalid/API_Xsigma/issues)
- 💡 [Feature Requests](https://github.com/bellajkhalid/API_Xsigma/issues/new?template=feature_request.md)

### **Support**
- 💬 [GitHub Discussions](https://github.com/bellajkhalid/API_Xsigma/discussions)
- 📧 Email: support@xsigma.dev
- 📚 [Documentation](https://github.com/bellajkhalid/API_Xsigma/wiki)

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

**🚀 Ready to start? Check out our [Getting Started Guide](Getting-Started)!**
