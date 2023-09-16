import React, { useEffect } from "react";
import Collaboration from "../../components/Home/collaboration/Collaboration";
import Hero from "../../components/Home/HeroSection_homepage/Hero";
import Testimonial from "../../components/Home/Testimonial/Testimonial";
import Aboutus from "../../components/Home/About Us/About_us";
import Events from "../../components/Home/Events/Events";
import Pillars from "../../components/Home/Pillars_of_Ecell/Pillars";
import Timeline from "../../components/Home/Timeline/Timeline";
import Footer from "../../components/shared/Footer/Footer";
import Footerconstant from "../../components/shared/FooterConstant/Footerconstant";
import Contactus from "../../components/Home/Contact/Contactus";
const Home = () => {
  useEffect(() => {
    document.title = "E-Cell | NIT Silchar";
  }, []);
  return (
    <>
      <Hero />
      <Collaboration />
      <Aboutus />
      <Pillars />
      <Events />
      <Timeline />
      <Testimonial />
      <Contactus />
      <Footerconstant />
      <Footer />
    </>
  );
};

export default Home;
