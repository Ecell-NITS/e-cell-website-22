import React from 'react';
import '../css/testimonial.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
const Testimonial = () => {
    return (
        <>
            <div className="testimonial-top"></div>
            <div className="test-m-t">
                <div className="collab test-ti">
                    <h1>TEST</h1>
                    <h1 className='monial'>IMONIALS</h1>
                </div>

                <div className="testimonial-main">
                    <Carousel infiniteLoop useKeyboardArrows autoPlay showStatus={false} showIndicators={false} showThumbs={false} interval={5500} stopOnHover={false}>

                        <div className="c1">
                            <div className="person-img"></div>
                            {/* <img className="testi-pic" src="./images/testimonial/sivaji.jpg" alt="" /> */}

                            <div className="person-content">
                                <div className="quote"></div>
                                <div className="main-testi-content">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, earum voluptatem sequi repellat ratione nostrum, animi dolorem obcaecati consequatur asperiores numquam cumque quo non perspiciatis quidem adipisci ab architecto ipsum quae repellendus. Porro iusto quaerat quidem laudantium culpa incidunt quisquam?
                                </div>

                                <div className="quote quote-rotate"></div>

                                <h1>Prof Sivaji Bandyopadhyay</h1>
                                <h3>Director, NIT SILCHAR</h3>
                            </div>
                        </div>
                        <div className="c1">
                            <div className="person-img"></div>
                            {/* <img className="testi-pic" src="./images/testimonial/sivaji.jpg" alt="" /> */}
                            <div className="person-content">
                                <div className="quote"></div>
                                <div className="main-testi-content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, earum voluptatem sequi repellat ratione nostrum, animi dolorem obcaecati consequatur asperiores numquam cumque quo non perspiciatis quidem adipisci ab architecto ipsum quae repellendus. Porro iusto quaerat quidem laudantium culpa incidunt quisquam?
                                </div>
                                <div className="quote quote-rotate"></div>
                                <h1>Prof Sivaji Bandyopadhyay</h1>
                                <h3>Director, NIT SILCHAR</h3>
                            </div>
                        </div>
                        <div className="c1">
                            <div className="person-img"></div>
                            {/* <img className="testi-pic" src="./images/testimonial/sivaji.jpg" alt="" /> */}
                            <div className="person-content">
                                <div className="quote"></div>
                                <div className="main-testi-content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, earum voluptatem sequi repellat ratione nostrum, animi dolorem obcaecati consequatur asperiores numquam cumque quo non perspiciatis quidem adipisci ab architecto ipsum quae repellendus. Porro iusto quaerat quidem laudantium culpa incidunt quisquam?
                                </div>
                                <div className="quote quote-rotate"></div>
                                <h1>Prof Sivaji Bandyopadhyay</h1>
                                <h3>Director, NIT SILCHAR</h3>
                            </div>
                        </div>
                        {/* <div className="c4"></div> */}
                    </Carousel>
                </div>
            </div>




        </>
    )
}

export default Testimonial