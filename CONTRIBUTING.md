# 🤝 Contributing to XSigma Financial Models API

Thank you for your interest in contributing to XSigma! This document provides guidelines and information for contributors.

## 🚀 Quick Start

1. **Fork the repository**
2. **Clone your fork**: `git clone https://github.com/YOUR_USERNAME/API_Xsigma.git`
3. **Create a feature branch**: `git checkout -b feature/amazing-feature`
4. **Make your changes**
5. **Test your changes**
6. **Commit**: `git commit -m 'Add amazing feature'`
7. **Push**: `git push origin feature/amazing-feature`
8. **Open a Pull Request**

## 📋 Development Setup

### Prerequisites
- Node.js 18.x or higher
- Python 3.11 or higher
- npm or yarn

### Backend Setup
```bash
cd Backend_Xsigma
npm install
npm start
```

### Frontend Setup
```bash
cd Frontend_Xsigma
npm install
npm run dev
```

## 🎯 Areas for Contribution

### 🏦 Financial Models
- **New volatility models** (SABR variants, SVI, etc.)
- **XVA calculations** improvements
- **Risk metrics** enhancements
- **Calibration algorithms** optimization

### 💻 Technical Improvements
- **Performance optimization**
- **UI/UX enhancements**
- **API documentation**
- **Test coverage**
- **Code quality**

### 📚 Documentation
- **API guides**
- **Model explanations**
- **Usage examples**
- **Tutorials**

## 🔧 Code Standards

### JavaScript/TypeScript
- Use **ESLint** and **Prettier**
- Follow **functional programming** patterns
- Write **comprehensive tests**
- Use **TypeScript** for type safety

### Python
- Follow **PEP 8** style guide
- Use **type hints**
- Write **docstrings**
- Include **unit tests**

### Git Commit Messages
```
feat: add new SABR calibration method
fix: resolve volatility calculation bug
docs: update API documentation
test: add unit tests for HJM models
refactor: optimize portfolio calculations
```

## 🧪 Testing

### Backend Tests
```bash
cd Backend_Xsigma
npm test
```

### Frontend Tests
```bash
cd Frontend_Xsigma
npm test
```

### Python Tests
```bash
cd Backend_Xsigma/service/Python
python -m pytest
```

## 📝 Pull Request Guidelines

### Before Submitting
- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
- [ ] Performance impact considered

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes
```

## 🐛 Bug Reports

Use the **Bug Report** template when creating issues:

### Required Information
- **Environment** (OS, Node.js version, Python version)
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots/logs**

## 💡 Feature Requests

Use the **Feature Request** template:

### Required Information
- **Problem description**
- **Proposed solution**
- **Alternative solutions**
- **Use cases**
- **Implementation complexity**

## 📊 Financial Model Contributions

### Model Requirements
- **Mathematical documentation**
- **Implementation in Python**
- **Unit tests with known results**
- **API integration**
- **Frontend visualization**

### Model Validation
- **Benchmark against literature**
- **Performance testing**
- **Numerical stability**
- **Edge case handling**

## 🔒 Security

### Reporting Security Issues
- **DO NOT** create public issues for security vulnerabilities
- Email: security@xsigma.dev (if available)
- Use GitHub Security Advisories

### Security Guidelines
- **No hardcoded secrets**
- **Input validation**
- **Secure API endpoints**
- **Dependency scanning**

## 📞 Getting Help

### Communication Channels
- **GitHub Discussions** for general questions
- **GitHub Issues** for bugs and features
- **Wiki** for documentation
- **Code reviews** for implementation guidance

### Mentorship
New contributors are welcome! Look for issues labeled:
- `good first issue`
- `help wanted`
- `documentation`

## 🏆 Recognition

Contributors will be:
- **Listed in README.md**
- **Mentioned in release notes**
- **Invited to maintainer team** (for significant contributions)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to XSigma! 🚀**
