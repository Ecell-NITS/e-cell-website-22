import React, { useRef, useState, useEffect } from "react";
import Footer from "../shared/Footer/Footer";
import NavbarTeam from "../shared/Navbar/NavbarTeam";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import "./events.css";
import {
  alleventsrjn,
  alleventorientation,
  alleventempresario,
  alleventeic,
  alleventsrijan,
} from "../../Data/EventsData";

const AllEvents = () => {
  useEffect(() => {
    document.title = "Past Events ECELL | NITS";
  }, []);

  let allevntsrjn = useRef();
  let allevntorientation = useRef();
  let allevntempressario = useRef();
  let allevnteic = useRef();

  const scrollNext = (ref) => (ref.current.scrollLeft += ref.current.offsetWidth);
  const scrollPrev = (ref) => (ref.current.scrollLeft -= ref.current.offsetWidth);

  const config = { rootMargin: "0px", threshold: 0.2 };
  const [loaded, setIsLoaded] = useState(false);
  useEffect(() => {
    let observer = new window.IntersectionObserver((entries, self) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImages(entry.target);
          self.unobserve(entry.target);
        }
      });
    }, config);
    const imgs = document.querySelectorAll("[data-src]");
    imgs.forEach((img) => observer.observe(img));
    return () => imgs.forEach((img) => observer.unobserve(img));
  });

  const loadImages = (image) => {
    image.src = image.dataset.src;
  };

  const EventSection = ({ title, data, refVar }) => (
    <>
      <div className="upcom-evnts-top">
        <h1>
          <span
            style={{
              fontFamily: "Barlow Condensed",
              color: "var(--text-color-primary)",
              fontWeight: "900",
            }}
          >
            {title}
          </span>
        </h1>
      </div>

      <div className="upcomi-evvnts-parnt events-wrapper" ref={refVar}>
        {data.map((item) => (
          <div className="upcom-evnt-indi event-card" key={item.id}>
            <div className="img-upcom-evnt event-img">
              <img
                src=""
                data-src={item.img}
                className={loaded ? "loaded" : "loading"}
                onLoad={() => setIsLoaded(true)}
                alt={item.title}
              />
            </div>

            <div className="title-announc-upcom-evnt event-title">
              <h1>{item.title}</h1>
            </div>

            <div className="dte-locn-upcomi-event event-date">
              <h2>{item.date}</h2>
            </div>

            <div className="btns-info-klp event-btns">
              {item.btn1 && (
                <div className="btns-1-ent-indi">
                  <button>{item.btn1}</button>
                </div>
              )}
              {item.btn2 && (
                <div className="btns-1-ent-indi">
                  <button>{item.btn2}</button>
                </div>
              )}
            </div>

            <div className="abt-content-indi-evnt event-desc">
              <h3>{item.content}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="btns">
        <button className="prev btn-testimonial" onClick={() => scrollPrev(refVar)}>
          <AiOutlineArrowLeft className="btn-indi-testimonial" />
        </button>
        <button className="next btn-testimonial" onClick={() => scrollNext(refVar)}>
          <AiOutlineArrowRight className="btn-indi-testimonial" />
        </button>
      </div>
    </>
  );

  return (
    <>
      <NavbarTeam />
      <div className="events-main-hero">
        <div className="top-hro-all-evnts-pol">
          <h1>OUR PAST EVENTS</h1>
        </div>
      </div>

      <EventSection
        title="ORIENTATION"
        data={alleventorientation}
        refVar={allevntorientation}
      />
      <EventSection
        title="EMPRESSARIO"
        data={alleventempresario}
        refVar={allevntempressario}
      />
      <EventSection
        title="ENTREPRENEURSHIP & INNOVATION CHALLENGE (EIC)"
        data={alleventeic}
        refVar={allevnteic}
      />
      <EventSection title="SRIJAN" data={alleventsrijan} refVar={allevntsrjn} />

      <Footer />
    </>
  );
};

export default AllEvents;
