import "../../../assets/css/base.css";
import React, { useState } from "react";
import docFront from "../../../assets/images/document-front.png";
import docBack from "../../../assets/images/document-back.png";

const PersonalDocuments = () => {
  const [activeDocType, setActiveDocType] = useState("emirates_id");

  return (
    <div className="personal-documents-view">
      <div className="personal-documents-header">
        <i className="bi bi-arrow-left"></i>
        <h2>Documents</h2>
      </div>

      <div className="document-type-toggle">
        <label className={`radio-label ${activeDocType === "emirates_id" ? "active" : ""}`}>
          <input
            type="radio"
            name="docType"
            checked={activeDocType === "emirates_id"}
            onChange={() => setActiveDocType("emirates_id")}
          />
          <span className="radio-custom"></span>
          Emirates ID
        </label>
        <label className={`radio-label ${activeDocType === "passport" ? "active" : ""}`}>
          <input
            type="radio"
            name="docType"
            checked={activeDocType === "passport"}
            onChange={() => setActiveDocType("passport")}
          />
          <span className="radio-custom"></span>
          Passport
        </label>
      </div>

      <div className="documents-list">
        {/* Card 1: Identity Document (Emirates ID / Passport) */}
        <div className="document-card double-upload-card">
          <div className="document-card-title-row">
            <h3>{activeDocType === "emirates_id" ? "Emirates ID" : "Passport"}</h3>
          </div>
          <div className="document-split-content">
            {/* Left Side: Front */}
            <div className="document-half">
              <div className="document-half-header">
                <span className="side-label">Front Side</span>
                <span className="expiry-badge">Expired On : 2025/8/15</span>
              </div>
              <div className="document-half-body">
                <img src={docFront} alt="Front Side" className="doc-preview-img" />
                <div className="upload-box">
                  <i className="bi bi-cloud-arrow-up"></i>
                  <span>Upload License</span>
                </div>
              </div>
            </div>
            
            <div className="document-vertical-divider"></div>

            {/* Right Side: Back */}
            <div className="document-half">
              <div className="document-half-header">
                <span className="side-label">Back Side</span>
                <span className="expiry-badge">Expired On : 2025/8/15</span>
              </div>
              <div className="document-half-body">
                <img src={docBack} alt="Back Side" className="doc-preview-img" />
                <div className="upload-box">
                  <i className="bi bi-cloud-arrow-up"></i>
                  <span>Upload License</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Boat License */}
        <div className="document-card boat-license-card">
          <div className="document-card-title-row">
            <h3>Boat License</h3>
            <span className="expiry-badge desktop-only">Expired On : 2025/8/15</span>
          </div>
          <div className="document-flex-content">
            <div className="document-image-section">
              <span className="side-label">Front Side</span>
              <img src={docFront} alt="Front Side" className="doc-preview-img-small" />
            </div>
            
            <div className="document-vertical-divider"></div>
            
            <div className="document-image-section">
              <span className="side-label">Back Side</span>
              <img src={docBack} alt="Back Side" className="doc-preview-img-small" />
            </div>
            
            <div className="document-upload-section">
              <span className="expiry-badge mobile-only">Expired On : 2025/8/15</span>
              <div className="upload-box">
                <i className="bi bi-cloud-arrow-up"></i>
                <span>Upload License</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Eye Test */}
        <div className="document-card eye-test-card">
          <div className="document-card-title-row">
            <h3>Eye Test</h3>
            <span className="expiry-badge desktop-only">Expired On : 2025/8/15</span>
          </div>
          <div className="document-flex-content right-aligned">
             <span className="expiry-badge mobile-only">Expired On : 2025/8/15</span>
             <div className="upload-box">
                <i className="bi bi-cloud-arrow-up"></i>
                <span>Upload License</span>
              </div>
          </div>
        </div>
      </div>

      <div className="save-changes-container">
        <button className="save-changes-btn">Save Changes</button>
      </div>
    </div>
  );
};

export default PersonalDocuments;
