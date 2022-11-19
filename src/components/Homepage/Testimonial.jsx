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
                    <Carousel infiniteLoop useKeyboardArrows autoPlay showStatus={false} showIndicators={false} showThumbs={false}>

                        <div className="c1">
                            <div className="person-img"></div>
                            {/* <img className="testi-pic" src="./images/testimonial/sivaji.jpg" alt="" /> */}

                            <div className="person-content">
                                <div className="quote"></div>
                                <div className="main-testi-content">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis quas unde, assumenda fugit pariatur reprehenderit eligendi, alias doloribus ea asperiores aut perspiciatis suscipit saepe, vel architecto veritatis aperiam sint voluptatum rerum sed! Perspiciatis dolor harum fugiat, est voluptate nam labore quibusdam ducimus deleniti explicabo rem quos et velit? Delectus provident sint ipsum nobis commodi officiis, veniam amet quae harum maxime molestias placeat. Ut laudantium obcaecati excepturi nobis quibusdam, reprehenderit facere.
                                </div>

                                <div className="quote quote-rotate"></div>

                                <h1>Prof Sivaji Bandhophaya</h1>
                                <h3>Director, NIT SILCHAR</h3>
                            </div>
                        </div>
                        <div className="c1">
                            <div className="person-img"></div>
                            {/* <img className="testi-pic" src="./images/testimonial/sivaji.jpg" alt="" /> */}
                            <div className="person-content">
                                <div className="quote"></div>
                                <div className="main-testi-content">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, fugit maxime corporis, possimus quam minima itaque sunt eaque ipsa dolore ex soluta quaerat, eius magnam vero tempora nemo nostrum animi iste optio molestias repellendus facere porro blanditiis. Eius esse minus, quam aliquid optio aspernatur corporis modi enim! Asperiores cum quis quo hic, repellat facere aperiam sint. Minima aspernatur porro incidunt, natus placeat, tempora numquam facilis voluptate debitis ut labore et?
                                </div>
                                <div className="quote quote-rotate"></div>
                                <h1>Prof Sivaji Bandhophaya</h1>
                                <h3>Director, NIT SILCHAR</h3>
                            </div>
                        </div>
                        <div className="c1">
                            <div className="person-img"></div>
                            {/* <img className="testi-pic" src="./images/testimonial/sivaji.jpg" alt="" /> */}
                            <div className="person-content">
                                <div className="quote"></div>
                                <div className="main-testi-content">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis itaque explicabo eaque, nisi ad tempora magni a, doloremque vero officiis distinctio est dolores hic! Nemo, accusantium. Error itaque eaque ipsa cumque, aut maiores aspernatur in adipisci quisquam quibusdam est similique ullam officiis qui enim distinctio magnam quae soluta officia? Iusto, perspiciatis asperiores. Iusto accusamus optio iure, error libero ipsum, consequuntur repudiandae, excepturi at quidem accusantium totam. Laborum deserunt fugiat officia!
                                </div>
                                <div className="quote quote-rotate"></div>
                                <h1>Prof Sivaji Bandhophaya</h1>
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