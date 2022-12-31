import React from 'react'
import '../../css/Timeline.css'


function Timeline() {
  return (
    <div className='timeline-section'>
      <div className="bor-btm">
        <h1 className='testimonial-h1'>TIMELINE</h1>
      </div>

      <div className="timeline-main">
        <div className="timeline-child">
          <img src="./images/Orientation.png" alt="" />
          <h1 className='child-title'>Orientation</h1>
        </div>

        <div className="timeline-child tc2">
          <img className="arrows" src="./images/arrow-up.png" alt="" />
        </div>

        <div className="timeline-child child-up tc4" id="srj">
          <img src="./images/Srijan.png" alt="" />
          <h1 className='child-title' id="srj-title">Srijan</h1>
        </div>

        <div className="timeline-child tc2 tc3" >
          <img className="arrows" src="./images/arrow-down.png" alt="" />
        </div>

        <div className="timeline-child tc4" id="emp">
          <img src="./images/Empressario.png" alt="" />
          <h1 className='child-title'>Empressario</h1>
        </div>

        <div className="timeline-child tc2">
          <img className="arrows" src="./images/arrow-up.png" alt="" />
        </div>

        <div className="timeline-child tc4" id="prb">
          <img src="./images/Pre-Incubation.png" alt="" />
          <h1 className='child-title' id="prb-title">Pre-Incubation</h1>
        </div>

      </div>
    </div>
  )
}


export default Timeline

