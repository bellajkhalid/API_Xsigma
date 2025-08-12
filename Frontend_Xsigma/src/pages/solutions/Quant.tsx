import SolutionPage from "@/components/SolutionPage";

export default function Quant() {
  return (
    <SolutionPage
      title="GS Quant"
      subtitle="Librairies quantitatives et APIs"
      description="Accédez à des modèles et primitives de pricing via APIs performantes."
      highlight={[
        { label: 'Languages', value: 'Py/TS' },
        { label: 'Coverage', value: 'Cross‑asset' },
        { label: 'Docs', value: 'Sphinx' },
        { label: 'Perf', value: 'Vectorized' }
      ]}
      features={[
        { title: 'Pricers', description: 'Options, taux, FX, IR, vol surfaces et courbes.' },
        { title: 'Calibration', description: 'Algorithmes robustes, parallélisés.' },
        { title: 'Interoperability', description: 'SDK multi‑langages et REST.' },
      ]}
    />
  );
}

