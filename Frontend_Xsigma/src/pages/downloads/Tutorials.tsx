import DownloadPage from "./DownloadPage";

const Tutorials = () => {
  return (
    <DownloadPage
      title="Tutorial Videos"
      description="Video tutorials and interactive guides to help you get started with XSigma Analytix and master advanced features."
      icon="🎥"
      category="Documentation & Guides"
      comingSoon={true}
      relatedLinks={[
        {
          name: "User Manual",
          url: "/downloads/user-manual"
        },
        {
          name: "Developer Guide",
          url: "/downloads/developer-guide"
        },
        {
          name: "API Documentation",
          url: "/sphinx-doc/xsigma-1.1-3/index.html",
          external: true
        }
      ]}
    />
  );
};

export default Tutorials;
