import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../../components/shared/Footer/Footer";
import Navbar from "../../components/shared/Navbar/Navbar";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import "./Empresario.css";

const Empresario = () => {
  const carouselRef = useRef(null);
  const sponsorsRef = useRef(null);
  const eventsRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [loaded, setIsLoaded] = useState(false);
  const timeoutRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.title = "Empresario | E-Cell NIT Silchar";
  }, []);

  // Navigation functions for events section
  function fwdNextgo() {
    eventsRef.current.scrollLeft += eventsRef.current.offsetWidth;
  }

  function backPrevbk() {
    eventsRef.current.scrollLeft -= eventsRef.current.offsetWidth;
  }

  // Lazy loading implementation
  const config = {
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.2,
  };

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
  });

  // Reveal-on-scroll for subtle entrance animations
  useEffect(() => {
    const revealConfig = { rootMargin: "0px 0px -10% 0px", threshold: 0.15 };
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, revealConfig);

    const revealEls = document.querySelectorAll(".reveal");
    revealEls.forEach((el) => revealObserver.observe(el));

    return () => {
      revealEls.forEach((el) => revealObserver.unobserve(el));
    };
  }, []);

  const loadImages = (image) => {
    image.src = image.dataset.src;
  };

  // Handle carousel pause/resume functionality
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleInteraction = () => {
      setIsPaused(true);
      carousel.style.animationPlayState = "paused";

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Resume after 1 second of inactivity
      timeoutRef.current = setTimeout(() => {
        setIsPaused(false);
        carousel.style.animationPlayState = "running";
      }, 1000);
    };

    // Add scroll and touch event listeners for better interaction
    carousel.addEventListener("mousedown", handleInteraction);
    carousel.addEventListener("touchstart", handleInteraction);
    carousel.addEventListener("wheel", handleInteraction);
    carousel.addEventListener("scroll", handleInteraction);

    return () => {
      carousel.removeEventListener("mousedown", handleInteraction);
      carousel.removeEventListener("touchstart", handleInteraction);
      carousel.removeEventListener("wheel", handleInteraction);
      carousel.removeEventListener("scroll", handleInteraction);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle sponsors slider pause/resume functionality (similar to gallery)
  useEffect(() => {
    const sponsorsTrack = sponsorsRef.current;
    if (!sponsorsTrack) return;

    const handleInteraction = () => {
      sponsorsTrack.style.animationPlayState = "paused";
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        sponsorsTrack.style.animationPlayState = "running";
      }, 1000);
    };

    sponsorsTrack.addEventListener("mousedown", handleInteraction);
    sponsorsTrack.addEventListener("touchstart", handleInteraction);
    sponsorsTrack.addEventListener("wheel", handleInteraction);
    sponsorsTrack.addEventListener("scroll", handleInteraction);

    return () => {
      sponsorsTrack.removeEventListener("mousedown", handleInteraction);
      sponsorsTrack.removeEventListener("touchstart", handleInteraction);
      sponsorsTrack.removeEventListener("wheel", handleInteraction);
      sponsorsTrack.removeEventListener("scroll", handleInteraction);
    };
  }, []);

  // Event data for the 4 events
  const empresarioEvents = [
    {
      id: 1,
      title: "Business Hackathon",
      date: "Coming Soon",
      location: "NIT Silchar",
      img: "https://res.cloudinary.com/dp92qug2f/image/upload/v1685019690/Ecell%20website/collaboration%20backgrounds/Empressario-1_ewb2al.webp",
      content:
        "A competitive hackathon focused on developing innovative business solutions and entrepreneurial ideas.",
    },
    {
      id: 2,
      title: "Treasure Hunt",
      date: "Coming Soon",
      location: "NIT Silchar",
      img: "https://res.cloudinary.com/dp92qug2f/image/upload/v1685019690/Ecell%20website/collaboration%20backgrounds/Empressario-1_ewb2al.webp",
      content:
        "An exciting treasure hunt event that combines problem-solving skills with entrepreneurial thinking.",
    },
    {
      id: 3,
      title: "Bech Kae Dikhao",
      date: "Coming Soon",
      location: "NIT Silchar",
      img: "https://res.cloudinary.com/dp92qug2f/image/upload/v1685019690/Ecell%20website/collaboration%20backgrounds/Empressario-1_ewb2al.webp",
      content:
        "A sales and marketing competition where participants showcase their selling and presentation skills.",
    },
    {
      id: 4,
      title: "Adovation",
      date: "Coming Soon",
      location: "NIT Silchar",
      img: "https://res.cloudinary.com/dp92qug2f/image/upload/v1685019690/Ecell%20website/collaboration%20backgrounds/Empressario-1_ewb2al.webp",
      content:
        "An advertising and innovation challenge that tests creative thinking and marketing strategies.",
    },
  ];

  // Sample previous event images for carousel
  const previousEventImages = [
    "https://res.cloudinary.com/dp92qug2f/image/upload/v1680769435/Ecell%20website/events/backgrounds%20homepage%20events%20section/empreserrio_mzokcx.webp",
    "https://res.cloudinary.com/dp92qug2f/image/upload/v1685019690/Ecell%20website/collaboration%20backgrounds/Empressario-1_ewb2al.webp",
    "https://res.cloudinary.com/dp92qug2f/image/upload/v1680769436/Ecell%20website/events/backgrounds%20homepage%20events%20section/srijan_t8leer.webp",
    "https://res.cloudinary.com/dp92qug2f/image/upload/v1680769435/Ecell%20website/events/backgrounds%20homepage%20events%20section/incubation_pyv0lv.webp",
    "https://res.cloudinary.com/dp92qug2f/image/upload/v1680769436/Ecell%20website/events/backgrounds%20homepage%20events%20section/orientation_rmnosd.webp",
  ];

  // Sponsor logos pulled from Home Collaboration section
  const sponsorLogos = [
    "https://res.cloudinary.com/dp92qug2f/image/upload/v1685354010/Ecell%20website/edtimes_logo_bhl4ec.webp",
    "https://res.cloudinary.com/draptrzrc/image/upload/v1707558984/Payzaql.webp",
    "https://res.cloudinary.com/dp92qug2f/image/upload/v1676989598/collaboration-ecell/Cubeleloresized_jimc2g.png",
    "https://res.cloudinary.com/dp92qug2f/image/upload/v1676990266/collaboration-ecell/blackmarble00_q3mowc.png",
    "https://res.cloudinary.com/dp92qug2f/image/upload/v1676990589/collaboration-ecell/gfgre_xzhxha.png",
    "https://res.cloudinary.com/dp92qug2f/image/upload/v1676990660/collaboration-ecell/truscholarres_korsx7.png",
    "https://res.cloudinary.com/dp92qug2f/image/upload/v1676990737/collaboration-ecell/assamStartUpres_n2fbxv.png",
    "https://res.cloudinary.com/dp92qug2f/image/upload/v1676989494/collaboration-ecell/finlatics_dh1suv.png",
    "https://res.cloudinary.com/dp92qug2f/image/upload/c_scale,w_360,f_auto,fl_lossy/v1676524279/collaboration-ecell/PNB_Icon-resize_aghkjd.png",
    "https://res.cloudinary.com/dp92qug2f/image/upload/v1676988769/collaboration-ecell/kwikpicghj_x7cy2p.png",
    "https://res.cloudinary.com/dp92qug2f/image/upload/v1676988848/collaboration-ecell/ssstartRe_xea2cl.png",
    "https://res.cloudinary.com/dp92qug2f/image/upload/v1676989080/collaboration-ecell/engineer_hubRe_ggety2.png",
    "https://res.cloudinary.com/dp92qug2f/image/upload/v1676989170/collaboration-ecell/stockGroRE_ymge3d.png",
    "https://res.cloudinary.com/dp92qug2f/image/upload/v1676989292/collaboration-ecell/yenRE_zgrknu.png",
    "https://res.cloudinary.com/dp92qug2f/image/upload/v1676989412/collaboration-ecell/anterprerna_susjet.png",
    "https://res.cloudinary.com/dp92qug2f/image/upload/v1676989729/collaboration-ecell/IvyCap_bnxqmc.png",
    "https://res.cloudinary.com/dp92qug2f/image/upload/v1676989825/collaboration-ecell/jantaGroup_apsnyg.png",
    "https://res.cloudinary.com/dp92qug2f/image/upload/v1676990018/collaboration-ecell/learningWhileTraveling_bmf0fj.png",
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="empresario-hero">
        <motion.div
          className="empresario-hero-content reveal"
          initial={{
            opacity: 0,
            y: prefersReducedMotion ? 0 : 12,
            scale: prefersReducedMotion ? 1 : 0.98,
          }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1>EMPRESARIO</h1>
        </motion.div>
      </div>

      {/* Events Section */}
      <div className="upcom-evnts-top">
        <h1>
          Our{" "}
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

      <div className="upcomi-evvnts-parnt" ref={eventsRef}>
        {empresarioEvents.map((event) => {
          return (
            <motion.div
              className="upcom-evnt-indi reveal"
              key={event.id}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="img-upcom-evnt">
                <img
                  src=""
                  data-src={event.img}
                  className={loaded ? "loaded" : "loading"}
                  onLoad={() => setIsLoaded(true)}
                  alt={event.title}
                />
              </div>

              <div className="title-announc-upcom-evnt">
                <h1>{event.title}</h1>
              </div>

              <div className="dte-locn-upcomi-event">
                <h2>{event.date}</h2>
              </div>

              <div className="btns-info-klp">
                <div className="btns-1-ent-indi">
                  <button>Empresario</button>
                </div>
                <div className="btns-1-ent-indi">
                  <button>Event</button>
                </div>
              </div>

              <div className="abt-content-indi-evnt">
                <h3>{event.content}</h3>
              </div>

              <div className="view-details-btn-container">
                <Link to={`/event/${event.id}`} className="view-details-btn">
                  View Details
                </Link>
              </div>
            </motion.div>
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

      {/* Previous Events Image Carousel */}
      <div className="empresario-carousel-section">
        <motion.div
          className="empresario-carousel-title reveal"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2>Previous Events Gallery</h2>
        </motion.div>
        <div className="empresario-carousel-container">
          <div className="empresario-carousel-track" ref={carouselRef}>
            {previousEventImages.concat(previousEventImages).map((image, index) => (
              <div key={index} className="empresario-carousel-slide">
                <img src={image} alt={`Previous event ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Sponsors - design adapted from Home Collaboration, auto-sliding */}
      <motion.div
        className="our-sponsors reveal"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2>Our Sponsors</h2>
      </motion.div>
      <div className="sponsors-slider">
        <div className="sponsors-track" ref={sponsorsRef}>
          {sponsorLogos.concat(sponsorLogos).map((src, idx) => (
            <div className="sponsor-logo" key={idx}>
              <img
                className={`${loaded ? "loaded" : "loading"} ru-collab`}
                onLoad={() => setIsLoaded(true)}
                src=""
                data-src={src}
                alt={`Sponsor ${idx + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Empresario;
