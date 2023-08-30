import React, { useState, useEffect } from 'react'
import './GalleryCard.css'
const config = {
  rootMargin: "0px 0px 0px 0px",
  threshold: 0.2,
};
function GalleryCard(props) {
  const [loaded, setIsLoaded] = useState(false);

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
      <div className="Gallery_card">
        {/* <div className="card_body">
                <h5 className="card_title">{props.id}</h5>
             </div> */}
        <img src={""} key={props.id} data-src={props.imgsrc} alt="img"
          className={`${loaded ? "loaded" : "loading"} card-img-top`}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  )
}

export default GalleryCard
