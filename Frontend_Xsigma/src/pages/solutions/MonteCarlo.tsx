import SolutionPage from "@/components/SolutionPage";

export default function MonteCarlo() {
  return (
    <SolutionPage
      title="Monte Carlo Simulation Platform"
      subtitle="Multi-Asset Simulations, XVA, Regulatory Analytics"
      description="Production-grade Monte Carlo simulation platform for multi-asset derivatives pricing, XVA calculations, and regulatory capital analytics. Enhanced AAD enables efficient pathwise Greeks computation."
      highlight={[
        { label: 'Simulation Speed', value: 'GPU-Accelerated' },
        { label: 'Asset Coverage', value: 'Multi-Asset' },
        { label: 'Pathwise Greeks', value: 'AAD-Enabled' },
        { label: 'Regulatory', value: 'FRTB/SA-CCR' }
      ]}
      features={[
        { title: 'Multi-Asset Simulations', description: 'Cross-asset Monte Carlo simulations using production-tested stochastic models for rates, FX, equity, and credit.' },
        { title: 'XVA & Regulatory Analytics', description: 'CVA, DVA, FVA, and regulatory capital calculations (FRTB, SA-CCR) with enhanced AAD pathwise sensitivities.' },
        { title: 'Efficient AAD Pathwise Greeks', description: 'Machine-precision pathwise derivatives using proprietary enhanced AAD technology for all simulation parameters.' },
      ]}
    />
  );
}
