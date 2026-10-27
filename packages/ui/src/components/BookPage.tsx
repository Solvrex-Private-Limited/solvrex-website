"use client";

import { useState } from "react";
import { C } from "../lib/theme";

export function BookPage() {
  const [selectedService, setSelectedService] = useState<string>("Career Services");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const services = ["Career Services", "Business Enablement", "Technology Consulting"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ selectedService, ...formData });
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        html, body {
          margin: 0;
          padding: 0;
        }

        .sx-book-page-wrapper {
          min-height: 100vh;
          background: ${C.bg};
          padding: clamp(40px, 6vw, 80px) clamp(20px, 4vw, 60px);
          position: relative;
          overflow: hidden;
        }

        /* Decorative Bubbles */
        .sx-book-bubble {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6), rgba(37, 99, 235, 0.08));
          pointer-events: none;
        }

        .sx-book-bubble-1 {
          width: 200px;
          height: 200px;
          top: -50px;
          left: -80px;
          opacity: 0.4;
        }

        .sx-book-bubble-2 {
          width: 300px;
          height: 300px;
          bottom: -100px;
          right: -120px;
          opacity: 0.3;
        }



        /* Main Content */
        .sx-book-container {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .sx-book-header-section {
          text-align: center;
          margin-bottom: clamp(40px, 6vw, 80px);
        }

        .sx-book-eyebrow {
          font-size: 12px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #2563eb;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .sx-book-title {
          font-family: "Inter", system-ui, sans-serif;
          font-size: clamp(38px, 7vw, 56px);
          line-height: 1.2;
          color: ${C.text};
          margin: 0;
          font-weight: 300;
          letter-spacing: -0.02em;
        }

        .sx-book-title em {
          font-style: italic;
          color: #2563eb;
        }

        .sx-book-subtitle {
          font-size: 15px;
          color: ${C.textMuted};
          margin: 16px 0 0;
          line-height: 1.6;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Steps */
        .sx-book-steps {
          display: flex;
          justify-content: center;
          gap: clamp(30px, 5vw, 60px);
          margin: clamp(40px, 6vw, 70px) 0;
          flex-wrap: wrap;
        }

        .sx-book-step {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          font-weight: 500;
          color: ${C.textMuted};
        }

        .sx-book-step-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #2563eb;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
        }

        .sx-book-step:first-child .sx-book-step-number {
          background: #2563eb;
          color: #fff;
        }

        .sx-book-step:not(:first-child) .sx-book-step-number {
          background: transparent;
          border: 1.5px solid ${C.border};
          color: ${C.textMuted};
        }

        /* Form Card */
        .sx-book-form-card {
          background: #fff;
          border-radius: 24px;
          padding: clamp(40px, 6vw, 60px);
          box-shadow: 0 20px 60px rgba(37, 99, 235, 0.08);
        }

        /* Service Selection */
        .sx-book-service-group {
          margin-bottom: clamp(40px, 5vw, 50px);
        }

        .sx-book-service-label {
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${C.textMuted};
          font-weight: 700;
          margin-bottom: 16px;
          display: block;
        }

        .sx-book-service-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .sx-book-service-btn {
          padding: 12px 24px;
          border: 1.5px solid ${C.border};
          border-radius: 999px;
          background: transparent;
          color: ${C.text};
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .sx-book-service-btn:hover {
          border-color: #2563eb;
          color: #2563eb;
        }

        .sx-book-service-btn.active {
          background: #2563eb;
          color: #fff;
          border-color: #2563eb;
        }

        /* Form Fields */
        .sx-book-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        @media (max-width: 600px) {
          .sx-book-form-grid {
            grid-template-columns: 1fr;
          }
        }

        .sx-book-form-group {
          display: flex;
          flex-direction: column;
        }

        .sx-book-form-group.full {
          grid-column: 1 / -1;
        }

        .sx-book-form-label {
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${C.textMuted};
          font-weight: 700;
          margin-bottom: 10px;
        }

        .sx-book-form-input,
        .sx-book-form-textarea {
          padding: 14px 16px;
          border: 1.5px solid ${C.border};
          border-radius: 12px;
          font-size: 14px;
          font-family: inherit;
          color: ${C.text};
          background: ${C.bg === "#ffffff" ? "#f9fafb" : C.bg};
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .sx-book-form-input::placeholder,
        .sx-book-form-textarea::placeholder {
          color: ${C.textMuted};
        }

        .sx-book-form-input:focus,
        .sx-book-form-textarea:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }

        .sx-book-form-textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.6;
        }

        /* Submit Button */
        .sx-book-submit {
          background: #2563eb;
          color: #fff;
          border: none;
          padding: 14px 40px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 0 auto;
          margin-top: clamp(30px, 4vw, 40px);
        }

        .sx-book-submit:hover {
          background: #1e40af;
          box-shadow: 0 12px 30px rgba(37, 99, 235, 0.3);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .sx-book-nav {
            display: none;
          }

          .sx-book-form-card {
            padding: 30px 20px;
          }

          .sx-book-steps {
            gap: 15px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <div className="sx-book-page-wrapper">
        {/* Decorative Bubbles */}
        <div className="sx-book-bubble sx-book-bubble-1" />
        <div className="sx-book-bubble sx-book-bubble-2" />

        {/* Main Container */}
        <div className="sx-book-container">
          {/* Header Section */}
          <div className="sx-book-header-section">
            <div className="sx-book-eyebrow">Book a Consultation</div>
            <h1 className="sx-book-title">
              Let's find your <em>next step.</em>
            </h1>
            <p className="sx-book-subtitle">
              A real human reviews your situation before we talk. No pressure, no obligation.
            </p>
          </div>

          {/* Steps */}
          <div className="sx-book-steps">
            <div className="sx-book-step">
              <div className="sx-book-step-number">1</div>
              <span>Topic</span>
            </div>
            <div className="sx-book-step">
              <div className="sx-book-step-number">2</div>
              <span>Details</span>
            </div>
            <div className="sx-book-step">
              <div className="sx-book-step-number">3</div>
              <span>Confirm</span>
            </div>
          </div>

          {/* Form Card */}
          <form className="sx-book-form-card" onSubmit={handleSubmit}>
            {/* Service Selection */}
            <div className="sx-book-service-group">
              <label className="sx-book-service-label">I'm interested in</label>
              <div className="sx-book-service-buttons">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    className={`sx-book-service-btn ${
                      selectedService === service ? "active" : ""
                    }`}
                    onClick={() => setSelectedService(service)}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="sx-book-form-grid">
              <div className="sx-book-form-group">
                <label className="sx-book-form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="sx-book-form-input"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="sx-book-form-group">
                <label className="sx-book-form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="sx-book-form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="sx-book-form-group full">
                <label className="sx-book-form-label">Organization (Optional)</label>
                <input
                  type="text"
                  name="organization"
                  placeholder="Company or institution"
                  className="sx-book-form-input"
                  value={formData.organization}
                  onChange={handleInputChange}
                />
              </div>

              <div className="sx-book-form-group full">
                <label className="sx-book-form-label">Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us about your goals and where you are in your search."
                  className="sx-book-form-textarea"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="sx-book-submit">
              Request Consultation →
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
