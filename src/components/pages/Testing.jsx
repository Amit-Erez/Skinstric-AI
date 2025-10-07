import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import iconLeft from "../../assets/buttin-icon-left.svg";
import iconRight from "../../assets/buttin-icon-right.svg";
import iconFrame from "../../assets/rect-outer-line.svg";
import { GoDotFill } from "react-icons/go";
import "./Testing.css";

const Testing = () => {
  const [step, setStep] = useState("name");
  const [user, setUser] = useState({ name: "", location: "" });
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const UserForm = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!input.trim()) {
        if (step === "name") {
          setError("Please type your name");
        } else if (step === "city") {
          setError("Please type your city");
        }
        return;
      }

      if (!/^[a-zA-Z\s]*$/.test(input)) {
        if (step === "name") {
          setError(
            "Please enter a valid name without numbers or special characters"
          );
        } else if (step === "city") {
          setError(
            "Please enter a valid city without numbers or special characters"
          );
        }
        return;
      }

      if (step === "name") {
        setUser((prev) => ({ ...prev, name: input }));
        setInput("");
        setStep("city");
        setError("");
      } else if (step === "city") {
        const updatedUser = { ...user, location: input };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setInput("");
        setStep("done");
        setError("");
      }
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (user.name !== "" && user.location !== "") {
      setLoading(true);
      setTimeout(() => {
        sendUser();
      }, 400);
    }
  }, [user]);

  async function sendUser() {
    try {
      const response = await axios.post(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne",
        user
      );
      console.log("Full API Response:", response.data);
    } catch (error) {
      console.error("Error sending user:", error);
    }
    setLoading(false);
    const msg = `"SUCCESS": "Added ${user.name} from ${user.location}"`;
    console.log(msg);
  }

  return (
    <section id="testing">
      <div className="start">
        <p>TO START ANALYSIS</p>
      </div>
      {step !== "done" ? (
        <div className="user__form">
          <p className="prompt">click to type</p>
          <div className="input__box">
            {error && <p className="err__msg">{error}</p>}
            <input
              type="text"
              value={input}
              onChange={handleChange}
              onKeyDown={UserForm}
              placeholder={
                step === "name" ? "Introduce Yourself" : "Your city name"
              }
              autoFocus
            />
          </div>
        </div>
      ) : loading ? (
        <div className="loading__msg">
          <p>Processing submission</p>
          <div className="dots">
            <span className="dot">
              <GoDotFill className="dot__icon" />
            </span>
            <span className="dot">
              <GoDotFill className="dot__icon" />
            </span>
            <span className="dot">
              <GoDotFill className="dot__icon" />
            </span>
          </div>
        </div>
      ) : (
        <div className="proceed__msg">
          <h3>Thank you!</h3>
          <p>Proceed for the next step</p>
        </div>
      )}
      <Link to={"/"}>
        <button id="back__btn">
          <img src={iconLeft} alt="left icon" className="back__arrow" />
          <img src={iconFrame} alt="left icon" className="icon__frameL" />
          <p>BACK</p>
        </button>
      </Link>
      {step === "done" && !loading && (
        <Link to={"/result"}>
          <button id="proceed__btn">
            <p>PROCEED</p>
            <img src={iconRight} alt="right icon" className="proceed__arrow" />
            <img src={iconFrame} alt="left icon" className="icon__frameR" />
          </button>
        </Link>
      )}
      <div className="diamond__wrapper">
        <div className="diamond__large"></div>
        <div className="diamond__medium"></div>
        <div className="diamond__small"></div>
      </div>
    </section>
  );
};

export default Testing;
