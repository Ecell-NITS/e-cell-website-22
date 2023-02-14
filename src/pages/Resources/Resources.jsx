import React, { useRef } from 'react'
import Footer from '../../components/shared/Footer/Footer'
import NavbarTeam from '../../components/shared/Navbar/NavbarTeam'
import { resourcesdta } from '../../Data/ResourcesData'
import { podcastdata } from '../../Data/ResourcesData'
import './Resources.css';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
const Resources = () => {

    let resourcesHolder = useRef();

    function fwdNext() {
        resourcesHolder.current.scrollLeft += (resourcesHolder.current.offsetWidth);
    };

    function backPrev() {
        resourcesHolder.current.scrollLeft -= (resourcesHolder.current.offsetWidth);
    };

    let podcastHolder = useRef();

    function fwdNext0() {
        podcastHolder.current.scrollLeft += (podcastHolder.current.offsetWidth);
    };

    function backPrev0() {
        podcastHolder.current.scrollLeft -= (podcastHolder.current.offsetWidth);
    };

    return (
        <>
            <NavbarTeam />
            <div className="resources-main">
                <h1>Resources</h1>
            </div>

            <div className="collab">
                <h1 style={{ userSelect: 'none' }} >BOOKS SUMMARY</h1>
            </div>

            <div className="resources-indi" ref={resourcesHolder}>
                {resourcesdta.map((item) => {
                    return (
                        <>
                            <div className="resource-indi" key={item.id}>
                                <div className="img-resour">
                                    <img src={item.img} alt="" />
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
            <div className="btns">
                <button className="prev btn-testimonial" onClick={backPrev}>
                    <AiOutlineArrowLeft className="btn-indi-testimonial" />
                </button>
                <button className="next btn-testimonial" onClick={fwdNext}>
                    <AiOutlineArrowRight className="btn-indi-testimonial" />
                </button>
            </div>

            <div className="collab">
                <h1 style={{ userSelect: 'none' }} >PODCAST SUMMARY</h1>
            </div>
            <div className="resources-indi" ref={podcastHolder}>
                {podcastdata.map((item) => {
                    return (
                        <>
                            <div className="resource-indi hjloq" key={item.id}>
                                <div className="img-resour">
                                    <img src={item.img} alt="" />
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
            <div className="btns">
                <button className="prev btn-testimonial" onClick={backPrev0}>
                    <AiOutlineArrowLeft className="btn-indi-testimonial" />
                </button>
                <button className="next btn-testimonial" onClick={fwdNext0}>
                    <AiOutlineArrowRight className="btn-indi-testimonial" />
                </button>
            </div>
            <Footer />
        </>
    )
}

export default Resources