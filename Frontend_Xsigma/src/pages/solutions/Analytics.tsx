import SolutionPage from "@/components/SolutionPage";

export default function Analytics() {
  return (
    <SolutionPage
      title="Data Analytics"
      subtitle="Front‑office analytics et XVA hautes performances"
      description="Créez rapidement des solutions d’analytics et de risque couvrant les marchés globaux. Intégrez nos moteurs dans vos workflows."
      highlight={[
        { label: 'Pricers', value: '30+' },
        { label: 'Models', value: '15+' },
        { label: 'Speedup', value: 'x20' },
        { label: 'Coverage', value: 'Cross‑asset' }
      ]}
      features={[
        { title: 'XVA Engine', description: 'Calculs CVA/DVA/FVA/MVA avec netting, CSA, wrong‑way risk et scénarios.' },
        { title: 'Optimization', description: 'Optimisation de portefeuille multi‑objectifs (volatilité, drawdown, ESG, VaR).' },
        { title: 'Scenario Analysis', description: 'Stress tests, what‑ifs, et backtests paramétriques ou historiques.' },
      ]}
    />
  );
}

