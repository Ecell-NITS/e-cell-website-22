import React from 'react'
import IndividualAboutUs from '../../components/EventsRed/IndividualAboutUs/IndividualAboutUs'
import IndividualHero from '../../components/EventsRed/IndividualHero/IndividualHero'
import NavbarTeam from '../../components/shared/Navbar/NavbarTeam'
import Sponsor from '../../components/EventsRed/Sponsor/Sponsor'
const Events_red = () => {
  return (
    <div>
      <NavbarTeam/>
      <IndividualHero/>
      <IndividualAboutUs/>
      <Sponsor/>
    </div>
  )
}

export default Events_red
