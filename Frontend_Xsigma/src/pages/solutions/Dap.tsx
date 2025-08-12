import SolutionPage from "@/components/SolutionPage";

export default function Dap() {
  return (
    <SolutionPage
      title="GS DAP®"
      subtitle="Digital Asset Platform"
      description="Tokenisation et workflows sur actifs numériques avec gouvernance et conformité."
      highlight={[
        { label: 'TPS', value: '1k+' },
        { label: 'Custody', value: 'Integrated' },
        { label: 'Smart Contracts', value: 'Yes' },
        { label: 'Audit', value: 'Full' }
      ]}
      features={[
        { title: 'Issuance & Transfer', description: 'Émission, gestion et transfert d’actifs tokenisés.' },
        { title: 'Workflows', description: 'Orchestrations et règles d’entreprise.' },
        { title: 'Security', description: 'Chiffrement, rôles, signatures et journaux.' },
      ]}
    />
  );
}

