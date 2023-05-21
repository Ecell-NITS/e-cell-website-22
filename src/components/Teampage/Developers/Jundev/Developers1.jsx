import React, { useState, useEffect } from 'react'
import './Developers.css'
import { FaFacebook, FaLinkedin } from 'react-icons/fa'
import { BsGithub } from 'react-icons/bs'
import Data from '../../../../Data/DevelopersJundev.json'
const config = {
   rootMargin: "0px 0px 0px 0px",
   threshold: 0.2,
};
function Developers() {
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
      <>
         <section className="junior-developers">

         <div className="core_heading">
               <h1>Junior Developers</h1>
            </div>
            {/* <div className="jr_heading">
               <h1>JUNIOR DEVELOPERS</h1>
            </div> */}
            <div className="container_jrdev">
               {
                  Data.map(data => {
                     return (
                        <div className="jr-dev" key={data.id}>
                           <div className="body">
                              <div className="images_jrdev">
                                 <img src={""} data-src={data.image}
                                    className={loaded ? "loaded" : "loading"}
                                    onLoad={() => setIsLoaded(true)}
                                    alt="" />
                              </div>
                              <h3 className='jrdev_title'>{data.name}</h3>
                           </div>
                           <p className="jrdev_card_text">{data.rank}</p>
                           <div className="social-media-jr">
                              <a href={data.fb} className="MediaLogo-jr" target={'_blank'} rel="noreferrer"><FaFacebook size={30} /></a>
                              <a href={data.linkedln} className="MediaLogo-jr" target={'_blank'} rel="noreferrer"><FaLinkedin size={30} /></a>
                              <a href={data.git} className="MediaLogo-jr" target={'_blank'} rel="noreferrer"><BsGithub size={30} /></a>
                           </div>
                        </div>
                     )
                  })
               }
            </div>
         </section>
      </>
   )
}

export default Developers;