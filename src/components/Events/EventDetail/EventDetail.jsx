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

  // Form configurations for each event
  const getFormConfig = (eventId) => {
    switch (eventId) {
      case 1: // Business Hackathon
        return {
          fields: [
            "teamName",
            "teamLeaderName",
            "teamLeaderEmail",
            "teamLeaderPhone",
            "teamLeaderScholarId",
            "teamMembers",
          ],
          teamMemberFields: ["name", "phone", "scholarId"],
          minTeamSize: 3,
          maxTeamSize: 5,
          note: "Team size: 3 to 5 members. You are registering as the Team Leader.",
        };
      case 2: // Treasure Hunt
        return {
          fields: [
            "teamName",
            "teamLeaderName",
            "teamLeaderEmail",
            "teamLeaderPhone",
            "teamViceCaptainName",
            "teamViceCaptainPhone",
            "teamLeaderScholarId",
            "teamViceCaptainScholarId",
            "teamMembers",
          ],
          teamMemberFields: ["name", "scholarId"],
          minTeamSize: 3,
          maxTeamSize: 5,
          minTeamMembers: 1,
          maxTeamMembers: 3,
          note: "Team size: 3 to 5 members. Please provide Team Leader and Vice Captain details. Additional team members: 1 to 3.",
        };
      case 3: // BID-WISE
        return {
          fields: [
            "teamName",
            "teamLeaderName",
            "teamLeaderEmail",
            "teamLeaderPhone",
            "teamLeaderScholarId",
            "teamMembers",
          ],
          teamMemberFields: ["name", "phone"],
          minTeamSize: 3,
          maxTeamSize: 5,
          minTeamMembers: 2,
          maxTeamMembers: 4,
          note: "Team size: 3 to 5 members. Team leader details required. Add 2 to 4 additional team members.",
        };
      case 4: // Adovation
        return {
          fields: [
            "teamName",
            "teamLeaderName",
            "teamLeaderEmail",
            "teamLeaderPhone",
            "teamLeaderScholarId",
            "teamMembers",
          ],
          teamMemberFields: ["name", "phone", "scholarId"],
          minTeamSize: 3,
          maxTeamSize: 6,
          minTeamMembers: 2,
          maxTeamMembers: 5,
          note: "Team size: 3 to 6 members. Please provide team name, all member names, scholar IDs, and contact details.",
        };
      default:
        return {
          fields: [
            "teamName",
            "teamLeaderName",
            "teamLeaderEmail",
            "teamLeaderPhone",
            "teamLeaderScholarId",
            "teamMembers",
          ],
          teamMemberFields: ["name", "phone", "scholarId"],
          minTeamSize: 3,
          maxTeamSize: 5,
          note: "Team event registration.",
        };
    }
  };

  // Registration form state
  const [formData, setFormData] = useState({
    teamName: "",
    teamLeaderName: "",
    teamLeaderEmail: "",
    teamLeaderPhone: "",
    collegeType: "nit_silchar", // "nit_silchar" or "other"
    collegeName: "",
    teamLeaderScholarId: "",
    teamViceCaptainName: "",
    teamViceCaptainPhone: "",
    teamViceCaptainScholarId: "",
    department: "",
    year: "",
    participationType: "team", // Always team for this event
    teamMembers: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email verification states
  const [emailVerification, setEmailVerification] = useState({
    isVerificationSent: false,
    isVerified: false,
    otp: "",
    isVerifying: false,
    showOtpInput: false,
  });

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
      title: "BUSINESS HACKATHON",
      subtitle: "E-Cell, NIT Silchar welcomes you with open arms.",
      description:
        "It starts with a spark—a test of wit and instinct. Then comes the hustle, where ideas take shape and teams rise. Ideas ignite, strategies clash, and legacies begin. EMINENCE isn't just a battle of brains—it's a race to be remembered. From the first move to the final pitch, every second counts. You'll think, build, and hustle like never before. Only the fearless will outsmart, outpitch, and outlast the rest. Are you in?",
      image: "/images/Business-Hackathon.jpg",
      date: "Nov 8 - Nov 21, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Start UP Center",
      organizer: "E-CELL",
      category: "Competition",
      prizePool: "8K",
      participationType: "Team Event",
      teamSize: "3 to 5 members",
      registrationDeadline: "November 8, 2025",
      registrations: "2 teams registered",
      eventFlow: {
        round1: {
          title: "Round 1 (Online)",
          description:
            "In round 1, teams can choose from any of the 8 problem statements.",
          registrationDeadline: "8th November",
          submissionDeadline: "10th November",
          resultAnnouncement: "12th November",
          requirements:
            "Solution of the problem statement along with PPT and video explaining the solution",
        },
        round2: {
          title: "Round 2 (Offline)",
          date: "21st November",
          location: "Startup Centre",
          description:
            "Shortlisted teams will work on real business problems faced by companies and brands. Teams will be given a limited time (about 8 hrs) to brainstorm and develop actionable solutions.",
        },
      },
      rules: [
        "Team size: 3 to 5 members",
        "Mandatory submission of PPT and video explaining the solution of the problem statement chosen by the team",
        "Solution must cover: problem, solution, business model, market potential, and impact",
      ],
      participantDetails: [
        "Team Name",
        "Team leader's name, contact number and email id",
        "Team members name and contact number",
        "Scholar id of all the members",
      ],
      schedule: [
        {
          date: "November 8, 2025",
          events: [
            { time: "11:59 PM", title: "Round 1 Registration Deadline", venue: "Online" },
          ],
        },
        {
          date: "November 10, 2025",
          events: [
            { time: "11:59 PM", title: "Round 1 Submission Deadline", venue: "Online" },
          ],
        },
        {
          date: "November 12, 2025",
          events: [
            {
              time: "6:00 PM",
              title: "Round 2 Qualified Teams Announcement",
              venue: "Online",
            },
          ],
        },
        {
          date: "November 21, 2025",
          events: [
            {
              time: "9:00 AM",
              title: "Round 2 - Business Hackathon",
              venue: "Start UP Center",
            },
            { time: "5:00 PM", title: "Final Presentations", venue: "Start UP Center" },
            {
              time: "6:00 PM",
              title: "Results & Prize Distribution",
              venue: "Start UP Center",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "TREASURE HUNT",
      subtitle: "Experience the thrill of business, strategy, and discovery",
      description:
        "Get ready to experience the thrill of business, strategy, and discovery as E-Cell NIT Silchar presents the Entrepreneurial Treasure Hunt — a campus-wide adventure that blends fun with the essence of entrepreneurship. Around 20–25 teams, each consisting of 3–5 participants, will set out across the entire college campus — from the academic blocks to hostels, the canteen, and main ground — solving business-based riddles, completing mini challenges, and uncovering hidden clues that test their creativity and business acumen while enjoying their treasure hunt. The entire event is expected to take around 3 to 4 hours, packed with brainstorming, exploration, and high-energy competition — leading to a final round where only the sharpest teams will battle it out for the ultimate treasure symbolizing entrepreneurial triumph.",
      image: "/images/Treasure-hunt.jpg",
      date: "Apr 15, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Campus Wide",
      organizer: "E-CELL",
      category: "Competition",
      prizePool: "6K",
      participationType: "Team Event",
      teamSize: "3 to 5 members",
      registrationDeadline: "April 10, 2025",
      registrations: "5 teams registered",
      eventFlow: {
        round1: {
          title: "Round 1: Photo Round",
          description:
            "Teams are divided into 8 groups and sent to different spots via photo hints. At each spot, volunteers will have business/entrepreneurial quiz sheets. The first team to solve correctly advances to the new gallery, while remaining teams are disqualified. 8 teams return to the new gallery.",
          requirements:
            "Solve business/entrepreneurial questionnaire correctly and fastest",
        },
        round2: {
          title: "Round 2: Riddle + Task",
          description:
            "4 places are decided for this round. Pairs of teams get different hints (using business/entrepreneurial concepts) for the same place. Upon reaching, they complete tasks like bringing followers to the E-Cell page in 5 minutes. The team that brings more followers wins and gets the hint to the next round.",
          requirements: "Complete business-related tasks and solve riddles to advance",
        },
        round3: {
          title: "Round 3: Riddle based Game + Cycle Race",
          description:
            "One member of each team gets a cycle and must use it until the team uncovers the final decider game. The game is hosted by an associate, and upon winning, they get the location to the final place. Using the cycle, the first team to reach that place WINS.",
          requirements:
            "Win the final decider game and reach the final location first using the cycle",
        },
      },
      rules: [
        "Follow the volunteers' instructions at every location",
        "Respect campus property and do not disturb classes or others",
        "Any form of cheating or unfair means will lead to disqualification",
        "Clues must not be shared between teams",
        "The use of any vehicle (including bicycles, scooters, etc.) is strictly prohibited and will lead to disqualification",
        "The decision of organizers and volunteers will be final",
        "Have fun and give your best, teamwork and creativity matter most!",
      ],
      participantDetails: [
        "Team Name",
        "Scholar ID of all members",
        "Team Leader Name and contact",
        "Team Vice Captain Name and contact",
        "Team mates names",
      ],
      schedule: [
        {
          date: "April 10, 2025",
          events: [{ time: "11:59 PM", title: "Registration Deadline", venue: "Online" }],
        },
        {
          date: "April 15, 2025",
          events: [
            {
              time: "10:00 AM",
              title: "Event Briefing & Team Check-in",
              venue: "New Gallery",
            },
            { time: "10:30 AM", title: "Round 1: Photo Round", venue: "Campus Wide" },
            { time: "11:30 AM", title: "Round 2: Riddle + Task", venue: "Campus Wide" },
            {
              time: "1:00 PM",
              title: "Round 3: Final Challenge & Cycle Race",
              venue: "Campus Wide",
            },
            {
              time: "2:00 PM",
              title: "Results & Prize Distribution",
              venue: "New Gallery",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "BID-WISE",
      subtitle: "Strategic Auction & Business Competition",
      description:
        "BID-WISE is an exciting strategic auction competition where teams compete in a silent auction format. Teams must strategically bid on items of varying difficulty levels to maximize their points while managing their limited resources. With 60 items across 6 rounds, teams need to plan carefully, bid wisely, and outmaneuver their competition to advance to Round 2.",
      image: "/images/BID-WISE.jpg",
      date: "Apr 20 - Apr 21, 2025",
      time: "10:00 AM - 6:00 PM",
      location: "Central Arena & Stall Areas",
      organizer: "E-CELL",
      category: "Competition",
      prizePool: "6K",
      participationType: "Team Event",
      teamSize: "3 to 5 members",
      registrationDeadline: "April 15, 2025",
      registrations: "8 teams registered",
      eventFlow: {
        round1: {
          title: "Round 1: Silent Auction",
          description:
            "Teams participate in a strategic silent auction across 6 rounds of 20 minutes each. Each team receives a badge for the team leader, team number, 30 numbered tokens, and 100 points (purse).",
          setup:
            "A central arena will be created for teams to gather and 10 stalls will be placed around the room edges with 60 items total.",
          roundStructure: {
            exploration: "8 mins - Teams visit stalls to view items and base prices",
            discussion: "4 mins - Teams return to arena and plan bids",
            bidding: "8 mins - Only leaders bid using tokens (team no. + bid amount)",
          },
          scoring: {
            easy: "2 points",
            medium: "3 points",
            hard: "5 points",
          },
          advancement: "Top 10 teams advance to Round 2",
        },
        round2: {
          title: "Round 2",
          description: "Yet to be decided",
          note: "Details will be announced after Round 1 completion",
        },
      },
      rules: [
        "Team size: 3-5 members",
        "Items are divided into three categories based on difficulty of selling – Easy, Medium, and Hard",
        "Each category has a base price, and bidding begins from that price",
        "Every team is provided with: Team Number and Leader Badge, 30 numbered bid tokens, A Marker, A pocket of 100 points (the team's total purse)",
        "A total of 60 items will be auctioned across 6 rounds (20 minutes each)",
        "Round Structure (20 minutes): Exploration (8 mins), Discussion (4 mins), Bidding (8 mins)",
        "Only team leaders (with badges) can move to stalls and submit bids during bidding phase",
        "Penalty: Any team member without a badge found outside the arena during the bidding phase will result in a –5 point deduction",
        "Every team must plan strategically—overspending leads to disqualification if the purse goes negative",
        "The highest valid bid wins the item. In case of a tie, the item goes to the next highest unique bid",
        "The top 10 teams with the highest total item points after all rounds will move on to Round 2",
      ],
      participantDetails: [
        "Team leader's name and contact no., Scholar ID, Email-ID",
        "Team member 2 name and contact no.",
        "Team member 3 name and contact no.",
        "Team member 4 name and contact no.",
        "Team member 5 name and contact no.",
      ],
      schedule: [
        {
          date: "April 15, 2025",
          events: [{ time: "11:59 PM", title: "Registration Deadline", venue: "Online" }],
        },
        {
          date: "April 20, 2025",
          events: [
            {
              time: "10:00 AM",
              title: "Event Briefing & Team Check-in",
              venue: "Central Arena",
            },
            {
              time: "10:30 AM",
              title: "Round 1: Silent Auction - Rounds 1-3",
              venue: "Central Arena & Stalls",
            },
            { time: "1:30 PM", title: "Lunch Break", venue: "Cafeteria" },
            {
              time: "2:30 PM",
              title: "Round 1: Silent Auction - Rounds 4-6",
              venue: "Central Arena & Stalls",
            },
            {
              time: "5:30 PM",
              title: "Round 1 Results & Top 10 Announcement",
              venue: "Central Arena",
            },
          ],
        },
        {
          date: "April 21, 2025",
          events: [
            { time: "10:00 AM", title: "Round 2 (Details TBA)", venue: "TBA" },
            {
              time: "5:00 PM",
              title: "Final Results & Prize Distribution",
              venue: "Central Arena",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      title: "Adovation",
      subtitle: "The Ultimate Shop Promotion Challenge",
      description:
        "A Tecnoesis 'Empressario' Module Event by Ecell. Teams will create engaging promotional videos for assigned shops, showcasing their marketing creativity and video production skills. This challenge tests your ability to understand business identity and create compelling marketing content.",
      image: "/images/Adovation.jpg",
      date: "Nov 15 - Nov 22, 2025",
      time: "Registration Open",
      location: "Online Submission",
      organizer: "E-CELL",
      category: "Competition",
      prizePool: "4K",
      participationType: "Team Event",
      teamSize: "3 to 6 members",
      registrationDeadline: "November 15, 2025",
      registrations: "0 teams registered",
      eventFlow: {
        registration: {
          title: "Registration Phase",
          description:
            "Teams register through Tecnoesis website and get redirected to E-cell website for detailed registration.",
        },
        shopAssignment: {
          title: "Shop Assignment",
          description:
            "After registration, teams receive a list of 3 shops via email. Teams choose one shop, and E-cell confirms the final assignment via email.",
        },
        videoCreation: {
          title: "Video Creation & Submission",
          description:
            "Teams create a 59-second promotional video highlighting their assigned shop's unique selling propositions.",
          deadline: "22nd November",
          submissionMethod: "Google Drive link",
        },
      },
      rules: [
        "Team Size: 3-6 members",
        "Registration through Tecnoesis website with redirection to E-cell website",
        "Teams must register with team name, all member names, scholar IDs, and contact details",
        "Video Length: Maximum 59 seconds",
        "Video must be engaging, informative, and creatively highlight the shop's unique selling propositions",
        "Strict deadline: 22nd November for video submission",
        "Submission method: Google Drive link",
        "Late submissions will face immediate disqualification",
        "Teams will be assigned one shop from a list of 3 options",
        "E-cell will confirm final shop assignment via email",
      ],
      judgingCriteria: [
        "Creativity and Originality (30%)",
        "Marketing Effectiveness (30%)",
        "Video Quality and Production (20%)",
        "Adherence to Shop Identity (20%)",
      ],
      participantDetails: [
        "Team Name",
        "Names of all team members (3-6 members)",
        "Scholar IDs of all members",
        "Contact details of all members",
      ],
      schedule: [
        {
          date: "November 15, 2025",
          events: [{ time: "11:59 PM", title: "Registration Deadline", venue: "Online" }],
        },
        {
          date: "November 16, 2025",
          events: [
            { time: "12:00 PM", title: "Shop Assignment Emails Sent", venue: "Email" },
          ],
        },
        {
          date: "November 22, 2025",
          events: [
            {
              time: "11:59 PM",
              title: "Video Submission Deadline",
              venue: "Google Drive",
            },
          ],
        },
      ],
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

  // Email verification handlers
  const handleSendVerification = async () => {
    if (!formData.teamLeaderEmail) {
      toast.error("Please enter an email address first");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.teamLeaderEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setEmailVerification((prev) => ({
      ...prev,
      isVerifying: true,
    }));

    try {
      const baseUrl =
        import.meta.env.REGISTRATION_API_BASE_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/verification/sendOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.teamLeaderEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmailVerification((prev) => ({
          ...prev,
          isVerificationSent: true,
          showOtpInput: true,
          isVerifying: false,
        }));

        toast.success("Verification code sent to your email!");
      } else {
        throw new Error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setEmailVerification((prev) => ({
        ...prev,
        isVerifying: false,
      }));
      toast.error(error.message || "Failed to send verification code. Please try again.");
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6); // Only digits, max 6
    setEmailVerification((prev) => ({
      ...prev,
      otp: value,
    }));
  };

  const handleVerifyOtp = async () => {
    if (emailVerification.otp.length !== 6) {
      toast.error("Please enter a 6-digit verification code");
      return;
    }

    setEmailVerification((prev) => ({
      ...prev,
      isVerifying: true,
    }));

    try {
      const baseUrl =
        import.meta.env.REGISTRATION_API_BASE_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/verification/verifyOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.teamLeaderEmail,
          otp: emailVerification.otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmailVerification((prev) => ({
          ...prev,
          isVerified: true,
          isVerifying: false,
          showOtpInput: false,
        }));

        toast.success("Email verified successfully!");
      } else {
        throw new Error(data.message || "Invalid verification code");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setEmailVerification((prev) => ({
        ...prev,
        isVerifying: false,
      }));
      toast.error(error.message || "Invalid verification code. Please try again.");
    }
  };

  // Validate form
  const isFormValid = () => {
    const config = getFormConfig(event.id);

    // Check required basic fields based on event configuration
    const requiredFields = config.fields.filter((field) => field !== "teamMembers");
    const basicFieldsValid = requiredFields.every((field) => {
      if (field === "department" || field === "year") {
        return config.fields.includes(field) ? formData[field] : true;
      }
      return formData[field];
    });

    const collegeFieldsValid =
      formData.collegeType === "nit_silchar"
        ? formData.teamLeaderScholarId
        : formData.collegeName;

    // Dynamic team member validation based on event requirements
    const minMembers =
      config.minTeamMembers !== undefined
        ? config.minTeamMembers
        : config.minTeamSize - 1; // Use specific limits or default
    const maxMembers =
      config.maxTeamMembers !== undefined
        ? config.maxTeamMembers
        : config.maxTeamSize - 1; // Use specific limits or default

    const teamMembersValid =
      formData.teamMembers.length >= minMembers &&
      formData.teamMembers.length <= maxMembers &&
      formData.teamMembers.every((member) =>
        config.teamMemberFields.every((field) => {
          if (field === "scholarId") {
            return formData.collegeType === "nit_silchar" ? member[field] : true;
          }
          return member[field];
        })
      );

    // Email verification is required
    const emailVerified = emailVerification.isVerified;

    return basicFieldsValid && collegeFieldsValid && teamMembersValid && emailVerified;
  };

  // Helper: switch to Register tab and scroll to it
  const goToRegister = () => {
    setActiveTab("register");
    setShouldScrollToRegister(true);
  };

  // Add team member
  const addTeamMember = () => {
    const config = getFormConfig(event.id);
    const maxMembers =
      config.maxTeamMembers !== undefined
        ? config.maxTeamMembers
        : config.maxTeamSize - 1; // Use specific limits or default

    if (formData.teamMembers.length < maxMembers) {
      const newMember = {};
      config.teamMemberFields.forEach((field) => {
        newMember[field] = "";
      });

      setFormData((prev) => ({
        ...prev,
        teamMembers: [...prev.teamMembers, newMember],
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
    const updatedMembers = [...formData.teamMembers];
    updatedMembers[index][field] = value;
    setFormData({ ...formData, teamMembers: updatedMembers });
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
    if (!emailRegex.test(formData.teamLeaderEmail)) {
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
    if (formData.teamLeaderPhone.length !== 10) {
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
      // Determine API endpoint based on event ID
      const getApiEndpoint = (eventId) => {
        const baseUrl =
          import.meta.env.REGISTRATION_API_BASE_URL || "http://localhost:3000";
        switch (parseInt(eventId)) {
          case 1: // Business Hackathon
            return `${baseUrl}/business/register`;
          case 2: // Treasure Hunt
            return `${baseUrl}/treasure/register`;
          case 3: // BID-WISE
            return `${baseUrl}/bid-wise/register`;
          case 4: // Adovation
            return `${baseUrl}/adovations/register`;
          default:
            throw new Error("Invalid event ID");
        }
      };

      // Prepare data based on event type
      const prepareApiData = (eventId, formData) => {
        const baseData = {
          teamName: formData.teamName,
          teamLeaderName: formData.teamLeaderName,
          teamLeaderEmail: formData.teamLeaderEmail,
          teamLeaderPhone: formData.teamLeaderPhone,
          collegeType: formData.collegeType,
          collegeName: formData.collegeName,
          department: formData.department,
          year: formData.year,
          teamMembers: formData.teamMembers,
        };

        switch (parseInt(eventId)) {
          case 1: // Business Hackathon
            return {
              ...baseData,
              teamLeaderScholarId: formData.teamLeaderScholarId,
            };
          case 2: // Treasure Hunt
            return {
              ...baseData,
              teamLeaderScholarId: formData.teamLeaderScholarId,
              teamViceCaptainName: formData.teamViceCaptainName,
              teamViceCaptainPhone: formData.teamViceCaptainPhone,
              teamViceCaptainScholarId: formData.teamViceCaptainScholarId,
            };
          case 3: // BID-WISE
            return {
              ...baseData,
              teamLeaderScholarId: formData.teamLeaderScholarId,
            };
          case 4: // Adovation
            return {
              ...baseData,
              teamLeaderScholarId: formData.teamLeaderScholarId,
            };
          default:
            return baseData;
        }
      };

      const apiEndpoint = getApiEndpoint(eventId);
      const apiData = prepareApiData(eventId, formData);

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();

      if (response.ok) {
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
          teamName: "",
          teamLeaderName: "",
          teamLeaderEmail: "",
          teamLeaderPhone: "",
          collegeType: "nit_silchar",
          collegeName: "",
          teamLeaderScholarId: "",
          teamViceCaptainName: "",
          teamViceCaptainPhone: "",
          teamViceCaptainScholarId: "",
          department: "",
          year: "",
          participationType: "team",
          teamMembers: [],
        });
      } else {
        // Handle API error response
        toast.error(result.message || "Registration failed. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please check your connection and try again.", {
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

            {/* Desktop-only prize pool block (enhanced) */}
            {event.prizePool && (
              <div className="hero-prize" aria-label="Prize pool">
                <div className="hero-prize-left">
                  <span className="hero-prize-icon" aria-hidden="true">
                    🏆
                  </span>
                  <div className="hero-prize-text">
                    <span className="hero-prize-label">Prize Pool</span>
                    <span className="hero-prize-sub">Top teams awarded</span>
                  </div>
                </div>
                <div className="hero-prize-amount">
                  {String(event.prizePool).toUpperCase() !== "TBA" && (
                    <span className="hero-prize-currency">₹</span>
                  )}
                  <span className="hero-prize-value">{event.prizePool}</span>
                </div>
              </div>
            )}

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
          Live Updates
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

                {/* Event Flow Section */}
                {event.eventFlow && (
                  <div className="event-flow-section">
                    <h3>📋 Flow of the Event</h3>

                    {/* Handle Business Hackathon structure */}
                    {event.eventFlow.round1 && event.eventFlow.round2 && (
                      <>
                        <div className="round-details">
                          <h4>{event.eventFlow.round1.title}</h4>
                          <p>{event.eventFlow.round1.description}</p>
                          <ul>
                            <li>
                              <strong>Last date to register for round 1:</strong>{" "}
                              {event.eventFlow.round1.registrationDeadline}
                            </li>
                            <li>
                              <strong>Last date to give the solution:</strong>{" "}
                              {event.eventFlow.round1.submissionDeadline}
                            </li>
                            <li>
                              <strong>
                                Announcement of teams proceeding to round 2:
                              </strong>{" "}
                              {event.eventFlow.round1.resultAnnouncement}
                            </li>
                            <li>
                              <strong>Requirements:</strong>{" "}
                              {event.eventFlow.round1.requirements}
                            </li>
                          </ul>
                        </div>

                        <div className="round-details">
                          <h4>{event.eventFlow.round2.title}</h4>
                          <p>{event.eventFlow.round2.description}</p>
                          <ul>
                            <li>
                              <strong>Date:</strong> {event.eventFlow.round2.date}
                            </li>
                            <li>
                              <strong>Location:</strong> {event.eventFlow.round2.location}
                            </li>
                          </ul>
                        </div>
                      </>
                    )}

                    {/* Handle Adovation structure */}
                    {event.eventFlow.registration &&
                      event.eventFlow.shopAssignment &&
                      event.eventFlow.videoCreation && (
                        <>
                          <div className="round-details">
                            <h4>{event.eventFlow.registration.title}</h4>
                            <p>{event.eventFlow.registration.description}</p>
                          </div>

                          <div className="round-details">
                            <h4>{event.eventFlow.shopAssignment.title}</h4>
                            <p>{event.eventFlow.shopAssignment.description}</p>
                          </div>

                          <div className="round-details">
                            <h4>{event.eventFlow.videoCreation.title}</h4>
                            <p>{event.eventFlow.videoCreation.description}</p>
                            <ul>
                              <li>
                                <strong>Deadline:</strong>{" "}
                                {event.eventFlow.videoCreation.deadline}
                              </li>
                              <li>
                                <strong>Submission Method:</strong>{" "}
                                {event.eventFlow.videoCreation.submissionMethod}
                              </li>
                            </ul>
                          </div>
                        </>
                      )}

                    {/* Handle other event flow structures */}
                    {!event.eventFlow.round1 && !event.eventFlow.registration && (
                      <div className="round-details">
                        {Object.entries(event.eventFlow).map(([key, phase]) => (
                          <div key={key} className="phase-details">
                            <h4>{phase.title}</h4>
                            <p>{phase.description}</p>
                            {phase.details && (
                              <ul>
                                {phase.details.map((detail, index) => (
                                  <li key={index}>{detail}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Rules Section */}
                {event.rules && (
                  <div className="rules-section">
                    <h3>📜 Rules</h3>
                    <ul>
                      {event.rules.map((rule, index) => (
                        <li key={index}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Judging Criteria Section */}
                {event.judgingCriteria && (
                  <div className="judging-criteria-section">
                    <h3>⚖️ Judging Criteria</h3>
                    <ul>
                      {event.judgingCriteria.map((criteria, index) => (
                        <li key={index}>{criteria}</li>
                      ))}
                    </ul>
                  </div>
                )}

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
                <p className="registration-note">
                  <strong>Note:</strong> {getFormConfig(event.id).note}
                </p>

                <form onSubmit={handleSubmit} className="registration-form">
                  {/* Team Name */}
                  <div className="form-group">
                    <label htmlFor="teamName">
                      Team Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="teamName"
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleInputChange}
                      placeholder="Enter your team name"
                      required
                    />
                  </div>

                  {/* College Selection */}
                  <div className="form-group">
                    <label htmlFor="collegeType">
                      College <span className="required">*</span>
                    </label>
                    <div className="college-type-selection">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="collegeType"
                          value="nit_silchar"
                          checked={formData.collegeType === "nit_silchar"}
                          onChange={handleInputChange}
                        />
                        NIT Silchar
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="collegeType"
                          value="other"
                          checked={formData.collegeType === "other"}
                          onChange={handleInputChange}
                        />
                        Other College
                      </label>
                    </div>
                  </div>

                  {/* College Name (for other colleges) */}
                  {formData.collegeType === "other" && (
                    <div className="form-group">
                      <label htmlFor="collegeName">
                        College Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="collegeName"
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleInputChange}
                        placeholder="Enter your college name"
                        required
                      />
                    </div>
                  )}

                  {/* Team Leader Details */}
                  <div className="team-leader-section">
                    <h3>👤 Team Leader Details</h3>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="teamLeaderName">
                          Full Name <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          id="teamLeaderName"
                          name="teamLeaderName"
                          value={formData.teamLeaderName}
                          onChange={handleInputChange}
                          placeholder="Enter team leader's full name"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="teamLeaderPhone">
                          Contact Number <span className="required">*</span>
                        </label>
                        <div className="phone-input-container">
                          <span className="phone-prefix">+91</span>
                          <input
                            type="tel"
                            id="teamLeaderPhone"
                            name="teamLeaderPhone"
                            value={formData.teamLeaderPhone}
                            onChange={handleInputChange}
                            placeholder="Enter 10-digit number"
                            maxLength="10"
                            pattern="[0-9]{10}"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      {getFormConfig(event.id).fields.includes("teamLeaderEmail") && (
                        <div className="form-group">
                          <label htmlFor="teamLeaderEmail">
                            Email Address <span className="required">*</span>
                            {emailVerification.isVerified && (
                              <span className="verification-status verified">
                                ✓ Verified
                              </span>
                            )}
                          </label>
                          <div className="email-verification-container">
                            <input
                              type="email"
                              id="teamLeaderEmail"
                              name="teamLeaderEmail"
                              value={formData.teamLeaderEmail}
                              onChange={handleInputChange}
                              placeholder="leader@example.com"
                              required
                              disabled={emailVerification.isVerified}
                            />
                            {!emailVerification.isVerified && (
                              <button
                                type="button"
                                className="verify-email-btn"
                                onClick={handleSendVerification}
                                disabled={
                                  emailVerification.isVerifying ||
                                  !formData.teamLeaderEmail
                                }
                              >
                                {emailVerification.isVerifying
                                  ? "Sending..."
                                  : "Verify Email"}
                              </button>
                            )}
                          </div>

                          {emailVerification.showOtpInput && (
                            <div className="otp-verification-section">
                              <label htmlFor="otpInput">
                                Enter 6-digit verification code sent to your email
                              </label>
                              <div className="otp-input-container">
                                <input
                                  type="text"
                                  id="otpInput"
                                  value={emailVerification.otp}
                                  onChange={handleOtpChange}
                                  placeholder="000000"
                                  maxLength="6"
                                  className="otp-input"
                                />
                                <button
                                  type="button"
                                  className="verify-otp-btn"
                                  onClick={handleVerifyOtp}
                                  disabled={
                                    emailVerification.isVerifying ||
                                    emailVerification.otp.length !== 6
                                  }
                                >
                                  {emailVerification.isVerifying
                                    ? "Verifying..."
                                    : "Verify"}
                                </button>
                              </div>
                              <button
                                type="button"
                                className="resend-otp-btn"
                                onClick={handleSendVerification}
                                disabled={emailVerification.isVerifying}
                              >
                                Resend Code
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {formData.collegeType === "nit_silchar" && (
                        <div className="form-group">
                          <label htmlFor="teamLeaderScholarId">
                            Scholar ID <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            id="teamLeaderScholarId"
                            name="teamLeaderScholarId"
                            value={formData.teamLeaderScholarId}
                            onChange={handleInputChange}
                            placeholder="Enter scholar ID"
                            required
                          />
                        </div>
                      )}
                    </div>

                    {(getFormConfig(event.id).fields.includes("department") ||
                      getFormConfig(event.id).fields.includes("year")) && (
                      <div className="form-row">
                        {getFormConfig(event.id).fields.includes("department") && (
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
                        )}

                        {getFormConfig(event.id).fields.includes("year") && (
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
                        )}
                      </div>
                    )}
                  </div>

                  {/* Team Vice Captain Details (for Treasure Hunt) */}
                  {getFormConfig(event.id).fields.includes("teamViceCaptainName") && (
                    <div className="team-vice-captain-section">
                      <h3>👤 Team Vice Captain Details</h3>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="teamViceCaptainName">
                            Full Name <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            id="teamViceCaptainName"
                            name="teamViceCaptainName"
                            value={formData.teamViceCaptainName}
                            onChange={handleInputChange}
                            placeholder="Enter vice captain's full name"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="teamViceCaptainPhone">
                            Contact Number <span className="required">*</span>
                          </label>
                          <div className="phone-input-container">
                            <span className="phone-prefix">+91</span>
                            <input
                              type="tel"
                              id="teamViceCaptainPhone"
                              name="teamViceCaptainPhone"
                              value={formData.teamViceCaptainPhone}
                              onChange={handleInputChange}
                              placeholder="Enter 10-digit number"
                              maxLength="10"
                              pattern="[0-9]{10}"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {formData.collegeType === "nit_silchar" && (
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="teamViceCaptainScholarId">
                              Scholar ID <span className="required">*</span>
                            </label>
                            <input
                              type="text"
                              id="teamViceCaptainScholarId"
                              name="teamViceCaptainScholarId"
                              value={formData.teamViceCaptainScholarId}
                              onChange={handleInputChange}
                              placeholder="Enter scholar ID"
                              required
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Team Members Section */}
                  <div className="team-registration">
                    <h3>👥 Team Members</h3>
                    <p>
                      {(() => {
                        const config = getFormConfig(event.id);
                        const minMembers =
                          config.minTeamMembers !== undefined
                            ? config.minTeamMembers
                            : config.minTeamSize - 1;
                        const maxMembers =
                          config.maxTeamMembers !== undefined
                            ? config.maxTeamMembers
                            : config.maxTeamSize - 1;
                        return `Add ${minMembers} to ${maxMembers} team members ${event.id === 2 ? "(excluding team leader and vice captain)" : "(excluding team leader)"}. Total team size: ${config.minTeamSize} to ${config.maxTeamSize} members.`;
                      })()}
                    </p>

                    {formData.teamMembers.map((member, index) => (
                      <div key={index} className="team-member">
                        <div className="team-member-header">
                          <h4>Team Member {index + 1}</h4>
                          <button
                            type="button"
                            className="remove-member-btn"
                            onClick={() => removeTeamMember(index)}
                            title="Remove team member"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="form-row">
                          {getFormConfig(event.id).teamMemberFields.includes("name") && (
                            <div className="form-group">
                              <label>
                                Full Name <span className="required">*</span>
                              </label>
                              <input
                                type="text"
                                value={member.name || ""}
                                onChange={(e) =>
                                  updateTeamMember(index, "name", e.target.value)
                                }
                                placeholder="Enter team member name"
                                required
                              />
                            </div>
                          )}

                          {getFormConfig(event.id).teamMemberFields.includes("phone") && (
                            <div className="form-group">
                              <label>
                                Contact Number <span className="required">*</span>
                              </label>
                              <div className="phone-input-container">
                                <span className="phone-prefix">+91</span>
                                <input
                                  type="tel"
                                  value={member.phone || ""}
                                  onChange={(e) =>
                                    updateTeamMember(index, "phone", e.target.value)
                                  }
                                  placeholder="Enter 10-digit number"
                                  maxLength="10"
                                  pattern="[0-9]{10}"
                                  required
                                />
                              </div>
                            </div>
                          )}

                          {getFormConfig(event.id).teamMemberFields.includes(
                            "scholarId"
                          ) &&
                            formData.collegeType === "nit_silchar" && (
                              <div className="form-group">
                                <label>
                                  Scholar ID <span className="required">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={member.scholarId || ""}
                                  onChange={(e) =>
                                    updateTeamMember(index, "scholarId", e.target.value)
                                  }
                                  placeholder="Enter scholar ID"
                                  required
                                />
                              </div>
                            )}

                          {getFormConfig(event.id).teamMemberFields.includes(
                            "department"
                          ) && (
                            <div className="form-group">
                              <label>
                                Department <span className="required">*</span>
                              </label>
                              <select
                                value={member.department || ""}
                                onChange={(e) =>
                                  updateTeamMember(index, "department", e.target.value)
                                }
                                required
                              >
                                <option value="">Select Department</option>
                                <option value="cse">
                                  Computer Science & Engineering
                                </option>
                                <option value="ece">Electronics & Communication</option>
                                <option value="me">Mechanical Engineering</option>
                                <option value="ce">Civil Engineering</option>
                                <option value="ee">Electrical Engineering</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                          )}

                          {getFormConfig(event.id).teamMemberFields.includes("year") && (
                            <div className="form-group">
                              <label>
                                Year of Study <span className="required">*</span>
                              </label>
                              <select
                                value={member.year || ""}
                                onChange={(e) =>
                                  updateTeamMember(index, "year", e.target.value)
                                }
                                required
                              >
                                <option value="">Select Year</option>
                                <option value="1st">1st Year</option>
                                <option value="2nd">2nd Year</option>
                                <option value="3rd">3rd Year</option>
                                <option value="4th">4th Year</option>
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {(() => {
                      const config = getFormConfig(event.id);
                      const maxMembers =
                        config.maxTeamMembers !== undefined
                          ? config.maxTeamMembers
                          : config.maxTeamSize - 1;
                      return (
                        formData.teamMembers.length < maxMembers && (
                          <button
                            type="button"
                            className="add-member-btn"
                            onClick={addTeamMember}
                          >
                            + Add Team Member
                          </button>
                        )
                      );
                    })()}

                    {(() => {
                      const config = getFormConfig(event.id);
                      const minMembers =
                        config.minTeamMembers !== undefined
                          ? config.minTeamMembers
                          : config.minTeamSize - 1;
                      return (
                        formData.teamMembers.length < minMembers && (
                          <p className="team-size-warning">
                            ⚠️ You need to add at least {minMembers} team member
                            {minMembers > 1 ? "s" : ""} to meet the minimum team size
                            requirement.
                          </p>
                        )
                      );
                    })()}
                  </div>

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
