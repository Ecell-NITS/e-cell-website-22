import React from "react";
import "./About_us.css";

import Card from "./Card";
import logo from "../../../assets/logo.jpg";
const motto_dialogue = [
  "Channelizing the budding thoughts of real-world problem solving by providing an optimal platform to generate its physical counterpart",
  "Educating the students about applicative problem solving, financial literacy, management and leadership in a scholastic manner through various workshops, events and interactive sessions",


];


function About_us() {
  // const [Ind, setInd] =useState(0);
  return (

    // About Us section

    <div id="aboutecellnits">
      
      


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