import React, { useRef, useState, useEffect } from 'react'
import { podcastdata } from "../../Data/ResourcesData";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import PodcastModal from './PodcastModal'
const PodcastSummary = () => {
    let podcastHolder = useRef();

    function fwdNext0() {
        podcastHolder.current.scrollLeft += podcastHolder.current.offsetWidth;
    }

    function backPrev0() {
        podcastHolder.current.scrollLeft -= podcastHolder.current.offsetWidth;
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
                <h1 style={{ userSelect: "none" }}>MOVIE RECOMMENDATIONS</h1>
            </div>
            <div className="resources-indi" ref={podcastHolder}>
                {podcastdata.map((item) => {
                    return (

                        <div className="resource-indi hjloq" key={item.id}>
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
                <button className="prev btn-testimonial" onClick={backPrev0}>
                    <AiOutlineArrowLeft className="btn-indi-testimonial" />
                </button>
                <button className="next btn-testimonial" onClick={fwdNext0}>
                    <AiOutlineArrowRight className="btn-indi-testimonial" />
                </button>
            </div>

            <Modal size="lg" isOpen={modal} toggle={() => setmodal(!modal)}>
                <ModalHeader toggle={() => setmodal(!modal)}></ModalHeader>
                <ModalBody>
                    <PodcastModal dataid={modalid} />
                </ModalBody>
            </Modal>
        </>
    )
}

export default PodcastSummary