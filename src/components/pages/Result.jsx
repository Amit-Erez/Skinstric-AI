import React, { useRef, useState } from "react";
import "./Result.css";
import smallDmnd from "../../assets/Rectangle 2779.svg";
import medDmnd from "../../assets/Rectangle 2780.svg";
import lrgDmnd from "../../assets/Rectangle 2778.svg";
import camera from "../../assets/camera.svg";
import camline from "../../assets/CamLine.svg";
import gallery from "../../assets/gallery.svg";
import iconLeft from "../../assets/buttin-icon-left.svg";
import iconFrame from "../../assets/rect-outer-line.svg";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import axios from "axios";

const Result = () => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        gallerySend(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  async function gallerySend(imageBase64) {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
        { image: imageBase64 }
      );
      setTimeout(() => {
        setLoading(false)
        console.log("Full API Response:", response.data);
        alert("Image analyzed successfully!");
        window.location.href = "/select";
      }, 600);
    } catch {
      console.error("Error sending photo");
    }
    
  }

  return (
    <section id="result">
      {preview && (
        <div className="preview__box">
          <p>Preview</p>
          <img src={preview} alt="Preview" className="preview__img" />
        </div>
      )}
      <div className="to__start">
        <p>TO START ANALYSIS</p>
      </div>
      <div className="result__container">
        {loading ? (
          <div className="loading__box">
            <div className="preparing__msg">
              <p>Preparing your analysis</p>
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
              <img src={smallDmnd} alt="" className="dmnd small__dmnd" />
              <img src={medDmnd} alt="" className="dmnd med__dmnd" />
              <img src={lrgDmnd} alt="" className="dmnd lrg__dmnd" />
          </div>
        ) : (
          <>
            <div className="leftBox">
              <img src={camera} alt="take photo" className="camera__icon" />
              <img src={smallDmnd} alt="" className="dmnd small__dmnd" />
              <img src={medDmnd} alt="" className="dmnd med__dmnd" />
              <img src={lrgDmnd} alt="" className="dmnd lrg__dmnd" />
              <img src={camline} alt="" className="camline" />
              <div className="cam__text">
                <p>
                  allow A.I.
                  <br />
                  to scan your face
                </p>
              </div>
            </div>
            <div className="rightBox">
              <img
                src={gallery}
                alt="Upload"
                onClick={handleImageClick}
                className="gallery__icon"
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <img src={smallDmnd} alt="" className="dmnd small__dmndR" />
              <img src={medDmnd} alt="" className="dmnd med__dmndR" />
              <img src={lrgDmnd} alt="" className="dmnd lrg__dmndR" />
              <img src={camline} alt="" className="camlineR" />
              <div className="gal__text">
                <p>
                  allow A.I.
                  <br />
                  access gallery
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <Link to={"/testing"}>
        <button id="back__btn">
          <img src={iconLeft} alt="left icon" className="back__arrow" />
          <img src={iconFrame} alt="left icon" className="icon__frameL" />
          <p>BACK</p>
        </button>
      </Link>
    </section>
  );
};

export default Result;
