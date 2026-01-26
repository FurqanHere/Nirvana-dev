import "../assets/css/base.css";
import React, { useRef } from "react";
import documentFrontImg from "../assets/images/document-front.png";
import documentBackImg from "../assets/images/document-back.png";
import uploadImg from "../assets/images/upload.png";
import personImg from "../assets/images/person-img.png";
import cameraImg from "../assets/images/camera-img.png";

const FileUploader = ({ fileKey, onFileChange, children, className }) => {
  const inputRef = useRef(null);

  const handleClick = (e) => {
      e.stopPropagation(); 
      inputRef.current.click();
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(fileKey, e.target.files[0]);
    }
  };

  return (
    <div className={className} onClick={handleClick} style={{ cursor: "pointer" }}>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleChange}
        accept="image/*,.pdf"
      />
      {children}
    </div>
  );
};

const Document = ({
  selectedDocType,
  onChangeDocType,
  onClickDetail,
  onClickSubmit,
  uploadedFiles = {},
  onFileChange = () => {},
}) => {
  
  const getPreview = (file) => {
      return file ? URL.createObjectURL(file) : null;
  };

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
        <FileUploader 
            fileKey="profileImage" 
            onFileChange={onFileChange} 
            className="profile-upload-section"
        >
            <div className="profile-upload-icon">
              <img
                src={getPreview(uploadedFiles.profileImage) || personImg}
                alt="Person"
                className="profile-person-img"
                style={uploadedFiles.profileImage ? { borderRadius: "50%", objectFit: "cover" } : {}}
              />
              <img
                src={cameraImg}
                alt="Camera"
                className="profile-camera-img"
              />
            </div>
            <p className="profile-upload-text">Upload Profile Image</p>
        </FileUploader>

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
              <FileUploader 
                fileKey={selectedDocType === "emiratesId" ? "emiratesIdFront" : "passportFront"}
                onFileChange={onFileChange}
                className="doc-upload-row"
              >
                <div className="doc-preview-container">
                   <img 
                     src={getPreview(uploadedFiles[selectedDocType === "emiratesId" ? "emiratesIdFront" : "passportFront"]) || documentFrontImg} 
                     alt="Front Side" 
                     className="doc-preview-img"
                     style={uploadedFiles[selectedDocType === "emiratesId" ? "emiratesIdFront" : "passportFront"] ? { objectFit: "cover" } : {}} 
                   />
                </div>
                <div className="doc-upload-box">
                  <img src={uploadImg} alt="Upload" className="doc-upload-icon-small" />
                  <span className="doc-upload-text-small">Upload Image</span>
                </div>
              </FileUploader>
            </div>
            
            <div className="doc-vertical-divider"></div>

            {/* Back Side */}
            <div className="doc-card-side">
              <p className="doc-side-label">Back Side</p>
              <FileUploader 
                fileKey={selectedDocType === "emiratesId" ? "emiratesIdBack" : "passportBack"}
                onFileChange={onFileChange}
                className="doc-upload-row"
              >
                <div className="doc-preview-container">
                   <img 
                     src={getPreview(uploadedFiles[selectedDocType === "emiratesId" ? "emiratesIdBack" : "passportBack"]) || documentBackImg} 
                     alt="Back Side" 
                     className="doc-preview-img" 
                     style={uploadedFiles[selectedDocType === "emiratesId" ? "emiratesIdBack" : "passportBack"] ? { objectFit: "cover" } : {}}
                   />
                </div>
                <div className="doc-upload-box">
                  <img src={uploadImg} alt="Upload" className="doc-upload-icon-small" />
                  <span className="doc-upload-text-small">Upload Image</span>
                </div>
              </FileUploader>
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
              <FileUploader 
                fileKey="boatLicenseFront"
                onFileChange={onFileChange}
                className="doc-upload-row"
              >
                <div className="doc-preview-container">
                   <img 
                     src={getPreview(uploadedFiles.boatLicenseFront) || documentFrontImg} 
                     alt="Front Side" 
                     className="doc-preview-img"
                     style={uploadedFiles.boatLicenseFront ? { objectFit: "cover" } : {}} 
                   />
                </div>
                <div className="doc-upload-box">
                  <img src={uploadImg} alt="Upload" className="doc-upload-icon-small" />
                  <span className="doc-upload-text-small">Upload License</span>
                </div>
              </FileUploader>
            </div>
            
            <div className="doc-vertical-divider"></div>

            {/* Back Side */}
            <div className="doc-card-side">
              <p className="doc-side-label">Back Side</p>
              <FileUploader 
                fileKey="boatLicenseBack"
                onFileChange={onFileChange}
                className="doc-upload-row"
              >
                <div className="doc-preview-container">
                   <img 
                     src={getPreview(uploadedFiles.boatLicenseBack) || documentBackImg} 
                     alt="Back Side" 
                     className="doc-preview-img"
                     style={uploadedFiles.boatLicenseBack ? { objectFit: "cover" } : {}} 
                   />
                </div>
                <div className="doc-upload-box">
                  <img src={uploadImg} alt="Upload" className="doc-upload-icon-small" />
                  <span className="doc-upload-text-small">Upload License</span>
                </div>
              </FileUploader>
            </div>
          </div>
        </div>

        {/* Card 3: Eye Test */}
        <div className="doc-card">
          <h3 className="doc-card-title">Eye Test</h3>
          <div className="doc-card-single">
             <FileUploader 
                fileKey="eyeTest"
                onFileChange={onFileChange}
                className="doc-upload-box doc-upload-box-right"
             >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', flexDirection: 'column' }}>
                    {uploadedFiles.eyeTest ? (
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ margin: 0, fontSize: '14px', color: '#4caf50' }}>File Selected</p>
                            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{uploadedFiles.eyeTest.name}</p>
                        </div>
                    ) : (
                        <>
                            <img src={uploadImg} alt="Upload" className="doc-upload-icon-small" />
                            <span className="doc-upload-text-small">Upload Document</span>
                        </>
                    )}
                </div>
             </FileUploader>
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
