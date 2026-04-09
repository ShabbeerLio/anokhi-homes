import React, { useEffect, useState } from "react";
import LBreadcrumb from "../../components/LandingPage/LBreadcrumb";
import "./Documents.css";
import NiOpenEye from "../../icons/ni-openEye";

const Documents = () => {
  const [activeImage, setActiveImage] = useState(null);

  const documentsData = {
    thumbnail: [
      { id: 1, image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
      { id: 2, image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" },
    ],
    pdf: [
      {
        id: 1,
        file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        fileName: "Project Brochure",
        thumbnail: "https://cdn-icons-png.flaticon.com/512/337/337946.png",
      },
    ],
  };

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setActiveImage(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <>
      <div className="landing-head-box">
        <div className="landing-head">
          <div className="landing-top">
            <h1>Documents</h1>
          </div>
          <LBreadcrumb />
        </div>
      </div>

      <div className="landing-pages">

        {/* ✅ THUMBNAILS */}
        <h3 className="section-title">Thumbnail</h3>
        <div className="document-grid">
          {documentsData.thumbnail.map((item) => (
            <div
              className="document-item"
              key={item.id}
              onClick={() => setActiveImage(item.image)}
            >
              <img src={item.image} alt="thumbnail" />
            </div>
          ))}
        </div>

        {/* ✅ PDF */}
        <h3 className="section-title">Documents (PDF)</h3>
        <div className="document-grid">
          {documentsData.pdf.map((item) => (
            <div
              className="document-item pdf-item"
              key={item.id}
              onClick={() => window.open(item.file, "_blank")}
            >
              {/* <img src={item.thumbnail} alt="pdf" /> */}
              <h4>{item.fileName}</h4>
              <NiOpenEye/>

              <span className="pdf-badge">PDF</span>
            </div>
          ))}
        </div>

      </div>

      {/* ✅ Lightbox */}
      {activeImage && (
        <div className="lightbox" onClick={() => setActiveImage(null)}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={() => setActiveImage(null)}
            >
              ✕
            </button>
            <img src={activeImage} alt="preview" />
          </div>
        </div>
      )}
    </>
  );
};

export default Documents;