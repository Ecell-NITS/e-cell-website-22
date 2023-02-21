import React from 'react'
import IndividualAboutUs from '../../components/EventsRedPage/IndividualAboutUS/IndividualAboutUs'
import IndividualHero from '../../components/EventsRedPage/IndividualHero/IndividualHero'
import NavbarTeam from '../../components/shared/Navbar/NavbarTeam'

const Events_red = () => {
  return (
    <div>
      <NavbarTeam/>
      <IndividualHero/>
      <IndividualAboutUs/>
    </div>
  )
}

export default Events_red
