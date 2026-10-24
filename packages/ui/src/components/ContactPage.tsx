"use client";

import { useState } from "react";
import { ContactHero } from "./contact/ContactHero";
import { ContactMarquee } from "./contact/ContactMarquee";
import { ServiceSelector } from "./contact/ServiceSelector";
import { ContactForm } from "./contact/ContactForm";
import { ContactFooter } from "./contact/ContactFooter";

export function ContactPage() {
  const [selectedService, setSelectedService] = useState<string>("");

  return (
    <div style={{ backgroundColor: "transparent" }}>
      {/* Hero Section */}
      <ContactHero />

      {/* Marquee Strip */}
      <ContactMarquee />

      {/* Services Section */}
      <ServiceSelector selectedService={selectedService} onSelectService={setSelectedService} />

      {/* Contact Form Section */}
      <ContactForm selectedService={selectedService} />

      {/* CTA Section */}
      <ContactFooter />
    </div>
  );
}
