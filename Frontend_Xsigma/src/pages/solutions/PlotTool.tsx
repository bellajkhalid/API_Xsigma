import SolutionPage from "@/components/SolutionPage";

export default function PlotTool() {
  return (
    <SolutionPage
      title="PlotTool Pro"
      subtitle="Visualisation interactive et notebooks"
      description="Créez des dashboards de marché et notebooks interactifs avec rendu haute performance."
      highlight={[
        { label: 'Charts', value: '50+' },
        { label: 'Latency', value: '<10ms' },
        { label: 'Streaming', value: 'Yes' },
        { label: 'Export', value: 'PNG/CSV' }
      ]}
      features={[
        { title: 'Dashboards Temps Réel', description: 'Grilles, heatmaps, courbes et volatilités implicites en direct.' },
        { title: 'Notebooks', description: 'Intégration Python/JS pour notes et reproductibilité.' },
        { title: 'Share & Embed', description: 'Publiez et intégrez vos visualisations dans vos apps.' },
      ]}
    />
  );
}

