import React, { useRef, useState, useEffect } from "react";
import "./events.css";
import upcomingevnt from "../../Data/UpcomingEvents.json";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import PopupQuestions from "../../Data/PopupQuestions/PopupQuestions";

const UpcomingEvents = () => {
  let upcomevntHolder = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const fromEventId = location.state?.fromEventId;

  const [loaded, setIsLoaded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  function fwdNextgo() {
    upcomevntHolder.current.scrollLeft += upcomevntHolder.current.offsetWidth;
  }
  function backPrevbk() {
    upcomevntHolder.current.scrollLeft -= upcomevntHolder.current.offsetWidth;
  }

  useEffect(() => {
    const config = { rootMargin: "0px 0px 0px 0px", threshold: 0.2 };
    let observer = new window.IntersectionObserver(function (entries, self) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImages(entry.target);
          self.unobserve(entry.target);
        }
      });
    }, config);

    const imgs = document.querySelectorAll("[data-src]");
    imgs.forEach((img) => observer.observe(img));

    return () => {
      imgs.forEach((img) => observer.unobserve(img));
    };
  });

  const loadImages = (image) => {
    image.src = image.dataset.src;
  };

  const handleApplyNow = (eventId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { fromEvent: eventId } });
    } else {
      setSelectedEvent(eventId);
      setShowPopup(true);
    }
  };

  return (
    <>
      <div className="upcom-evnts-top">
        <h1>
          Upcoming{" "}
          <span
            style={{
              fontFamily: "Barlow Condensed",
              color: "var(--text-color-primary)",
              fontWeight: "900",
            }}
          >
            Events
          </span>
        </h1>
      </div>

      <div className="upcomi-evvnts-parnt events-wrapper" ref={upcomevntHolder}>
        {upcomingevnt.map((item) => {
          return (
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
                <div className="btns-1-ent-indi">
                  <button>Research</button>
                </div>
                <div className="btns-1-ent-indi">
                  <button>Srijan</button>
                </div>
                {/* ✅ Apply Now button with functionality */}
                <div className="btns-1-ent-indi">
                  <button onClick={() => handleApplyNow(item.id)}>Apply Now</button>
                </div>
              </div>

              <div className="abt-content-indi-evnt event-desc">
                <h3>{item.content}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="btns">
        <button className="prev btn-testimonial" onClick={backPrevbk}>
          <AiOutlineArrowLeft className="btn-indi-testimonial" />
        </button>
        <button className="next btn-testimonial" onClick={fwdNextgo}>
          <AiOutlineArrowRight className="btn-indi-testimonial" />
        </button>
      </div>

      {/* ✅ PopupQuestions component */}
      {showPopup && selectedEvent && (
        <PopupQuestions
          eventId={selectedEvent}
          questions={
            upcomingevnt.find((e) => String(e.id) === String(selectedEvent))?.questions ||
            []
          }
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default UpcomingEvents;
