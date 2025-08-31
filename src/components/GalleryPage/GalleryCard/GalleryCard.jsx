import React, { useState, useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import "./GalleryCard.css";
const config = {
  rootMargin: "0px 0px 0px 0px",
  threshold: 0.2,
};
function GalleryCard(props) {
  const [loaded, setIsLoaded] = useState(false);
  const setTarget = props.setTarget;
  const setIsModalVissible = props.setIsModalVissible;

  useEffect(() => {
    let observer = new window.IntersectionObserver(function (entries, self) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImages(entry.target);
          self.unobserve(entry.target);
        }
      });
    }, config);
    const imgs = document.querySelectorAll("[data-src]");
    imgs.forEach((img) => {
      observer.observe(img);
    });
    return () => {
      imgs.forEach((img) => {
        observer.unobserve(img);
      });
    };
  }, []);

  const loadImages = (image) => {
    image.src = image.dataset.src;
  };
  return (
    <div>
      <div className="Gallery_card" style={{ position: "relative" }}>
        {/* Image stays in flow for IntersectionObserver; we control visibility via opacity */}
        <img
          src={""}
          key={props.id}
          data-src={props.imgsrc}
          alt="img"
          className={`${loaded ? "loaded" : "loading"} card-img-top`}
          style={{
            width: "100%",
            height: "100%",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
          onLoad={() => setIsLoaded(true)}
          onClick={(e) => {
            setTarget(e.target);
            setIsModalVissible(true);
          }}
        />
        {!loaded && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              borderRadius: 8,
            }}
          >
            <Skeleton height="100%" width="100%" borderRadius={8} />
          </div>
        )}
      </div>
    </div>
  );
}

export default GalleryCard;
