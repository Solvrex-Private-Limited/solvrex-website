"use client";

import { useState, CSSProperties } from "react";
import { C } from "../lib/theme";

const inputStyle: CSSProperties = {
  width: "100%",
  display: "block",
  padding: "14px 18px",
  backgroundColor: "var(--sx-bg-surface)",
  border: `1px solid ${C.border}`,
  color: C.text,
  fontSize: "14.5px",
  outline: "none",
  borderRadius: "10px",
  fontFamily: "inherit",
  lineHeight: "1.5",
  boxShadow: "0 2px 8px rgba(28,25,23,0.03)",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease",
};

const fieldLabelStyle: CSSProperties = {
  display: "block",
  fontSize: "11px",
  fontWeight: 600,
  color: C.textSubtle,
  marginBottom: "8px",
  letterSpacing: "0.09em",
  textTransform: "uppercase",
};

const formStyles = `
  .sx-input { appearance: none; }
  .sx-input::placeholder { color: ${C.textSubtle}; opacity: 0.65; }
  .sx-input:focus { border-color: ${C.blue} !important; box-shadow: 0 0 0 3.5px rgba(195,157,83,0.18), 0 4px 12px rgba(28,25,23,0.04) !important; background-color: var(--sx-bg-raised) !important; }
  .sx-submit { border-radius: 100px !important; padding: 14px 34px !important; font-weight: 600 !important; letter-spacing: 0.02em !important; }
  .sx-submit:hover { background-color: ${C.blueHover} !important; transform: translateY(-1px); boxShadow: 0 6px 20px rgba(195,157,83,0.35) !important; }
  .sx-submit:disabled { opacity: 0.6; cursor: default; }
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error((data && data.error) || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div style={{ paddingTop: "4px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "rgba(77,124,255,0.12)", marginBottom: "20px" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: C.blue }}>
            <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 style={{ fontSize: "20px", fontWeight: 400, color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>Thank you.</h2>
        <p style={{ fontSize: "15px", color: C.textMuted, lineHeight: 1.65 }}>{successText}</p>
      </div>
    );
  }

  return (
    <>
      <style>{formStyles}</style>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label htmlFor="name" style={fieldLabelStyle}>Name</label>
            <input id="name" name="name" type="text" required autoComplete="name" value={form.name} onChange={handleChange} className="sx-input" style={inputStyle} placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" style={fieldLabelStyle}>Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" value={form.email} onChange={handleChange} className="sx-input" style={inputStyle} placeholder="you@example.com" />
          </div>
        </div>

        <div>
          <label htmlFor="organization" style={fieldLabelStyle}>
            Organization <span style={{ color: C.border, fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span>
          </label>
          <input id="organization" name="organization" type="text" autoComplete="organization" value={form.organization} onChange={handleChange} className="sx-input" style={inputStyle} placeholder="Company or institution" />
        </div>

        <div>
          <label htmlFor="subject" style={fieldLabelStyle}>Subject</label>
          <select
            id="subject"
            name="subject"
            required
            value={form.subject}
            onChange={handleChange}
            className="sx-input"
            style={{
              ...inputStyle,
              cursor: "pointer",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236b6e85' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 14px center",
              paddingRight: "36px",
            }}
          >
            <option value="" style={{ backgroundColor: C.bgSurface }}>Select a subject</option>
            <option value="career-services" style={{ backgroundColor: C.bgSurface }}>Career Services</option>
            <option value="business-enablement" style={{ backgroundColor: C.bgSurface }}>Business Enablement</option>
            <option value="technology-consulting" style={{ backgroundColor: C.bgSurface }}>Technology Consulting</option>
            <option value="general" style={{ backgroundColor: C.bgSurface }}>General Inquiry</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" style={fieldLabelStyle}>Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="sx-input"
            style={{ ...inputStyle, resize: "vertical", lineHeight: "1.65" }}
            placeholder="Tell us about your goals and where you are in your search."
          />
        </div>

        {/* Honeypot field — hidden from real users */}
        <div style={{ position: "absolute", left: "-9999px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }} aria-hidden="true">
          <label htmlFor="company_website">Company website</label>
          <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" value={form.company_website} onChange={handleChange} />
        </div>

        {error && <p style={{ fontSize: "13px", color: "#ff6b6b", lineHeight: 1.5, margin: 0 }}>{error}</p>}

        <div style={{ paddingTop: "4px" }}>
          <button type="submit" className="sx-submit" disabled={sending} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 26px", backgroundColor: C.blue, color: "#ffffff", border: "none", borderRadius: "2px", fontSize: "14px", fontWeight: 500, letterSpacing: "0.01em", cursor: "pointer", transition: "background-color 0.15s" }}>
            {sending ? "Sending…" : submitLabel}
            {!sending && (
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5h9M8 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
