import React, { useState, useRef, useEffect } from "react";
import "./Collab.css";
import Rupay from "./Rupay";
import Unacademy from "./Unacademy";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import Vedantu from "./Vedantu";
import CocaCola from "./CocaCola";
import Ieee from "./Ieee";
import Jantagrp from "./Jantagrp";
import Pnb from "./Pnb";
import Kwikpic from "./Kwikpic";
import Ssstart from "./Ssstart";
// import Allay from './Allay';
import EngineerHub from "./EngineerHub";
import StockGro from "./StockGro";
import Yen from "./Yen";
import Anterprerna from "./Anterprerna";
import Ivycap from "./Ivycap";
import Finlatics from "./Finlatics";
import LearnTravel from "./LearnTravel";
import Edtimes from "./Edtimes";
import Payzaql from "./Payzaql";

const Collaboration = () => {
  const [loaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const config = {
      rootMargin: "0px 0px 0px 0px",
      threshold: 0.2,
    };
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
  let collabHolder = useRef();

  function swipecollabNext() {
    collabHolder.current.scrollLeft += collabHolder.current.offsetWidth;
  }

  function swipecollabPrev() {
    collabHolder.current.scrollLeft -= collabHolder.current.offsetWidth;
  }
  const [accollab, setAcccollab] = useState("Edtimes");

  return (
    <>
      <div className="collab">
        <h1 style={{ userSelect: "none" }}>COLLABORATION</h1>
      </div>

      <div className="top-segment">
        <div className="btn-junior" ref={collabHolder}>
          {/* <div className="slide-track-m"> */}
          <div
            id="tbn-indi-collab-po"
            className={`Edtimes ${accollab === "Edtimes" ? " njkl021" : ""}`}
          >
            <button
              id="btn-collab-indi-po"
              onClick={() => {
                setAcccollab("Edtimes");
              }}
            >
              <img
                className={`${loaded ? "loaded" : "loading"} ru-collab`}
                onLoad={() => setIsLoaded(true)}
                src=""
                data-src="https://res.cloudinary.com/dp92qug2f/image/upload/v1685354010/Ecell%20website/edtimes_logo_bhl4ec.webp"
                alt="Rupay"
              />
            </button>
          </div>

          <div
            id="tbn-indi-collab-po"
            className={`Payzaql ${accollab === "Payzaql" ? " njkl021" : ""}`}
          >
            <button
              id="btn-collab-indi-po"
              onClick={() => {
                setAcccollab("Payzaql");
              }}
            >
              <img
                className={`${loaded ? "loaded" : "loading"} ru-collab`}
                onLoad={() => setIsLoaded(true)}
                src=""
                data-src="https://res.cloudinary.com/draptrzrc/image/upload/v1707558984/Payzaql.webp"
                alt="Payzaql"
              />
            </button>
          </div>

          <div
            id="tbn-indi-collab-po"
            className={`Rupay ${accollab === "Rupay" ? " njkl021" : ""}`}
          >
            <button
              id="btn-collab-indi-po"
              onClick={() => {
                setAcccollab("Rupay");
              }}
            >
              <img
                className={`${loaded ? "loaded" : "loading"} ru-collab`}
                onLoad={() => setIsLoaded(true)}
                src=""
                data-src="https://res.cloudinary.com/dp92qug2f/image/upload/v1676989598/collaboration-ecell/Cubeleloresized_jimc2g.png"
                alt="Rupay"
              />
            </button>
          </div>

          <div
            id="tbn-indi-collab-po"
            className={`Unacademy ${accollab === "Unacademy" ? " njkl021" : ""}`}
          >
            <button
              id="btn-collab-indi-po"
              onClick={() => {
                setAcccollab("Unacademy");
              }}
            >
              <img
                className={`${loaded ? "loaded" : "loading"} ru-collab`}
                onLoad={() => setIsLoaded(true)}
                src=""
                data-src="https://res.cloudinary.com/dp92qug2f/image/upload/v1676990266/collaboration-ecell/blackmarble00_q3mowc.png"
                alt="Unacademy"
              />
            </button>
          </div>

          <div
            id="tbn-indi-collab-po"
            className={`Vedantu ${accollab === "Vedantu" ? " njkl021" : ""}`}
          >
            <button
              id="btn-collab-indi-po"
              onClick={() => {
                setAcccollab("Vedantu");
              }}
            >
              <img
                className={`${loaded ? "loaded" : "loading"} ru-collab`}
                onLoad={() => setIsLoaded(true)}
                src=""
                data-src="https://res.cloudinary.com/dp92qug2f/image/upload/v1676990589/collaboration-ecell/gfgre_xzhxha.png"
                alt="Vedantu"
              />
            </button>
          </div>

          <div
            id="tbn-indi-collab-po"
            className={`Coca Cola ${accollab === "Coca Cola" ? " njkl021" : ""}`}
          >
            <button
              id="btn-collab-indi-po"
              onClick={() => {
                setAcccollab("Coca Cola");
              }}
            >
              <img
                className={`${loaded ? "loaded" : "loading"} ru-collab`}
                onLoad={() => setIsLoaded(true)}
                src=""
                data-src="https://res.cloudinary.com/dp92qug2f/image/upload/v1676990660/collaboration-ecell/truscholarres_korsx7.png"
                alt="Coca cola"
              />
            </button>
          </div>

          <div
            id="tbn-indi-collab-po"
            className={`IEEE ${accollab === "IEEE" ? " njkl021" : ""}`}
          >
            <button
              id="btn-collab-indi-po"
              onClick={() => {
                setAcccollab("IEEE");
              }}
            >
              <img
                className={`${loaded ? "loaded" : "loading"} ru-collab`}
                onLoad={() => setIsLoaded(true)}
                src=""
                data-src="https://res.cloudinary.com/dp92qug2f/image/upload/v1676990737/collaboration-ecell/assamStartUpres_n2fbxv.png"
                alt="IEEE"
              />
            </button>
          </div>

          <div
            id="tbn-indi-collab-po"
            className={`Finlatics ${accollab === "Finlatics" ? " njkl021" : ""}`}
          >
            <button
              id="btn-collab-indi-po"
              onClick={() => {
                setAcccollab("Finlatics");
              }}
            >
              <img
                className={`${loaded ? "loaded" : "loading"} ru-collab`}
                onLoad={() => setIsLoaded(true)}
                src=""
                data-src="https://res.cloudinary.com/dp92qug2f/image/upload/v1676989494/collaboration-ecell/finlatics_dh1suv.png"
                alt="Janta group"
              />
            </button>
          </div>

          <div
            id="tbn-indi-collab-po"
            className={`Punjab National Bank ${
              accollab === "Punjab National Bank" ? " njkl021" : ""
            }`}
          >
            <button
              id="btn-collab-indi-po"
              onClick={() => {
                setAcccollab("Punjab National Bank");
              }}
            >
              <img
                className={`${loaded ? "loaded" : "loading"} ru-collab`}
                onLoad={() => setIsLoaded(true)}
                src=""
                data-src="https://res.cloudinary.com/dp92qug2f/image/upload/c_scale,w_360,f_auto,fl_lossy/v1676524279/collaboration-ecell/PNB_Icon-resize_aghkjd.png"
                alt="PNB"
              />
            </button>
          </div>

          <div
            id="tbn-indi-collab-po"
            className={`Kwikpic ${accollab === "Kwikpic" ? " njkl021" : ""}`}
          >
            <button
              id="btn-collab-indi-po"
              onClick={() => {
                setAcccollab("Kwikpic");
              }}
            >
              <img
                className={`${loaded ? "loaded" : "loading"} ru-collab`}
                onLoad={() => setIsLoaded(true)}
                src=""
                data-src="https://res.cloudinary.com/dp92qug2f/image/upload/v1676988769/collaboration-ecell/kwikpicghj_x7cy2p.png"
                alt="PNB"
              />
            </button>
          </div>

          <div
            id="tbn-indi-collab-po"
            className={`Ssstart ${accollab === "Ssstart" ? " njkl021" : ""}`}
          >
            <button
              id="btn-collab-indi-po"
              onClick={() => {
                setAcccollab("Ssstart");
              }}
            >
              <img
                className={`${loaded ? "loaded" : "loading"} ru-collab`}
                onLoad={() => setIsLoaded(true)}
                src=""
                data-src="https://res.cloudinary.com/dp92qug2f/image/upload/v1676988848/collaboration-ecell/ssstartRe_xea2cl.png"
                alt="PNB"
              />
            </button>
          </div>

          {/* <div id='tbn-indi-collab-po' className={`Allay ${accollab === "Allay" ? " njkl021" : ""}`}>
                        <button id="btn-collab-indi-po"
                            onClick={() => { setAcccollab("Allay") }}>
                            <img className={`${loaded ? "loaded" : "loading"} ru-collab`} onLoad={() => setIsLoaded(true)} src="" data-src="https://res.cloudinary.com/dp92qug2f/image/upload/v1676988923/collaboration-ecell/allayRes_bljauc.png" alt="PNB" />
                        </button>
                    </div> */}

          <div
            id="tbn-indi-collab-po"
            className={`EngineerHub ${accollab === "EngineerHub" ? " njkl021" : ""}`}
          >
            <button
              id="btn-collab-indi-po"
              onClick={() => {
                setAcccollab("EngineerHub");
              }}
            >
              <img
                className={`${loaded ? "loaded" : "loading"} ru-collab`}
                onLoad={() => setIsLoaded(true)}
                src=""
                data-src="https://res.cloudinary.com/dp92qug2f/image/upload/v1676989080/collaboration-ecell/engineer_hubRe_ggety2.png"
                alt="PNB"
              />
            </button>
          </div>

          <div
            id="tbn-indi-collab-po"
            className={`StockGro ${accollab === "StockGro" ? " njkl021" : ""}`}
          >
            <button
              id="btn-collab-indi-po"
              onClick={() => {
                setAcccollab("StockGro");
              }}
            >
              <img
                className={`${loaded ? "loaded" : "loading"} ru-collab`}
                onLoad={() => setIsLoaded(true)}
                src=""
                data-src="https://res.cloudinary.com/dp92qug2f/image/upload/v1676989170/collaboration-ecell/stockGroRE_ymge3d.png"
                alt="PNB"
              />
            </button>
          </div>

          <div
            id="tbn-indi-collab-po"
            className={`Yen ${accollab === "Yen" ? " njkl021" : ""}`}
          >
            <button
              id="btn-collab-indi-po"
              onClick={() => {
                setAcccollab("Yen");
              }}
            >
              <img
                className={`${loaded ? "loaded" : "loading"} ru-collab`}
                onLoad={() => setIsLoaded(true)}
                src=""
                data-src="https://res.cloudinary.com/dp92qug2f/image/upload/v1676989292/collaboration-ecell/yenRE_zgrknu.png"
                alt="PNB"
              />
            </button>
          </div>

          <div
            id="tbn-indi-collab-po"
            className={`Anterprerna ${accollab === "Anterprerna" ? " njkl021" : ""}`}
          >
            <button
              id="btn-collab-indi-po"
              onClick={() => {
                setAcccollab("Anterprerna");
              }}
            >
              <img
                className={`${loaded ? "loaded" : "loading"} ru-collab`}
                onLoad={() => setIsLoaded(true)}
                src=""
                data-src="https://res.cloudinary.com/dp92qug2f/image/upload/v1676989412/collaboration-ecell/anterprerna_susjet.png"
                alt="PNB"
              />
            </button>
          </div>

          <div
            id="tbn-indi-collab-po"
            className={`Ivycap ${accollab === "Ivycap" ? " njkl021" : ""}`}
          >
            <button
              id="btn-collab-indi-po"
              onClick={() => {
                setAcccollab("Ivycap");
              }}
            >
              <img
                className={`${loaded ? "loaded" : "loading"} ru-collab`}
                onLoad={() => setIsLoaded(true)}
                src=""
                data-src="https://res.cloudinary.com/dp92qug2f/image/upload/v1676989729/collaboration-ecell/IvyCap_bnxqmc.png"
                alt="PNB"
              />
            </button>
          </div>

          <div
            id="tbn-indi-collab-po"
            className={`Janta group ${accollab === "Janta group" ? " njkl021" : ""}`}
          >
            <button
              id="btn-collab-indi-po"
              onClick={() => {
                setAcccollab("Janta group");
              }}
            >
              <img
                className={`${loaded ? "loaded" : "loading"} ru-collab`}
                onLoad={() => setIsLoaded(true)}
                src=""
                data-src="https://res.cloudinary.com/dp92qug2f/image/upload/v1676989825/collaboration-ecell/jantaGroup_apsnyg.png"
                alt="PNB"
              />
            </button>
          </div>

          <div
            id="tbn-indi-collab-po"
            className={`LearnTravel ${accollab === "LearnTravel" ? " njkl021" : ""}`}
          >
            <button
              id="btn-collab-indi-po"
              onClick={() => {
                setAcccollab("LearnTravel");
              }}
            >
              <img
                className={`${loaded ? "loaded" : "loading"} ru-collab`}
                onLoad={() => setIsLoaded(true)}
                src=""
                data-src="https://res.cloudinary.com/dp92qug2f/image/upload/v1676990018/collaboration-ecell/learningWhileTraveling_bmf0fj.png"
                alt="PNB"
              />
            </button>
          </div>
          {/* </div> */}
        </div>

        <div className="btns">
          <button className="prev btn-testimonial" onClick={swipecollabPrev}>
            <AiOutlineArrowLeft className="btn-indi-testimonial" />
          </button>
          <button className="next btn-testimonial" onClick={swipecollabNext}>
            <AiOutlineArrowRight className="btn-indi-testimonial" />
          </button>
        </div>
        {accollab === "Edtimes" && <Edtimes />}
        {accollab === "Payzaql" && <Payzaql />}
        {accollab === "Rupay" && <Rupay />}
        {accollab === "Unacademy" && <Unacademy />}
        {accollab === "Vedantu" && <Vedantu />}
        {accollab === "Coca Cola" && <CocaCola />}
        {accollab === "IEEE" && <Ieee />}
        {accollab === "Janta group" && <Jantagrp />}
        {accollab === "Punjab National Bank" && <Pnb />}
        {accollab === "Kwikpic" && <Kwikpic />}
        {accollab === "Ssstart" && <Ssstart />}
        {/* {accollab === "Allay" && <Allay />} */}
        {accollab === "EngineerHub" && <EngineerHub />}
        {accollab === "StockGro" && <StockGro />}
        {accollab === "Yen" && <Yen />}
        {accollab === "Anterprerna" && <Anterprerna />}
        {accollab === "Ivycap" && <Ivycap />}
        {accollab === "Finlatics" && <Finlatics />}
        {accollab === "LearnTravel" && <LearnTravel />}
      </div>
    </>
  );
};

export default Collaboration;
