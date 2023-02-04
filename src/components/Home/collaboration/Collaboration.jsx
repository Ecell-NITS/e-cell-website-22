import React, { useState } from 'react';
import './Collab.css';
import Rupay from '../collaboration/Rupay';
import Unacademy from '../collaboration/Unacademy';
import Vedantu from '../collaboration/Vedantu';
import CocaCola from '../collaboration/CocaCola';
import Ieee from '../collaboration/Ieee';
import Jantagrp from '../collaboration/Jantagrp';
import Pnb from '../collaboration/Pnb';

import rupay from '../../../assets/collaboration/RuPay Icon.png'
import unacademy from '../../../assets/collaboration/UnacademyIcon.png'
import vedantu from '../../../assets/collaboration/Vedantu Icon.png'
import cocacola from '../../../assets/collaboration/Coca Cola Icon.png'
import ieee from '../../../assets/collaboration/IEEE Icon.png'
import jantagrp from '../../../assets/collaboration/Janta Grp Icon.png'
import pnb from '../../../assets/collaboration/PNB Icon.png'
const Collaboration = () => {
    const [active, setActive] = useState("Rupay");

    // const [grey, setGrey] = useState(false);
    // const handleClick = () => {
    //     setGrey(!grey)
    // };


    return (
        <>
            <div className="collab">
                <h1 style={{ userSelect: 'none' }} >COLLABORATION</h1>
            </div>

            <div className="top-segment">
                <div className="btn-junior">
                    <button className="active btn" onClick={() => setActive("Rupay")}>
                        <img className="ru-collab" src={rupay} alt="Rupay" />
                    </button>
                    <button className="active btn" onClick={() => setActive("Unacademy")}>
                        <img className="ru-collab" src={unacademy} alt="Unacademy" />
                    </button>
                    <button
                        className="active btn"
                        onClick={() => setActive("Vedantu")}
                    >
                        <img className="ru-collab" src={vedantu} alt="Vedantu" />
                    </button>
                    <button
                        className="active btn"
                        onClick={() => setActive("Coca Cola")}
                    >
                        <img className="ru-collab" src={cocacola} alt="Coca cola" />
                    </button>
                    <button
                        className="active btn"
                        onClick={() => setActive("IEEE")}
                    >
                        <img className="ru-collab" src={ieee} alt="IEEE" />
                    </button>
                    <button
                        className="active btn"
                        onClick={() => setActive("Janta group")}
                    >
                        <img className="ru-collab" src={jantagrp} alt="Janta group" />
                    </button>
                    <button
                        className="active btn"
                        onClick={() => setActive("Punjab National Bank")}
                    >
                        <img className="ru-collab" src={pnb} alt="PNB" />
                    </button>
                </div>
                {active === "Rupay" && <Rupay />}
                {active === "Unacademy" && <Unacademy />}
                {active === "Vedantu" && <Vedantu />}
                {active === "Coca Cola" && <CocaCola />}
                {active === "IEEE" && <Ieee />}
                {active === "Janta group" && <Jantagrp />}
                {active === "Punjab National Bank" && <Pnb />}
            </div>
        </>
    )
}

export default Collaboration;