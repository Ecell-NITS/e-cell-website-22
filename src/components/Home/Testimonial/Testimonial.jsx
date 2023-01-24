import React from 'react'
import './testimonial.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { testimonials } from '../../../Data/TestimonialData';
import quote from '../../../assets/testimonial/Quote.svg'
const Testimonial = () => {
  return (
    <>
      <div className="testi-main">
        <div className="testi-child">
          <div className="collab testi-name-head">
            <h1>TEST<span className='white-monial'>IMONIALS</span></h1>
          </div>
          <div className="testi-main main-testimonial">

            <Carousel infiniteLoop useKeyboardArrows autoPlay swipeable={false} showStatus={false} showIndicators={false} showThumbs={false} interval={5500} stopOnHover={false}>

              {testimonials.map((item) => {
                return (
                  <>
                    <div className="testi-indi" key={item.id}>
                      <div className="img-testi-holder">
                        <img src={item.img} alt={item.prof} className="testi-img" />
                      </div>
                      <div className="content-testi">
                        <div className="quote">
                          <img style={{pointerEvents:'none'}} src={quote} alt="" />
                        </div>

                        <div className="testi-al">
                          <h3 className='testi-al-cont'>{item.content}</h3>
                        </div>

                        <div className="quote quote-rotate">
                          <img style={{pointerEvents:'none'}} src={quote} alt="" />
                        </div>

                        <div className="speaker-details-testi">
                          <h1>{item.prof}</h1>
                          <h2>{item.post}</h2>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })}
            </Carousel>

          </div>
        </div>
      </div>
    </>
  )
}

export default Testimonial