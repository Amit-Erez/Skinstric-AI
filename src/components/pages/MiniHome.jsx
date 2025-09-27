import React from "react";
import "./MiniHome.css";
import iconRight from "../../assets/buttin-icon-right.svg";
import { Link } from "react-router-dom";

const MiniHome = () => {
  return (
    <div className="mini__container">
      <div className="mini__heading">
        <h1>
          Sophisticated
          <br />
          skincare
        </h1>
      </div>
      <div className="mini__para">
        <p>
          Skinstric developed an A.I. that creates a
          <br />
          highly-personalised routine tailored to
          <br />
          what your skin needs.
        </p>
      </div>
      <Link to={"./testing"}>
      <button id="enter__btn">
        <p>ENTER EXPERIENCE</p>
        <img src={iconRight} alt="right icon" className="test__arrow" />
      </button>
      </Link>
    </div>
  );
};

export default MiniHome;
