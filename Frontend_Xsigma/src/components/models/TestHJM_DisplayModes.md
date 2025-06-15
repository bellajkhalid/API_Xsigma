# TestHJM Display Modes - User Guide

## Overview

The TestHJM Monte Carlo Simulation (Test 2) now includes a **Display Mode** selector that allows users to choose between different analysis views for optimal data visualization and analysis focus.

## Display Mode Options

### 📈 Volatility Surfaces
**Focus**: Model vs Market volatility comparison
**Best for**: Understanding model accuracy and market fit

**Features:**
- Model volatility curves (green solid lines)
- Market volatility curves (orange dashed lines)
- 4 data sets with different tenor combinations
- Basis points scale for professional analysis
- Interactive tooltips with precise values

**Charts Displayed:**
- Main volatility surface (Data Set 1) - Large detailed chart
- Secondary volatility surface (Data Set 2) - Medium chart
- Data Sets 3 & 4 - Side-by-side comparison charts

### 📉 Error Analysis
**Focus**: Model validation and error quantification
**Best for**: Risk assessment and model performance evaluation

**Features:**
- Error curves showing Model - Market differences
- Statistical error analysis (avg, max, min, std deviation)
- Color-coded error visualization by data set
- Comprehensive error statistics summary
- Error trend analysis across expiry periods

**Charts Displayed:**
- Main error chart (Data Set 1) - Prominent error visualization
- Comparative error analysis (Data Sets 1-4) - Side-by-side error comparison
- Error statistics dashboard - Numerical summary tables

### 📊 Both Views
**Focus**: Comprehensive analysis with both volatility and error data
**Best for**: Complete model validation and detailed analysis

**Features:**
- All volatility surface charts
- All error analysis charts
- Combined visualization on main chart (volatility + error overlay)
- Complete statistical summaries
- Maximum data visibility

## How to Use Display Modes

### Accessing Display Mode Selection
1. Navigate to **Dashboard → HJM Models**
2. Click **"📊 Monte Carlo Simulation"** tab
3. In **Simulation Parameters** panel, find **"Display Mode"** dropdown
4. Select your preferred analysis focus

### Display Mode Selection Process
```
Simulation Parameters Panel:
├── Test Case: Test 2: Monte Carlo Simulation
├── Monte Carlo Paths: [10K, 100K, 524K, 1M] + custom
├── Display Mode: [📈 Volatility Surfaces | 📉 Error Analysis | 📊 Both Views]
└── Force Refresh: [Use Cache | Force Refresh]
```

### Recommended Usage Patterns

#### For Model Development
- **Start with**: 📈 Volatility Surfaces
- **Path count**: 10K-50K (fast iteration)
- **Focus**: Understanding basic model behavior

#### For Model Validation
- **Use**: 📉 Error Analysis
- **Path count**: 100K-500K (balanced accuracy)
- **Focus**: Quantifying model accuracy and identifying issues

#### For Production Analysis
- **Use**: 📊 Both Views
- **Path count**: 500K-1M (high precision)
- **Focus**: Complete model assessment for decision-making

## Chart Behavior by Display Mode

### Main Chart (Data Set 1)
| Display Mode | Lines Shown | Focus | Styling |
|-------------|-------------|-------|---------|
| Volatility | Model + Market | Volatility comparison | Standard thickness |
| Error | Error only | Error magnitude | Thick error line |
| Both | Model + Market + Error | Complete view | All lines visible |

### Secondary Charts
| Display Mode | Charts Shown | Purpose |
|-------------|-------------|---------|
| Volatility | Data Sets 2, 3, 4 volatility | Multi-tenor analysis |
| Error | Error comparison + statistics | Error validation |
| Both | All charts | Complete analysis |

## Data Interpretation Guide

### Volatility Surface Analysis
- **Green lines (Model)**: Calculated volatility from HJM simulation
- **Orange lines (Market)**: Observed market volatility
- **Close alignment**: Good model calibration
- **Large gaps**: Model may need recalibration

### Error Analysis
- **Positive errors**: Model overestimates volatility
- **Negative errors**: Model underestimates volatility
- **Small errors (<5 bps)**: Excellent model fit
- **Large errors (>20 bps)**: Model calibration issues

### Statistical Metrics
- **Average Error**: Overall model bias
- **Max/Min Error**: Error range and extremes
- **Standard Deviation**: Error consistency
- **Error Trends**: Systematic model issues

## Performance Considerations

### Display Mode Impact on Performance
- **Volatility**: Standard performance
- **Error**: Slightly faster (fewer calculations)
- **Both**: Standard performance (same data, more charts)

### Recommended Path Counts by Mode
| Display Mode | Quick Test | Standard | High Precision |
|-------------|------------|----------|----------------|
| Volatility | 10K paths | 100K paths | 500K paths |
| Error | 10K paths | 250K paths | 1M paths |
| Both | 50K paths | 250K paths | 1M paths |

## Integration with Other Features

### Cache Behavior
- Display mode selection **does not** affect caching
- Same simulation data used for all display modes
- Cache key based on test case and path count only

### Export Compatibility
- All numerical arrays available regardless of display mode
- Raw data structure unchanged
- Display mode only affects visualization, not data

### API Integration
- Display mode is frontend-only feature
- Backend returns complete data set always
- Frontend filters display based on user selection

This display mode functionality provides flexible analysis capabilities while maintaining the complete numerical data access that was requested.
