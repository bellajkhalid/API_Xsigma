# 📊 ZABR Models Documentation

## 🎯 Overview

ZABR (Zero correlation SABR) models are specialized variants of the SABR model where the correlation parameter ρ is set to zero. This simplification allows for more efficient calibration while maintaining excellent fit to interest rate derivatives.

## 🔬 Mathematical Foundation

### ZABR Classic Model

The ZABR Classic model uses the analytical approximation:

```
σ(K) = α * F^(β-1) * [1 + ((1-β)²/24) * (α²/F^(2-2β)) * T + (ρβνα)/(4F^(1-β)) * T + ((2-3ρ²)/24) * ν² * T]
```

Where:
- `σ(K)` = Implied volatility for strike K
- `α` = Initial volatility level
- `β` = CEV exponent (0 ≤ β ≤ 1)
- `ν` = Volatility of volatility
- `ρ` = Correlation (set to 0 for ZABR)
- `F` = Forward rate
- `T` = Time to expiry

### ZABR PDE Model

For more complex scenarios, the PDE approach solves:

```
∂V/∂t + (1/2)σ²F^(2β)∂²V/∂F² + (1/2)ν²σ²∂²V/∂σ² + ρνσF^β∂²V/∂F∂σ - rV = 0
```

### ZABR Mixture Model

The mixture model combines multiple beta regimes:

```
σ_mix(K) = d * σ_β1(K) + (1-d) * σ_β2(K)
```

Where `d` is the mixture parameter (0 ≤ d ≤ 1).

## 🚀 API Usage

### ZABR Classic

```javascript
const response = await fetch('/api/zabr-variables-impact/calculate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model_type: 'zabr_classic',
    parameters: {
      expiry: 10,           // Time to expiry (days)
      forward: 0.0325,      // Forward rate
      alpha: 0.0873,        // Initial volatility
      beta: 0.7,            // CEV exponent
      nu: 0.47,             // Vol of vol
      rho: -0.48,           // Correlation
      shift: 0.0,           // Rate shift
      gamma: 1.0,           // Gamma parameter
      use_vol_adjustement: true
    }
  })
});
```

### ZABR PDE

```javascript
const response = await fetch('/api/zabr-variables-impact/calculate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model_type: 'sabr_pde',
    parameters: {
      expiry: 30,
      forward: 0.02,
      alpha: 0.035,
      beta: 0.25,
      nu: 1.0,
      rho: -0.1,
      shift: 0.0,
      N: 100,              // Grid points
      timesteps: 5,        // Time steps
      nd: 5                // Spatial dimensions
    }
  })
});
```

### ZABR Mixture

```javascript
const response = await fetch('/api/zabr-variables-impact/calculate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model_type: 'zabr_mixture',
    parameters: {
      expiry: 30,
      forward: -0.0007,     // Can handle negative rates
      alpha: 0.0132,
      beta1: 0.2,           // First beta
      beta2: 1.25,          // Second beta
      d: 0.2,               // Mixture weight
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

## 📊 Response Format

All ZABR models return the same response structure:

```json
{
  "status": "success",
  "data": {
    "model_type": "zabr_classic",
    "strikes": [0.0, 0.002, 0.004, ...],
    "dynamic_volatility": [0.0873, 0.0875, 0.0877, ...],
    "initial_volatility": [0.0870, 0.0872, 0.0874, ...],
    "volatility_difference": [0.0003, 0.0003, 0.0003, ...],
    "dynamic_params": {
      "expiry": 10,
      "forward": 0.0325,
      "alpha": 0.0873,
      // ... other parameters
    },
    "calculation_successful": true,
    "execution_time": 0.045
  }
}
```

## 🎨 Frontend Integration

### Interactive Sliders

The frontend provides real-time parameter adjustment:

```typescript
// Parameter ranges for sliders
const sliderRanges = {
  forward: { min: -0.01, max: 0.1, step: 0.0001 },
  expiry: { min: 1, max: 30, step: 1 },
  alpha: { min: 0.001, max: 0.5, step: 0.0001 },
  beta: { min: 0.1, max: 1.0, step: 0.01 },
  nu: { min: 0.1, max: 2.0, step: 0.01 },
  rho: { min: -0.99, max: 0.99, step: 0.01 }
};
```

### Real-time Updates

Parameters update with 300ms debounce for smooth UX:

```typescript
const handleSliderChange = (key: string, value: number[]) => {
  setParameters(prev => ({ ...prev, [key]: value[0] }));
  
  // Debounced calculation
  if (debounceRef.current) {
    clearTimeout(debounceRef.current);
  }
  debounceRef.current = setTimeout(() => {
    calculateZABRDynamic();
  }, 300);
};
```

## 📈 Performance Characteristics

### Calculation Speed

| Model | Typical Time | Grid Size | Accuracy |
|-------|-------------|-----------|----------|
| ZABR Classic | ~10ms | 100 points | High |
| ZABR PDE | ~100ms | 100x100 | Very High |
| ZABR Mixture | ~50ms | 401 points | High |

### Memory Usage

- **ZABR Classic**: ~1MB
- **ZABR PDE**: ~10MB (depends on grid size)
- **ZABR Mixture**: ~5MB

## 🔧 Calibration Guidelines

### Parameter Bounds

| Parameter | Min | Max | Typical | Notes |
|-----------|-----|-----|---------|-------|
| α (alpha) | 0.001 | 0.5 | 0.1 | Initial volatility |
| β (beta) | 0.1 | 1.0 | 0.7 | CEV exponent |
| ν (nu) | 0.1 | 2.0 | 0.5 | Vol of vol |
| ρ (rho) | -0.99 | 0.99 | -0.5 | Correlation |

### Best Practices

1. **Start with market-standard parameters**
2. **Use ZABR Classic for initial calibration**
3. **Switch to PDE for complex payoffs**
4. **Use Mixture for negative rate environments**

## 🐛 Troubleshooting

### Common Issues

**Numerical Instability**
- Reduce grid size for PDE
- Check parameter bounds
- Ensure positive forward rates (except Mixture)

**Slow Performance**
- Enable caching
- Reduce calculation frequency
- Optimize grid parameters

**Calibration Failures**
- Check market data quality
- Adjust parameter bounds
- Use different initial guesses

## 📚 References

1. Hagan, P. et al. (2002). "Managing Smile Risk"
2. Obloj, J. (2008). "Fine-tune your smile"
3. Antonov, A. (2015). "ZABR expansion"

---

**Next**: [HJM Models](HJM-Models) | **Previous**: [Home](Home)
