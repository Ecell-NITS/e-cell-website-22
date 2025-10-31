import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useParams, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./EventDetail.css";
import NavbarTeam from "../../shared/Navbar/NavbarTeam";
import Footer from "../../shared/Footer/Footer";

const EventDetail = () => {
  const { eventId } = useParams();

  // Active tab state
  const [activeTab, setActiveTab] = useState("about");

  // Registration form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    rollNumber: "",
    department: "",
    year: "",
    participationType: "individual",
    teamMembers: [],
    expectations: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ref to the register tab content for smooth scrolling
  const registerRef = useRef(null);
  const [shouldScrollToRegister, setShouldScrollToRegister] = useState(false);
  // Ref and flag for About tab smooth scrolling
  const aboutRef = useRef(null);
  const [shouldScrollToAbout, setShouldScrollToAbout] = useState(false);

  // Event data from Empresario.jsx
  const empresarioEvents = [
    {
      id: 1,
      title: "EMINENCE",
      subtitle: "E-Cell, NIT Silchar welcomes you with open arms.",
      description:
        "It starts with a spark—a test of wit and instinct. Then comes the hustle, where ideas take shape and teams rise. Ideas ignite, strategies clash, and legacies begin. EMINENCE isn't just a battle of brains—it's a race to be remembered. From the first move to the final pitch, every second counts. You'll think, build, and hustle like never before. Only the fearless will outsmart, outpitch, and outlast the rest. Are you in?",
      image:
        "https://res.cloudinary.com/dp92qug2f/image/upload/v1685019690/Ecell%20website/collaboration%20backgrounds/Empressario-1_ewb2al.webp",
      date: "Apr 11 - Dec 6, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Start UP Center",
      organizer: "E-CELL",
      category: "Workshop",
      participationType: "Team Event",
      teamSize: "2 to 5 members",
      registrationDeadline: "December 6, 2025",
      registrations: "2 teams registered",
      schedule: [
        {
          date: "April 11, 2025",
          events: [
            { time: "09:00", title: "Opening Ceremony", venue: "Start UP Center" },
            { time: "12:00", title: "E- Quests", venue: "New Gallery" },
          ],
        },
        {
          date: "April 12, 2025",
          events: [{ time: "12:00", title: "E- Hack", venue: "New Gallery" }],
        },
        {
          date: "April 13, 2025",
          events: [
            { time: "12:00", title: "Founders X Funders", venue: "Start UP Center" },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Treasure Hunt",
      subtitle: "Navigate through challenges with strategic thinking",
      description:
        "Embark on an exciting treasure hunt adventure that combines business acumen with strategic thinking. Navigate through various challenges and clues while developing your entrepreneurial mindset. This interactive event promises fun, learning, and networking opportunities.",
      image:
        "https://res.cloudinary.com/dp92qug2f/image/upload/v1685019690/Ecell%20website/collaboration%20backgrounds/Empressario-1_ewb2al.webp",
      date: "Apr 15 - Apr 16, 2025",
      time: "10:00 AM - 5:00 PM",
      location: "Campus Wide",
      organizer: "E-CELL",
      category: "Competition",
      participationType: "Team Event",
      teamSize: "3 to 6 members",
      registrationDeadline: "April 10, 2025",
      registrations: "5 teams registered",
    },
    {
      id: 3,
      title: "Bech Kae Dikhao",
      subtitle: "Showcase your selling skills",
      description:
        "Showcase your selling skills in this dynamic marketing competition. Participants will demonstrate their ability to market and sell products using creativity, persuasion, and innovative strategies. Put your entrepreneurial spirit to the test in this engaging challenge.",
      image:
        "https://res.cloudinary.com/dp92qug2f/image/upload/v1685019690/Ecell%20website/collaboration%20backgrounds/Empressario-1_ewb2al.webp",
      date: "Apr 20 - Apr 21, 2025",
      time: "11:00 AM - 4:00 PM",
      location: "Main Auditorium",
      organizer: "E-CELL",
      category: "Competition",
      participationType: "Individual/Team",
      teamSize: "1 to 3 members",
      registrationDeadline: "April 15, 2025",
      registrations: "8 teams registered",
    },
    {
      id: 4,
      title: "Adovation",
      subtitle: "Creative advertising and innovation",
      description:
        "A creative advertising and innovation competition where participants develop compelling marketing campaigns and innovative solutions. This event challenges your creative thinking and strategic planning abilities while fostering entrepreneurial innovation.",
      image:
        "https://res.cloudinary.com/dp92qug2f/image/upload/v1685019690/Ecell%20website/collaboration%20backgrounds/Empressario-1_ewb2al.webp",
      date: "Apr 25 - Apr 26, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Innovation Lab",
      organizer: "E-CELL",
      category: "Workshop",
      participationType: "Team Event",
      teamSize: "2 to 4 members",
      registrationDeadline: "April 20, 2025",
      registrations: "3 teams registered",
    },
  ];

  // Find the event by ID
  const event = empresarioEvents.find((e) => e.id === parseInt(eventId));
  const prefersReducedMotion = useReducedMotion();

  // Reveal-on-scroll for subtle entrance animations (unconditional)
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

  // Remove pre-mount scroll attempt; we'll scroll after the register tab animates in

  // If event not found, redirect to events page
  if (!event) {
    return <Navigate to="/empresario" replace />;
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form
  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.rollNumber &&
      formData.department
    );
  };

  // Helper: switch to Register tab and scroll to it
  const goToRegister = () => {
    setActiveTab("register");
    setShouldScrollToRegister(true);
  };

  // Add team member
  const addTeamMember = () => {
    if (formData.teamMembers.length < 4) {
      setFormData((prev) => ({
        ...prev,
        teamMembers: [...prev.teamMembers, { name: "", email: "" }],
      }));
    }
  };

  // Remove team member
  const removeTeamMember = (index) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index),
    }));
  };

  // Update team member
  const updateTeamMember = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      ),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Please fill all required fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    // Phone validation
    if (formData.phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success(`Registration successful for ${event.title}!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        rollNumber: "",
        department: "",
        year: "",
        participationType: "individual",
        teamMembers: [],
        expectations: "",
      });
    } catch (error) {
      toast.error("Registration failed. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="event-detail">
      <NavbarTeam />

      {/* Back to Events Button */}
      <div className="back-to-events">
        <button onClick={() => window.history.back()}>← Back to Events</button>
      </div>

      {/* Page Header (desktop only) */}
      <motion.div
        className="event-page-header reveal"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="event-page-title">{event.title}</h2>
      </motion.div>

      {/* Hero Section */}
      <div className="hero-section">
        <motion.div
          className="hero-content reveal"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Big center text over banner (organizer) */}
          <h1 className="hero-title">{event.organizer}</h1>
          <div className="hero-image">
            <img src={event.image} alt={event.title} />
          </div>
          {/* Mobile meta row (kept as-is) */}
          <div className="hero-meta">
            <div className="hero-meta-item">
              <span>📅</span>
              <span>{event.date}</span>
            </div>
            <div className="hero-meta-item">
              <span>📍</span>
              <span>{event.location}</span>
            </div>
          </div>
        </motion.div>

        {/* Desktop-only redesigned hero layout */}
        <motion.div
          className="hero-desktop reveal"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-info">
            <div className="hero-badge">{event.category}</div>
            <h1 className="hero-heading">{event.title}</h1>
            {event.subtitle && <p className="hero-subtitle">{event.subtitle}</p>}

            <div className="hero-chip-row">
              <div className="meta-chip">📅 {event.date}</div>
              <div className="meta-chip">📍 {event.location}</div>
              <div className="meta-chip">👥 {event.organizer}</div>
              {event.registrationDeadline && (
                <div className="meta-chip">Register by: {event.registrationDeadline}</div>
              )}
            </div>

            <div className="hero-actions">
              <button className="hero-cta" onClick={goToRegister}>
                Register Now
              </button>
              <button
                className="hero-secondary"
                onClick={() => {
                  setActiveTab("about");
                  setShouldScrollToAbout(true);
                }}
              >
                About Event
              </button>
            </div>

            {event.registrations && (
              <div className="hero-stats">{event.registrations}</div>
            )}
          </div>

          <div className="hero-media">
            <img src={event.image} alt={event.title} />
          </div>
        </motion.div>
      </div>

      {/* Desktop-only meta chips bar (below image) */}
      <motion.div
        className="hero-meta-desktop reveal"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="meta-chip">{event.date}</div>
        <div className="meta-chip">{event.location}</div>
        <div className="meta-chip">{event.organizer}</div>
        {event.registrationDeadline && (
          <div className="meta-chip">Register by: {event.registrationDeadline}</div>
        )}
        <button className="meta-chip-btn">{event.category}</button>
      </motion.div>

      {/* Mobile-only Register CTA between tags and tabs */}
      <div className="mobile-register-btn">
        <button onClick={goToRegister}>📝 Register Now</button>
      </div>

      {/* Navigation Tabs */}
      <motion.div
        className="nav-tabs reveal"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          className={`tab tab-about ${activeTab === "about" ? "active" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
        <button
          className={`tab tab-schedule ${activeTab === "schedule" ? "active" : ""}`}
          onClick={() => setActiveTab("schedule")}
        >
          Schedule
        </button>
        <button
          className={`tab tab-register ${activeTab === "register" ? "active" : ""}`}
          onClick={() => setActiveTab("register")}
        >
          Register
        </button>
        <button
          className={`tab tab-live-updates ${activeTab === "live-updates" ? "active" : ""}`}
          onClick={() => setActiveTab("live-updates")}
        >
          🔴 Live Updates
        </button>
        <button
          className={`tab mobile-only tab-event-details ${activeTab === "event-details" ? "active" : ""}`}
          onClick={() => setActiveTab("event-details")}
        >
          🎯 Event Details
        </button>
      </motion.div>

      {/* Main Content */}
      <div className="main-content">
        <motion.div
          className="content-area reveal"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Animated Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "about" && (
              <motion.div
                key="about"
                className="tab-content about-content"
                id="about"
                ref={aboutRef}
                onAnimationComplete={() => {
                  if (shouldScrollToAbout && aboutRef.current) {
                    const headerOffset = 90;
                    const top =
                      aboutRef.current.getBoundingClientRect().top +
                      window.scrollY -
                      headerOffset;
                    window.scrollTo({ top, behavior: "smooth" });
                    setShouldScrollToAbout(false);
                  }
                }}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2>About the Event</h2>
                <p>{event.description}</p>

                {/* For Queries section with demo contacts */}
                <div className="queries-section">
                  <h3>For Queries</h3>
                  <div className="contact-list">
                    <div className="contact-card">
                      <div className="contact-name">Dhruba Agarwalla</div>
                      <div className="contact-contact">
                        <div className="contact-phone">
                          📞 <a href="tel:+919876543210">+91 9876543210</a>
                        </div>
                        <div className="contact-email">
                          ✉️{" "}
                          <a href="mailto:ecell-demo1@example.com">
                            ecell-demo1@example.com
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="contact-card">
                      <div className="contact-name">Dhruba </div>
                      <div className="contact-contact">
                        <div className="contact-phone">
                          📞 <a href="tel:+919123456789">+91 9123456789</a>
                        </div>
                        <div className="contact-email">
                          ✉️{" "}
                          <a href="mailto:ecell-demo2@example.com">
                            ecell-demo2@example.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "schedule" && (
              <motion.div
                key="schedule"
                className="tab-content schedule-content"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2>Event Schedule</h2>
                <p>
                  Here&apos;s the detailed schedule for the event. Please note that the
                  schedule may be subject to minor changes.
                </p>
                {event.schedule &&
                  event.schedule.map((day, index) => (
                    <div key={index} className="schedule-day">
                      <h3>{day.date}</h3>
                      {day.events.map((eventItem, eventIndex) => (
                        <div key={eventIndex} className="schedule-item">
                          <div className="schedule-time">{eventItem.time}</div>
                          <div className="schedule-details">
                            <div className="schedule-title">{eventItem.title}</div>
                            <div className="schedule-venue">{eventItem.venue}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
              </motion.div>
            )}

            {activeTab === "register" && (
              <motion.div
                key="register"
                className="tab-content register-content"
                id="register"
                ref={registerRef}
                onAnimationComplete={() => {
                  if (shouldScrollToRegister && registerRef.current) {
                    const headerOffset = 90; // approximate navbar height
                    const top =
                      registerRef.current.getBoundingClientRect().top +
                      window.scrollY -
                      headerOffset;
                    window.scrollTo({ top, behavior: "smooth" });
                    setShouldScrollToRegister(false);
                  }
                }}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2>Register for {event.title}</h2>

                <form onSubmit={handleSubmit} className="registration-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">
                        Full Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">
                        Email Address <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">
                        Phone Number <span className="required">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 XXXXXXXXXX"
                        maxLength="10"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="rollNumber">
                        Roll Number <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="rollNumber"
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={handleInputChange}
                        placeholder="Enter your roll number"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="department">
                        Department <span className="required">*</span>
                      </label>
                      <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Department</option>
                        <option value="cse">Computer Science & Engineering</option>
                        <option value="ece">Electronics & Communication</option>
                        <option value="me">Mechanical Engineering</option>
                        <option value="ce">Civil Engineering</option>
                        <option value="ee">Electrical Engineering</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="year">
                        Year of Study <span className="required">*</span>
                      </label>
                      <select
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Year</option>
                        <option value="1st">1st Year</option>
                        <option value="2nd">2nd Year</option>
                        <option value="3rd">3rd Year</option>
                        <option value="4th">4th Year</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="participationType">
                      Participation Type <span className="required">*</span>
                    </label>
                    <div className="participation-type">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="participationType"
                          value="individual"
                          checked={formData.participationType === "individual"}
                          onChange={handleInputChange}
                        />
                        Team Event (Group Registration)
                      </label>
                    </div>
                  </div>

                  {formData.participationType === "team" && (
                    <div className="team-registration">
                      <h3>👥 Team Registration</h3>
                      <p>
                        You are registering as the Team Leader. Team size requirement: 2
                        to 5 members (including you as team leader).
                      </p>
                      <p>Please add 1 to 4 team members below.</p>

                      {formData.teamMembers.map((member, index) => (
                        <div key={index} className="team-member">
                          <h4>Team Member {index + 1}</h4>
                          <div className="form-row">
                            <div className="form-group">
                              <label>
                                Full Name <span className="required">*</span>
                              </label>
                              <input
                                type="text"
                                value={member.name}
                                onChange={(e) =>
                                  updateTeamMember(index, "name", e.target.value)
                                }
                                placeholder="Enter team member name"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>
                                Email <span className="required">*</span>
                              </label>
                              <input
                                type="email"
                                value={member.email}
                                onChange={(e) =>
                                  updateTeamMember(index, "email", e.target.value)
                                }
                                placeholder="Enter team member email"
                                required
                              />
                            </div>
                            <button
                              type="button"
                              className="remove-member-btn"
                              onClick={() => removeTeamMember(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}

                      {formData.teamMembers.length < 4 && (
                        <button
                          type="button"
                          className="add-member-btn"
                          onClick={addTeamMember}
                        >
                          + Add Team Member
                        </button>
                      )}
                    </div>
                  )}

                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "📝 Register Now"}
                  </button>
                </form>
              </motion.div>
            )}

            {activeTab === "live-updates" && (
              <motion.div
                key="live-updates"
                className="tab-content live-updates-content"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="live-updates-header">
                  <h2>📡 Live Event Updates</h2>
                  <button className="post-update-btn">+ Post Update</button>
                </div>
                <div className="live-updates-feed">
                  <div className="no-updates">
                    <p>No updates yet. Check back for live event information!</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "event-details" && (
              <motion.div
                key="event-details"
                className="tab-content event-details-content"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2>🎯 Event Details</h2>

                <div className="detail-item">
                  <span className="detail-label">📅 DATE & TIME</span>
                  <span className="detail-value">{event.date}</span>
                  <span className="detail-value">{event.time}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">📍 LOCATION</span>
                  <span className="detail-value">{event.location}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">🏢 ORGANIZER</span>
                  <span className="detail-value">{event.organizer}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">👥 PARTICIPATION TYPE</span>
                  <span className="detail-value">{event.participationType}</span>
                  <span className="detail-value">Team size: {event.teamSize}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">⏰ REGISTRATION DEADLINE</span>
                  <span className="detail-value">{event.registrationDeadline}</span>
                </div>

                <button
                  className="register-now-btn"
                  onClick={() => setActiveTab("register")}
                >
                  📝 Register Now
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Event Details Sidebar */}
        <div className="event-sidebar">
          <motion.div
            className="event-details-card"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3>🎯 Event Details</h3>

            <div className="detail-item">
              <span className="detail-label">📅 DATE & TIME</span>
              <span className="detail-value">{event.date}</span>
              <span className="detail-value">{event.time}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">📍 LOCATION</span>
              <span className="detail-value">{event.location}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">🏢 ORGANIZER</span>
              <span className="detail-value">{event.organizer}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">👥 PARTICIPATION TYPE</span>
              <span className="detail-value">{event.participationType}</span>
              <span className="detail-value">Team size: {event.teamSize}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">⏰ REGISTRATION DEADLINE</span>
              <span className="detail-value">{event.registrationDeadline}</span>
            </div>

            <button className="register-now-btn" onClick={() => setActiveTab("register")}>
              📝 Register Now
            </button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EventDetail;
