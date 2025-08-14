import DownloadPage from "./DownloadPage";

const Publications = () => {
  return (
    <DownloadPage
      title="Research Publications"
      description="Academic research publications and peer-reviewed papers from the XSigma team, covering cutting-edge developments in quantitative finance."
      icon="🎓"
      category="Research & Publications"
      comingSoon={true}
      relatedLinks={[
        {
          name: "Coherent Market Simulations Paper",
          url: "https://www.researchgate.net/publication/227624010_Coherent_global_market_simulations_and_securitization_measures_for_counterparty_credit_risk",
          external: true
        },
        {
          name: "Technical White Papers",
          url: "/downloads/white-papers"
        },
        {
          name: "Case Studies",
          url: "/downloads/case-studies"
        }
      ]}
    />
  );
};

export default Publications;
