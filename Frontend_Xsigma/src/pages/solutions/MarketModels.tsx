import SolutionPage from "@/components/SolutionPage";

export default function MarketModels() {
  return (
    <SolutionPage
      title="XCF & XVF Market Models"
      subtitle="Practitioner-Grade Curve & Volatility Frameworks"
      description="Production-ready interest rate curve construction and volatility surface modeling frameworks. Built by practitioners, tested in bank trading desks, accelerated by enhanced AAD for fast calibration."
      highlight={[
        { label: 'Calibration Speed', value: '10x Faster' },
        { label: 'Asset Classes', value: 'Multi-Asset' },
        { label: 'Greeks Accuracy', value: 'Machine Precision' },
        { label: 'Production Status', value: 'Bank-Tested' }
      ]}
      features={[
        { title: 'Enhanced AAD Calibration', description: 'Orders of magnitude faster model calibration using proprietary algorithmic automatic differentiation technology.' },
        { title: 'Production-Tested Models', description: 'Curve and volatility frameworks already implemented and validated in bank trading environments.' },
        { title: 'Machine-Precision Greeks', description: 'Accurate sensitivities and risk metrics computed using enhanced AAD for all model parameters.' },
      ]}
    />
  );
}
