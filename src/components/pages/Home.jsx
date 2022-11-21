import React, { useEffect } from 'react'
import Collaboration from '../Homepage/Collaboration';
import Hero from '../Homepage/Hero';
import Testimonial from '../Homepage/Testimonial';
import About_us from '../Home/About Us/About_us';
import Events from '../Homepage/Events/Events';
const Home = () => {
  useEffect(() => {
    document.title = "ECELL | NITS >> Home";
  }, []);
  return (
    <>
      <Hero />
      <Collaboration />
      <About_us />
      <Events />
      <Testimonial />
    </>
  )
}

export default Home;