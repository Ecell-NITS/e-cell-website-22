import React, { useRef, useState } from "react";
import Footer from "../../components/shared/Footer/Footer";
import NavbarTeam from "../../components/shared/Navbar/NavbarTeam";
import { resourcesdta } from "../../Data/ResourcesData";
import { podcastdata } from "../../Data/ResourcesData";
import "./Resources.css";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import BookModal from "../../components/ResourceModal/BookModal";
import PodcastModal from "../../components/ResourceModal/PodcastModal";

const Resources = () => {
  const [modal, setmodal] = useState(false);
  const [modalid, setmodalid] = useState(1);
  let resourcesHolder = useRef();

  function fwdNext() {
    resourcesHolder.current.scrollLeft += resourcesHolder.current.offsetWidth;
  }

  function backPrev() {
    resourcesHolder.current.scrollLeft -= resourcesHolder.current.offsetWidth;
  }

  let podcastHolder = useRef();

  function fwdNext0() {
    podcastHolder.current.scrollLeft += podcastHolder.current.offsetWidth;
  }

  function backPrev0() {
    podcastHolder.current.scrollLeft -= podcastHolder.current.offsetWidth;
  }

  return (
    <>
      <NavbarTeam />
      <div className="resources-main">
        <h1>Resources</h1>
      </div>

      <div className="collab">
        <h1 style={{ userSelect: "none" }}>BOOKS SUMMARY</h1>
      </div>

      <div className="resources-indi" ref={resourcesHolder}>
        {resourcesdta.map((item) => {
          return (
            <>
              <div
                className="resource-indi"
                key={item.id}
                onClick={() => {
                  setmodalid(item.id);
                  setmodal(true);
                }}
              >
                <div className="img-resour">
                  <img src={item.img} alt="" />
                </div>
              </div>
            </>
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

      <div className="collab">
        <h1 style={{ userSelect: "none" }}>PODCAST SUMMARY</h1>
      </div>
      <div className="resources-indi" ref={podcastHolder}>
        {podcastdata.map((item) => {
          return (
            <>
              <div className="resource-indi hjloq" key={item.id} onClick={() => {
                  setmodalid(item.id);
                  setmodal(true);
                }}>
                <div className="img-resour">
                  <img src={item.img} alt="" />
                </div>
              </div>
            </>
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
          <BookModal dataid={modalid} />
        </ModalBody>
      </Modal>
      <Modal size="lg" isOpen={modal} toggle={() => setmodal(!modal)}>
        <ModalHeader toggle={() => setmodal(!modal)}></ModalHeader>
        <ModalBody>
          <PodcastModal dataid={modalid} />
        </ModalBody>
      </Modal>
      <Footer />
    </>
  );
};

export default Resources;
