import React, { useState } from 'react';
import './Collab.css';
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
                <h1 style={{ userSelect: 'none' }} >COLLABORATION</h1>
            </div>

            <div className="top-segment">
                <div className="btn-junior">
                    <button className="active btn" onClick={() => setActive("Rupay")}>
                        <img className="ru-collab" src="https://res.cloudinary.com/dp92qug2f/image/upload/c_scale,w_360,f_auto,fl_lossy/v1676523442/collaboration-ecell/Cubelelo_uzatoe.png" alt="Rupay" />
                    </button>
                    <button className="active btn" onClick={() => setActive("Unacademy")}>
                        <img className="ru-collab " src="https://res.cloudinary.com/dp92qug2f/image/upload/c_scale,w_360,f_auto,fl_lossy/v1676523977/collaboration-ecell/blackmarble-resized_rif9rp.png" alt="Unacademy" />
                    </button>
                    <button
                        className="active btn"
                        onClick={() => setActive("Vedantu")}
                    >
                        <img className="ru-collab" src="https://res.cloudinary.com/dp92qug2f/image/upload/v1676523414/collaboration-ecell/gfg_kdxuqk.png" alt="Vedantu" />
                    </button>
                    <button
                        className="active btn"
                        onClick={() => setActive("Coca Cola")}
                    >
                        <img className="ru-collab" src="https://res.cloudinary.com/dp92qug2f/image/upload/c_scale,w_360,f_auto,fl_lossy/v1676524079/collaboration-ecell/truscholar-resize_hynnkk.png" alt="Coca cola" />
                    </button>
                    <button
                        className="active btn"
                        onClick={() => setActive("IEEE")}
                    >
                        <img className="ru-collab" src="https://res.cloudinary.com/dp92qug2f/image/upload/c_scale,w_360,f_auto,fl_lossy/v1676523422/collaboration-ecell/assamStartUp_scujbx.png" alt="IEEE" />
                    </button>
                    <button
                        className="active btn"
                        onClick={() => setActive("Janta group")}
                    >
                        <img className="ru-collab" src="https://res.cloudinary.com/dp92qug2f/image/upload/c_scale,w_360,f_auto,fl_lossy/v1676524275/collaboration-ecell/Janta_Grp_Icon-resize_pn5zut.png" alt="Janta group" />
                    </button>
                    <button
                        className="active btn"
                        onClick={() => setActive("Punjab National Bank")}
                    >
                        <img className="ru-collab" src="https://res.cloudinary.com/dp92qug2f/image/upload/c_scale,w_360,f_auto,fl_lossy/v1676524279/collaboration-ecell/PNB_Icon-resize_aghkjd.png" alt="PNB" />
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