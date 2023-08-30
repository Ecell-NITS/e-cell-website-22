import React,{useState, useEffect} from 'react'
import './Core.css'
import { FaFacebook, FaLinkedin } from 'react-icons/fa'
import { BsGithub } from 'react-icons/bs'
import Data from '../../../Data/Core3.json'


function CoreTeam3() {
    /*  implementing lazy load via ioa */
    const config = {
      rootMargin: "0px 0px 0px 0px",
      threshold: 0.2,
  };

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
         <section className="core_team">
            <div className="core_heading">
               <h1>Core Team</h1>
            </div>
            <div className="core-container">
               {
                  Data.map(data => {
                     return (
                        <div className="core-mem" key={data.id}>
                           <div className="body">
                              <div className="core-images">
                                 <img src={""}
                                    data-src={data.image}
                                    className={loaded ? "loaded" : "loading"}
                                    onLoad={() => setIsLoaded(true)}
                                    alt="" />
                              </div>
                              <h3 className='core-title'>{data.name}</h3>
                           </div>
                           <p className="core_mem_text">{data.rank}</p>
                           <div className="social-media-core">
                              <a href={data.fb} className="SocialLogoCore" target="_blank" rel="noreferrer"><FaFacebook size={30} /></a>
                              <a href={data.linkdln} className="SocialLogoCore" target="_blank" rel="noreferrer"><FaLinkedin size={30} /></a>
                              <a href={data.git} className="SocialLogoCore" target="_blank" rel="noreferrer"><BsGithub size={30} /></a>
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

export default CoreTeam3;