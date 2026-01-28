import "../../../assets/css/base.css";
import React, { useState, useEffect } from "react";
import ApiService from "../../../services/ApiService";
import { toast } from "react-toastify";
import docFront from "../../../assets/images/document-front.png";
import docBack from "../../../assets/images/document-back.png";

const PersonalDocuments = () => {
  const [activeDocType, setActiveDocType] = useState("emirates_id");
  const [documents, setDocuments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState({});

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await ApiService.get('/getProfile');
      if (response.data.status) {
        setDocuments(response.data.data.user.documents);
        if (response.data.data.user.documents?.document_type) {
            setActiveDocType(response.data.data.user.documents.document_type);
        }
      }
    } catch (error) {
      console.error("Error fetching documents", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  };

  const getFullImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    // Construct storage URL from API URL
    const apiUrl = process.env.REACT_APP_API_URL || "";
    const storageUrl = apiUrl.replace("/api", "/storage");
    
    // Handle case where url might start with /
    const cleanPath = url.startsWith("/") ? url.substring(1) : url;
    
    return `${storageUrl}/${cleanPath}`;
  };

  const handleFileChange = (e, key) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFiles((prev) => ({
        ...prev,
        [key]: e.target.files[0],
      }));
    }
  };

  const triggerUpload = (key) => {
    const input = document.getElementById(`upload-${key}`);
    if (input) input.click();
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("document_type", activeDocType === "emirates_id" ? "emirates_id" : "passport");

    let hasFiles = false;
    
    const appendIfExists = (key) => {
        if (uploadedFiles[key]) {
            formData.append(key, uploadedFiles[key]);
            hasFiles = true;
        }
    };

    // Identity Docs - only append for the active type to avoid confusion
    if (activeDocType === "emirates_id") {
        appendIfExists("emirates_id_front");
        appendIfExists("emirates_id_back");
    } else {
        appendIfExists("passport_front");
        appendIfExists("passport_back");
    }

    // Other Docs
    appendIfExists("boat_license_front");
    appendIfExists("boat_license_back");
    appendIfExists("eye_test");

    if (!hasFiles) {
        toast.info("No new documents to upload.");
        return;
    }

    try {
        setLoading(true);
        const response = await ApiService.post("/uploadDocuments", formData, {
             headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.data.status) {
            toast.success(response.data.message || "Documents uploaded successfully");
            setUploadedFiles({});
            fetchDocuments();
        } else {
            toast.error(response.data.message || "Failed to upload documents");
            setLoading(false);
        }
    } catch (error) {
         console.error("Upload error", error);
         toast.error(error.response?.data?.message || "Error uploading documents");
         setLoading(false);
    }
  };

  const renderDocImage = (key, url, placeholder) => {
    // Check uploaded file first
    if (uploadedFiles[key]) {
        return <img src={URL.createObjectURL(uploadedFiles[key])} alt="Preview" className="doc-preview-img" />;
    }

    const fullUrl = getFullImageUrl(url);
    if (!fullUrl) return <img src={placeholder} alt="Document" className="doc-preview-img" />;
    
    // Check if the URL is a PDF
    if (fullUrl.toLowerCase().endsWith('.pdf')) {
        return (
            <div className="pdf-preview">
                <i className="bi bi-file-earmark-pdf text-danger" style={{ fontSize: '3rem' }}></i>
                <a href={fullUrl} target="_blank" rel="noopener noreferrer" className="d-block mt-2">View PDF</a>
            </div>
        );
    }

    return <img src={fullUrl} alt="Document" className="doc-preview-img" onError={(e) => { e.target.src = placeholder; }} />;
  };
  
  const renderSmallDocImage = (key, url, placeholder) => {
    if (uploadedFiles[key]) {
        return <img src={URL.createObjectURL(uploadedFiles[key])} alt="Preview" className="doc-preview-img-small" />;
    }

    const fullUrl = getFullImageUrl(url);
    if (!fullUrl) return <img src={placeholder} alt="Document" className="doc-preview-img-small" />;
    
     if (fullUrl.toLowerCase().endsWith('.pdf')) {
        return (
            <div className="pdf-preview-small">
                <i className="bi bi-file-earmark-pdf text-danger" style={{ fontSize: '2rem' }}></i>
            </div>
        );
    }
    return <img src={fullUrl} alt="Document" className="doc-preview-img-small" onError={(e) => { e.target.src = placeholder; }} />;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const identityFrontKey = activeDocType === "emirates_id" ? "emirates_id_front" : "passport_front";
  const identityBackKey = activeDocType === "emirates_id" ? "emirates_id_back" : "passport_back";

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
                <span className="expiry-badge">
                    Expired On : {formatDate(activeDocType === "emirates_id" ? documents?.emirates_id_expiry : documents?.passport_expiry)}
                </span>
              </div>
              <div className="document-half-body">
                {renderDocImage(identityFrontKey, activeDocType === "emirates_id" ? documents?.emirates_id_front : documents?.passport_front, docFront)}
                <input type="file" id={`upload-${identityFrontKey}`} hidden onChange={(e) => handleFileChange(e, identityFrontKey)} />
                <div className="upload-box" onClick={() => triggerUpload(identityFrontKey)}>
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
                <span className="expiry-badge">
                    Expired On : {formatDate(activeDocType === "emirates_id" ? documents?.emirates_id_expiry : documents?.passport_expiry)}
                </span>
              </div>
              <div className="document-half-body">
                {renderDocImage(identityBackKey, activeDocType === "emirates_id" ? documents?.emirates_id_back : documents?.passport_back, docBack)}
                <input type="file" id={`upload-${identityBackKey}`} hidden onChange={(e) => handleFileChange(e, identityBackKey)} />
                <div className="upload-box" onClick={() => triggerUpload(identityBackKey)}>
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
            <span className="expiry-badge desktop-only">Expired On : {formatDate(documents?.boat_license_expiry)}</span>
          </div>
          <div className="document-flex-content">
            <div className="document-image-section">
              <span className="side-label">Front Side</span>
              {renderSmallDocImage("boat_license_front", documents?.boat_license_front, docFront)}
              <input type="file" id="upload-boat_license_front" hidden onChange={(e) => handleFileChange(e, "boat_license_front")} />
              <div className="upload-box mt-2" onClick={() => triggerUpload("boat_license_front")} style={{transform: 'scale(0.9)'}}>
                <i className="bi bi-cloud-arrow-up"></i>
                <span>Upload</span>
              </div>
            </div>
            
            <div className="document-vertical-divider"></div>
            
            <div className="document-image-section">
              <span className="side-label">Back Side</span>
              {renderSmallDocImage("boat_license_back", documents?.boat_license_back, docBack)}
              <input type="file" id="upload-boat_license_back" hidden onChange={(e) => handleFileChange(e, "boat_license_back")} />
              <div className="upload-box mt-2" onClick={() => triggerUpload("boat_license_back")} style={{transform: 'scale(0.9)'}}>
                <i className="bi bi-cloud-arrow-up"></i>
                <span>Upload</span>
              </div>
            </div>
            
            {/* Kept only for mobile expiry display if needed, but removing the redundant upload box */}
            <div className="document-upload-section d-md-none">
              <span className="expiry-badge mobile-only">Expired On : {formatDate(documents?.boat_license_expiry)}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Eye Test */}
        <div className="document-card eye-test-card">
          <div className="document-card-title-row">
            <h3>Eye Test</h3>
            <span className="expiry-badge desktop-only">Expired On : {formatDate(documents?.eye_test_expiry)}</span>
          </div>
          <div className="document-flex-content right-aligned">
             <span className="expiry-badge mobile-only">Expired On : {formatDate(documents?.eye_test_expiry)}</span>
             <div className="me-3">
                 {renderSmallDocImage("eye_test", documents?.eye_test, docFront)}
             </div>
             <input type="file" id="upload-eye_test" hidden onChange={(e) => handleFileChange(e, "eye_test")} />
             <div className="upload-box" onClick={() => triggerUpload("eye_test")}>
                <i className="bi bi-cloud-arrow-up"></i>
                <span>Upload License</span>
              </div>
          </div>
        </div>
      </div>

      <div className="save-changes-container">
        <button className="save-changes-btn" onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  );
};

export default PersonalDocuments;
