import DownloadPage from "./DownloadPage";

const InstallationGuide = () => {
  return (
    <DownloadPage
      title="Installation Guide"
      description="Step-by-step installation instructions for XSigma Analytix platform, including system requirements, dependencies, and configuration guides."
      icon="🔧"
      category="Software & Tools"
      comingSoon={true}
      relatedLinks={[
        {
          name: "Python Package (PyPI)",
          url: "https://pypi.org/project/xsigma/",
          external: true
        },
        {
          name: "API Documentation",
          url: "/sphinx-doc/xsigma-1.1-3/index.html",
          external: true
        },
        {
          name: "Developer Guide",
          url: "/downloads/developer-guide"
        }
      ]}
    />
  );
};

export default InstallationGuide;
