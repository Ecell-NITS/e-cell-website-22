import React, { useRef } from "react";
import './testimonial.css'
import { testimonials } from '../../../Data/TestimonialData';
import quote from '../../../assets/testimonial/Quote.svg'
import {AiOutlineArrowRight, AiOutlineArrowLeft} from 'react-icons/ai'

const Testimonial = () => {
  let testimonHolder = useRef();

  function swipeNext() {
    testimonHolder.current.scrollLeft += (testimonHolder.current.offsetWidth);
  };

  function swipePrev() {
    testimonHolder.current.scrollLeft -= (testimonHolder.current.offsetWidth);
  };

  return (
    <>
      <div className="testi-main">
        <div className="testi-child">
          <div className="collab testi-name-head">
            <h1 style={{ userSelect: 'none' }}>TEST<span className='white-monial'>IMONIALS</span></h1>
          </div>
          <div className="testi-main main-testimonial" ref={testimonHolder}>

            {testimonials.map((item) => {
              return (
               
                  <div className="testi-indi" key={item.id}>
                    <div className="img-testi-holder">
                      <img style={{ userSelect: 'none' }} src={item.img} alt={item.prof} className="testi-img" />
                    </div>
                    <div className="content-testi">
                      <div className="quote">
                        <img style={{ pointerEvents: 'none' }} src={quote} alt="" />
                      </div>

                      <div className="testi-al">
                        <h3 className='testi-al-cont'>{item.content}</h3>
                      </div>

                      <div className="quote quote-rotate">
                        <img style={{ pointerEvents: 'none' }} src={quote} alt="" />
                      </div>

                      <div className="speaker-details-testi">
                        <h1 style={{ userSelect: 'none' }}>{item.prof}</h1>
                        <h2 style={{ userSelect: 'none' }}>{item.post}</h2>
                      </div>
                      <div className="btns">

                        <button className="prev btn-testimonial" onClick={swipePrev}>
                          <AiOutlineArrowLeft className="btn-indi-testimonial" />
                        </button>
                        <button className="next btn-testimonial" onClick={swipeNext}>
                          <AiOutlineArrowRight className="btn-indi-testimonial" />
                        </button>

                      </div>

                    </div>
                  </div>

               
              )
            })}



          </div>
        </div>
      </div>
    </>
  )
}

export default Testimonial