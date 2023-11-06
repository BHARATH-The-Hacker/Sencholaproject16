import React, { useState } from "react";
import axios from "axios";
import { API } from "./apiUrl";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    gender: "",
    confirmation: false,
  });

  const [step, setStep] = useState(1);

  const validateStep1 = () => {
    const { name, email, mobileNumber, password } = formData;
    const namePattern = /^[A-Za-z.]+$/;
    const emailPattern = /^[A-Za-z0-9]+@[A-Za-z]+\.com$/;
    const mobilePattern = /^\d{10,12}$/;
    const passwordPattern = /^(?=.*\d{2,})(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (
      namePattern.test(name) &&
      emailPattern.test(email) &&
      mobilePattern.test(mobileNumber) &&
      passwordPattern.test(password)
    ) {
      return true;
    }
    return false;
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
      console.log("Name: ",formData.name)
      console.log("email: ",formData.email)
      console.log("mobileNumber: ",formData.mobileNumber)
      console.log("password: ",formData.password)
    } else {
      alert("Enter all the fields correctly.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 2 && formData.gender) {
      axios.post( API, formData)
        .then((response) => {
          console.log("API Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
        console.log("gender: ",formData.gender);
        console.log("confirmation: ",formData.confirmation);
        setStep(1)
    } else {
      alert("Enter all the fields correctly.");
    };
    setFormData("");
  };

  return (
    <div className="container mt-5 bg-info py-3 px-3 bg-opacity-25 rounded-4" style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
      {step === 1 && (
        <div>
          <h2 className="text-center bg-dark py-2 rounded-pill text-white bg-opacity-50">Sign Up</h2>
          <div className="mb-3 mt-2">
            <label htmlFor="name" className="form-label">
              Name (Characters Only):
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email (example: demo@example.com):
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mobileNumber" className="form-label">
              Mobile Number (10-12 Digits):
            </label>
            <input
              type="tel"
              className="form-control"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password (At least 2 numbers, 1 uppercase,1 lowercase, 1 special character):
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <div className="mt-1">
                <small className="text-dark bg-light px-1 py-1 fw-semibold bg-opacity-25">
                    * Password Must Contain 8 Digits
                </small>
            </div>
          </div>
          <button className="btn btn-primary fw-bold rounded-2 w-100" onClick={handleNextStep}>
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-center bg-dark py-2 rounded-pill text-white bg-opacity-50">Additional Information</h2>
          <div className="mb-3">
            <label className="form-label fw-bold">Gender:</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="male"
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                required
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className=" form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="female"
                value="female"
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="other"
                value="other"
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              />
              <label className="form-check-label" htmlFor="other">
                Other
              </label>
            </div>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="confirmation"
              onChange={(e) => setFormData({ ...formData, confirmation: e.target.checked })}
            />
            <label className="form-check-label fw-semibold" htmlFor="confirmation">
              I confirm the information above provided is correct.
            </label>
          </div>
          <div className="d-flex justify-content-evenly ">
          <button className="btn btn-primary me-2 w-100" onClick={handlePreviousStep}>
            Previous
          </button>
          <button className="btn btn-success w-100" onClick={handleSubmit}>
            Submit
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
