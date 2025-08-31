import React, { useRef, useState, useEffect } from "react";
import "./UpcomingEvents.css";
import upcomingevnt from "../../Data/UpcomingEvents.json";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import PopupQuestions from "../../Data/PopupQuestions/PopupQuestions"; // import your popup component

const UpcomingEvents = () => {
  const upcomevntHolder = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const fromEventId = location.state?.fromEventId;
  // const { showQuestions, fromEventId } = location.state || {};
  const [showPopup, setShowPopup] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Load current user from localStorage
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  }, []);

  // Horizontal scroll
  const fwdNextgo = () => {
    upcomevntHolder.current.scrollLeft += upcomevntHolder.current.offsetWidth;
  };
  const backPrevbk = () => {
    upcomevntHolder.current.scrollLeft -= upcomevntHolder.current.offsetWidth;
  };

  // Lazy loading images
  useEffect(() => {
    const config = { rootMargin: "0px", threshold: 0.2 };
    const observer = new IntersectionObserver((entries, self) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          self.unobserve(img);
        }
      });
    }, config);

    const imgs = document.querySelectorAll("[data-src]");
    imgs.forEach((img) => observer.observe(img));

    return () => imgs.forEach((img) => observer.unobserve(img));
  }, []);

  // Auto open modal if coming from login
  // useEffect(() => {
  //   if (showQuestions && fromEventId) {
  //     setSelectedEvent(fromEventId);
  //     setShowQuestionModal(true);
  //     window.history.replaceState({}, document.title);
  //   }
  // }, [showQuestions, fromEventId]);
  //  useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token && fromEventId) {
  //     setSelectedEvent(fromEventId);
  //     setShowQuestionModal(true);

  //     // Clear the location state so modal doesn't keep opening
  //     navigate("/events", { replace: true });
  //   }
  // }, [fromEventId, navigate]);
  // Auto open popup if redirected after login
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token && fromEventId) {
  //     setSelectedEvent(fromEventId);
  //     setShowPopup(true);
  //     navigate("/events", { replace: true }); // clear state
  //   }
  // }, [fromEventId, navigate]);

  // Apply Now logic
  // const handleApplyNow = (eventId) => {
  //   if (!currentUser) {
  //     navigate("/signup", { state: { fromEvent: eventId } });
  //   } else {
  //     setSelectedEvent(eventId);
  //     setShowQuestionModal(true);
  //   }
  // };

  const handleApplyNow = (eventId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signup", { state: { fromEvent: eventId } });
    } else {
      setSelectedEvent(eventId);
      setShowPopup(true); // ✅ trigger popup
    }
  };

  return (
    <div className="upcom-evnts-wrapper">
      <div className="upcom-evnts-top">
        <h1>
          Upcoming{" "}
          <span style={{ fontFamily: "Barlow Condensed", fontWeight: "900" }}>
            Events
          </span>
        </h1>
      </div>

      <div className="upcomi-evvnts-parnt" ref={upcomevntHolder}>
        {upcomingevnt.map((item) => {
          const buttons = [item.moduleName, item.organizers];
          return (
            <div className="upcom-evnt-indi" key={item.eventID}>
              <div className="img-upcom-evnt">
                <img
                  src=""
                  data-src={item.eventPoster}
                  alt={item.eventName}
                  className="loading"
                />
              </div>

              <div className="title-announc-upcom-evnt">
                <h1>{item.eventName}</h1>
                <h2>{item.moduleName}</h2>
              </div>

              <div className="dte-locn-upcomi-evnt">
                <h2 id="date">{item.eventDate}</h2>
                <h2>{item.venue}</h2>
              </div>

              <div className="btns-info-klp">
                {buttons.map((btnLabel, idx) => (
                  <div className="btns-1-ent-indi" key={idx}>
                    <button>{btnLabel}</button>
                  </div>
                ))}
                <div className="btns-1-ent-indi">
                  <button onClick={() => handleApplyNow(item.eventID)}>Apply Now</button>
                </div>
              </div>

              <div className="abt-content-indi-evnt">
                <p>{item.eventDetails}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="btns nmjkop">
        <button className="prev btn-testimonial" onClick={backPrevbk}>
          <AiOutlineArrowLeft className="btn-indi-testimonial" />
        </button>
        <button className="next btn-testimonial" onClick={fwdNextgo}>
          <AiOutlineArrowRight className="btn-indi-testimonial" />
        </button>
      </div>

      {/* Modal for questions */}
      {/* {showQuestionModal && selectedEvent && (
        <div className="question-modal">
          <div className="modal-content">
            <h2>Questions for Event {selectedEvent}</h2>
            <p>Here you can put your question form or content.</p>
            <button onClick={() => setShowQuestionModal(false)}>Close</button>
          </div>
        </div>
      )} */}
      {/* PopupQuestions component */}
      {showPopup && selectedEvent && (
        <PopupQuestions
          eventId={selectedEvent}
          questions={
            upcomingevnt.find((e) => e.eventID === String(selectedEvent))?.questions || []
          }
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default UpcomingEvents;
