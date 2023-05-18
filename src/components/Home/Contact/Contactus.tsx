import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import "./Contactus.css";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { FaTelegramPlane } from "react-icons/fa";
const Contactus = () => {
  type FormState = {
    email: string;
    name: string;
    message: string;
  };

  type ServiceMessage = {
    class: string;
    text: string;
  };

  const initialFormState = {
    email: "",
    name: "",
    message: "",
  };

  const [formState, setFormState] = useState<FormState>(initialFormState);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<ServiceMessage>();
  const [recaptchaToken, setRecaptchaToken] = useState<string>();
  const formId = "aVA9w9fy";
  const formSparkUrl = `https://submit-form.com/${formId}`;
  const recaptchakey = "6LetQxwmAAAAALnlzARQmafPqZGe1E9iljemI9CB";
  const recaptchaRef = useRef<any>();

  const updateRecaptchaToken = (token: string | null) => {
    setRecaptchaToken(token as string);
  };

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    await postSubmission();
    setSubmitting(false);
  };

  const postSubmission = async () => {
    const payload = {
      ...formState,
      "g-recaptcha-response": recaptchaToken,
    };

    try {
      const result = await axios.post(formSparkUrl, payload);
      console.log(result);
      setMessage({
        class: "msgclass",
        text: "Thanks, Someone will be in touch with you very soon!",
      });
      setFormState(initialFormState);
      recaptchaRef.current.reset();
    } catch (error) {
      console.log(error);
      setMessage({
        class: "msgclasserror",
        text: "Sorry! Something went wrong. Please try again.",
      });
    }
  };

  const updateFormControl = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    const key = id as keyof FormState;
    const updatedFormState = { ...formState };
    updatedFormState[key] = value;
    setFormState(updatedFormState);
  };

  return (
    <>
      <div className="collab">
        <h1 style={{ userSelect: "none" }}>
          Contact Us <FaTelegramPlane />
        </h1>
      </div>

      <div className="formcontact">
        {message && (
          <div className={`msgtext ${message.class}`}>{message.text}</div>
        )}
        <form onSubmit={submitForm} className="forminclass">
          <div className="childform">
            <label htmlFor="name" className="labeltitle">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={formState.name}
              placeholder="John Doe"
              className="textwriting"
              onChange={updateFormControl}
            />
          </div>

          <div className="childform">
            <label htmlFor="email" className="labeltitle">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="textwriting"
              placeholder="john@doe.com"
              value={formState.email}
              onChange={updateFormControl}
            />
          </div>
          <div className="childform">
            <label htmlFor="message" className="labeltitle">
              Message
            </label>
            <textarea
              id="message"
              required
              onChange={updateFormControl}
              value={formState.message}
              placeholder="Lorem Ipsum...."
              className="textwriting"
            ></textarea>
          </div>

          <div className="captchagugl">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={recaptchakey}
              onChange={updateRecaptchaToken}
            />
          </div>

          <button disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}{" "}
          </button>
        </form>
      </div>
    </>
  );
};

export default Contactus;
