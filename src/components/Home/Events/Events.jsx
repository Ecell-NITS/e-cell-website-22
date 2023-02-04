import React from "react";
import "./Events.css";
function Events() {
  return (
    <>
      <div className="event_main">
        <div className="collab">
          <h1>EVENTS</h1>
        </div>
        <div className="event_items">
          <div className="ev item1">
            <h1 className="item-head">ORIENTATION</h1>
            <div className="child">
              Entrepreneurship cannot be simply confined to making an idea
              successful; it involves constant hard work, passion and
              perseverance. Its a process involving a person or a group of
              people coming up with innovative ideas, researching, conducting
              surveys, studying the market, and leaving no stone unturned in
              converting his dream into a Million-Dollar Reality by starting
              from scratch.
            </div>
          </div>
          <div className="ev item2">
            <h1 className="item-head">EPRESERRIO</h1>
            <div className="child">
              Empressario is the entrepreneurship module in the annual Techfest
              of NIT Silchar, Tecnoesis where participants showcase their
              entrepreneurial spirit and management skills through different
              business ventures. Various events like “Bech ke Dikhao” “Pitch
              Your Way” “Stock Market Simulation” are organized under this
              module to bring out the true start-up geek in students.
            </div>
          </div>
          <div className=" ev item3">
            <h1 className="item-head">SRIJAN</h1>
            <div className="child">
              Srijan is the flagship event of the Entrepreneurship Cell of NIT
              Silchar, which is an initiative to motivate and educate people
              about entrepreneurship as well as have a community-based learning
              experience with people from varied domains. Numerous events and
              webinars are held whose main motive is to give shape to the
              innovative ideas put forward by all the creative minds.
            </div>
          </div>
          <div className="ev item4 ">
            <h1 className="item-head">INCUBATION</h1>
            <div className="child">
              The Institutional Innovation Cell (IIC) of the Ministry of
              Education, which fosters innovation and entrepreneurship within
              the institution, also powers the E-Cell. The IIC encourages
              networking, honors inventions, and organizes conferences on
              entrepreneurship. It also invites educators and students to
              participate in events organized by the IIC to promote
              entrepreneurship and innovation.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;
