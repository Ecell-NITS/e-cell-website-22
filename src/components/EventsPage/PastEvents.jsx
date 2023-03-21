import React, {useRef} from 'react'
import { pastents } from '../../Data/EventsData';
import './Pastevents.css'
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
const PastEvents = () => {

    let pastevntHolder = useRef();

    function fwdNext0go() {
        pastevntHolder.current.scrollLeft += pastevntHolder.current.offsetWidth;
    }

    function backPrev0bk() {
        pastevntHolder.current.scrollLeft -= pastevntHolder.current.offsetWidth;
    }

    return (
        <>
            <div className="upcom-evnts-top pst-evnts-__tyad">
                <h1>Past <span style={{ fontFamily: "Barlow Condensed", color: "#224259", fontWeight: "900" }}>Events</span></h1>
            </div>

            <div className="past-evvnts-parnt " ref={pastevntHolder}>
                {pastents.map((item) => {
                    return (
                        <>
                            <div className="past-evnt-indi" key={item.id}>
                                <div className="img-upcom-evnt">
                                    <img src={item.img}
                                        alt="" />
                                </div>

                                <div className="title-announc-upcom-evnt">
                                    <h1>{item.title}</h1>
                                </div>

                                <div className="dte-locn-upcomi-event">
                                    <h2>{item.date}</h2>
                                </div>

                                <div className="btns-info-klp">
                                    <div className="btns-1-ent-indi">
                                        <button>Research</button>
                                    </div>
                                    <div className="btns-1-ent-indi">
                                        <button>Srijan</button>
                                    </div>
                                </div>

                                <div className="abt-content-indi-evnt">
                                    <h3>{item.content}</h3>
                                </div>
                            </div>
                        </>
                    );
                })}
            </div>

            <div className="btns nmjkop">
                <button className="prev btn-testimonial" onClick={backPrev0bk}>
                    <AiOutlineArrowLeft className="btn-indi-testimonial" />
                </button>
                <button className="next btn-testimonial" onClick={fwdNext0go}>
                    <AiOutlineArrowRight className="btn-indi-testimonial" />
                </button>
            </div>

            <div className="all-evnts-btn-cont">
                <Link to="/allevents"><button>All Events</button></Link>
            </div>
        </>
    )
}

export default PastEvents