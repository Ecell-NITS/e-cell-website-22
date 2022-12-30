import React, {useState}  from "react";
import "../About Us/About_us.css";
import image1 from "../About Us/image/image1.jpg";
import Card from "./Card";
import logo from "./image/logo.jpg";
const motto_dialogue = [
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla dicta sint facere consequuntur reprehenderit",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla dicta sint facere consequuntur reprehenderit",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla dicta sint facere consequuntur reprehenderit",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla dicta sint facere consequuntur reprehenderit",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla dicta sint facere consequuntur reprehenderit",
];


function About_us() {
  const [Ind, setInd] =useState(0);
  return (
    <div>
      {/* for image and details  */}
      <h3 className="about_heading">ABOUT US</h3>
      <div className="underline"></div>
      <div className="about">
        <img src={image1} alt="image1" className="about_image" />
        
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
        <h3 style={{fontSize: "64px"}}>MOTTO</h3>
      </div>
      <div className="test_card">
        <div className="cards-set-1">
          <Card image={logo} dialogue={motto_dialogue[0]} />
          <Card image={logo} dialogue={motto_dialogue[1]} />
          <Card image={logo} dialogue={motto_dialogue[2]} />
        </div>
        <div className="cards-set-2">
          <Card image={logo} dialogue={motto_dialogue[3]} />
          <Card image={logo} dialogue={motto_dialogue[4]} />
        </div>
      </div>

      {/* <div className="motto_card_carosel">
        <div className="motto_card_carosel_card">
           {
             motto_dialogue.map((motto_dialogue,index) => {
              if(index==Ind)  return <Card  image={logo} motto_dialogue={motto_dialogue[index]}/>
           })
          }
        </div>
        <div className="motto_card_carosel_button">
          <button className="motto_card_carosel_button_left" onClick={() => setInd((Ind-1+motto_dialogue.length)%motto_dialogue.length)}>&lt;</button>
          <button className="motto_card_carosel_button_right" onClick={() => setInd((Ind+1)%motto_dialogue.length)}>&gt;</button>
          </div>
      </div> */}
    </div>
  );
}

export default About_us;
