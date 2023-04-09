import React from "react";
import "./About_us.css";

import Card from "./Card";


const motto_dialogue = [

  '"Inspiring Ideas, Igniting Innovation." We encourage students to brainstorm innovative ideas and nurture their creativity.',

'"Guiding You Towards Success." We provide guidance to students in the form of mentorship programs, workshops, and networking events to help them refine their ideas and develop their skills.',

'"Transforming Ideas into Reality." We provide incubation facilities and funding support to promising startups and ideas, helping them take off the ground. ',

'"Connecting Ideas, Building Networks." We organize various events like business plan competitions, hackathons, and networking sessions to help students showcase their ideas and connect with investors, mentors, and other entrepreneurs.',

'"Creating a Community of Entrepreneurs."We aim to create a culture of entrepreneurship on campus by celebrating success stories, organizing interactive sessions, and inspiring students to think beyond traditional career paths.',
  


];

const moto_image = [
  'https://res.cloudinary.com/dp92qug2f/image/upload/v1680524127/Ecell%20website/moto/moto-1_uoycz4.webp',
  'https://res.cloudinary.com/dp92qug2f/image/upload/v1680524127/Ecell%20website/moto/moto-2_hvs2rq.webp',
  'https://res.cloudinary.com/dp92qug2f/image/upload/v1680524128/Ecell%20website/moto/moto-3_thwnrc.webp',
  'https://res.cloudinary.com/dp92qug2f/image/upload/v1680524127/Ecell%20website/moto/moto-4_krbq3h.webp',
  'https://res.cloudinary.com/dp92qug2f/image/upload/v1680524130/Ecell%20website/moto/moto-5_jzewcc.webp'
]

function About_us() {
  // const [Ind, setInd] =useState(0);
  return (

    // About Us section

    <div id="aboutecellnits">
      <div className="aboutSection">
        {/* <h3 className="about_heading">ABOUT US</h3> */}
        <div className="collab">
          <h1>ABOUT US</h1>
        </div>
        {/* <div className="underline"></div> */}
        <div className="contentAbout">
          <p>E-Cell, NIT Silchar is a non-profit student-run organization promoting and nurturing the entrepreneurial spirit among students. It offers pre-incubation facilities to startups and encourages students to work on their ideas through events. E-Cell's mission is to improve the culture of entrepreneurship in technical and non-technical fields and uplift students to innovate and develop their models. Its objective is to develop the spirit of entrepreneurship by providing various programs and events such as Srijan to educate students on financial literacy, real-world problem-solving skills, and event management. </p>
        </div>
      </div>
      
      

      {/* for cards */}

      <div className="motto">
        <h3 style={{ fontSize: "64px" }}>MOTTO</h3>
      </div>
      <div className="test_card">
        <div className="cards-set-1">
        <Card image={moto_image[0]} dialogue={motto_dialogue[0]} />
          <Card image={moto_image[1]} dialogue={motto_dialogue[1]} />
          <Card image={moto_image[2]} dialogue={motto_dialogue[2]} />
          <Card image={moto_image[3]} dialogue={motto_dialogue[3]} />
          <Card image={moto_image[4]} dialogue={motto_dialogue[4]} />
          {/* <Card image={logo} dialogue={motto_dialogue[2]} /> */}
        </div>
        {/* <div className="cards-set-2">
          <Card image={logo} dialogue={motto_dialogue[3]} />
          <Card image={logo} dialogue={motto_dialogue[4]} />
        </div> */}
      </div>
    </div>
  );
}

export default About_us;