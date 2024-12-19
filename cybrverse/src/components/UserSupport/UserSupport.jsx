import React, { useState } from "react";
import axios from "axios";
import "./UserSupport.css"; // Import the CSS file

const UserSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatusMessage("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/support", formData);
      if (response.status === 200) {
        setStatusMessage("Will reach you within short span!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatusMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting support query:", error);
      setStatusMessage("Failed to send the message. Please try again later.");
    }
  };

  return (
    <div className="support-page"> {/* Apply the support-page class */}
      <div className="support-container">
        <h2 className="support-title">Support</h2>
        <p className="support-description">If you have any questions or issues, please contact us.</p>
        {statusMessage && <p className="support-status">{statusMessage}</p>}
        <form className="support-form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Subject:
            <input
              type="text"
              name="subject"
              className="form-input"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Message:
            <textarea
              name="message"
              className="form-textarea"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="form-button">
            Send 
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSupport;
