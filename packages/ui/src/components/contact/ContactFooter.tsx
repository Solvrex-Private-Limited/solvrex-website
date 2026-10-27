"use client";

import { C } from "../../lib/theme";
import { siteConfig } from "../../lib/site";

export function ContactFooter() {
  return (
    <>
      <style>{`
        .sx-circ {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: min(50vw, 600px);
          overflow: hidden;
          background: ${C.bg};
          border-top: 1px solid ${C.text};
        }
        @media (max-width: 700px) {
          .sx-circ { grid-template-columns: 1fr; height: auto; }
          .sx-circ-link { height: 80vw !important; }
        }
        .sx-circ-link {
          position: relative;
          display: grid;
          place-items: center;
          text-align: center;
          text-decoration: none;
          color: ${C.text};
        }
        .sx-circ-link::before {
          content: "";
          position: absolute;
          width: min(58vw, 720px);
          aspect-ratio: 1;
          border-radius: 50%;
          top: 10%;
          left: 50%;
          transform: translateX(-50%) scale(0.94);
          transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.4s;
        }
        .sx-circ-link:first-child::before {
          background: ${C.bgSurface};
        }
        .sx-circ-link:last-child::before {
          background: ${C.blue};
        }
        .sx-circ-link:hover::before {
          transform: translateX(-50%) scale(1.02);
        }
        .sx-circ-link > div {
          position: relative;
          margin-top: -6%;
        }
        .sx-circ-link:last-child {
          color: #fff;
        }
        .sx-circ-link h4 {
          margin: 0 0 12px;
          font: 300 clamp(20px, 3.5vw, 50px)/1 "Inter", system-ui, sans-serif;
          font-weight: 300;
          letter-spacing: -0.02em;
        }
        .sx-circ-badge {
          display: inline-block;
          padding: 9px 22px;
          border-radius: 99px;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          background: ${C.text};
          color: ${C.bg};
        }
        .sx-circ-link:last-child .sx-circ-badge {
          background: #fff;
          color: ${C.blue};
        }
      `}</style>

      <div className="sx-circ">
        <a className="sx-circ-link" href={`mailto:${siteConfig.contactEmail}`}>
          <div>
            <h4>Email us</h4>
            <span className="sx-circ-badge">{siteConfig.contactEmail}</span>
          </div>
        </a>
        <a className="sx-circ-link" href="#contact-form">
          <div>
            <h4>Send an inquiry</h4>
            <span className="sx-circ-badge">Open the form</span>
          </div>
        </a>
      </div>
    </>
  );
}
