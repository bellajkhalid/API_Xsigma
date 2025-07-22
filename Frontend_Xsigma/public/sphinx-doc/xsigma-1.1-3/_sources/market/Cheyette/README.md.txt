# Cheyette Local Vol Model Documentation

This directory contains the complete documentation for the Cheyette Local Volatility (CLV) model, enhanced with actual C++ implementation details from Our project. The documentation is organized into multiple focused sections for better navigation and maintenance, providing both theoretical background and production-ready code examples.

## 📁 Documentation Structure

```
Documentation/docs/market/Cheyette/
├── index.md                        # Main documentation entry point
├── executive_summary.md             # Model overview and key features
├── scope.md                         # Model purpose and conceptual framework
├── products_and_payoffs.md          # Supported instruments and payoffs
├── model_methodology.md             # Mathematical framework and design
├── implementation.md                # Numerical schema and PDE solver
├── calibration.md                   # Calibration procedures and methods
├── risk_analysis.md                 # Risk metrics and calculation methods
├── testing_and_validation.md        # Test results and validation procedures
├── assumptions_and_limitations.md   # Model constraints and usage guidelines
├── monitoring_and_kpis.md          # Model monitoring framework
├── appendices.md                   # Additional technical details
└── README.md                       # This overview file
```

## 📖 How to Navigate

### For Quick Overview
Start with:
1. **[Executive Summary](executive_summary.md)** - High-level model overview
2. **[Scope](scope.md)** - Model purpose and applications

### For Implementation Details
Review:
1. **[Model Methodology](model_methodology.md)** - Mathematical framework
2. **[Implementation](implementation.md)** - Numerical methods and PDE solver
3. **[Calibration](calibration.md)** - Calibration procedures

### For Risk Management
Focus on:
1. **[Risk Analysis](risk_analysis.md)** - Risk calculation methods
2. **[Assumptions and Limitations](assumptions_and_limitations.md)** - Model constraints
3. **[Monitoring and KPIs](monitoring_and_kpis.md)** - Ongoing monitoring

### For Validation and Testing
Examine:
1. **[Testing and Validation](testing_and_validation.md)** - Comprehensive test results
2. **[Appendices](appendices.md)** - Detailed technical information

## 🎯 Key Features

### Enhanced Documentation with Our Project Implementation

| Enhancement | Description | Benefits |
|-------------|-------------|----------|
| **Actual C++ Classes** | Real production code from Our project | Copy-paste ready implementations |
| **Complete Function Signatures** | Exact method signatures and parameters | Accurate implementation guidance |
| **Mathematical Implementations** | Core algorithms and numerical methods | Production-quality mathematical code |
| **Testing Infrastructure** | Comprehensive validation and testing code | Quality assurance procedures |
| **Monitoring Systems** | Real-time performance monitoring | Production monitoring capabilities |

### Model Capabilities
- **Fast Calibration**: Efficient analytical approximations
- **Skew Capture**: Enhanced volatility surface fitting
- **Accurate Pricing**: Custom PDE solver implementation
- **Risk Management**: Comprehensive risk calculation framework

### Supported Products
- **Bermudan Swaptions**: Multi-exercise date options
- **Callable Inverse Floaters (CIF)**: Structured products with embedded calls
- **Callable Capped Floaters (CCF)**: Capped floating rate instruments

### Technical Highlights
- **Single-Factor Model**: Simplified yet effective framework
- **Local Volatility**: Displaced diffusion with skew effects
- **PDE Pricing**: High-accuracy numerical implementation
- **Multiple Calibration Modes**: Co-terminal and V-fit approaches

## 🔧 Usage Guidelines

### Recommended For
- Single-currency interest rate derivatives
- Products with skew sensitivity
- Instruments requiring fast and accurate pricing
- Portfolios without correlation dependencies

### Not Recommended For
- Spread options or correlation-dependent payoffs
- Multi-currency instruments
- Extreme volatility or skew environments
- Products requiring multi-factor modeling

## 📊 Documentation Benefits

### Organized Structure
- **Modular Design**: Each section focuses on specific aspects
- **Easy Navigation**: Clear structure with cross-references
- **Maintainable**: Individual sections can be updated independently
- **Comprehensive**: Complete coverage of all model aspects

### Sphinx Integration
- **Include Directives**: Main index.md includes all sections
- **Consistent Formatting**: Uniform documentation style
- **Cross-References**: Links between related sections
- **Table of Contents**: Automatic generation of navigation

## 🚀 Getting Started

1. **Read the [Index](index.md)** for complete documentation with all sections
2. **Browse individual sections** for focused information
3. **Use cross-references** to navigate between related topics
4. **Check [Appendices](appendices.md)** for detailed technical information

## 📝 Maintenance Notes

### For Documentation Updates
- **Individual Sections**: Update specific .md files as needed
- **Main Index**: The index.md automatically includes all sections
- **Cross-References**: Update links when adding new sections
- **Consistency**: Maintain consistent formatting across sections

### For Sphinx Building
- **Entry Point**: Use index.md as the main documentation file
- **Include Structure**: All sections are included via Sphinx directives
- **Navigation**: Automatic table of contents generation
- **Output**: Single comprehensive document with organized sections

## 🚀 Production-Ready Implementation

### C++ Code Integration

The enhanced Cheyette documentation now includes:

- **📦 Core Classes**: `model_cheyette`, `parameter_cheyette`, `diffusion_ir_cheyette`
- **🔧 Calibration Engine**: `calibration_ir_cheyette`, `calibration_ir_cheyette_swaption`
- **📊 Risk Calculation**: Complete risk calculation infrastructure with Greeks
- **✅ Testing Framework**: Comprehensive validation and testing procedures
- **📈 Monitoring System**: Real-time performance monitoring and alerting
- **🧮 Mathematical Utilities**: Hartman-Watson distribution, Gaussian quadrature, date utilities

### Benefits for Developers

| Benefit | Description | Impact |
|---------|-------------|--------|
| **Implementation Ready** | Actual production code examples | Faster development time |
| **Quality Assurance** | Real testing and validation procedures | Higher code quality |
| **Performance Monitoring** | Production monitoring infrastructure | Better operational control |
| **Mathematical Accuracy** | Proven mathematical implementations | Reduced implementation risk |
| **Regulatory Compliance** | Complete audit trail with real code | Easier regulatory approval |

---

This enhanced Cheyette documentation provides comprehensive coverage combining theoretical understanding with production-ready implementation details from Our project, ensuring both educational value and practical applicability for quantitative finance development! 🎉
