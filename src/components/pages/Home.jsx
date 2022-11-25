import React, { useEffect } from 'react'
import Collaboration from '../Homepage/Collaboration';
import Hero from '../Homepage/Hero';
import Testimonial from '../Homepage/Testimonial';
import Aboutus from '../Home/About Us/About_us';
import Events from '../Homepage/Events/Events';
import Pillars from '../Homepage/Pillars of Ecell/Pillars'
import Timeline from './components/Home/Timeline/Timeline';
const Home = () => {
  useEffect(() => {
    document.title = "ECELL | NITS >> Home";
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
    </>
  )
}

export default Home;