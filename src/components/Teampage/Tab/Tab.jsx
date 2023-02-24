import React, { useState } from 'react'
import './Tab.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
// import { motion } from 'framer-motion'
import Alumni from '../Alumni/Alumni'
import Faculties from '../Faculties/Faculties'
import CoreTeam1 from '../CoreTeam/Coreteam1'
import CoreTeam2 from '../CoreTeam/Coreteam2'
// import CoreTeam3 from '../CoreTeam/Coreteam3'
// import Dev from "../Developers/Developers"
import Developers from '../Developers/Developers';

const Tab = () => {
  const [lebel, setlebel] = useState("faculties");
  const [active, setActive] = useState("2022-2023");

  const handleClick = (e) => {
    // console.log(e);
    setActive(e);
  };

  return (
    <>
      <div className="tab_main">
        <div
          className={`faculties ${lebel === "faculties" ? "active-link" : ""}`}
          onClick={() => { setlebel("faculties") }}
        >
          FACULTIES
        </div>
        <div
          className={`alumni ${lebel === "alumni" ? "active-link" : ""}`}
          onClick={() => setlebel("alumni")}
        >
          ALUMNI
        </div>
        <div
          className={`core-team ${lebel === "core" ? "active-link" : ""}`}
          onClick={() => setlebel("core")}
        >
          CORE TEAM
          <DropdownButton
            id="dropdown-custom-1"
            title={active}
            onSelect={handleClick}
          >
            <Dropdown.Item eventKey="2022-2023">2022-2023</Dropdown.Item>
            <Dropdown.Item eventKey="2021-2022">2021-2022</Dropdown.Item>
            {/* <Dropdown.Item eventKey="2020-2021">2020-2021</Dropdown.Item> */}
          </DropdownButton>
        </div>
        <div
          className={`developers ${lebel === "developers" ? "active-link" : ""}`}
          onClick={() => setlebel("developers")}
        >
          DEVELOPERS
        </div>
      </div>

      <div className="tab_content">
        {lebel === "faculties" && <Faculties />}
        {lebel === "alumni" && <Alumni />}
        {lebel === "core" && active === "2022-2023" && <CoreTeam1 />}
        {lebel === "core" && active === "2021-2022" && <CoreTeam2 />}
        {/* {lebel === "core" && active === "2020-2021" && <CoreTeam3 />} */}
        {lebel === "developers" && <Developers />}
      </div>
    </>
  );
};

export default Tab;


