import DownloadPage from "./DownloadPage";

const CaseStudies = () => {
  return (
    <DownloadPage
      title="Case Studies"
      description="Real-world case studies demonstrating the application of XSigma Analytix in various financial scenarios and market conditions."
      icon="📊"
      category="Research & Publications"
      comingSoon={true}
      relatedLinks={[
        {
          name: "Technical White Papers",
          url: "/downloads/white-papers"
        },
        {
          name: "Research Publications",
          url: "/downloads/publications"
        },
        {
          name: "User Manual",
          url: "/downloads/user-manual"
        }
      ]}
    />
  );
};

export default CaseStudies;
