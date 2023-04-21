import React, { useState } from "react";
import "./GalleryTab.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Data from "../../../Data/GalleryTab.json";
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

  // Function to filter the years according to the event dropdown.
  const filterYear = Data.filter((item) => {
    if (event === "All") {
      return item;
    } else if (item.event === event) {
      return item.year;
    } else {
      return null;
    }
  });

  // Function to filter the events according to the year dropdown.
  const filterEvent = Data.filter((item) => {
    if (year === "All") {
      return item;
    } else if (item.year === year) {
      return item.event;
    } else {
      return null;
    }
  });

  return (
    <div>
      <div className="tabGallery">
        <div className="leftTab">
          <div className="sort">Sort By Year</div>
          <div className="years">
            <DropdownButton
              title={year}
              id="dropdown-custom-2"
              onSelect={handleClick}
            >
              {["All", ...new Set(filterYear.map((item) => item.year))].map(
                (year) => (
                  <Dropdown.Item eventKey={year}>{year}</Dropdown.Item>
                )
              )}
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
              {["All", ...new Set(filterEvent.map((item) => item.event))].map(
                (event) => (
                  <Dropdown.Item eventKey={event}>{event}</Dropdown.Item>
                )
              )}
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default Tab;
