import SolutionPage from "@/components/SolutionPage";

export default function Portfolio() {
  return (
    <SolutionPage
      title="Portfolio Analytics"
      subtitle="Optimisation et reporting quantitative"
      description="Optimisez vos portefeuilles et automatisez vos reportings de risque et de conformité."
      highlight={[
        { label: 'Constraints', value: 'Custom' },
        { label: 'Assets', value: 'Multi‑asset' },
        { label: 'Backtests', value: 'Built‑in' },
        { label: 'ESG', value: 'Optional' }
      ]}
      features={[
        { title: 'Optimisation Multi‑Objectifs', description: 'Variance, drawdown, VaR/ES, tracking error et contraintes ESG.' },
        { title: 'Attribution', description: 'Attribution de performance et de risque par factor/sector.' },
        { title: 'Compliance', description: 'Règles d’investissement et alertes en temps réel.' },
      ]}
    />
  );
}

