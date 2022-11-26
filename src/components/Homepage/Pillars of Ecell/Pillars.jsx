import React, { useRef, useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import "./Pillars.css";

const Pillars = () => {
  let cardHolder = useRef();

  function handleNext() {
    cardHolder.current.scrollLeft += 0.334 * cardHolder.current.offsetWidth;
  }

  function handlePrev() {
    cardHolder.current.scrollLeft -= 0.334 * cardHolder.current.offsetWidth;
  }

  const [info, setinfo] = useState([]);
  
  useEffect(() => {
    fetch("/Pillars.json")
      .then((res) => res.json())
      .then((data) => {
        setinfo(data.People)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            />
          );
        })}
      </div>
      <div className="btns">
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
