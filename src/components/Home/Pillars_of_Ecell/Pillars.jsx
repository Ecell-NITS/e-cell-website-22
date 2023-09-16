import React, { useRef } from "react";
import ItemCard from "./ItemCard";
import "./Pillars.css";
import WasimArifSir from "../../../assets/WasimArifSir.jpg";
import RajatGuptaSir from "../../../assets/RajatGuptaSir.jpg";
// import ABDeoghareSir from "../../../assets/ABDeoghareSir.jpg"

const Pillars = () => {
  let cardHolder = useRef();

  function handleNext() {
    cardHolder.current.scrollLeft += cardHolder.current.offsetWidth;
  }

  function handlePrev() {
    cardHolder.current.scrollLeft -= cardHolder.current.offsetWidth;
  }

  let info = [
    {
      id: "1",
      desc: "Prof. Rajat Gupta is a professor in the mechanical engineering department and the president of IIC, NIT Silchar. He is the backbone of IIC and has been an excellent mentor to the students and a great support to the organization.",
      name: "Prof. Rajat Gupta",
      designation: "IIC President, NIT Silchar",
      img: RajatGuptaSir,
    },
    {
      id: "2",
      desc: "Dr. Wasim Arif is an associate professor in the department of Electronics and Communication and is a faculty advisor at E-Cell, NIT Silchar. He has always been a guiding support to the organization and has always guided the members in the right direction.",
      name: "Dr. Wasim Arif",
      designation: " Convener IIC, NIT Silchar",
      img: WasimArifSir,
    },
    {
      id: "3",
      desc: "Dr. A.B. Deoghare is an associate professor in the department of mechanical engineering and supports the Ecell organization as a faculty advisor. We are eternally grateful for the support and guidance that we have received from him.",
      name: "Dr. A.B. Deoghare",
      designation: "Asso Prof, Mechanical Engineering",
      img: "https://res.cloudinary.com/dfriijrmr/image/upload/v1677474386/GalleryPage/Orientation%202022-2023/IMG_1558_vjql6g.jpg",
    },
  ];

  return (
    <div className="Pillar_of_Ecell">
      <div className="container">
        <h1 className="header">PILLARS OF ECELL</h1>
      </div>
      <hr className="horizontal-line" />
      <div className="Card-holder" ref={cardHolder}>
        {info.map((element) => {
          return (
            <ItemCard
              key={element.id}
              id={element.id}
              desc={element.desc}
              name={element.name}
              designation={element.designation}
              img={element.img}
            />
          );
        })}
      </div>
      <div className="btns btns0">
        <button className="prev" onClick={handlePrev}>
          <i className="arrow left" />
        </button>
        <button className="next" onClick={handleNext}>
          <i className="arrow right" />
        </button>
      </div>
    </div>
  );
};

export default Pillars;
