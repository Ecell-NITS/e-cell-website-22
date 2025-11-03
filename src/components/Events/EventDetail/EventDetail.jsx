import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./EventDetail.css";
import NavbarTeam from "../../shared/Navbar/NavbarTeam";
import Footer from "../../shared/Footer/Footer";
import { FiCalendar, FiMapPin, FiUsers } from "react-icons/fi";

const EventDetail = () => {
  const { eventId: eventSlug } = useParams();
  const navigate = useNavigate();

  // Helper to convert event title to URL-friendly slug
  const createEventSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

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

  // Event-specific contact information
  const getEventContacts = (eventId) => {
    switch (parseInt(eventId)) {
      case 1: // Business Hackathon
        return [
          {
            name: "Arhan Rahman",
            phone: "+91 6901741124",
            position: "Event Head",
          },
          {
            name: "Khushi Prasad",
            phone: "+91 9336299515",
            position: "Event Head",
          },
        ];
      case 2: // Treasure Hunt
        return [
          {
            name: "Premansh Chakraborty",
            phone: "+91 8260094077",
            position: "Event Head",
          },
          {
            name: "Pallav Prithani",
            phone: "+91 7099666599",
            position: "Event Head",
          },
          {
            name: "Kartika Jauhari",
            phone: "+91 7208976771",
            position: "Event Head",
          },
        ];
      case 3: // BID-WISE
        return [
          {
            name: "Krishna Harlalka",
            phone: "+91 9101786458",
            position: "Event Head",
          },
          {
            name: "Paarisha Agarwal",
            phone: "+91 9560707507",
            position: "Event Head",
          },
          {
            name: "Ronak Choudhary",
            phone: "+91 6003490434",
            position: "Event Head",
          },
        ];
      case 4: // Adovation
        return [
          {
            name: "Dhruv Mantri",
            phone: "+91 6281558501",
            position: "Event Head",
          },
          {
            name: "Gaurav",
            phone: "+91 6392622035",
            position: "Event Head",
          },
          {
            name: "Divyanshi Singh",
            phone: "+91 6001945527",
            position: "Event Head",
          },
        ];
      default:
        return [
          {
            name: "E-Cell Team",
            phone: "+91 9876543210",
            position: "Event Coordinator",
          },
        ];
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
      subtitle:
        "Enter the digital dimension where creativity is your code and strategy is your weapon",
      description:
        "A realm where visionaries, strategists, and innovators collide to power the next wave of business evolution. Enter a digital dimension where creativity is your code and strategy is your weapon. This isn't just a hackathon, it's an awakening of bold ideas, limitless imagination, and futuristic problem-solving. Team up. Power up. Step into the ultimate business battleground where every decision counts and every idea sparks possibility. Challenge your limits and craft the solutions that will shape tomorrow. The future starts now!",
      image:
        "https://res.cloudinary.com/ecell/image/upload/v1762182366/IMG_8721_zdwfuc.png",
      date: "Nov 12 - Nov 23, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Startup Centre",
      organizer: "E-CELL NIT SILCHAR",
      category: "Hackathon",
      prizePool: "8K",
      participationType: "Team Event",
      teamSize: "3 to 5 members",
      registrationDeadline: "November 12, 2025",
      eventFlow: {
        round1: {
          title: "Round 1: Online Submission",
          description:
            "Teams can choose from any of the 8 problem statements provided via email after registration. Teams must create and submit a PPT (in presentation format) and a 1 minute video explaining their idea or showcasing their presentation, as a reply to that mail. AI tools, including ChatGPT, may be used; but scoring will mainly focus on practicality, originality, relevance, and market analysis.",
          registrationDeadline: "12th November (EOD)",
          submissionDeadline: "15th November (EOD)",
          resultAnnouncement: "Top 8 teams announced via email",
          requirements:
            "PPT (in presentation format) and a 1 minute video explaining their idea or showcasing their presentation",
          advancement: "The top 8 teams will advance to the final round",
        },
        round2: {
          title: "Round 2: Onsite Hackathon",
          date: "21st - 23rd November",
          location: "Startup Centre",
          description:
            "Teams will have 8 hours to build a complete, market-ready business model. Creating a prototype is optional but recommended for a competitive edge. At least one member must be present onsite throughout the event. Accurate, traceable data is mandatory, with verification upon request. False data will lead to disqualification; keep track of all sources.",
          duration: "8 hours",
          requirements:
            "Complete, market-ready business model with accurate, traceable data",
          dressCode: "Semi-formal",
        },
      },
      rules: [
        "You are required to join whatsapp group sent on your email after registration for further updates",
        "Team Formation: Teams of 3-5 members, with cross-year collaborations encouraged",
        "Registration: Only the team leader needs to register through the link below",
        "Team Diversity: Aim for a diverse team with complementary skills",
        "Registration Deadline: 12th November (EOD)",
        "Round 1: Choose any of the 8 problem statements (sent via email post-registration)",
        "Round 1 Submission: Submit PPT and a 1 minute video as a reply to the registration email",
        "AI Tools: Allowed (e.g., ChatGPT); scoring prioritizes practicality, originality, relevance, and market analysis",
        "Advancement: Top 8 teams advance to Round 2",
        "Round 2: Onsite hackathon at Startup Centre",
        "Round 2 Duration: 8 hours",
        "Prototype: Optional but recommended for a competitive edge",
        "Attendance: At least one member must be present onsite throughout the event",
        "Data Requirements: Accurate, traceable data is mandatory, with verification upon request",
        "Disqualification: False data will lead to disqualification; keep track of all sources",
        "Dress Code: Semi-formal",
      ],
      participantDetails: [
        "Team Name",
        "Team leader's name, contact number and email id",
        "Team members name and contact number",
        "Scholar id of all the members",
      ],
      schedule: [
        {
          date: "November 12, 2025",
          events: [{ time: "11:59 PM", title: "Registration Deadline", venue: "Online" }],
        },
        {
          date: "November 15, 2025",
          events: [
            { time: "11:59 PM", title: "Round 1 Submission Deadline", venue: "Online" },
          ],
        },
        {
          date: "November 21-23, 2025",
          events: [
            {
              time: "TBA",
              title: "Round 2: Onsite Hackathon at Startup Centre",
              venue: "NIT Silchar",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "TREASURE HUNT",
      subtitle: "Get ready for the ultimate campus adventure!",
      description:
        "Get ready for the ultimate campus adventure! E Cell is hosting a high-stakes Treasure Hunt where your wits are your greatest weapon. We have scattered a series of clues and brain twisting riddles that will storm your mind. Dive into the grids of this mind-bending challenge, unlock the codes and race to find the hidden treasure before anyone else. This isn't just a hunt, it's a battle of wits. Do you have what it takes to conquer the grid?",
      image:
        "https://res.cloudinary.com/ecell/image/upload/v1762194328/IMG_8732_vxn0yd.jpg",
      date: "November 21, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Campus Wide",
      organizer: "E-CELL",
      category: "Competition",
      prizePool: "6K",
      participationType: "Team Event",
      teamSize: "3 to 5 members",
      registrationDeadline: "November 15, 2025",
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
        "You are required to join whatsapp group sent on your email after registration for further updates",
        "Team size: 3–5 members",
        "The event would be conducted in 3 rounds",
        "The use of any vehicle (including bicycles, scooters, etc.) is strictly prohibited and will lead to disqualification",
        "Any form of cheating or unfair means will lead to disqualification",
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
          date: "November 21-23, 2025",
          events: [
            {
              time: "TBA",
              title: "Treasure Hunt to be conducted",
              venue: "NIT Silchar",
            },
          ],
        },
      ],
      // Detailed schedule commented out - will be announced closer to the event
      /*
      schedule: [
        {
          date: "November 15, 2025",
          events: [{ time: "11:59 PM", title: "Registration Deadline", venue: "Online" }],
        },
        {
          date: "November 21, 2025",
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
      */
    },
    {
      id: 3,
      title: "BID-WISE",
      subtitle: "Where every bid tests your strategy, and every move defines your game",
      description:
        "A high-stakes mind game of logic, timing, and competition. This is a silent battlefield where teams must outthink, outbid, and outlast their rivals to claim victory. Where every bid tests your strategy, and every move defines your game.",
      image:
        "https://res.cloudinary.com/ecell/image/upload/v1762194328/IMG_8733_pjeg3h.jpg",
      date: "Nov 21 - Nov 22, 2025",
      time: "10:00 AM - 6:00 PM",
      location: "Central Arena & Stall Areas",
      organizer: "E-CELL",
      category: "Competition",
      prizePool: "6K",
      participationType: "Team Event",
      teamSize: "3 to 5 members",
      registrationDeadline: "November 19, 2025",
      registrations: "8 teams registered",
      eventFlow: {
        phase1: {
          title: "Phase I: The Silent Crucible",
          description:
            "30 Teams enter an arena filled with intriguing items based on First come First serve Basis. You have a limited time to explore, discuss, and place your bids, all without uttering a word. Success demands sharp observation, quick decisions, and smart budgeting across 6 brutal rounds where winners are declared at the end of each.",
          setup:
            "A central arena will be created for teams to gather and 10 stalls will be placed around the room edges with 60 items total.",
          roundStructure: {
            exploration: "8 mins - Teams visit stalls to view items and base prices",
            discussion: "4 mins - Teams return to arena and plan bids",
            bidding: "8 mins - Only leaders bid using tokens (team no. + bid amount)",
          },
          powerToken: {
            title: "The Power Token: The Double-Edged Blade",
            description:
              "Every team receives one special token. It can double your bid and almost guarantee securing a coveted item.",
            warning:
              "The Catch is Deadly: In a few secret rounds, any team that uses its token faces instant elimination. Use it at your own risk.",
          },
          scoring: {
            easy: "2 points",
            medium: "3 points",
            hard: "5 points",
          },
          advancement: "Top 10 teams advance to Phase II",
        },
        phase2: {
          title: "Phase II: Final Domination",
          description:
            "The top 10 performing teams from the silent auction advance to the next stage. Here, strategy, adaptability, and unbreakable team synergy will decide who conquers The Grid.",
          note: "Details will be announced after Phase I completion",
        },
      },
      rules: [
        "You are required to join whatsapp group sent on your email after registration for further updates",
        "Teams: 3–5 members",
        "Purse: Each team begins with a fixed purse of 100 points to allocate among bids. Overspending leads to disqualification",
        "Items are divided into three categories based on difficulty of selling – Easy, Medium, and Hard",
        "Each category has a base price, and bidding begins from that price",
        "Every team is provided with: Team Number and Leader Badge, 30 numbered bid tokens, A Marker, A pocket of 100 points (the team's total purse)",
        "Power Token: Every team receives one special token that can double your bid and almost guarantee securing a coveted item",
        "Power Token Warning: In a few secret rounds, any team that uses its token faces instant elimination. Use it at your own risk",
        "A total of 60 items will be auctioned across 6 rounds (20 minutes each)",
        "Round Structure (20 minutes): Exploration (8 mins), Discussion (4 mins), Bidding (8 mins)",
        "Only team leaders (with badges) can move to stalls and submit bids during bidding phase",
        "Penalty: Any team member without a badge found outside the arena during the bidding phase will result in a –5 point deduction",
        "Winning Bids: The highest valid bid wins each item. Points awarded depend on the item's difficulty",
        "Tie-breaker: If two teams tie at a bid, the item goes to the next highest bidder",
        "Advancement: The top 10 teams from Phase I move to Phase II",
        "Can your team strike a balance between risk and reward? Will you play The Grid or will The Grid play you?",
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
          date: "November 21-23, 2025",
          events: [
            {
              time: "TBA",
              title: "BID-WISE to be conducted",
              venue: "NIT Silchar",
            },
          ],
        },
      ],
      // Detailed schedule commented out - will be announced closer to the event
      /*
      schedule: [
        {
          date: "November 19, 2025",
          events: [{ time: "11:59 PM", title: "Registration Deadline", venue: "Online" }],
        },
        {
          date: "November 21, 2025",
          events: [
            {
              time: "10:00 AM",
              title: "Event Briefing & Team Check-in",
              venue: "Central Arena",
            },
            {
              time: "10:30 AM",
              title: "Phase I: The Silent Crucible - Rounds 1-3",
              venue: "Central Arena & Stalls",
            },
            { time: "1:30 PM", title: "Lunch Break", venue: "Cafeteria" },
            {
              time: "2:30 PM",
              title: "Phase I: The Silent Crucible - Rounds 4-6",
              venue: "Central Arena & Stalls",
            },
            {
              time: "5:30 PM",
              title: "Phase I Results & Top 10 Announcement",
              venue: "Central Arena",
            },
          ],
        },
        {
          date: "November 22, 2025",
          events: [
            {
              time: "10:00 AM",
              title: "Phase II: Final Domination (Details TBA)",
              venue: "TBA",
            },
            {
              time: "5:00 PM",
              title: "Final Results & Prize Distribution",
              venue: "Central Arena",
            },
          ],
        },
      ],
      */
    },
    {
      id: 4,
      title: "Adovation",
      subtitle:
        "The ultimate online ad-making showdown where creativity meets the digital realm!",
      description:
        "This Technoesis, E-Cell NIT Silchar presents Adovation, the ultimate online ad-making showdown where creativity meets the digital realm! You and your team will be assigned a shop inside NITS. Mission: Create a 30–60 second ad that's funny, emotional, or dramatic, because in this grid, whatever sells, sells! So plug into your creative circuit, power up your storytelling core, and let your ideas light up the network. Because in Adovation, every second counts and every story sparks the grid.",
      image:
        "https://res.cloudinary.com/ecell/image/upload/v1762194326/IMG_8731_nxvstk.jpg",
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
            "After registration, each team will receive an email containing a list of three shops, from which they must select one. E-Cell will confirm the final shop assignment via mail.",
        },
        videoCreation: {
          title: "Video Creation & Submission",
          description:
            "Teams create a 30-60 second promotional video that's funny, emotional, or dramatic, highlighting their assigned shop's unique selling propositions.",
          deadline: "22nd November",
          submissionMethod: "Google Drive link",
        },
      },
      rules: [
        "You are required to join whatsapp group sent on your email after registration for further updates",
        "Team Size: 3-6 members",
        "After registration, each team will receive an email containing a list of three shops, from which they must select one",
        "E-Cell will confirm the final shop assignment via mail",
        "Video Length: 30-60 seconds",
        "Task: Create a video that is engaging, creative, and informative, highlighting the shop's unique selling propositions (USPs) while maintaining its brand identity",
        "Video can be funny, emotional, or dramatic - whatever sells, sells!",
        "Submission Deadline: All videos must be submitted by 22nd November",
        "Submission method: Google Drive link",
        "Late submissions will face immediate disqualification",
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
          date: "November 21-23, 2025",
          events: [
            {
              time: "TBA",
              title: "Adovation event activities",
              venue: "NIT Silchar",
            },
          ],
        },
      ],
      // Detailed schedule commented out - will be announced closer to the event
      /*
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
      */
    },
  ];

  // Find the event by slug
  const event = empresarioEvents.find((e) => createEventSlug(e.title) === eventSlug);
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
        import.meta.env.VITE_REGISTRATION_API_BASE_URL || "http://localhost:3000";
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
        import.meta.env.VITE_REGISTRATION_API_BASE_URL || "http://localhost:3000";
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
      if (field === "teamLeaderScholarId" || field === "teamViceCaptainScholarId") {
        // Scholar ID required only for NIT Silchar students
        return formData.collegeType === "nit_silchar" ? formData[field] : true;
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
            // Scholar ID required only for NIT Silchar students
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
          import.meta.env.VITE_REGISTRATION_API_BASE_URL || "http://localhost:3000";
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

      const apiEndpoint = getApiEndpoint(event.id);
      const apiData = prepareApiData(event.id, formData);

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(
          `Registration successful for ${event.title}! PLease check your email for further details`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );

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
        <button onClick={() => navigate("/empresario")}>← Back to Events</button>
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
            <img src={event.image} alt={event.title} loading="lazy" decoding="async" />
          </div>
          {/* Mobile meta row (kept as-is) */}
          <div className="hero-meta">
            <div className="hero-meta-item">
              <FiCalendar className="meta-icon" aria-hidden="true" />
              <span>{event.date}</span>
            </div>
            <div className="hero-meta-item">
              <FiMapPin className="meta-icon" aria-hidden="true" />
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
              <div className="meta-chip">
                <FiCalendar className="meta-icon" aria-hidden="true" />
                <span>{event.date}</span>
              </div>
              <div className="meta-chip">
                <FiMapPin className="meta-icon" aria-hidden="true" />
                <span>{event.location}</span>
              </div>
              <div className="meta-chip">
                <FiUsers className="meta-icon" aria-hidden="true" />
                <span>{event.organizer}</span>
              </div>
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
                              <strong>Last date to register:</strong>{" "}
                              {event.eventFlow.round1.registrationDeadline || "TBA"}
                            </li>
                            <li>
                              <strong>Last date to give the solution:</strong>{" "}
                              {event.eventFlow.round1.submissionDeadline || "TBA"}
                            </li>
                            <li>
                              <strong>
                                Announcement of teams proceeding to round 2:
                              </strong>{" "}
                              {event.eventFlow.round1.resultAnnouncement || "TBA"}
                            </li>
                            <li>
                              <strong>Requirements:</strong>{" "}
                              {event.eventFlow.round1.requirements || "TBA"}
                            </li>
                          </ul>
                        </div>

                        <div className="round-details">
                          <h4>{event.eventFlow.round2.title}</h4>
                          <p>{event.eventFlow.round2.description}</p>
                          <ul>
                            <li>
                              <strong>Date:</strong>{" "}
                              {event.eventFlow.round2.date || "TBA"}
                            </li>
                            <li>
                              <strong>Location:</strong>{" "}
                              {event.eventFlow.round2.location || "TBA"}
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

                {/* For Queries section with event-specific contacts */}
                <div className="queries-section">
                  <h3>For Queries</h3>
                  <div className="contact-list">
                    {getEventContacts(event.id).map((contact, index) => (
                      <div key={index} className="contact-card">
                        <div className="contact-name">{contact.name}</div>
                        <div className="contact-position">{contact.position}</div>
                        <div className="contact-contact">
                          <div className="contact-phone">
                            📞 <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                          </div>
                        </div>
                      </div>
                    ))}
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

            {/* Live updates removed */}

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
