import React from "react";
import "../About Us/About_us.css";
import image1 from "../About Us/image/image1.jpg";
import Card from "./Card";
import logo from "./image/logo.jpg";
const dialogue = [
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla dicta sint facere consequuntur reprehenderit",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla dicta sint facere consequuntur reprehenderit",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla dicta sint facere consequuntur reprehenderit",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla dicta sint facere consequuntur reprehenderit",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla dicta sint facere consequuntur reprehenderit",
];

function About_us() {
  return (
    <div>
      {/* for image and details  */}
      <h3 className="about_heading">ABOUT US</h3>
      <div className="underline"></div>
      <div className="about">
        <img src={image1} alt="image1" srcset="" className="about_image" />
        
        <div className="about_text_div">
          <p className="about_text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor minus
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id totam
            exercitationem earum et quis repellat dicta nihil eveniet veritatis.
            Reprehenderit quas veniam impedit minus hic adipisci repudiandae,
            molestias totam blanditiis velit autem ab dolore nam at quia dolorem
            officiis, culpa incidunt. Explicabo eaque officiis eveniet dolorum
            natus adipisci consequatur ab hic magnam unde, nesciunt, qui debitis
            odit perferendis laborum voluptatum? Cumque, sunt! Ut, dolorum
            voluptatibus. Sed adipisci dolore, Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Rem doloremque earum architecto harum
            ipsam? Cumque molestiae qui tenetur? Error, nesciunt.
          </p>
        </div>
      </div>
      {/* for cards */}
      <div className="motto">
        <h3>MOTTO</h3>
      </div>
      <div className="test_card">
        <div className="cards-set-1">
          <Card image={logo} dialogue={dialogue[0]} />
          <Card image={logo} dialogue={dialogue[1]} />
          <Card image={logo} dialogue={dialogue[2]} />
        </div>
        <div className="cards-set-2">
          <Card image={logo} dialogue={dialogue[3]} />
          <Card image={logo} dialogue={dialogue[4]} />
        </div>
      </div>
    </div>
  );
}

export default About_us;
