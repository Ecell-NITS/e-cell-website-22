import React, { useRef, useState, useEffect } from 'react'
import { resourcesdta } from '../../Data/ResourcesData';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import BookModal from './BookModal'
const BooksSummary = () => {
    let resourcesHolder = useRef();

    function fwdNext() {
        resourcesHolder.current.scrollLeft += resourcesHolder.current.offsetWidth;
    }

    function backPrev() {
        resourcesHolder.current.scrollLeft -= resourcesHolder.current.offsetWidth;
    }

    const [modal, setmodal] = useState(false);
    const [modalid, setmodalid] = useState(1);


    /* implementing ioa */
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
            <div className="collab">
                <h1 style={{ userSelect: "none" }}>BOOKS RECOMMENDATIONS</h1>
            </div>

            <div className="resources-indi" ref={resourcesHolder}>
                {resourcesdta.map((item) => {
                    return (

                        <div
                            className="resource-indi"
                            key={item.id}>
                            <div className="img-resour">
                                <img src=''
                                    data-src={item.img}
                                    className={loaded ? "loaded" : "loading"}
                                    onLoad={() => setIsLoaded(true)}
                                    onClick={() => {
                                        setmodalid(item.id);
                                        setmodal(true);
                                    }}
                                    alt="" />
                            </div>
                        </div>

                    );
                })}
            </div>
            <div className="btns">
                <button className="prev btn-testimonial" onClick={backPrev}>
                    <AiOutlineArrowLeft className="btn-indi-testimonial" />
                </button>
                <button className="next btn-testimonial" onClick={fwdNext}>
                    <AiOutlineArrowRight className="btn-indi-testimonial" />
                </button>
            </div>

            <Modal size="lg" isOpen={modal} toggle={() => setmodal(!modal)}>
                <ModalHeader toggle={() => setmodal(!modal)}></ModalHeader>
                <ModalBody>
                    <BookModal dataid={modalid} />
                </ModalBody>
            </Modal>
        </>
    )
}

export default BooksSummary