import React, { useState, useEffect } from 'react'
import './SrDevelopers.css';
import { FaFacebook, FaLinkedin } from 'react-icons/fa'
import { BsGithub } from 'react-icons/bs'
import Data from '../../../../../src/Data/Developers.json'
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
            <section className="senior-developers">
                <div className="sr_heading">
                    <h1>SENIOR DEVELOPERS</h1>
                </div>
                <div className="container">
                    {
                        Data.map(data => {
                            return (
                                <div className="sr-dev" key={data.id}>
                                    <div className="body">
                                        <div className="images-sr">
                                            <img src={""} data-src={data.image} alt="" 
                                              className={loaded ? "loaded" : "loading"}
                                              onLoad={() => setIsLoaded(true)}
                                            />
                                        </div>
                                        <h3 className='title'>{data.name}</h3>
                                    </div>
                                    <p className="dev_card_text">{data.rank}</p>
                                    <div className="social-media">
                                        <a href={data.fb} className="MediaLogo" target={'_blank'} rel="noreferrer"><FaFacebook size={30} /></a>
                                        <a href={data.linkedln} className="MediaLogo" target={'_blank'} rel="noreferrer"><FaLinkedin size={30} /></a>
                                        <a href={data.git} className="MediaLogo" target={'_blank'} rel="noreferrer"><BsGithub size={30} /></a>
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