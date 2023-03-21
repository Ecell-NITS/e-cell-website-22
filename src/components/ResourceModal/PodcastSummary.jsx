import React, { useRef, useState } from 'react'
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

    return (
        <>
            <div className="collab">
                <h1 style={{ userSelect: "none" }}>PODCAST SUMMARY</h1>
            </div>
            <div className="resources-indi" ref={podcastHolder}>
                {podcastdata.map((item) => {
                    return (
                        
                            <div className="resource-indi hjloq" key={item.id}>
                                <div className="img-resour">
                                    <img src={item.img} onClick={() => {
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