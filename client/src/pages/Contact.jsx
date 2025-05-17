import { useState } from "react";
import axios from "axios";
import "./Contact.css";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/contact", formData);
      setSuccess("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setError(null);
      setTimeout(() => setSuccess(null), 3000); // Clear success message after 3s
    } catch (err) {
      setError("Failed to send message. Please try again.");
      setSuccess(null);
      setTimeout(() => setError(null), 3000); // Clear error message after 3s
    }
  };

  return (
    <div className="contact-body">
      <div className="contact">
        {/* Contact Header */}
        <section className="contact-header">
          <h1>Contact Us</h1>
          <p>We love to hear from you! Reach out to us for any inquiries or support.</p>
        </section>

        {/* Contact Content */}
        <section className="contact-content">
          {/* Contact Form */}
          <div className="contact-form">
            <h2>Send Us a Message</h2>
            {error && <p className="form-error">{error}</p>}
            {success && <p className="form-success">{success}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn-primary">
                Send Message
              </button>
            </form>
          </div>

          {/* Company Details */}
          <div className="company-details">
            <h2>Our Details</h2>
            <div className="details">
              <div className="detail-item">
                <span className="icon">👤</span>
                <p>Owner: Prabakaran</p>
              </div>
              <div className="detail-item">
                <span className="icon">📍</span>
                <p>150 Sathy Road, Kavindapadi, Erode</p>
              </div>
              <div className="detail-item">
                <span className="icon">📞</span>
                <p>+91 9942314140</p>
              </div>
              <div className="detail-item">
                <span className="icon">✉️</span>
                <p>mithunelectricals@gmail.com</p>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="map-section">
          <h2>Our Location</h2>
          <div className="map">
            <iframe
              title="Mithun Electricals Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.6997799760125!2d77.5379543!3d11.429322899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9152998f1c8c3%3A0xa496e13d1d721c54!2sMithun%20Electricals!5e0!3m2!1sen!2sin!4v1739590636244!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Contact;