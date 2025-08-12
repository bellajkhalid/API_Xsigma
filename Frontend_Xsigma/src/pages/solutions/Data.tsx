import SolutionPage from "@/components/SolutionPage";

export default function Data() {
  return (
    <SolutionPage
      title="Curated Data"
      subtitle="Unified, reliable market and reference datasets"
      description="Discover, organiser, gérer et analyser des données à l’échelle avec notre plateforme. Accédez aux historiques multi‑actifs et flux temps réel via une API unifiée."
      highlight={[
        { label: 'Datasets', value: '2k+' },
        { label: 'Assets', value: '120+' },
        { label: 'Latency', value: '<30ms' },
        { label: 'Uptime', value: '99.9%' }
      ]}
      features={[
        { title: 'Market Data Normalization', description: 'Normalisation automatique, déduplication et qualité des données avec SLA.' },
        { title: 'Streaming & Batch', description: 'Accès temps réel (WebSocket) et batch (S3/Parquet) pour vos pipelines.' },
        { title: 'Entitlements', description: 'Contrôles d’accès granulaires et audit pour les données sensibles.' },
      ]}
    />
  );
}

