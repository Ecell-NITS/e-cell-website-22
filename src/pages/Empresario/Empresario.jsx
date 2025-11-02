import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../../components/shared/Footer/Footer";
import Navbar from "../../components/shared/Navbar/Navbar";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import "./Empresario.css";

const Empresario = () => {
  const carouselRef = useRef(null);
  const sponsorsRef = useRef(null);
  const eventsRef = useRef(null);
  const aboutRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [loaded, setIsLoaded] = useState(false);
  const timeoutRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [sponsorsPaused, setSponsorsPaused] = useState(false);

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

  // Scroll to events section from Hero CTA
  const scrollToEvents = () => {
    if (eventsRef.current) {
      eventsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll to About section from Hero CTA
  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
      // If user toggled pause, keep paused.
      if (sponsorsPaused) {
        sponsorsTrack.style.animationPlayState = "paused";
        return;
      }
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
  }, [sponsorsPaused]);

  // Keep sponsors animation state synced with toggle
  useEffect(() => {
    const sponsorsTrack = sponsorsRef.current;
    if (!sponsorsTrack) return;
    sponsorsTrack.style.animationPlayState = sponsorsPaused ? "paused" : "running";
  }, [sponsorsPaused]);

  // Event data for the 4 events - Updated with actual event details
  const empresarioEvents = [
    {
      id: 1,
      title: "BUSINESS HACKATHON",
      date: "Nov 8 - Nov 21, 2025",
      location: "Start UP Center",
      img: "https://res.cloudinary.com/sahincloudinary/image/upload/f_auto,q_auto/v1/Ecell/Events/empresario/Empresario ",
      content:
        "It starts with a spark—a test of wit and instinct. Then comes the hustle, where ideas take shape and teams rise. Ideas ignite, strategies clash, and legacies begin. EMINENCE isn't just a battle of brains—it's a race to be remembered.",
      teamSize: "3 to 5 members",
      registrationDeadline: "November 8, 2025",
    },
    {
      id: 2,
      title: "TREASURE HUNT",
      date: "Apr 15, 2025",
      location: "Campus Wide",
      img: "https://res.cloudinary.com/dp92qug2f/image/upload/v1680505883/Ecell%20website/events/international_symposium_final_yjhtst.webp",
      content:
        "Get ready to experience the thrill of business, strategy, and discovery as E-Cell NIT Silchar presents the Entrepreneurial Treasure Hunt — a campus-wide adventure that blends fun with the essence of entrepreneurship.",
      teamSize: "3 to 5 members",
      registrationDeadline: "April 10, 2025",
    },
    {
      id: 3,
      title: "BID-WISE",
      date: "Apr 20 - Apr 21, 2025",
      location: "Central Arena & Stall Areas",
      img: "https://res.cloudinary.com/dp92qug2f/image/upload/v1680370173/Ecell%20website/events/women_empowerment_r46kjd.webp",
      content:
        "BID-WISE is an exciting strategic auction competition where teams compete in a silent auction format. Teams must strategically bid on items of varying difficulty levels to maximize their points while managing their limited resources.",
      teamSize: "3 to 5 members",
      registrationDeadline: "April 15, 2025",
    },
    {
      id: 4,
      title: "Adovation",
      date: "Nov 15 - Nov 22, 2025",
      location: "Online Submission",
      img: "https://res.cloudinary.com/dp92qug2f/image/upload/v1685019690/Ecell%20website/collaboration%20backgrounds/Empressario-1_ewb2al.webp",
      content:
        "A Tecnoesis 'Empressario' Module Event by Ecell. Teams will create engaging promotional videos for assigned shops, showcasing their marketing creativity and video production skills.",
      teamSize: "3 to 6 members",
      registrationDeadline: "November 15, 2025",
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

  // Simple hero stats for quick context
  const heroStats = [
    { label: "Events", value: empresarioEvents.length },
    { label: "Sponsors", value: sponsorLogos.length },
    { label: "Participants", value: "500+" },
  ];

  // Helper to derive event type badge
  const deriveEventType = (event) => {
    const loc = (event.location || "").toLowerCase();
    if (loc.includes("online")) return "Online";
    return "On-site";
  };

  // Lightbox handlers
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    // Pause carousel while lightbox is open
    if (carouselRef.current) carouselRef.current.style.animationPlayState = "paused";
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    if (carouselRef.current) carouselRef.current.style.animationPlayState = "running";
  };
  const prevLightbox = () => {
    setLightboxIndex(
      (i) => (i - 1 + previousEventImages.length) % previousEventImages.length
    );
  };
  const nextLightbox = () => {
    setLightboxIndex((i) => (i + 1) % previousEventImages.length);
  };

  // Keyboard support for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

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
          <h1 className="empresario-hero-title">Empresario</h1>
          <p className="empresario-hero-subtitle">The Entrepreneurship Module of</p>
          <h3 className="empresario-hero-tagline">Tecnoesis 2025</h3>
          <div className="hero-cta-group">
            <button
              className="hero-cta"
              onClick={scrollToAbout}
              aria-label="About Empresario"
            >
              About Empresario
            </button>
            <button
              className="hero-cta"
              onClick={scrollToEvents}
              aria-label="Explore events"
            >
              Explore Events
            </button>
            <Link
              to="/events"
              className="hero-cta hero-cta-secondary"
              aria-label="Go to Events page"
            >
              Register / Full Schedule
            </Link>
          </div>
          <div className="hero-stats" aria-label="Empresario quick stats">
            {heroStats.map((s) => (
              <div key={s.label} className="hero-stat">
                <div className="hero-stat-value">{s.value}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* About Section */}
      <section className="empresario-about" ref={aboutRef} aria-label="About Empresario">
        <motion.div
          className="empresario-about-inner reveal"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2>About Empresario</h2>
          <p>
            Empresario is the entrepreneurship module of Tecnoesis, the annual techfest of
            NIT Silchar. Led by E-Cell NIT Silchar, it provides a campus-wide platform for
            students to showcase business acumen, creativity, and problem‑solving through
            curated events and competitions.
          </p>
          <p>
            Under this module, participants engage in strategy‑focused challenges such as
            hackathons, case competitions, marketing campaigns, bidding/auction gameplay,
            and treasure hunts—designed to build practical skills in analysis, teamwork,
            and execution.
          </p>
          <p className="empresario-about-note">
            Source: E‑Cell NIT Silchar site and Tecnoesis updates.
          </p>
        </motion.div>
      </section>

      {/* Highlights Section */}
      <section className="empresario-highlights" aria-label="Program highlights">
        <motion.div
          className="highlights-inner reveal"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="highlights-header">
            <h2>Why Join</h2>
            <p>Build ideas, sharpen strategy, and network with the brightest minds.</p>
          </div>
          <div className="highlights-grid">
            <div className="highlight-card">
              <h3>Ideate</h3>
              <p>
                Turn sparks into structured concepts through fast sprints and feedback.
              </p>
            </div>
            <div className="highlight-card">
              <h3>Compete</h3>
              <p>
                Test strategy across hackathons, hunts, and auctions designed for impact.
              </p>
            </div>
            <div className="highlight-card">
              <h3>Network</h3>
              <p>Collaborate with peers, mentors, and sponsors to grow your journey.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Events Section */}
      <div className="upcom-evnts-top">
        <h1>
          Explore
          <span
            style={{
              fontFamily: "Barlow Condensed",
              color: "var(--text-color-primary)",
              fontWeight: "900",
              marginLeft: "0.5ch",
            }}
          >
            Empresario Events
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
                <div className="img-overlay">
                  <Link
                    to={`/event/${event.id}`}
                    className="overlay-cta"
                    aria-label={`View details for ${event.title}`}
                  >
                    View Details
                  </Link>
                </div>
              </div>

              <div className="title-announc-upcom-evnt">
                <h1>{event.title}</h1>
              </div>

              <div className="dte-locn-upcomi-event">
                <h2>{event.date}</h2>
                <p>📍 {event.location}</p>
              </div>

              <div className="event-badges" aria-label="Event badges">
                <span
                  className={`badge ${deriveEventType(event) === "Online" ? "badge-online" : "badge-onsite"}`}
                >
                  {deriveEventType(event)}
                </span>
                <span className="badge badge-team">Team: {event.teamSize}</span>
              </div>

              <div className="event-meta-info">
                <p>👥 Team Size: {event.teamSize}</p>
                <p>📅 Registration Deadline: {event.registrationDeadline}</p>
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
                <img
                  src={image}
                  alt={`Previous event ${index + 1}`}
                  onClick={() => openLightbox(index % previousEventImages.length)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="empresario-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button className="lightbox-close" aria-label="Close" onClick={closeLightbox}>
            <RxCross2 />
          </button>
          <div className="lightbox-content">
            <button
              className="lightbox-nav prev"
              aria-label="Previous image"
              onClick={prevLightbox}
            >
              <AiOutlineArrowLeft />
            </button>
            <img
              src={previousEventImages[lightboxIndex]}
              alt={`Gallery image ${lightboxIndex + 1}`}
            />
            <button
              className="lightbox-nav next"
              aria-label="Next image"
              onClick={nextLightbox}
            >
              <AiOutlineArrowRight />
            </button>
          </div>
        </div>
      )}

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
        <div className="sponsors-controls">
          <button
            className="sponsor-ctrl-btn"
            onClick={() => setSponsorsPaused((p) => !p)}
            aria-label={sponsorsPaused ? "Play sponsors slider" : "Pause sponsors slider"}
          >
            {sponsorsPaused ? "Play" : "Pause"}
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="empresario-faq" aria-label="Frequently asked questions">
        <motion.div
          className="faq-inner reveal"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2>FAQ</h2>
          <div className="faq-grid">
            <details className="faq-item">
              <summary>Who can participate?</summary>
              <p>Open to all NIT Silchar students. Team sizes vary by event.</p>
            </details>
            <details className="faq-item">
              <summary>How do we register?</summary>
              <p>Use the event details links or visit the Events page.</p>
            </details>
            <details className="faq-item">
              <summary>Are there any prerequisites?</summary>
              <p>
                No strict prerequisites—bring curiosity, teamwork, and a willingness to
                learn.
              </p>
            </details>
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
};

export default Empresario;
