import SolutionPage from "@/components/SolutionPage";

export default function Banking() {
  return (
    <SolutionPage
      title="Transaction Banking"
      subtitle="Produits bancaires intégrés"
      description="Intégrez des services de paiement et de trésorerie de bout en bout."
      highlight={[
        { label: 'Currencies', value: '60+' },
        { label: 'Regions', value: 'Global' },
        { label: 'Settlement', value: 'T+0' },
        { label: 'Uptime', value: '99.95%' }
      ]}
      features={[
        { title: 'Payments & Cash', description: 'Paiements, recouvrement, reconciliation et reporting.' },
        { title: 'APIs', description: 'Intégration REST sécurisée, OAuth et webhooks.' },
        { title: 'Compliance', description: 'KYC/AML intégrés et audit complet.' },
      ]}
    />
  );
}

