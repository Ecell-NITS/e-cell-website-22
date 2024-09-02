import React, { useRef } from "react";
import "./Sponsor.css";
import { sponsors } from "../../../Data/Sponsor";
export default function Sponsor() {
  let sponsor = useRef();

  return (
    <>
      <div className="sponsor">
        <div className="sponsor-top">
          <h1>
            <span
              style={{
                fontFamily: "Barlow Condensed",
                color: "var(--text-color-primary)",
                fontWeight: "900",
              }}
            >
              SPONSORS
            </span>
          </h1>
        </div>
        <div className="img-parnt" ref={sponsor}>
          {sponsors.map((item) => {
            return (
              <>
                <div className="row">
                  <div className="col" key={item.id}>
                    <img src={item.image} alt="" />
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
