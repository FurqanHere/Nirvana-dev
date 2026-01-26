import "../assets/css/base.css";
import React from "react";

const PersonalDetail = ({
  personalDetails,
  personalDetailsErrors,
  onChangePersonalDetails,
  onOpenAgreement,
  onContinue,
}) => {
  return (
    <div className="details-section personal-details-screen">
      <h2 className="details-heading">Personal Details &amp; Agreement</h2>
      <div className="details-content-wrapper">
        <div className="details-card">
          <div className="details-row">
            <div className="details-field">
              <label>
                Full Name <span className="required-asterisk">*</span>
              </label>
              <input
                value={personalDetails.fullName}
                onChange={(e) =>
                  onChangePersonalDetails({
                    ...personalDetails,
                    fullName: e.target.value,
                  })
                }
                className={personalDetailsErrors.fullName ? "error" : ""}
              />
              {personalDetailsErrors.fullName && (
                <span className="error-message">
                  {personalDetailsErrors.fullName}
                </span>
              )}
            </div>
            <div className="details-field">
              <label>
                Email <span className="required-asterisk">*</span>
              </label>
              <input
                value={personalDetails.email}
                onChange={(e) =>
                  onChangePersonalDetails({
                    ...personalDetails,
                    email: e.target.value,
                  })
                }
                className={personalDetailsErrors.email ? "error" : ""}
              />
              {personalDetailsErrors.email && (
                <span className="error-message">
                  {personalDetailsErrors.email}
                </span>
              )}
            </div>
          </div>
          <div className="details-row">
            <div className="details-field">
              <label>
                Phone Number <span className="required-asterisk">*</span>
              </label>
              <input
                value={personalDetails.phone}
                onChange={(e) =>
                  onChangePersonalDetails({
                    ...personalDetails,
                    phone: e.target.value,
                  })
                }
                className={personalDetailsErrors.phone ? "error" : ""}
              />
              {personalDetailsErrors.phone && (
                <span className="error-message">
                  {personalDetailsErrors.phone}
                </span>
              )}
            </div>
          </div>
          <div className="details-row">
            <div className="details-field">
              <label>
                Nationality <span className="required-asterisk">*</span>
              </label>
              <input
                value={personalDetails.nationality}
                onChange={(e) =>
                  onChangePersonalDetails({
                    ...personalDetails,
                    nationality: e.target.value,
                  })
                }
                className={personalDetailsErrors.nationality ? "error" : ""}
              />
              {personalDetailsErrors.nationality && (
                <span className="error-message">
                  {personalDetailsErrors.nationality}
                </span>
              )}
            </div>
            <div className="details-field">
              <label>
                Emirates ID <span className="required-asterisk">*</span>
              </label>
              <input
                value={personalDetails.emiratesId}
                onChange={(e) =>
                  onChangePersonalDetails({
                    ...personalDetails,
                    emiratesId: e.target.value,
                  })
                }
                className={personalDetailsErrors.emiratesId ? "error" : ""}
                placeholder="784-xxxx-xxxxxxx-x"
              />
              {personalDetailsErrors.emiratesId && (
                <span className="error-message">
                  {personalDetailsErrors.emiratesId}
                </span>
              )}
            </div>
          </div>
          <div className="details-row">
            <div className="details-field">
              <label>
                Passport <span className="required-asterisk">*</span>
              </label>
              <input
                value={personalDetails.passport}
                onChange={(e) =>
                  onChangePersonalDetails({
                    ...personalDetails,
                    passport: e.target.value,
                  })
                }
                className={personalDetailsErrors.passport ? "error" : ""}
              />
              {personalDetailsErrors.passport && (
                <span className="error-message">
                  {personalDetailsErrors.passport}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="details-actions sign-agreement">
        <button className="details-btn primary" onClick={onOpenAgreement}>
          Sign Agreement
        </button>
        {/* <button
          type="button"
          className="details-btn secondary"
          onClick={onContinue}
        >
          Continue
        </button> */}
      </div>
    </div>
  );
};

export default PersonalDetail;

