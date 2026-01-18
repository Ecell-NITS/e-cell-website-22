import React from "react";
import "./PopupQuestions.css";
import UpcomingEvents from "../UpcomingEvents.json";
const PopupQuestions = ({ eventId, onClose, questions = [] }) => {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Questions for Event {eventId}</h2>

        {questions.length > 0 ? (
          <form className="questions-form">
            {questions.map((q, index) => (
              <div key={index} className="question-item">
                <label>{q}</label>
                <input type="text" placeholder="Your answer" />
              </div>
            ))}
            <button type="submit">Submit</button>
          </form>
        ) : (
          <p>No questions for this event.</p>
        )}

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupQuestions;
