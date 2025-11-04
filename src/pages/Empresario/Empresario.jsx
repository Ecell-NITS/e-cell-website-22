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
  const eventsRef = useRef(null);
  const aboutRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [loaded, setIsLoaded] = useState(false);
  const timeoutRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    document.title = "Empresario | E-Cell NIT Silchar";
  }, []);

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
    // Add loaded class to remove blur effect
    image.classList.add("loaded");
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

  // Event data for the 4 events - Updated with actual event details
  const empresarioEvents = [
    {
      id: 1,
      title: "BUSINESS HACKATHON",
      date: "Nov 12 - Nov 23, 2025",
      location: "Start UP Center",
      img: "https://res.cloudinary.com/ecell/image/upload/v1762182366/IMG_8721_zdwfuc.png ",
      content:
        "Enter the digital dimension where creativity is your code and strategy is your weapon. In this realm of visionaries, strategists, and innovators, ideas transcend boundaries and solutions reshape realities. Two rounds await: online submission and onsite hackathon.",
      teamSize: "3 to 5 members",
      registrationDeadline: "November 8, 2025",
    },
    {
      id: 2,
      title: "TREASURE HUNT",
      date: "Nov 21 - Nov 23, 2025",
      location: "Campus Wide",
      img: "https://res.cloudinary.com/ecell/image/upload/v1762194328/IMG_8732_vxn0yd.jpg",
      content:
        "Get ready for the ultimate campus adventure! Navigate through clues and riddles in this high-stakes treasure hunt where every step tests your wit and every discovery brings you closer to victory. Three thrilling rounds await the brave.",
      teamSize: "3 to 5 members",
      registrationDeadline: "November 15, 2025",
    },
    {
      id: 3,
      title: "BID-WISE",
      date: "Nov 21 - Nov 23, 2025",
      location: "Central Arena & Stall Areas",
      img: "https://res.cloudinary.com/ecell/image/upload/v1762194328/IMG_8733_pjeg3h.jpg",
      content:
        "Enter the strategic battlefield where Power Tokens fuel your ambitions and every bid shapes your destiny. Navigate through Phase I's silent auctions and Phase II's intense showdowns. Master the art of resource management in this ultimate test of strategy.",
      teamSize: "3 to 5 members",
      registrationDeadline: "November 19, 2025",
    },
    {
      id: 4,
      title: "Adovation",
      date: "Nov 15 - Nov 23, 2025",
      location: "Online Submission",
      img: "https://res.cloudinary.com/ecell/image/upload/v1762194326/IMG_8731_nxvstk.jpg",
      content:
        "A Tecnoesis 'Empressario' Module Event by Ecell. Teams will create engaging promotional videos for assigned shops, showcasing their marketing creativity and video production skills.",
      teamSize: "3 to 6 members",
      registrationDeadline: "November 15, 2025",
    },
    {
      id: 5,
      title: "STARTUP EXPO",
      date: "Nov 21 - Nov 23, 2025",
      location: "New Gallery",
      img: "https://res.cloudinary.com/ecell/image/upload/v1762194324/IMG_8730_mjgtpn.jpg",
      content:
        "Transform your innovative ideas into reality at the ultimate startup showcase! Present your business concepts, connect with investors, and compete for funding opportunities. Two dynamic rounds: application submission and live exhibition.",
      teamSize: "Minimum 1 member",
      registrationDeadline: "TBA",
    },
  ];

  // Empresario event images from GalleryTab.json
  const previousEventImages = [
    // 2022-2023 Empresario events
    "https://res.cloudinary.com/dfriijrmr/image/upload/v1678297818/GalleryPage/Emprassario%202022-23/WhatsApp_Image_2022-11-16_at_7.52.20_AM_asucfg.jpg",
    "https://res.cloudinary.com/dfriijrmr/image/upload/v1678297818/GalleryPage/Emprassario%202022-23/WhatsApp_Image_2022-11-20_at_11.43.03_AM_grnx2j.jpg",
    "https://res.cloudinary.com/dfriijrmr/image/upload/v1678297818/GalleryPage/Emprassario%202022-23/WhatsApp_Image_2022-11-20_at_11.43.06_AM_bkovkg.jpg",
    "https://res.cloudinary.com/dfriijrmr/image/upload/v1678297818/GalleryPage/Emprassario%202022-23/WhatsApp_Image_2022-11-20_at_11.43.05_AM_kfcxb3.jpg",
    // 2023-2024 Empresario events
    "https://res.cloudinary.com/sahincloudinary/image/upload/f_auto,q_auto/v1/Ecell/Events/empresario/wbkxymi0kisgsnesqeqz",
    "https://res.cloudinary.com/sahincloudinary/image/upload/f_auto,q_auto/v1/Ecell/Events/empresario/Emp1",
    "https://res.cloudinary.com/sahincloudinary/image/upload/f_auto,q_auto/v1/Ecell/Events/empresario/Emp2",
    "https://res.cloudinary.com/sahincloudinary/image/upload/f_auto,q_auto/v1/Ecell/Events/empresario/Emp13",
    "https://res.cloudinary.com/sahincloudinary/image/upload/v1711132568/Ecell/Events/empresario/Emp4.webp",
    "https://res.cloudinary.com/sahincloudinary/image/upload/v1711132375/Ecell/Events/empresario/Emp3.webp",
    // 2024-2025 Empresario events
    "https://res.cloudinary.com/diu8ohkcn/image/upload/WhatsApp_Image_2025-06-05_at_23.38.56_qpxgkx",
    "https://res.cloudinary.com/diu8ohkcn/image/upload/WhatsApp_Image_2025-06-05_at_23.38.56_2_ixazyv",
    "https://res.cloudinary.com/diu8ohkcn/image/upload/WhatsApp_Image_2025-06-05_at_23.38.56_1_tggvsz",
    "https://res.cloudinary.com/diu8ohkcn/image/upload/WhatsApp_Image_2025-06-05_at_23.38.53_1_yhxhf8",
    "https://res.cloudinary.com/diu8ohkcn/image/upload/WhatsApp_Image_2025-06-05_at_23.38.53_osmp8m",
    "https://res.cloudinary.com/diu8ohkcn/image/upload/WhatsApp_Image_2025-06-05_at_23.38.54_njqxmn",
    "https://res.cloudinary.com/diu8ohkcn/image/upload/WhatsApp_Image_2025-06-05_at_23.49.16_a9vnlr",
    "https://res.cloudinary.com/diu8ohkcn/image/upload/WhatsApp_Image_2025-06-05_at_23.38.54_1_l9ki4k",
  ];

  // Simple hero stats for quick context
  const heroStats = [
    { label: "Events", value: empresarioEvents.length },
    { label: "Participants", value: "500+" },
  ];

  // Helper to convert event title to URL-friendly slug
  const createEventSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

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
            EMPRESARIO, the flagship entrepreneurial challenge of E-Cell NIT Silchar is
            back, a space where ideas begin as individual points and gradually connect,
            like elements on a grid, forming something greater than the sum of their
            parts. It&apos;s not just a competition; it&apos;s a environment for thinkers,
            builders, and dreamers who believe every idea has a place, it just needs the
            right alignment.
          </p>
          <p>
            Here, every pitch is a piece of the puzzle.
            <br />
            Every challenge shifts your perspective.
            <br />
            Every conversation draws a new line on your canvas.
          </p>
          <p>
            Pitch. Compete. Collaborate.
            <br />
            Find your pattern. Build your framework.
            <br />
            And grow into the entrepreneur you aspire to be.
          </p>
          <p>
            <strong>21 – 23 November</strong>
            <br />
            Unleash your entrepreneurial spirit.
          </p>
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
                  className="lazy-image"
                  alt={event.title}
                />
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
                <p>📅 Registration Deadline: {event.registrationDeadline}</p>
              </div>

              <div className="abt-content-indi-evnt">
                <h3>{event.content}</h3>
              </div>

              <div className="view-details-btn-container">
                <Link
                  to={`/event/${createEventSlug(event.title)}`}
                  className="view-details-btn"
                >
                  <span>View Details</span>
                  <AiOutlineArrowRight className="view-details-icon" />
                </Link>
              </div>
            </motion.div>
          );
        })}
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
          <h1>
            Previous
            <span
              style={{
                fontFamily: "Barlow Condensed",
                color: "var(--text-color-primary)",
                fontWeight: "900",
                marginLeft: "0.5ch",
              }}
            >
              Events Gallery
            </span>
          </h1>
        </motion.div>
        <div className="empresario-carousel-container">
          <div className="empresario-carousel-track" ref={carouselRef}>
            {/* Render images twice for seamless infinite scroll */}
            {[...previousEventImages, ...previousEventImages].map((image, index) => (
              <div key={index} className="empresario-carousel-slide">
                <img
                  src=""
                  data-src={image}
                  alt={`Previous event ${(index % previousEventImages.length) + 1}`}
                  onClick={() => openLightbox(index % previousEventImages.length)}
                  loading="lazy"
                  decoding="async"
                  className="carousel-image lazy-image"
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

      <Footer />
    </>
  );
};

export default Empresario;
