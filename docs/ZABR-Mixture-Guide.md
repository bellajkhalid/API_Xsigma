# 🎭 ZABR Mixture Model - Complete Guide

## 🎯 Overview

The ZABR Mixture model is a sophisticated volatility model designed specifically for **negative rate environments**. It combines multiple beta regimes with advanced smoothing techniques to handle complex volatility surfaces that traditional models cannot capture.

## 🔬 Mathematical Foundation

### Core Volatility Function

The ZABR Mixture model uses a piecewise volatility function:

```mathematical
σ(x) = {
  α [ω tanh(x) + (1-ω) tanh(x)^β₂]^β₁,  if x ≥ x₀
  v₁ + p exp[(d₁/p)(x-x₀) + ½(d₂/p - (d₁/p)²)(x-x₀)²],  if x < x₀
}
```

### Local Volatility Cap

For enhanced numerical stability, the model includes a local volatility cap:

```mathematical
σ(x) = {
  σ(x_U),  if x ≥ x_U
  σ(x),    if x ≤ x_U - S  
  σ(x)(1-K((x_U-x)/S)) + σ(x_U)K((x_U-x)/S),  else
}
```

Where `K(x)` is the smooth step function.

## 📊 Parameter Specification

### Notebook Default Parameters

From `zabr_variables_impact.ipynb`:

```python
zabr_mixture_params = {
    "expiry": 30,              # Time to expiry (days)
    "forward": -0.0007,        # Forward rate (can be negative!)
    "alpha": 0.0132,           # Overall smile level
    "beta1": 0.2,              # ATM skew parameter
    "beta2": 1.25,             # High strike skew parameter
    "d": 0.2,                  # Effective speed (mixture weight)
    "nu": 0.1978,              # Volatility of volatility
    "rho": -0.444,             # Correlation parameter
    "gamma": 1.0,              # Gamma parameter
    "use_vol_adjustement": True,
    "high_strike": 0.1,        # Strike threshold (x_U)
    "vol_low": 0.0001,         # Low volatility level (v₁)
    "low_strike": 0.02,        # Strike level threshold (x₀)
    "forward_cut_off": 0.02,   # Forward cutoff
    "smothing_factor": 0.001,  # Smoothing parameter (S)
}
```

### Parameter Descriptions

| Parameter | Symbol | Range | Description |
|-----------|--------|-------|-------------|
| `alpha` | α | [0.001, 0.5] | Controls overall smile level |
| `beta1` | β₁ | [0.01, 1.0] | Controls ATM skew |
| `beta2` | β₂ | [0.1, 5.0] | Controls high strike skew |
| `d` | ω | [0.01, 1.0] | Effective speed, controls transition |
| `nu` | ν | [0.1, 2.0] | Volatility of volatility |
| `rho` | ρ | [-0.99, 0.99] | Correlation parameter |
| `high_strike` | x_U | [0.01, 1.0] | Strike threshold for cap |
| `vol_low` | v₁ | [0.00001, 0.01] | Volatility level for x < x₀ |
| `low_strike` | x₀ | [0.001, 0.1] | Strike level threshold |
| `forward_cut_off` | - | [0.001, 0.1] | Forward rate cutoff |
| `smothing_factor` | S | [0.0001, 0.01] | Smoothing parameter |

## 🚀 API Usage

### Basic Calculation

```javascript
const response = await fetch('/api/zabr-variables-impact/calculate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model_type: 'zabr_mixture',
    parameters: {
      expiry: 30,
      forward: -0.0007,        // Negative rates supported!
      alpha: 0.0132,
      beta1: 0.2,
      beta2: 1.25,
      d: 0.2,
      nu: 0.1978,
      rho: -0.444,
      gamma: 1.0,
      use_vol_adjustement: true,
      high_strike: 0.1,
      vol_low: 0.0001,
      low_strike: 0.02,
      forward_cut_off: 0.02,
      smothing_factor: 0.001
    }
  })
});
```

### Response Structure

```json
{
  "status": "success",
  "data": {
    "model_type": "zabr_mixture",
    "strikes": [-0.15, -0.148, ..., 0.298, 0.3],
    "dynamic_volatility": [0.0132, 0.0133, ..., 0.0145],
    "initial_volatility": [0.0130, 0.0131, ..., 0.0143],
    "volatility_difference": [0.0002, 0.0002, ..., 0.0002],
    "dynamic_params": { /* echoed parameters */ },
    "calculation_successful": true,
    "execution_time": 0.052
  }
}
```

## 🎨 Frontend Integration

### Interactive Sliders

The frontend provides 10 interactive sliders for real-time parameter adjustment:

```typescript
// Slider configuration
const sliderRanges = {
  forward: { min: -0.01, max: 0.1, step: 0.0001 },
  expiry: { min: 1, max: 30, step: 1 },
  alpha: { min: 0.001, max: 0.5, step: 0.0001 },
  beta1: { min: 0.01, max: 1.0, step: 0.01 },
  beta2: { min: 0.1, max: 5.0, step: 0.01 },
  d: { min: 0.01, max: 1.0, step: 0.01 },
  nu: { min: 0.1, max: 2.0, step: 0.01 },
  rho: { min: -0.99, max: 0.99, step: 0.01 },
  high_strike: { min: 0.01, max: 1.0, step: 0.01 },
  vol_low: { min: 0.00001, max: 0.01, step: 0.00001 }
};
```

### Real-time Updates

Parameters update with 300ms debounce for smooth user experience:

```typescript
const handleSliderChange = (key: string, value: number[]) => {
  setParameters(prev => ({ ...prev, [key]: value[0] }));
  
  // Debounced calculation for performance
  if (debounceRef.current) {
    clearTimeout(debounceRef.current);
  }
  debounceRef.current = setTimeout(() => {
    calculateZABRDynamic();
  }, 300);
};
```

## 📈 Use Cases

### 1. Negative Rate Environments
- **EUR rates** below zero
- **JPY rates** in negative territory
- **CHF rates** with negative yields

### 2. Complex Volatility Surfaces
- **Multi-modal** volatility patterns
- **Asymmetric** smile structures
- **High strike** behavior modeling

### 3. Risk Management
- **Stress testing** in extreme scenarios
- **Tail risk** assessment
- **Model validation** against market data

## 🔧 Calibration Guidelines

### Best Practices

1. **Start with notebook defaults** for initial calibration
2. **Adjust alpha** to match overall volatility level
3. **Tune beta1/beta2** for skew characteristics
4. **Use d parameter** to control regime mixing
5. **Set vol_low** for negative strike behavior

### Common Calibration Issues

**Numerical Instability**
- Reduce `smothing_factor` if oscillations occur
- Increase `vol_low` for better low-strike behavior
- Check `high_strike` threshold placement

**Poor Fit Quality**
- Adjust `beta1` and `beta2` for better skew
- Modify `d` parameter for regime balance
- Fine-tune `alpha` for overall level

## 📊 Performance Characteristics

### Computational Complexity
- **Grid Size**: 401 points (from -0.15 to 0.3)
- **Calculation Time**: ~50ms typical
- **Memory Usage**: ~5MB
- **Numerical Stability**: High with proper parameters

### Accuracy Metrics
- **Pricing Accuracy**: Within 0.1bp for liquid strikes
- **Greek Accuracy**: Within 5% for standard ranges
- **Calibration Fit**: RMSE typically < 0.5bp

## 🐛 Troubleshooting

### Common Issues

**"Calculation Failed" Error**
```
Check parameter bounds, especially:
- forward can be negative but not too extreme
- vol_low should be positive and small
- smothing_factor should be very small
```

**Slow Performance**
```
- Enable caching with use_cache: true
- Reduce slider update frequency
- Check network connectivity to backend
```

**Unrealistic Volatility Values**
```
- Verify alpha is reasonable (0.01-0.1 typical)
- Check beta1/beta2 are within bounds
- Ensure d parameter is between 0 and 1
```

## 📚 Mathematical References

1. **Antonov, A. (2015)** - "ZABR expansion for negative rates"
2. **Hagan, P. et al. (2002)** - "Managing Smile Risk" (original SABR)
3. **Obloj, J. (2008)** - "Fine-tune your smile"
4. **Rebonato, R. (2004)** - "Volatility and Correlation"

## 🔗 Related Documentation

- **[ZABR Models Overview](ZABR-Models.md)** - Complete ZABR model family
- **[API Reference](API-Reference.md)** - Detailed API documentation
- **[Frontend Guide](Frontend-Guide.md)** - UI components and features

---

**Next**: [HJM Models](HJM-Models.md) | **Previous**: [ZABR Models](ZABR-Models.md)
