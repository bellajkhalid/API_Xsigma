import SolutionPage from "@/components/SolutionPage";

export default function PricingRisk() {
  return (
    <SolutionPage
      title="Pricing & Risk Engines"
      subtitle="Valuation and Sensitivities Using Production-Tested Models"
      description="Bank-grade pricing engines and risk analytics powered by production-tested market models. Enhanced AAD delivers machine-precision Greeks and scalable portfolio risk metrics."
      highlight={[
        { label: 'Valuation Speed', value: 'Real-Time' },
        { label: 'Greeks Precision', value: 'Machine-Level' },
        { label: 'Risk Metrics', value: 'Portfolio-Scale' },
        { label: 'Model Status', value: 'Production-Ready' }
      ]}
      features={[
        { title: 'Production-Tested Valuation', description: 'Pricing engines using market models already implemented and validated in bank trading environments.' },
        { title: 'Enhanced AAD Sensitivities', description: 'Machine-precision Greeks and risk sensitivities computed using proprietary algorithmic automatic differentiation.' },
        { title: 'Scalable Risk Analytics', description: 'Portfolio-level VaR, ES, and regulatory capital calculations with enhanced AAD acceleration.' },
      ]}
    />
  );
}
