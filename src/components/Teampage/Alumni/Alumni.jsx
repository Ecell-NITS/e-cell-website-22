import React, { useState, useEffect } from 'react'
import './Alumni.css'
import Data from '../../../Data/Alumni.json'
import ModalCard from '../Modal/ModalCardAlumni';
import { Modal, ModalBody, ModalHeader } from "reactstrap"
function Alumni() {
    const [modal, setmodal] = useState(false)
    const [modalid, setmodalid] = useState(1);
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
            <section className="alumni">
                <div className="cards">
                    {
                        Data.map(data => {
                            return (
                                <div key={data.id} className="profile" onClick={() => {
                                    setmodalid(data.id)
                                    setmodal(true)
                                }}>
                                    <div className="img_alumni" ><img src={""} data-src={data.image}
                                        className={loaded ? "loaded" : "loading"}
                                        onLoad={() => setIsLoaded(true)} alt="Profile of author" /></div>
                                    <div className="name_alumni">{data.name}</div>
                                    <div className="desg_alumni">{data.rank}</div>
                                </div>

                            )
                        })
                    }
                </div>
                <Modal size='lg' isOpen={modal} toggle={() => setmodal(!modal)}>
                    <ModalHeader toggle={() => setmodal(!modal)}></ModalHeader>
                    <ModalBody>
                        <ModalCard dataid={modalid} />
                    </ModalBody>
                </Modal>
            </section>
        </>
    )
}

export default Alumni
