import DownloadPage from "./DownloadPage";

const WhitePapers = () => {
  return (
    <DownloadPage
      title="Technical White Papers"
      description="In-depth technical white papers covering advanced quantitative finance topics, mathematical models, and implementation strategies."
      icon="📋"
      category="Research & Publications"
      comingSoon={true}
      relatedLinks={[
        {
          name: "Coherent Market Simulations Paper",
          url: "https://www.researchgate.net/publication/227624010_Coherent_global_market_simulations_and_securitization_measures_for_counterparty_credit_risk",
          external: true
        },
        {
          name: "Research Publications",
          url: "/downloads/publications"
        },
        {
          name: "Case Studies",
          url: "/downloads/case-studies"
        }
      ]}
    />
  );
};

export default WhitePapers;
