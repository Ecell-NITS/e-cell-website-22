import React, { useState } from "react";
import "./GalleryTab.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
// import Data from "./GalleryTab.json";
import Data from '../../../Data/GalleryTab.json'
import GalleryCard from "../GalleryCard/GalleryCard";

const Tab = () => {
  const [year, setYear] = useState("All");
  const [event, setEvent] = useState("All");

  const handleClick = (e) => {
    setYear(e);
  };

  const handleClick2 = (e) => {
    setEvent(e);
  };

  const filterData = Data.filter((item) => {
    if (year === "All" && event === "All") {
      return item;
    } else if (year === "All" && event !== "All") {
      return item.event === event;
    } else if (year !== "All" && event === "All") {
      return item.year === year;
    } else {
      return item.year === year && item.event === event;
    }
  });

 
  return (
    <>
      <div className="tabGallery">
        <div className="leftTab">
        <div className="sort">Sort By Year</div>
        <div className="years">
          <DropdownButton
            title={year}
            id="dropdown-custom-2"
            onSelect={handleClick}
          >
            <Dropdown.Item eventKey="All">All</Dropdown.Item>
            <Dropdown.Item eventKey="2022-2023">2022-2023</Dropdown.Item>
            <Dropdown.Item eventKey="2021-2022">2021-2022</Dropdown.Item>
            <Dropdown.Item eventKey="2020-2021">2020-2021</Dropdown.Item>
          </DropdownButton>
        </div>
        </div>
        <div className="rightTab">
        <div className="sort">Sort By Events</div>
        <div className="events">
          <DropdownButton
            title={event}
            id="dropdown-custom-2"
            onSelect={handleClick2}
          >
            <Dropdown.Item eventKey="All">All</Dropdown.Item>
            <Dropdown.Item eventKey="Orientation">Orientation</Dropdown.Item>
            <Dropdown.Item eventKey="Emprassario">Emprassario</Dropdown.Item>
            <Dropdown.Item eventKey="Srijan">Srijan</Dropdown.Item>
          </DropdownButton>
        </div>
        </div>      
       </div>
        <div className="GalleryCards">
        {filterData.map((item) => {
          return (
            <GalleryCard
              key={item.id}
              id={item.id}
              imgsrc={item.imgsrc}
              ></GalleryCard>
          );
        })
      }
      </div>

    </>
  );
};

export default Tab;
