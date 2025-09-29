import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Testing.css";
import iconLeft from "../../assets/buttin-icon-left.svg";
import iconRight from "../../assets/buttin-icon-right.svg";

const Testing = () => {
  const [step, setStep] = useState("name");
  const [user, setUser] = useState({ name: "", location: "" });
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      const msg = `"SUCCESS": "Added ${user.name} from ${user.location}"`;
      setSuccess(msg);
      console.log(msg);
      sendUser();
    }
  }, [user]);

  async function sendUser() {
    try {
      const response = await axios.post(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne",
        user
      );
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error sending user:", error);
    }
  }

  return (
    <section id="testing">
      <div className="start">
        <p>TO START ANALYSIS</p>
      </div>
      <div className="user__form">
        <p>click to type</p>
        {step !== "done" ? (
          <div className="input__box">
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
              type="text"
              value={input}
              onChange={handleChange}
              onKeyDown={UserForm}
              placeholder={
                step === "name" ? "Introduce Yourself" : "your city name"
              }
              autoFocus
            />
          </div>
        ) : (
          <div>
            <h3>Thank you!</h3>
            <p>Proceed for the next step</p>
          </div>
        )}
      </div>
      <button id="back__btn">
        <img src={iconLeft} alt="left icon" className="back__arrow" />
        <p>BACK</p>
      </button>
      <div className="diamond__large"></div>
      <div className="diamond__medium"></div>
      <div className="diamond__small"></div>
    </section>
  );
};

export default Testing;
