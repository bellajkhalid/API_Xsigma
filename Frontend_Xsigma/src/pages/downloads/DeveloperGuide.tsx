import DownloadPage from "./DownloadPage";

const DeveloperGuide = () => {
  return (
    <DownloadPage
      title="Developer Guide"
      description="Technical documentation for developers, including API integration guides, code examples, and best practices for building with XSigma."
      icon="👨‍💻"
      category="Documentation & Guides"
      comingSoon={true}
      relatedLinks={[
        {
          name: "API Documentation",
          url: "/sphinx-doc/xsigma-1.1-3/index.html",
          external: true
        },
        {
          name: "Python Package (PyPI)",
          url: "https://pypi.org/project/xsigma/",
          external: true
        },
        {
          name: "Installation Guide",
          url: "/downloads/installation-guide"
        }
      ]}
    />
  );
};

export default DeveloperGuide;
