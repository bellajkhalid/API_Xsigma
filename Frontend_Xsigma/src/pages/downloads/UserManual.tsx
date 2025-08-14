import DownloadPage from "./DownloadPage";

const UserManual = () => {
  return (
    <DownloadPage
      title="User Manual"
      description="Comprehensive user manual covering all aspects of the XSigma Analytix platform, from basic usage to advanced features."
      icon="📖"
      category="Documentation & Guides"
      comingSoon={true}
      relatedLinks={[
        {
          name: "API Documentation",
          url: "/sphinx-doc/xsigma-1.1-3/index.html",
          external: true
        },
        {
          name: "Developer Guide",
          url: "/downloads/developer-guide"
        },
        {
          name: "Tutorial Videos",
          url: "/downloads/tutorials"
        }
      ]}
    />
  );
};

export default UserManual;
