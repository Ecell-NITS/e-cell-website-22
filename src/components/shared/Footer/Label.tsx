import React from "react";
import './Footer.css'
const Label = (props: { text: string; htmlFor: string; required?: boolean }) => {
  const { text, htmlFor, required } = props;

  return (
    <>
      <label htmlFor="htmlFor"></label>
      <span className="labelformikfrms">{text}</span>
      {required && <span style={{color:'red'}}>*</span>}
    </>
  );
};

export default Label;