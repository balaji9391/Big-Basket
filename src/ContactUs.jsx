import React, { useState } from "react";
import "./Contact.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ContactUs() {

  const [showThankYou, setShowThankYou] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success(
      "Message sent successfully! 📩",
      { position: "top-right" }
    );

    setShowThankYou(true);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contact-container">

      {showThankYou ? (

        <div className="thankyou-container">

          <img
            src="/images/Thankyou.png"
            alt="Thank You"
            className="thankyou-image"
          />

        </div>

      ) : (

        <div className="contact-card">

          <h1>Contact Us</h1>

          <video
            width="200"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="/videos/contact.mp4"
              type="video/mp4"
            />
          </video>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div className="input-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label>Name</label>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label>Email</label>
            </div>

            <div className="input-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label>Message</label>
            </div>

            <button
              type="submit"
              className="submit-btn"
            >
              Send Message
            </button>

          </form>

        </div>
      )}

      <ToastContainer />

    </div>
  );
}

export default ContactUs;