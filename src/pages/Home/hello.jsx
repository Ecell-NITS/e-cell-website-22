import React from "react";

import "./hello.css";

const Hello = (props) => {
    const options = [
        { text: "questions", handler: props.actions.parseContact, id: 1 },
        { text: "Contact us", handler: () => { }, id: 2 },
    ];

    const optionsMarkup = options.map((option) => (
        <button
            className="learning-option-button"
            key={option.id}
            onClick={option.handler}
        >
            {option.text}
        </button>
    ));

    return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default Hello;