import React, { useState } from 'react';
import '../css/Collab.css';
import Rupay from '../collaboration/Rupay';
import Unacademy from '../collaboration/Unacademy';
import Vedantu from '../collaboration/Vedantu';
import CocaCola from '../collaboration/CocaCola';
import Ieee from '../collaboration/Ieee';
import Jantagrp from '../collaboration/Jantagrp';
import Pnb from '../collaboration/Pnb';
const Collaboration = () => {
    const [active, setActive] = useState("Rupay");

    // const [grey, setGrey] = useState(false);
    // const handleClick = () => {
    //     setGrey(!grey)
    // };


    return (
        <>
            <div className="collab">
                <h1>COLLABORATION</h1>
            </div>

            <div className="top-segment">
                <div className="btn-junior">
                    <button className="active btn" onClick={() => setActive("Rupay")}>
                        <img className="ru-collab" src="./images/collaboration/RuPay Icon.png" alt="Rupay" />
                    </button>
                    <button className="active btn" onClick={() => setActive("Unacademy")}>
                        <img className="ru-collab" src="./images/collaboration/UnacademyIcon.png" alt="Unacademy" />
                    </button>
                    <button
                        className="active btn"
                        onClick={() => setActive("Vedantu")}
                    >
                        <img className="ru-collab" src="./images/collaboration/Vedantu Icon.png" alt="Vedantu" />
                    </button>
                    <button
                        className="active btn"
                        onClick={() => setActive("Coca Cola")}
                    >
                        <img className="ru-collab" src="./images/collaboration/Coca Cola Icon.png" alt="Coca Cola" />
                    </button>
                    <button
                        className="active btn"
                        onClick={() => setActive("IEEE")}
                    >
                        <img className="ru-collab" src="./images/collaboration/IEEE Icon.png" alt="IEEE" />
                    </button>
                    <button
                        className="active btn"
                        onClick={() => setActive("Janta group")}
                    >
                        <img className="ru-collab" src="./images/collaboration/Janta Grp Icon.png" alt="Janta group" />
                    </button>
                    <button
                        className="active btn"
                        onClick={() => setActive("Punjab National Bank")}
                    >
                        <img className="ru-collab" src="./images/collaboration/PNB Icon.png" alt="PNB" />
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