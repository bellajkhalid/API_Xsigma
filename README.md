# 🏦 XSigma Financial Models API

> Advanced Financial Modeling Platform with XVA Engine, ZABR/SABR Models, and Interactive Frontend

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Python](https://img.shields.io/badge/Python-3.11-yellow.svg)](https://python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://typescriptlang.org/)

## 🚀 Overview

XSigma is a comprehensive financial modeling platform that provides advanced volatility models, XVA calculations, and risk management tools. Built with modern web technologies and optimized for performance.

## ✨ Key Features

### 📊 **Volatility Models**
- **ZABR Classic** - Zero correlation SABR model with analytical solutions
- **ZABR PDE** - PDE-based SABR implementation for numerical precision
- **ZABR Mixture** - Hybrid model for complex volatility surfaces
- **ASV Calibration** - Analytical Sigma Volatility with dynamic calibration

### 🎯 **XVA Engine**
- **CVA** (Credit Valuation Adjustment)
- **DVA** (Debit Valuation Adjustment) 
- **FVA** (Funding Valuation Adjustment)
- **KVA** (Capital Valuation Adjustment)

### 📈 **Risk Management**
- **HJM Models** - Heath-Jarrow-Morton interest rate modeling
- **Portfolio Management** - Advanced portfolio analytics
- **Regulatory Reporting** - Compliance and risk reporting

### 🎨 **Interactive Frontend**
- **Real-time Calculations** - Dynamic parameter adjustment with live updates
- **Professional Charts** - Interactive volatility surfaces and risk metrics
- **Responsive Design** - Modern UI with dark/light themes
- **Performance Optimized** - Caching and debounced calculations

## 🏗️ Architecture

```
API_Xsigma/
├── Backend_Xsigma/          # Node.js API Server
│   ├── service/             # Business logic & Python integration
│   ├── controllers/         # API endpoints
│   └── routes.js           # Route definitions
├── Frontend_Xsigma/         # React TypeScript Frontend
│   ├── src/components/      # UI components
│   ├── src/models/         # Financial model interfaces
│   └── src/contexts/       # State management
└── Documentation/          # API docs & guides
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- Python 3.11 or higher
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/bellajkhalid/API_Xsigma.git
cd API_Xsigma
```

2. **Setup Backend**
```bash
cd Backend_Xsigma
npm install
npm start
```

3. **Setup Frontend**
```bash
cd Frontend_Xsigma
npm install
npm run dev
```

4. **Access the Application**
- Frontend: http://localhost:8081
- Backend API: http://localhost:5005
- API Documentation: http://localhost:5005/api-docs

## 📚 API Endpoints

### ZABR Models
- `POST /api/zabr-variables-impact/calculate` - Dynamic ZABR calculations
- `GET /api/zabr-variables-impact/models` - Available model types

### HJM Models  
- `POST /api/test-hjm/calibration` - HJM model calibration
- `GET /api/test-hjm/simulation` - Interest rate simulations

### ASV Calibration
- `POST /api/analytical-sigma` - Analytical sigma volatility

## 🎯 Usage Examples

### ZABR Mixture Model
```javascript
const response = await fetch('/api/zabr-variables-impact/calculate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model_type: 'zabr_mixture',
    parameters: {
      expiry: 30,
      forward: -0.0007,
      alpha: 0.0132,
      beta1: 0.2,
      beta2: 1.25,
      d: 0.2,
      nu: 0.1978,
      rho: -0.444
    }
  })
});
```

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js, Python integration
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Charts**: Recharts for interactive visualizations  
- **State Management**: React Context API
- **API Documentation**: Swagger/OpenAPI
- **Performance**: Caching, debouncing, lazy loading

## 📈 Performance Features

- **Caching System** - 10-15 minute TTL for expensive calculations
- **Debounced Updates** - 300ms delay for real-time parameter changes
- **Lazy Loading** - Components loaded on demand
- **Optimized Calculations** - Efficient numerical algorithms

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Khalid Bella** - [GitHub](https://github.com/bellajkhalid)

## 🙏 Acknowledgments

- XSigma modules for financial calculations
- React and Node.js communities
- Financial modeling research papers and implementations
