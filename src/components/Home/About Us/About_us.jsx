import React from "react";
import "./About_us.css";
import image1 from "../../../assets/startup.jpeg";
import Card from "./Card";
import logo from "../../../assets/logo.jpg";
const motto_dialogue = [
  "Channelizing the budding thoughts of real-world problem solving by providing an optimal platform to generate its physical counterpart",
  "Educating the students about applicative problem solving, financial literacy, management and leadership in a scholastic manner through various workshops, events and interactive sessions",

  // "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla dicta sint facere consequuntur reprehenderit",
  // "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla dicta sint facere consequuntur reprehenderit",
  // "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla dicta sint facere consequuntur reprehenderit",
];


function About_us() {
  // const [Ind, setInd] =useState(0);
  return (
    <div>
      {/* for image and details  */}
      {/* <div className="about-us"> */}
      {/* <div className="about">
        <div className="imageBox">
          <img src={image1} alt="" />
        </div>
        <div className="content-about">
          <h1>About Us</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum soluta vel possimus eaque pariatur distinctio,
             reprehenderit illum asperiores laborum autem hic nisi repellendus. Saepe nemo, iure distinctio facilis soluta dolore.
             Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum soluta vel possimus eaque pariatur distinctio,
             reprehenderit illum asperiores laborum autem hic nisi repellendus. Saepe nemo, iure distinctio facilis soluta dolore.</p>
        </div>
      </div>  */}

      


            
      
        

      {/* </div> */}
      


      <div className="aboutSection">
        <h3 className="about_heading">ABOUT US</h3>
        <div className="underline"></div>
        <div className="contentAbout">
          <p>Lorem ipsum dolor sit amet consectetur. Malesuada mauris auctor nisl pellentesque facilisis ornare euismod sit. Fermentum velit cras sed nullam maecenas 
            tincidunt gravida fringilla augue. Dignissi tellus scelerisque a sem penatibus lacus diam quis. 
             Tempus dui enim neque pretium posuere blandit. Cras nullam vulputate eleifend vitae enim morbi adipiscing. Habitasse vestibulum eget sed sed risus sed sed. Pellentesque pulvinar id non sed scelerisque odio commodo tincidunt egestas. Purus hac rutrum id cursus posuere. Vitae nulla elit risus ut potenti. Arcu ultricies volutpat urna ridiculus interdum vulputate mattis.
              Malesuada nisi mauris est feugiat aliquet. Elementum facilisis at senectus in nisi sagittis. 
              Leo in sed arcu neque at. Venenatis congue sit eu fringilla commodo tellus in vitae. Nisl cras sit nunc neque sem mauris id tempor laoreet.
               Odio urna amet nullam dictum. Ut aliquet scelerisque at vulputate sem sit egestas. Nunc felis </p>
        </div>
      </div>
      
      {/* <div className="about">
        <img src={image1} alt="image1" className="about_image" />

        <div className="about_text_div">
          <div className="about_text">
          <div className="about_e_cell">
           <b> ABOUT E-CELL: </b> Entrepreneurship Cell or E-Cell, NIT Silchar is a non-profit organization run by the students and was established with the aim of promoting and nurturing the entrepreneurial spirit among the youth of the college. We thrive on fostering a self-reliant mentality among the youth and also helping them work on their ideas and encouraging college-level students to start their own ventures. E-Cell also provided pre-incubation facilities to various start-ups and bootstrapped businesses to turn into colossal enterprises.
          </div>
          <div className="about_mission">
            <b>MISSION:</b>  The Entrepreneurship Cell of NIT Silchar gives students a platform that converges their entrepreneurial passions, focusing mainly on improving the culture of entrepreneurship in the college, both in technical and non-technical fields, and further uplifting the students to innovate, put forth their ideas, and help develop their models by providing them with incubations and also a platform to scale their products through our events.
          </div>
          <div className="about_objective">
            <b> OBJECTIVE:</b> The objective of E-Cell NIT Silchar is to develop the spirit of entrepreneurship among the students. It motivates students and enables them to strengthen their passion and integrity toward entrepreneurial qualities. Activities of this cell also include orientation programs, various workshops, interactive sessions, webinars, and large-scale events like Srijan, which help students to gain experience and educate them about financial literacy, the application of skills to solve real-world problems, and management of events.
          </div>
          </div>
        </div>

      </div> */}

      {/* for cards */}

      <div className="motto">
        <h3 style={{ fontSize: "64px" }}>MOTTO</h3>
      </div>
      <div className="test_card">
        <div className="cards-set-1">
          <Card image={logo} dialogue={motto_dialogue[0]} />
          <Card image={logo} dialogue={motto_dialogue[1]} />
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
