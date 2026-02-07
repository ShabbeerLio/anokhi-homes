import React, { useEffect, useState } from "react";
import LBreadcrumb from "../../components/LandingPage/LBreadcrumb";
import "./Gallery.css";

const images = [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1",
    "https://images.unsplash.com/photo-1508766206392-8bd5cf550d1c",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
];

const Gallery = () => {
    const [activeImage, setActiveImage] = useState(null);

    // Close on ESC
    useEffect(() => {
        const esc = (e) => e.key === "Escape" && setActiveImage(null);
        window.addEventListener("keydown", esc);
        return () => window.removeEventListener("keydown", esc);
    }, []);
    return (
        <>
            <div className="landing-head">
                <div className="landing-top">
                    <h1>Gallery</h1>
                </div>
                <LBreadcrumb />
            </div>

            {/* Gallery */}
            <div className="landing-pages">
                <div className="gallery-grid">
                    {images.map((img, i) => (
                        <div className="gallery-item"
                            key={i}
                            onClick={() => setActiveImage(img)}>
                            <img src={img} alt={`gallery-${i}`} />
                        </div>
                    ))}
                </div>
            </div>
            {/* Lightbox */}
            {activeImage && (
                <div className="lightbox" onClick={() => setActiveImage(null)}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="lightbox-close"
                            onClick={() => setActiveImage(null)}
                        >
                            ✕
                        </button>
                        <img src={activeImage} alt="full-view" />
                    </div>
                </div>
            )}
        </>
    );
};

export default Gallery;