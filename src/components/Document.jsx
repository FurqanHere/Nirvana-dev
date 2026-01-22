import "../assets/css/style.base.css";
import React from "react";
import documentFrontImg from "../assets/images/document-front.png";
import documentBackImg from "../assets/images/document-back.png";
import uploadImg from "../assets/images/upload.png";
import personImg from "../assets/images/person-img.png";
import cameraImg from "../assets/images/camera-img.png";

const Document = ({
  selectedDocType,
  onChangeDocType,
  onClickDetail,
  onClickSubmit,
}) => {
  return (
    <div className="document-page-container">
      {/* Hero Section */}
      <div 
        className="document-hero-section"
      >
        <h1 className="document-hero-title">Documents</h1>
      </div>

      <div className="document-upload-view">
        {/* Profile Section */}
      <div className="profile-upload-section">
        <div className="profile-upload-icon">
          <img
            src={personImg}
            alt="Person"
            className="profile-person-img"
          />
          <img
            src={cameraImg}
            alt="Camera"
            className="profile-camera-img"
          />
        </div>
        <p className="profile-upload-text">Upload Profile Image</p>
      </div>

      {/* Document Type Radio Buttons */}
      <div className="doc-radio-row">
        <label className="doc-radio-label">
          <input
            type="radio"
            name="docType"
            checked={selectedDocType === "emiratesId"}
            onChange={() => onChangeDocType("emiratesId")}
          />
          <span className="doc-radio-custom"></span>
          <span className="doc-radio-text">Emirates ID</span>
        </label>
        <label className="doc-radio-label">
          <input
            type="radio"
            name="docType"
            checked={selectedDocType === "passport"}
            onChange={() => onChangeDocType("passport")}
          />
          <span className="doc-radio-custom"></span>
          <span className="doc-radio-text">Passport</span>
        </label>
      </div>

      {/* Cards Container */}
      <div className="doc-cards-container">
        
        {/* Card 1: Identity (Emirates ID / Passport) */}
        <div className="doc-card">
          <h3 className="doc-card-title">
            {selectedDocType === "emiratesId" ? "Emirates ID" : "Passport"}
          </h3>
          <div className="doc-card-split">
            {/* Front Side */}
            <div className="doc-card-side">
              <p className="doc-side-label">Front Side</p>
              <div className="doc-upload-row">
                <div className="doc-preview-container">
                   <img src={documentFrontImg} alt="Front Side" className="doc-preview-img" />
                </div>
                <div className="doc-upload-box">
                  <img src={uploadImg} alt="Upload" className="doc-upload-icon-small" />
                  <span className="doc-upload-text-small">Upload License</span>
                </div>
              </div>
            </div>
            
            <div className="doc-vertical-divider"></div>

            {/* Back Side */}
            <div className="doc-card-side">
              <p className="doc-side-label">Back Side</p>
              <div className="doc-upload-row">
                <div className="doc-preview-container">
                   <img src={documentBackImg} alt="Back Side" className="doc-preview-img" />
                </div>
                <div className="doc-upload-box">
                  <img src={uploadImg} alt="Upload" className="doc-upload-icon-small" />
                  <span className="doc-upload-text-small">Upload License</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Boat License */}
        <div className="doc-card">
          <h3 className="doc-card-title">Boat License</h3>
          <div className="doc-card-split">
            {/* Front Side */}
            <div className="doc-card-side">
              <p className="doc-side-label">Front Side</p>
              <div className="doc-upload-row">
                <div className="doc-preview-container">
                   <img src={documentFrontImg} alt="Front Side" className="doc-preview-img" />
                </div>
                <div className="doc-upload-box">
                  <img src={uploadImg} alt="Upload" className="doc-upload-icon-small" />
                  <span className="doc-upload-text-small">Upload License</span>
                </div>
              </div>
            </div>
            
            <div className="doc-vertical-divider"></div>

            {/* Back Side */}
            <div className="doc-card-side">
              <p className="doc-side-label">Back Side</p>
              <div className="doc-upload-row">
                <div className="doc-preview-container">
                   <img src={documentBackImg} alt="Back Side" className="doc-preview-img" />
                </div>
                <div className="doc-upload-box">
                  <img src={uploadImg} alt="Upload" className="doc-upload-icon-small" />
                  <span className="doc-upload-text-small">Upload License</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Eye Test */}
        <div className="doc-card">
          <h3 className="doc-card-title">Eye Test</h3>
          <div className="doc-card-single">
             <div className="doc-upload-box doc-upload-box-right">
                <img src={uploadImg} alt="Upload" className="doc-upload-icon-small" />
                <span className="doc-upload-text-small">Upload License</span>
             </div>
          </div>
        </div>

      </div>

      <div className="doc-submit-container">
        <button
          type="button"
          className="doc-submit-btn"
          onClick={onClickSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  </div>
  );
};

export default Document;
