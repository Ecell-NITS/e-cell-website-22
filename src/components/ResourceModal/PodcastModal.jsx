import React from "react";
import "./ResourceModal.css";
import Data from "../../Data/PodcastResorce.json";

function PodcastModal({ dataid }) {
  let imgsrc = "",
    // name = "",
    content = "",
    head = "";
  for (const item of Data) {
    if (item.id === dataid) {
      imgsrc = item.img;
      // name = item.author;
      head = item.head;
      content = item.content;
      break;
    }
  }
  return (
    <>
      <div className="modalCard">
        <div className="profile_Card" key={dataid}>
          <div className="profile_2">
            <div className="img">
              <img src={imgsrc} alt="Profile of author" />
            </div>
          </div>
          <div className="modalRight">
            <div className="modalHead one">{head}</div>
            {/* <div className="authHead two">{name}</div> */}
            <div className="content">{content}</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PodcastModal;
