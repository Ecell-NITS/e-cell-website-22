import React from "react";
import "./About_us.css";
import image1 from "../../../assets/image1.jpg";
import Card from "./Card";
import logo from "../../../assets/logo.jpg";
const motto_dialogue = [
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla dicta sint facere consequuntur reprehenderit",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla dicta sint facere consequuntur reprehenderit",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla dicta sint facere consequuntur reprehenderit",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla dicta sint facere consequuntur reprehenderit",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla dicta sint facere consequuntur reprehenderit",
];


function About_us() {
  // const [Ind, setInd] =useState(0);
  return (
    <div>
      {/* for image and details  */}
      <h3 className="about_heading">ABOUT US</h3>
      <div className="underline"></div>
      <div className="about">
        <img src={image1} alt="image1" className="about_image" />

        <div className="about_text_div">
          <p className="about_text">
          Lorem ipsum dolor sit amet consectetur. Malesuada mauris auctor nisl pellentesque facilisis ornare euismod sit. Fermentum velit cras sed nullam maecenas tincidunt gravida fringilla augue. Dignissim tellus scelerisque a sem penatibus lacus diam quis. Tempus dui enim neque pretium posuere blandit. Cras nullam vulputate eleifend vitae enim morbi adipiscing. Habitasse vestibulum eget sed sed risus sed sed. Pellentesque pulvinar id non sed scelerisque odio commodo tincidunt egestas. Purus hac rutrum id cursus posuere. Vitae nulla elit risus ut potenti. Arcu ultricies volutpat urna ridiculus interdum vulputate mattis. <br/><br/>
Malesuada nisi mauris est feugiat aliquet. Elementum facilisis at senectus in nisi sagittis. Leo in sed arcu neque at. Venenatis congue sit eu fringilla commodo tellus in vitae. Nisl cras sit nunc neque sem mauris id tempor laoreet. Odio urna amet nullam dictum. Ut aliquet scelerisque at vulputate sem sit egestas. Nunc felis aenean lacus pulvinar nunc dis aliquet. Arcu dui gravida sit ipsum fermentum dictum faucibus lorem. Donec ut eget tellus tincidunt odio malesuada quisque hendrerit nibh. Etiam nunc libero lobortis arcu vitae turpis enim urna. Sed accumsan in tempor risus felis diam enim tellus blandit. Urna iaculis elementum est pretium fusce a lacus. Morbi eget tristique netus enim imperdiet lobortis nulla ultricies.
          </p>
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
