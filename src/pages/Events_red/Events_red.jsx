
import React from "react";
import IndividualAboutUs from "../../components/EventsRed/IndividualAboutUs/IndividualAboutUs";
import IndividualHero from "../../components/EventsRed/IndividualHero/IndividualHero";
import NavbarTeam from "../../components/shared/Navbar/NavbarTeam";
import Eventscards from "../../components/EventsRed/Cards/eventscards";
import { alleventsrjn } from "../../Data/EventsData";
import './Events_red.css'
import Sponsor from '../../components/EventsRed/Sponsor/Sponsor'


const Events_red = () => {
  return (

    <>
      <NavbarTeam />
      <IndividualHero />
      <IndividualAboutUs />
      <div className="container">
       
        {alleventsrjn.map(() => {
          return( <Eventscards />);
        })}
        
        
      </div>
      <Sponsor/>
    </>
  );
};


export default Events_red;
