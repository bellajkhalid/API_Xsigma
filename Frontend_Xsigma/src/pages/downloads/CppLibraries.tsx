import DownloadPage from "./DownloadPage";

const CppLibraries = () => {
  return (
    <DownloadPage
      title="C++ Libraries"
      description="High-performance C++ libraries for quantitative finance, featuring optimized implementations of mathematical models, numerical methods, and risk analytics."
      icon="⚡"
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
        }
      ]}
    />
  );
};

export default CppLibraries;
