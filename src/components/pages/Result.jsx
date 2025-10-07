import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Result.css";
import smallDmnd from "../../assets/Rectangle 2779.svg";
import medDmnd from "../../assets/Rectangle 2780.svg";
import lrgDmnd from "../../assets/Rectangle 2778.svg";
import camera from "../../assets/camera.svg";
import camline from "../../assets/CamLine.svg";
import gallery from "../../assets/gallery.svg";
import iconLeft from "../../assets/buttin-icon-left.svg";
import iconFrame from "../../assets/rect-outer-line.svg";
import camTake from "../../assets/camTakeIcon.svg";
import { GoDotFill } from "react-icons/go";

const Result = () => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preparing, setPreparing] = useState();

  const [showPermission, setShowPermission] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);

  const startCamera = async () => {
    setPreparing(true);
    try {
      console.log("Requesting camera access...");
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: "user",
        },
      });
      console.log("Camera stream obtained:", newStream);
      setStream(newStream);
      setTimeout(() => {
        setCameraActive(true);
        setPreparing(false);
      }, 2000);
    } catch (err) {
      console.error("Camera error:", err.name, err.message);
    }
  };

  useEffect(() => {
    if (cameraActive && videoRef.current && stream) {
      console.log("Stream attached to video element");
      videoRef.current.srcObject = stream;
    }
  }, [cameraActive, stream]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [stream]);

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);
    const base64 = canvas.toDataURL("image/png");
    setCapturedImage(base64);

    setTimeout(() => {
    const stream = video.srcObject;
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
    }
    video.pause();
    }, 100);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const usePhoto = () => {
    setCameraActive(false);
    setPreparing(true);
    gallerySend(capturedImage);
  };

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
      const object = response.data;
      console.log("Full API Response:", object);
      localStorage.setItem("analysis", JSON.stringify(object));
      alert("Image analyzed successfully!");
      window.location.href = "/select";
    } catch {
      console.error("Error sending photo");
      setLoading(false);
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
        ) : preparing ? (
          <>
            <div className="leftBox prep">
              <img
                src={camera}
                alt="take photo"
                className="camera__icon preparing"
                onClick={() => setShowPermission(true)}
              />
              <img src={smallDmnd} alt="" className="dmnd small__dmnd" />
              <img src={medDmnd} alt="" className="dmnd med__dmnd" />
              <img src={lrgDmnd} alt="" className="dmnd lrg__dmnd" />
              <div className="setting__text">
                <p>Setting up camera ...</p>
              </div>
            </div>
            <div className="camera__text prep">
              <p className="camera__text--para">
                TO GET BETTER RESULTS MAKE SURE TO HAVE
              </p>
              <div className="camera__text--list">
                <p className="list__p1">◇ NEUTRAL EXPRESSION</p>
                <p className="list__p2">◇ FRONTAL POSE</p>
                <p>◇ ADEQUATE LIGHTING</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="leftBox">
              <img
                src={camera}
                alt="take photo"
                className="camera__icon"
                onClick={() => setShowPermission(true)}
              />
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
            {showPermission && (
              <div className="cam__perm">
                <div className="cam__perm--container">
                  <h2>Allow A.I. to access your camera</h2>
                  <div className="cam__buttons">
                    <button
                      className="deny__btn"
                      onClick={() => setShowPermission(false)}
                    >
                      Deny
                    </button>
                    <button
                      className="allow__btn"
                      onClick={() => {
                        startCamera();
                        setShowPermission(false);
                      }}
                    >
                      Allow
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className={showPermission ? "rightBox faded" : "rightBox"}>
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
      <Link to={cameraActive ? "/result" : "/testing"}>
        <button
          id="back__btn"
          className={cameraActive ? "white__btn" : ""}
          onClick={() => {
            setCameraActive(false);
          }}
        >
          <img src={iconLeft} alt="left icon" className="back__arrow" />
          <img src={iconFrame} alt="left icon" className="icon__frameL" />
          <p>BACK</p>
        </button>
      </Link>
      {cameraActive && (
        <div className="camera__fullscreen">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="camera__video"
            onLoadedMetadata={() => console.log("Video metadata loaded")}
            onPlay={() => console.log("Video playing")}
          />
          {!capturedImage ? (
            <>
              <div className="camera__overlay">
                <div className="camera__text">
                  <p className="camera__text--para">
                    TO GET BETTER RESULTS MAKE SURE TO HAVE
                  </p>
                  <div className="camera__text--list">
                    <p className="list__p1">◇ NEUTRAL EXPRESSION</p>
                    <p className="list__p2">◇ FRONTAL POSE</p>
                    <p>◇ ADEQUATE LIGHTING</p>
                  </div>
                </div>
                <div className="capture__btn" onClick={capturePhoto}>
                  <p>Take Picture</p>
                  <img
                    src={camTake}
                    alt="take picture"
                    className="camTake__icon"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <img
                src={capturedImage}
                alt="Captured"
                className="captured__image"
              />
              <div className="greatshot">Great Shot!</div>
              <div className="camera__overlay prev">
                <div className="preview__controls">
                  <button className="retake__btn" onClick={retakePhoto}>
                    Retake
                  </button>
                  <button className="use__btn" onClick={usePhoto}>
                    Use This Photo
                  </button>
                </div>
                <p className="camera__text prev">Preview</p>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default Result;
