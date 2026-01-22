import "../assets/css/style.base.css";
import React from "react";

// import Header from "../components/Header.jsx";
// import Footer from "../components/Footer.jsx";

// import Swal from "sweetalert2";
// import { toast } from "react-toastify";

// import { Dropdown } from "primereact/dropdown";
// import ReCAPTCHA from "react-google-recaptcha";

// import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

// import ApiService from "../services/ApiService";

// const UAE_STATES = [
//   { label: "Abu Dhabi", value: "abu-dhabi" },
//   { label: "Dubai", value: "dubai" },
//   { label: "Sharjah", value: "sharjah" },
//   { label: "Ajman", value: "ajman" },
//   { label: "Umm Al Quwain", value: "umm-al-quwain" },
//   { label: "Ras Al Khaimah", value: "ras-al-khaimah" },
//   { label: "Fujairah", value: "fujairah" }
// ];

const Partner = () => {
  // const { executeRecaptcha } = useGoogleReCaptcha();
  // const [isLoader, setIsLoader] = useState(false);
  // const [files, setFiles] = useState(null);
  // const [recaptchaValue, setRecaptchaValue] = useState(null);

  // const [formData, setFormData] = useState({
  //   owner_name: "",
  //   email: "",
  //   phone: "",
  //   role: "",
  //   contact_name: "",
  //   business_email: "",
  //   business_phone: "",
  //   address: "",
  //   type: "",
  //   message: "",
  //   emirate: "",
  //   document: null,
  //   trade_license: "No",
  //   files: [],
  // });

  // const emptyForm = () => {
  //   setFormData({
  //     owner_name: "",
  //     email: "",
  //     phone: "",
  //     role: "",
  //     contact_name: "",
  //     business_email: "",
  //     business_phone: "",
  //     address: "",
  //     type: "",
  //     message: "",
  //     emirate: "",
  //     document: null,
  //     trade_license: "",
  //     files: [],
  //   });
  //   setFiles(null);
  // };

  // const handleSubmit = async (e) => {
    // e.preventDefault();
    
    // Validate reCAPTCHA
    // if (!recaptchaValue) {
    //   Swal.fire({
    //     icon: "warning",
    //     title: "reCAPTCHA Required",
    //     text: "Please complete the reCAPTCHA verification",
    //     confirmButtonText: "OK",
    //     confirmButtonColor: "#3F85DE",
    //     confirmButtonAriaLabel: "OK",
    //     customClass: {
    //       confirmButton: "swal-confirm-btn"
    //     }
    //   });
    //   return;
    // }
    
    // setIsLoader(true);
    // try {
    //   const formDataToSend = new FormData();

    //   console.log(files);

    //   // Append regular fields
    //   for (const key in formData) {
    //     if (key !== "files") {
    //       formDataToSend.append(key, formData[key]);
    //     }
    //   }
      
      // Append reCAPTCHA value
      // formDataToSend.append("recaptcha", recaptchaValue);

    
      // Append files from dropzone
  //     if (files && files.length > 0) {
  //       files.forEach((file) => {
  //         formDataToSend.append("files[]", file);
  //       });
  //     } else {
  //       formDataToSend.append("files[]", null);
  //     }

  //     const response = await ApiService.request({
  //       method: "POST",
  //       url: "/becomePartner",
  //       data: formDataToSend,
  //        headers: {
  //          "Content-Type": "multipart/form-data",
  //        },
  //     });
     

  //      console.log("Sending data:", formDataToSend);
  //      console.log("Received response:", response.data);

  //      if (response.data.status) {
  //       console.log("API response:", response.data);
  //        Swal.fire({
  //          icon: "success",
  //          title: "Form Submitted!",
  //          text: response.data.message,
  //          confirmButtonText: "OK",
  //          confirmButtonColor: "#3F85DE",
  //          confirmButtonAriaLabel: "OK",
  //          customClass: {
  //            confirmButton: "swal-confirm-btn"
  //          }
  //        });
  //       emptyForm();
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error Occurred!",
  //         text: "Unable to submit contact query. Write email manually to support@lastorder.com",
  //         confirmButtonText: "OK",
  //         confirmButtonColor: "#3F85DE",
  //         confirmButtonAriaLabel: "OK",
  //         customClass: {
  //           confirmButton: "swal-confirm-btn"
  //         }
  //       });
  //       toast.error(response.data.message);
  //      }
  //   } catch (error) {
  //     console.error("Form submission failed:", error);
  //   } finally {
  //     setIsLoader(false);
  //   }
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  return (
    <>
      {/* <div className="privacy-bg from-top">
        <Header background="bg-white" />
        <div className="heading-policy text-center py-5">
          <h1>Become a Partner</h1>
        </div>
      </div>

      <div className="container mt-5">
        <div className="partner-heading">
          <div className="partner-txt">
            <h3>Register your business with GearApp. Fill up the form and our team will get in touch with you.</h3>
            <p> 
            We are Proud of our partners for joining us in our platform.</p>
          </div>

          <div className="container mt-2">
            <form onSubmit={handleSubmit}>
              <div className="d-flex justify-content-center">
                <div className="inquiry-card w-100">
                
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="contact_name"
                        value={formData.contact_name}
                        required
                        onChange={handleChange}
                        style={{ backgroundColor: "#f8f9fb", border: "1px solid #e6e8ef", padding: "12px 16px" }}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone Number"
                        name="phone"
                        value={formData.phone}
                        required
                        onChange={handleChange}
                        style={{ backgroundColor: "#f8f9fb", border: "1px solid #e6e8ef", padding: "12px 16px" }}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Company Name"
                        name="company_name"
                        value={formData.company_name}
                        required
                        onChange={handleChange}
                        style={{ backgroundColor: "#f8f9fb", border: "1px solid #e6e8ef", padding: "12px 16px" }}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        required
                        onChange={handleChange}
                        style={{ backgroundColor: "#f8f9fb", border: "1px solid #e6e8ef", padding: "12px 16px" }}
                      />
                    </div>

                    <div className="col-12">
                      <Dropdown
                        id="uae-states"
                        name="emirate"
                        value={formData.emirate}
                        options={UAE_STATES}
                        placeholder="-- Select Emirate --"
                        className="w-100 form-control form-dropdown"
                        onChange={(e) => setFormData({ ...formData, emirate: e.value })}
                        showClear={false}
                        filter={false}
                      />
                    </div>

                    <div className="col-12">
                      <textarea
                        className="form-control textarea-lg"
                        placeholder={"Tell us about your business and how you'd like to partner with GearApp..."}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        style={{ backgroundColor: "#f8f9fb", border: "1px solid #e6e8ef", padding: "12px 10px" }}
                      />
                    </div>

                    <div className="col-12">
                      <small className="text-muted">
                        By submitting, you agree to our terms & privacy policy.
                      </small>
                    </div>

                    <div className="col-12 d-flex justify-content-end">
                      <button
                        type="submit"
                        className="btn fw-bold px-4 py-2"
                        style={{ 
                          backgroundColor: "#3F85DE", 
                          color: "#000", 
                          borderRadius: "12px",
                          minWidth: "120px",
                          height: "48px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                        disabled={isLoader}
                      >
                        {isLoader ? (
                          <>
                            <div className="spinner-grow me-2" role="status" style={{ width: "1rem", height: "1rem" }}>
                              <span className="sr-only">Submitting</span>
                            </div>
                            Submitting...
                          </>
                        ) : (
                          <>Submit</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div> */}

      {/* Footer */}
      {/* <Footer /> */}
    </>
  );
};

export default Partner;
