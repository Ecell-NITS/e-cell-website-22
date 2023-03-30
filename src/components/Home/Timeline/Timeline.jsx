import React from 'react'
import './Timeline.css'
import orientation from '../../../assets/Orientation.png'
import arrowup from '../../../assets/arrow-up.png'
import arrowdown from '../../../assets/arrow-down.png'
import eic from '../../../assets/Innovation.png'
import srjn from '../../../assets/Srijan.png'
import empressario from '../../../assets/Empressario.png'
import preencu from '../../../assets/Pre-Incubation.png'
function Timeline() {
  return (
    <div className='timeline-section'>
      <div className="bor-btm">
        <h1 className='timeline-h1'>TIMELINE</h1>
      </div>

      <div className="timeline-main">
        <div className="timeline-sub">
          <div className="timeline-child bnjkop" id='orie'>
            <img src={orientation} alt="" />
            <h1 className='child-title'>Orientation</h1>
          </div>

          <div className="timeline-child tc2 down-reverse" id='ar-up'>
            <img className="arrows" src={arrowup} alt="" />
          </div>

          <div className="timeline-child bnjkop" id='eic'>
            <img src={eic} alt="" />
            <h1 className='child-title'>EIC</h1>
          </div>

          <div className="timeline-child tc2 tc3 mid-ar" id='ar-dn'>
            <img className="arrows" src={arrowdown} alt="" />
          </div>

          <div className="timeline-child child-up tc4 bnjkop" id="srj ">
            <img src={srjn} alt="" />
            <h1 className='child-title' id="srj-title">Srijan</h1>
          </div>

          <div className="timeline-child tc2 tc2impo" id='ar-up'>
            <img className="arrows" src={arrowup} alt="" />
          </div>

          <div className="timeline-child tc4 bnjkop" id="emp ">
            <img src={empressario} alt="" />
            <h1 className='child-title'>Empressario</h1>
          </div>

          <div className="timeline-child tc2 tc3 mid-ar" id='ar-dn'>
            <img className="arrows" src={arrowdown} alt="" />
          </div>

          <div className="timeline-child tc4 tc-pre bnjkop" id="prb ">
            <img src={preencu} alt="" />
            <h1 className='child-title preinvunmkj' id="prb-title ">Pre-Incubation</h1>
          </div>

          <div className="timeline-child bnjkop" id='orie'>
            <img src={orientation} alt="" />
            <h1 className='child-title'>Orientation</h1>
          </div>

          <div className="timeline-child tc2 down-reverse" id='ar-up'>
            <img className="arrows" src={arrowup} alt="" />
          </div>

          <div className="timeline-child bnjkop" id='eic'>
            <img src={eic} alt="" />
            <h1 className='child-title'>EIC</h1>
          </div>

          <div className="timeline-child tc2 tc3 mid-ar" id='ar-dn'>
            <img className="arrows" src={arrowdown} alt="" />
          </div>

          <div className="timeline-child child-up tc4 bnjkop" id="srj ">
            <img src={srjn} alt="" />
            <h1 className='child-title' id="srj-title">Srijan</h1>
          </div>

          <div className="timeline-child tc2 tc2impo" id='ar-up'>
            <img className="arrows" src={arrowup} alt="" />
          </div>

          <div className="timeline-child tc4 bnjkop" id="emp ">
            <img src={empressario} alt="" />
            <h1 className='child-title'>Empressario</h1>
          </div>

          <div className="timeline-child tc2 tc3 mid-ar" id='ar-dn'>
            <img className="arrows" src={arrowdown} alt="" />
          </div>

          <div className="timeline-child tc4 tc-pre bnjkop" id="prb ">
            <img src={preencu} alt="" />
            <h1 className='child-title preinvunmkj' id="prb-title ">Pre-Incubation</h1>
          </div>
        </div>
        
      </div>
    </div>
  )
}


export default Timeline

