"use client";

import { useState, useEffect, CSSProperties } from "react";
import { C } from "../lib/theme";

const inputStyle: CSSProperties = {
  width: "100%",
  display: "block",
  padding: "11px 14px",
  backgroundColor: C.bgSurface,
  border: `1px solid ${C.borderStrong}`,
  color: C.text,
  fontSize: "14px",
  outline: "none",
  borderRadius: "2px",
  fontFamily: "inherit",
  lineHeight: "1.5",
  transition: "border-color 0.15s",
};

const fieldLabelStyle: CSSProperties = {
  display: "block",
  fontSize: "11.5px",
  fontWeight: 500,
  color: C.textSubtle,
  marginBottom: "7px",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
};

// ===== CHANGE 1: Added responsive grid class =====
const formStyles = `
  .sx-input { appearance: none; }
  .sx-input::placeholder { color: ${C.textSubtle}; }
  .sx-input:focus { border-color: ${C.blue} !important; }
  .sx-submit:hover { background-color: ${C.blueHover} !important; }
  .sx-submit:disabled { opacity: 0.6; cursor: default; }

  .sx-grid {
    display: grid;
  }

  @media (max-width: 640px) {
    .sx-grid {
      grid-template-columns: 1fr !important;
    }
    .sx-full-width {
      grid-column: 1 / -1 !important;
    }
  }
`;

/**
 * Shared inquiry/consultation form. Posts to /api/contact. Used by /contact and /book.
 */
export function ConsultationForm({
  submitLabel = "Send inquiry",
  defaultSubject = "",
  successText = "We will respond as soon as possible.",
}: {
  submitLabel?: string;
  defaultSubject?: string;
  successText?: string;
}) {
  const [mounted, setMounted] = useState(false);
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    subject: defaultSubject,
    message: "",
    // honeypot — must stay empty for real users
    company_website: "", 
  });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (sending) return;

    setSending(true);
    setError(null);

    // ===== CHANGE 2: Trim whitespace before sending =====
    const payload = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      organization: form.organization.trim(),
      message: form.message.trim(),
    };

    // ===== CHANGE 3: Add timeout handling =====
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // ===== CHANGED =====
        signal: controller.signal, // ===== ADDED =====
      });

      // ===== CHANGE 4: Clear timeout after request completes =====
      clearTimeout(timeout);

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          (data && data.error) ||
            "Something went wrong. Please try again."
        );
      }

      // ===== CHANGE 5: Reset form after successful submission =====
      setForm({
        name: "",
        email: "",
        organization: "",
        subject: defaultSubject,
        message: "",
        company_website: "",
      });

      setSubmitted(true);
    } catch (err) {
      // ===== CHANGE 6: Better timeout error =====
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("Request timed out. Please try again.");
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again."
        );
      }
    } finally {
      // ===== CHANGE 7: Ensure timeout is always cleared =====
      clearTimeout(timeout);
      setSending(false);
    }
  }

  if (!mounted) {
    return <div style={{ minHeight: "350px", visibility: "hidden" }} aria-hidden="true" />;
  }

  if (submitted) {
    return (
      // ===== CHANGE 8: Screen readers announce success =====
      <div
        style={{ paddingTop: "4px" }}
        role="status"
        aria-live="polite"
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "rgba(77,124,255,0.12)",
            marginBottom: "20px",
          }}
        >
          {/* ===== CHANGE 9: Hide decorative SVG ===== */}
          <svg
            aria-hidden="true"
            focusable="false"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ color: C.blue }}
          >
            <path
              d="M3 8l3.5 3.5 6.5-7"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2
          style={{
            fontSize: "20px",
            fontWeight: 400,
            color: C.text,
            marginBottom: "12px",
            letterSpacing: "-0.01em",
          }}
        >
          Thank you.
        </h2>

        <p
          style={{
            fontSize: "15px",
            color: C.textMuted,
            lineHeight: 1.65,
          }}
        >
          {successText}
        </p>
      </div>
    );
  }

  return (
    <>
      <style>{formStyles}</style>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* ===== CHANGE 10: Responsive grid class ===== */}
        <div
          className="sx-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div>
            <label htmlFor="name" style={fieldLabelStyle}>
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="sx-input"
              style={inputStyle}
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" style={fieldLabelStyle}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="sx-input"
              style={inputStyle}
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label htmlFor="organization" style={fieldLabelStyle}>
              Organization
            </label>
            <input
              id="organization"
              name="organization"
              type="text"
              value={form.organization}
              onChange={handleChange}
              className="sx-input"
              style={inputStyle}
              placeholder="Company name"
            />
          </div>

          <div>
            <label htmlFor="subject" style={fieldLabelStyle}>
              Subject
            </label>

            <select
              id="subject"
              name="subject"
              required
              value={form.subject}
              onChange={handleChange}
              className="sx-input"
              // ===== CHANGE 11: Added aria-label for accessibility =====
              aria-label="Select inquiry subject"
              style={{
                ...inputStyle,
                cursor: "pointer",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236b6e85' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 14px center",
                paddingRight: "36px",
              }}
            >
              <option value="" style={{ backgroundColor: C.bgSurface }}>
                Select a subject
              </option>

              <option
                value="career-services"
                style={{ backgroundColor: C.bgSurface }}
              >
                Career Services
              </option>

              <option
                value="business-enablement"
                style={{ backgroundColor: C.bgSurface }}
              >
                Business Enablement
              </option>

              <option
                value="technology-consulting"
                style={{ backgroundColor: C.bgSurface }}
              >
                Technology Consulting
              </option>

              <option
                value="general"
                style={{ backgroundColor: C.bgSurface }}
              >
                General Inquiry
              </option>
            </select>
          </div>

          <div className="sx-full-width" style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="message" style={fieldLabelStyle}>
              Message
            </label>

            <textarea
              id="message"
              name="message"
              required
              
              // ===== CHANGE 12: Character limit =====
              maxLength={1000}
              
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="sx-input"
              
              // ===== CHANGE 13: Better accessibility =====
              aria-describedby="message-help"
              
              style={{
                ...inputStyle,
                resize: "vertical",
                lineHeight: "1.65",
              }}
              placeholder="Tell us about your goals and where you are in your search."
            />

            {/* ===== CHANGE 14: Character limit helper ===== */}
            <p
              id="message-help"
              style={{
                marginTop: "6px",
                fontSize: "12px",
                color: C.textSubtle,
              }}
            >
              Maximum 1000 characters.
            </p>
          </div>

          {/* Honeypot field — hidden from real users */}
          <div
            style={{
              position: "absolute",
              left: "-9999px",
              top: "auto",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
            aria-hidden="true"
          >
            <label htmlFor="company_website">
              Company website
            </label>

            <input
              id="company_website"
              name="company_website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.company_website}
              onChange={handleChange}
            />
          </div>

          {/* ===== CHANGE 15: Accessible error message ===== */}
          {error && (
            <p
              role="alert"
              aria-live="assertive"
              className="sx-full-width"
              style={{
                gridColumn: "1 / -1",
                fontSize: "13px",
                color: "#ff6b6b",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {error}
            </p>
          )}

          <div className="sx-full-width" style={{ gridColumn: "1 / -1", paddingTop: "4px" }}>
            <button
              type="submit"
              className="sx-submit"
              disabled={sending}

              // ===== CHANGE 16: Loading accessibility =====
              aria-busy={sending}

              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 26px",
                backgroundColor: C.blue,
                color: "#ffffff",
                border: "none",
                borderRadius: "2px",
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: "0.01em",
                cursor: "pointer",
                transition: "background-color 0.15s",
              }}
            >
              {sending ? "Sending…" : submitLabel}

              {!sending && (
                // ===== CHANGE 17: Decorative SVG hidden from screen readers =====
                <svg
                  aria-hidden="true"
                  focusable="false"
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                >
                  <path
                    d="M2 6.5h9M8 3.5l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}git