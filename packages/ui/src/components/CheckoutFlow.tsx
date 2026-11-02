"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { C, accent, eyebrow, pageH1 } from "../lib/theme";
import { PRICING_TIERS, SUPER_PLAN_TIERS, type PricingTier } from "../lib/pricing";

const ALL_TIERS: PricingTier[] = [...PRICING_TIERS, ...SUPER_PLAN_TIERS];
import { Aurora } from "./ui/Aurora";
import PointerAura from "./PointerAura";

export interface CheckoutFlowProps {
  initialPlan?: string;
  initialPeriod?: string;
}


const cardStyles = `
  /* From Uiverse.io by Na3ar-17 (adapted for Solvrex Checkout) */
  
  /* CodeFronts 3D Tilt Card Effect */
  .sx-3d-tilt-card {
    transition: transform 0.15s cubic-bezier(0.2, 0, 0.2, 1), box-shadow 0.25s ease, border-color 0.25s ease;
    transform-style: preserve-3d;
    will-change: transform;
  }

  .sx-card {
    width: 100%;
    max-width: 680px;
    margin: 0 auto 32px;
    border: 2px solid var(--sx-border, #dfdfdf);
    border-radius: 20px;
    padding-bottom: 12px;
    position: relative;
    transition: max-height 0.3s ease, padding 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
    background-color: var(--sx-bg-surface, #ffffff);
    box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.12);
  }

  .sx-card > .header {
    border-bottom: 2px solid var(--sx-border, #dfdfdf);
    transition: border-color 0.3s ease;
    background-color: var(--sx-bg-surface, #ffffff);
  }

  .sx-card > .header .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 22px;
    flex-wrap: wrap;
    gap: 12px;
  }

  .sx-card > .header .wallet {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .sx-card > .header .icon-wrapper {
    width: 44px;
    height: 44px;
    padding: 10px;
    border-radius: 14px;
    background-color: rgba(37, 99, 235, 0.1);
    color: var(--sx-blue, #2563eb);
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }

  .sx-card > .header .text .title {
    margin: 2px 0;
    font-weight: 600;
    font-size: 13px;
    color: var(--sx-text-muted, #8e8e8e);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .sx-card > .header .text .balance {
    margin: 2px 0;
    font-size: 24px;
    font-weight: 800;
    color: var(--sx-text, #0b0d12);
    letter-spacing: -0.02em;
  }

  .sx-card .tier-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    color: var(--sx-blue, #2563eb);
    background-color: rgba(37, 99, 235, 0.08);
    border: 1px solid rgba(37, 99, 235, 0.2);
  }

  .sx-card .content {
    padding: 18px 22px 20px;
  }

  .sx-card .content .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    opacity: 0;
    padding: 8px 0 14px;
    border-bottom: 1px solid var(--sx-border, #e6e8ec);
    margin-bottom: 16px;
    animation: fadeSlideIn 0.35s ease-out forwards;
    animation-delay: 0.05s;
  }

  .sx-card .content .header .title {
    font-weight: 700;
    font-size: 16px;
    color: var(--sx-text, #0b0d12);
  }

  .sx-card .content .bank-cards {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    opacity: 0;
    animation: fadeSlideIn 0.35s ease-out forwards;
    animation-delay: 0.15s;
  }

  .sx-card .content .bank-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    padding: 10px 14px;
    background-color: var(--sx-bg, #f9f9f9);
    border: 1px solid var(--sx-border, #e6e8ec);
    cursor: pointer;
    transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out, border-color 0.2s ease;
  }

  .sx-card .content .bank-card:hover {
    background-color: var(--sx-bg-raised, #efefef);
    border-color: var(--sx-border-strong, #d3d7de);
    transform: translateY(-2px);
  }

  .sx-card .content .bank-card .number {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .sx-card .content .bank-card .custom-check {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 6px;
    background-color: rgba(16, 185, 129, 0.12);
    color: #10b981;
    font-weight: 700;
    font-size: 13px;
    flex-shrink: 0;
  }

  .sx-card .content .bank-card .card-number {
    margin: 0;
    font-weight: 500;
    font-size: 14.5px;
    color: var(--sx-text-body, #2c313b);
    line-height: 1.4;
  }

  .sx-card .content .bank-card .type {
    margin: 0;
    font-weight: 600;
    font-size: 12px;
    color: var(--sx-blue, #2563eb);
    background: rgba(37, 99, 235, 0.08);
    border: 1px solid rgba(37, 99, 235, 0.18);
    padding: 3px 10px;
    border-radius: 6px;
    white-space: nowrap;
  }

  .sx-card .content .footer {
    margin-top: 16px;
    padding-top: 14px;
    border-top: 1px solid var(--sx-border, #e6e8ec);
    opacity: 0;
    animation: fadeSlideIn 0.35s ease-out forwards;
    animation-delay: 0.25s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    color: var(--sx-text-muted, #8e8e8e);
  }

  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;


export interface PromoCodeItem {
  code: string;
  appliesTo: string;
  discount: string;
  discountPercent: number;
}

export const PROMO_CODES_LIST: PromoCodeItem[] = [
  {
    code: "WELCOME20",
    appliesTo: "First-time users — Basic plans",
    discount: "20% off",
    discountPercent: 20,
  },
  {
    code: "WELCOME25",
    appliesTo: "First-time users — Quarterly, Half-Yearly, Yearly",
    discount: "25% off",
    discountPercent: 25,
  },
  {
    code: "FOUNDER10",
    appliesTo: "Referred by a Solvrex founder/team member",
    discount: "Extra 10% off",
    discountPercent: 10,
  },
  {
    code: "STUDENT10",
    appliesTo: "Valid, currently-enrolled student ID",
    discount: "Extra 10% off",
    discountPercent: 10,
  },
];

export function CheckoutFlow({ initialPlan = "gold", initialPeriod = "Quarterly" }: CheckoutFlowProps) {
  // Navigation / Step state:
  // 1: "select-plan" (Screen 2)
  // 2: "details" (Screen 3a/3b)
  // 3: "success" (Screen 5a)
  // 4: "failed" (Screen 5b)
  const [currentStep, setCurrentStep] = useState<"select-plan" | "details" | "success" | "failed">("select-plan");
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);

  // Selected plan and billing period
  const [selectedPlanSlug, setSelectedPlanSlug] = useState<string>(initialPlan.toLowerCase());
  const [selectedPeriod, setSelectedPeriod] = useState<string>(initialPeriod);

  // Form details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Validation errors
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  // Razorpay popup state
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking" | "wallet">("card");
  const [upiId, setUpiId] = useState("aarav@okhdfcbank");
  const [cardNumber, setCardNumber] = useState("4111 1111 1111 1111");
  const [cardExpiry, setCardExpiry] = useState("12/30");
  const [cardCvv, setCardCvv] = useState("123");
  const [isProcessing, setIsProcessing] = useState(false);

  // Order & payment identifiers
  const [orderId] = useState("order_H4Q5BYF3");
  const [paymentId, setPaymentId] = useState("pay_B0EITUOUWD");

  // Read URL query parameters on mount if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const planParam = params.get("plan");
      const periodParam = params.get("period");
      if (planParam) {
        const found = ALL_TIERS.find((t) => t.slug.toLowerCase() === planParam.toLowerCase());
        if (found) {
          setSelectedPlanSlug(found.slug);
          if (found.pricingOptions && found.pricingOptions.length > 0) {
            if (periodParam && found.pricingOptions.some((o) => o.label.toLowerCase() === periodParam.toLowerCase())) {
              setSelectedPeriod(periodParam);
            } else {
              setSelectedPeriod(found.pricingOptions[0].label);
            }
          } else if (found.billing) {
            setSelectedPeriod(found.billing.charAt(0).toUpperCase() + found.billing.slice(1));
          }
        }
        
      }
      if (periodParam) {
        setSelectedPeriod(periodParam);
      }
    }
  }, []);

  // Retrieve active tier
  const currentTier: PricingTier = useMemo(() => {
    return ALL_TIERS.find((t) => t.slug === selectedPlanSlug) || PRICING_TIERS[1]; // default Gold
  }, [selectedPlanSlug]);

  // Available billing options for the current tier
  const billingOptions = useMemo(() => {
    if (currentTier.pricingOptions && currentTier.pricingOptions.length > 0) {
      return currentTier.pricingOptions;
    }
    const label = currentTier.billing
      ? currentTier.billing.charAt(0).toUpperCase() + currentTier.billing.slice(1)
      : "Quarterly";
    const priceStr = currentTier.priceFrom.startsWith("$") ? currentTier.priceFrom : `${currentTier.priceFrom}`;
    return [{ label, price: priceStr }];
  }, [currentTier]);

  // Calculate pricing amounts
  const currentOption = useMemo(() => {
    return billingOptions.find((o) => o.label.toLowerCase() === selectedPeriod.toLowerCase()) || billingOptions[0];
  }, [billingOptions, selectedPeriod]);

  const rawPriceNumeric = useMemo(() => {
    const digits = currentOption.price.replace(/[^0-9]/g, "");
    return parseInt(digits, 10) || 899;
  }, [currentOption]);

  // Promo discount calculation based on selected promo code
  const activePromoObj = useMemo(() => {
    if (!appliedPromo) return null;
    return PROMO_CODES_LIST.find((p) => p.code.toUpperCase() === appliedPromo.toUpperCase()) || null;
  }, [appliedPromo]);

  const discountNumeric = useMemo(() => {
    if (!activePromoObj) {
      if (appliedPromo === "WELCOME10") return Math.round(rawPriceNumeric * 0.1);
      return 0;
    }
    return Math.round(rawPriceNumeric * (activePromoObj.discountPercent / 100));
  }, [activePromoObj, appliedPromo, rawPriceNumeric]);

  // CodeFronts 3D Tilt event handlers
  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -5;
    const ry = ((x - cx) / cx) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-3px)`;
    card.style.boxShadow = "0 28px 56px -12px rgba(0, 0, 0, 0.22), 0 0 32px rgba(37, 99, 235, 0.14)";
    card.style.borderColor = "var(--sx-blue, #2563eb)";
  };

  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    card.style.boxShadow = "0 12px 32px -8px rgba(0, 0, 0, 0.08)";
    card.style.borderColor = "var(--sx-border, #e6e8ec)";
  };

  const totalNumeric = useMemo(() => {
    return Math.max(0, rawPriceNumeric - discountNumeric);
  }, [rawPriceNumeric, discountNumeric]);

  // Format numbers as currency string
  const formatCurrency = (val: number) => `$${val.toLocaleString("en-US")}`;

  // Form validation handler
  const validateForm = () => {
    const errs: { name?: string; email?: string; phone?: string } = {};
    if (!name.trim()) {
      errs.name = "Enter your full name.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = "Enter a valid email address.";
    }
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = "Enter a 10-digit phone number.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (!promoCodeInput.trim()) return;
    if (promoCodeInput.trim().toUpperCase() === "WELCOME10") {
      setAppliedPromo("WELCOME10");
      setPromoError(null);
    } else {
      setPromoError("Invalid promo code. Try WELCOME10");
    }
  };

  const handleProceedToRazorpay = () => {
    if (!validateForm()) return;
    setIsRazorpayOpen(true);
  };

  const triggerPaymentOutcome = (outcome: "success" | "failed") => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsRazorpayOpen(false);
      if (outcome === "success") {
        // generate random mock payment ID
        const randomHex = Math.random().toString(36).substring(2, 10).toUpperCase();
        setPaymentId(`pay_${randomHex}`);
        setCurrentStep("success");
      } else {
        setCurrentStep("failed");
      }
    }, 700);
  };

  const handleRestart = () => {
    setCurrentStep("select-plan");
    setIsRazorpayOpen(false);
    setAppliedPromo(null);
    setPromoCodeInput("");
    setErrors({});
  };

  return (
    <div style={{ backgroundColor: "transparent", position: "relative", minHeight: "100vh", overflowX: "clip" }}>
      <PointerAura />
      <style>{cardStyles}</style>

      {/* Top Banner / Breadcrumb Stepper Area */}
      <section style={{ borderBottom: `1px solid ${C.border}`, position: "relative", overflow: "hidden", padding: "40px 0 28px" }}>
        <Aurora variant="pricing" />
        <div className="sx-container" style={{ position: "relative", zIndex: 2 }}>
          {/* Top Header Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              paddingBottom: "24px",
              borderBottom: `1px solid ${C.border}`,
              marginBottom: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "15px", fontWeight: 700, color: C.text, letterSpacing: "-0.01em" }}>
                Solvrex Checkout
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#10b981",
                  backgroundColor: "rgba(16, 185, 129, 0.12)",
                  border: "1px solid rgba(16, 185, 129, 0.25)",
                  padding: "2px 8px",
                  borderRadius: "999px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10b981" }} />
                Secure Checkout
              </span>
            </div>
            <span style={{ fontSize: "13px", color: C.textMuted, display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              256-bit SSL Encrypted Payment
            </span>
          </div>

          {/* Flow Stepper */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              overflowX: "auto",
              paddingBottom: "4px",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* 1. Pricing Page */}
            <Link
              href="/pricing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: 600,
                color: C.textMuted,
                textDecoration: "none",
                padding: "6px 12px",
                borderRadius: "8px",
                border: `1px solid ${C.border}`,
                backgroundColor: C.bgSurface,
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ color: "#10b981", fontWeight: 700 }}>✓</span>
              <span>Pricing page</span>
            </Link>

            <span style={{ color: C.textSubtle, opacity: 0.5 }}>›</span>

            {/* 2. Select plan */}
            <button
              type="button"
              onClick={() => {
                if (currentStep !== "select-plan") setCurrentStep("select-plan");
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: 600,
                color: currentStep === "select-plan" ? "#ffffff" : C.text,
                backgroundColor: currentStep === "select-plan" ? C.blue : C.bgSurface,
                padding: "6px 14px",
                borderRadius: "8px",
                border: currentStep === "select-plan" ? `1px solid ${C.blue}` : `1px solid ${C.border}`,
                whiteSpace: "nowrap",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {currentStep !== "select-plan" && <span style={{ color: "#10b981", fontWeight: 700 }}>✓</span>}
              <span>Select plan</span>
            </button>

            <span style={{ color: C.textSubtle, opacity: 0.5 }}>›</span>

            {/* 3. Your details */}
            <button
              type="button"
              onClick={() => {
                if (currentStep === "success" || currentStep === "failed") setCurrentStep("details");
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: 600,
                color: currentStep === "details" ? "#ffffff" : currentStep === "success" || currentStep === "failed" ? C.text : C.textMuted,
                backgroundColor: currentStep === "details" ? C.blue : C.bgSurface,
                padding: "6px 14px",
                borderRadius: "8px",
                border: currentStep === "details" ? `1px solid ${C.blue}` : `1px solid ${C.border}`,
                whiteSpace: "nowrap",
                cursor: currentStep === "success" || currentStep === "failed" ? "pointer" : "default",
                transition: "all 0.2s ease",
              }}
            >
              {(currentStep === "success" || currentStep === "failed") && <span style={{ color: "#10b981", fontWeight: 700 }}>✓</span>}
              <span>Your details</span>
            </button>

            <span style={{ color: C.textSubtle, opacity: 0.5 }}>›</span>

            {/* 4. Razorpay checkout */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: 600,
                color: isRazorpayOpen ? "#ffffff" : currentStep === "success" || currentStep === "failed" ? C.text : C.textMuted,
                backgroundColor: isRazorpayOpen ? C.blue : C.bgSurface,
                padding: "6px 14px",
                borderRadius: "8px",
                border: isRazorpayOpen ? `1px solid ${C.blue}` : `1px solid ${C.border}`,
                whiteSpace: "nowrap",
              }}
            >
              {(currentStep === "success" || currentStep === "failed") && <span style={{ color: "#10b981", fontWeight: 700 }}>✓</span>}
              <span>Razorpay checkout</span>
            </div>

            <span style={{ color: C.textSubtle, opacity: 0.5 }}>›</span>

            {/* 5. Result */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: 600,
                color: currentStep === "success" || currentStep === "failed" ? "#ffffff" : C.textMuted,
                backgroundColor:
                  currentStep === "success"
                    ? "#10b981"
                    : currentStep === "failed"
                    ? "#ef4444"
                    : C.bgSurface,
                padding: "6px 14px",
                borderRadius: "8px",
                border:
                  currentStep === "success"
                    ? "1px solid #10b981"
                    : currentStep === "failed"
                    ? "1px solid #ef4444"
                    : `1px solid ${C.border}`,
                whiteSpace: "nowrap",
              }}
            >
              <span>Result</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Flow Content Container */}
      <main className="sx-container" style={{ padding: "48px 24px 96px", position: "relative", zIndex: 1, maxWidth: "980px" }}>
        {/* ========================================================================= */}
        {/* SCREEN 2: SELECT PLAN                                                    */}
        {/* ========================================================================= */}
        {currentStep === "select-plan" && (
          <div style={{ maxWidth: "760px", margin: "0 auto", width: "100%" }}>
            <div style={{ marginBottom: "32px", textAlign: "center" }}>
              <p style={{ ...eyebrow, marginBottom: "8px" }}>Step 1 · Plan Selection</p>
              <h1 style={{ ...pageH1, fontSize: "clamp(28px, 3.5vw, 40px)", marginBottom: "10px" }}>
                You picked {currentTier.name}.
              </h1>
              <p style={{ fontSize: "16px", color: C.textMuted, lineHeight: 1.6, maxWidth: "560px", margin: "0 auto" }}>
                Confirm your plan and billing period before we collect your details.
              </p>
            </div>

            {/* Plan Switcher Pills */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "26px", alignItems: "center" }}>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: C.textSubtle, textTransform: "uppercase", letterSpacing: "0.06em", marginRight: "4px" }}>
                  Standard Plans:
                </span>
                {PRICING_TIERS.map((tier) => {
                  const isSelected = tier.slug === selectedPlanSlug;
                  return (
                    <button
                      key={tier.slug}
                      type="button"
                      onClick={() => {
                        setSelectedPlanSlug(tier.slug);
                        if (tier.pricingOptions && !tier.pricingOptions.some((o) => o.label.toLowerCase() === selectedPeriod.toLowerCase())) {
                          setSelectedPeriod(tier.pricingOptions[0].label);
                        }
                      }}
                      style={{
                        padding: "8px 18px",
                        borderRadius: "999px",
                        fontSize: "13.5px",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: isSelected ? `1.5px solid ${C.blue}` : `1px solid ${C.border}`,
                        backgroundColor: isSelected ? accent.fill : C.bgSurface,
                        color: isSelected ? C.blue : C.text,
                        transition: "all 0.2s ease",
                      }}
                    >
                      {tier.name}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: C.textSubtle, textTransform: "uppercase", letterSpacing: "0.06em", marginRight: "4px" }}>
                  Super Plans:
                </span>
                {SUPER_PLAN_TIERS.map((tier) => {
                  const isSelected = tier.slug === selectedPlanSlug;
                  return (
                    <button
                      key={tier.slug}
                      type="button"
                      onClick={() => {
                        setSelectedPlanSlug(tier.slug);
                        const label = tier.billing.charAt(0).toUpperCase() + tier.billing.slice(1);
                        setSelectedPeriod(label);
                      }}
                      style={{
                        padding: "8px 18px",
                        borderRadius: "999px",
                        fontSize: "13.5px",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: isSelected ? `1.5px solid ${C.blue}` : `1px solid ${C.border}`,
                        backgroundColor: isSelected ? accent.fill : C.bgSurface,
                        color: isSelected ? C.blue : C.text,
                        transition: "all 0.2s ease",
                      }}
                    >
                      {tier.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Billing Period Selector Pills with Prices */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "36px", flexWrap: "wrap", justifyContent: "center" }}>
              {billingOptions.map((opt) => {
                const isActive = opt.label.toLowerCase() === selectedPeriod.toLowerCase();
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setSelectedPeriod(opt.label)}
                    style={{
                      padding: "10px 18px",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                      border: isActive ? `1.5px solid ${C.blue}` : `1px solid ${C.border}`,
                      backgroundColor: isActive ? C.blue : C.bgSurface,
                      color: isActive ? "#ffffff" : C.text,
                      boxShadow: isActive ? "0 4px 14px rgba(37, 99, 235, 0.25)" : "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span>{opt.label}</span>
                    <span style={{ opacity: 0.6, margin: "0 6px" }}>·</span>
                    <span style={{ fontWeight: 700 }}>{opt.price}</span>
                  </button>
                );
              })}
            </div>

            {/* Plan Confirmation Card (Uiverse Na3ar-17 styled effect) */}
            <div className="card sx-card">
              <div className="header">
                <div className="content">
                  <div className="wallet">
                    <div className="icon-wrapper">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M7 15h0M2 10h20" />
                      </svg>
                    </div>
                    <div className="text">
                      <p className="title">{currentTier.name} Plan</p>
                      <p className="balance">
                        {currentOption.price}
                        <span style={{ fontSize: "14px", fontWeight: 500, color: C.textMuted, marginLeft: "6px" }}>
                          / {selectedPeriod.toLowerCase()}
                        </span>
                      </p>
                    </div>
                  </div>
                  <span className="tier-tag">
                    {selectedPeriod}
                  </span>
                </div>
              </div>

              <div key={`${selectedPlanSlug}-${selectedPeriod}`} className="content">
                <div className="header">
                  <span className="title">Included Services</span>
                  <span style={{ fontSize: "13.5px", color: C.textMuted }}>{currentTier.blurb}</span>
                </div>

                <div className="bank-cards">
                  {currentTier.features.map((feat, idx) => (
                    <div key={idx} className="bank-card">
                      <div className="number">
                        <span className="custom-check">✓</span>
                        <span className="card-number">{feat}</span>
                      </div>
                      <span className="type">Included</span>
                    </div>
                  ))}
                </div>

                <div className="footer">
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span>🛡️</span>
                    <span>Dedicated operator & weekly progress QA</span>
                  </div>
                  <span style={{ fontSize: "12px", color: C.textSubtle }}>Cycle cap confirmed prior to kick-off</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => setCurrentStep("details")}
                style={{
                  padding: "14px 36px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#ffffff",
                  backgroundColor: C.blue,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(37, 99, 235, 0.35)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.blueHover)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.blue)}
              >
                Continue
              </button>

              <Link
                href="/pricing"
                style={{
                  padding: "13px 24px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: C.text,
                  backgroundColor: "transparent",
                  border: `1px solid ${C.borderStrong}`,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.color = C.blue; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.borderStrong; e.currentTarget.style.color = C.text; }}
              >
                Back to pricing
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCREEN 3a / 3b: CUSTOMER DETAILS AND ORDER SUMMARY                       */}
        {/* ========================================================================= */}
        {currentStep === "details" && (
          <div>
            <div style={{ marginBottom: "28px" }}>
              <p style={{ ...eyebrow, marginBottom: "8px" }}>Step 2 · Your Details</p>
              <h1 style={{ ...pageH1, fontSize: "clamp(28px, 3.5vw, 40px)", marginBottom: "8px" }}>Your details</h1>
              <p style={{ fontSize: "16px", color: C.textMuted }}>We use these for your receipt and to set up your account.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", alignItems: "start" }}>
              {/* Left Column: Input Form (CodeFronts 3D Tilt Card) */}
              <div
                className="sx-3d-tilt-card"
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
                style={{
                  backgroundColor: C.bgSurface,
                  border: `1px solid ${C.border}`,
                  borderRadius: "18px",
                  padding: "32px 28px",
                  boxShadow: "0 12px 32px -8px rgba(0, 0, 0, 0.08)",
                  cursor: "default",
                }}
              >
                {/* Full Name */}
                <div style={{ marginBottom: "22px" }}>
                  <label style={{ display: "block", fontSize: "13.5px", fontWeight: 600, color: C.text, marginBottom: "8px" }}>
                    Full name
                  </label>
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter your name"
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      border: errors.name ? "1.5px solid #ef4444" : `1px solid ${C.borderStrong}`,
                      backgroundColor: C.bg,
                      color: C.text,
                      fontSize: "14.5px",
                      boxSizing: "border-box",
                      outline: "none",
                    }}
                  />
                  {errors.name && <p style={{ color: "#ef4444", fontSize: "12.5px", margin: "6px 0 0" }}>{errors.name}</p>}
                </div>

                {/* Email */}
                <div style={{ marginBottom: "22px" }}>
                  <label style={{ display: "block", fontSize: "13.5px", fontWeight: 600, color: C.text, marginBottom: "8px" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      border: errors.email ? "1.5px solid #ef4444" : `1px solid ${C.borderStrong}`,
                      backgroundColor: C.bg,
                      color: C.text,
                      fontSize: "14.5px",
                      boxSizing: "border-box",
                      outline: "none",
                    }}
                  />
                  {errors.email && <p style={{ color: "#ef4444", fontSize: "12.5px", margin: "6px 0 0" }}>{errors.email}</p>}
                </div>

                {/* Phone */}
                <div style={{ marginBottom: "26px" }}>
                  <label style={{ display: "block", fontSize: "13.5px", fontWeight: 600, color: C.text, marginBottom: "8px" }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    placeholder="Enter your phone number"
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      border: errors.phone ? "1.5px solid #ef4444" : `1px solid ${C.borderStrong}`,
                      backgroundColor: C.bg,
                      color: C.text,
                      fontSize: "14.5px",
                      boxSizing: "border-box",
                      outline: "none",
                    }}
                  />
                  {errors.phone && <p style={{ color: "#ef4444", fontSize: "12.5px", margin: "6px 0 0" }}>{errors.phone}</p>}
                </div>

                {/* Promo Code Dropdown Menu */}
                <div style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                    <label style={{ fontSize: "13.5px", fontWeight: 600, color: C.text }}>
                      Promo code
                    </label>
                    <span style={{ fontSize: "12px", color: C.textSubtle }}>Select from available offers</span>
                  </div>

                  {/* Dropdown Menu */}
                  <div style={{ position: "relative", marginBottom: "8px" }}>
                    <select
                      value={appliedPromo || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val) {
                          setAppliedPromo(val);
                          setPromoCodeInput(val);
                          setPromoError(null);
                        } else {
                          setAppliedPromo(null);
                          setPromoCodeInput("");
                        }
                      }}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        paddingRight: "36px",
                        borderRadius: "8px",
                        border: `1.5px solid ${appliedPromo ? C.blue : C.borderStrong}`,
                        backgroundColor: C.bg,
                        color: appliedPromo ? C.text : C.textMuted,
                        fontSize: "14px",
                        fontWeight: appliedPromo ? 600 : 400,
                        cursor: "pointer",
                        outline: "none",
                        appearance: "none",
                        WebkitAppearance: "none",
                        transition: "border-color 0.2s ease",
                      }}
                    >
                      <option value="">-- Choose a Promo Code (Optional) --</option>
                      {PROMO_CODES_LIST.map((promo) => (
                        <option key={promo.code} value={promo.code}>
                          {promo.code} • {promo.discount} ({promo.appliesTo})
                        </option>
                      ))}
                    </select>
                    {/* Custom Dropdown Chevron Icon */}
                    <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: C.textMuted }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  {/* Selected Promo Details Banner */}
                  {activePromoObj && (
                    <div
                      style={{
                        backgroundColor: "rgba(37, 99, 235, 0.08)",
                        border: `1px solid rgba(37, 99, 235, 0.25)`,
                        borderRadius: "10px",
                        padding: "12px 14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "12px",
                        marginTop: "10px",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                          <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "14px", color: C.blue }}>
                            {activePromoObj.code}
                          </span>
                          <span style={{ fontSize: "11px", fontWeight: 700, color: "#ffffff", backgroundColor: "#10b981", padding: "1px 7px", borderRadius: "999px" }}>
                            {activePromoObj.discount}
                          </span>
                        </div>
                        <p style={{ margin: 0, fontSize: "12.5px", color: C.textBody }}>
                          {activePromoObj.appliesTo}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setAppliedPromo(null);
                          setPromoCodeInput("");
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          color: C.textMuted,
                          fontSize: "12px",
                          fontWeight: 500,
                          textDecoration: "underline",
                          cursor: "pointer",
                          padding: "4px",
                          flexShrink: 0,
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {promoError && <p style={{ color: "#ef4444", fontSize: "13px", margin: "8px 0 0" }}>{promoError}</p>}
                </div>
              </div>

              {/* Right Column: Order Summary Card (CodeFronts 3D Tilt Card) */}
              <div
                className="sx-3d-tilt-card"
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
                style={{
                  backgroundColor: C.bgSurface,
                  border: `1px solid ${C.borderStrong}`,
                  borderRadius: "18px",
                  padding: "32px 28px",
                  boxShadow: "0 16px 40px -10px rgba(0, 0, 0, 0.1)",
                  cursor: "default",
                }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: C.text, margin: "0 0 20px" }}>Order summary</h3>

                {/* Plan Row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <span style={{ fontSize: "14.5px", color: C.textBody }}>
                    {currentTier.name} · {selectedPeriod}
                  </span>
                  <span style={{ fontSize: "15px", fontWeight: 600, color: C.text }}>{formatCurrency(rawPriceNumeric)}</span>
                </div>

                {/* Promo Row (if applied) */}
                {appliedPromo && (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <span style={{ fontSize: "14.5px", color: "#10b981" }}>Promo ({appliedPromo})</span>
                    <span style={{ fontSize: "15px", fontWeight: 600, color: "#10b981" }}>-{formatCurrency(discountNumeric)}</span>
                  </div>
                )}

                {/* Divider */}
                <div style={{ borderTop: `1px solid ${C.border}`, margin: "16px 0 20px" }} />

                {/* Total Row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "26px" }}>
                  <span style={{ fontSize: "16px", fontWeight: 700, color: C.text }}>Total</span>
                  <span style={{ fontSize: "24px", fontWeight: 800, color: C.text, letterSpacing: "-0.02em" }}>
                    {formatCurrency(totalNumeric)}
                  </span>
                </div>

                {/* Pay Button */}
                <button
                  type="button"
                  onClick={handleProceedToRazorpay}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#ffffff",
                    backgroundColor: C.blue,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(37, 99, 235, 0.35)",
                    transition: "all 0.2s ease",
                    marginBottom: "12px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.blueHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.blue)}
                >
                  Pay {formatCurrency(totalNumeric)}
                </button>

                {/* Back Button */}
                <button
                  type="button"
                  onClick={() => setCurrentStep("select-plan")}
                  style={{
                    width: "100%",
                    padding: "11px",
                    borderRadius: "10px",
                    fontSize: "14.5px",
                    fontWeight: 500,
                    color: C.textMuted,
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}
                >
                  Back
                </button>

                {/* Trial & Policy Notices */}
                <div style={{ marginTop: "20px", borderTop: `1px solid ${C.border}`, paddingTop: "16px" }}>
                  <p style={{ fontSize: "12.5px", color: C.textSubtle, lineHeight: 1.5, margin: "0 0 6px" }}>
                    7-day free trial. Billing starts on Day 8 unless you cancel.
                  </p>
                  <p style={{ fontSize: "12.5px", color: C.textSubtle, lineHeight: 1.5, margin: 0 }}>
                    By paying you accept the{" "}
                    <Link href="/pricing#billing-policy" style={{ color: C.blue, textDecoration: "underline" }}>
                      Billing &amp; Refund Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCREEN 5a: PAYMENT SUCCESS                                               */}
        {/* ========================================================================= */}
        {currentStep === "success" && (
          <div
            style={{
              maxWidth: "540px",
              margin: "0 auto",
              backgroundColor: C.bgSurface,
              border: `1px solid ${C.borderStrong}`,
              borderRadius: "24px",
              padding: "48px 36px",
              boxShadow: "0 24px 50px -12px rgba(0, 0, 0, 0.15)",
              textAlign: "center",
            }}
          >
            {/* Green Animated/Icon Checkmark */}
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "50%",
                backgroundColor: "rgba(16, 185, 129, 0.12)",
                color: "#10b981",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                marginBottom: "20px",
              }}
            >
              ✓
            </div>

            <h2 style={{ fontSize: "28px", fontWeight: 700, color: C.text, letterSpacing: "-0.02em", margin: "0 0 10px" }}>
              Payment successful
            </h2>
            <p style={{ fontSize: "15px", color: C.textMuted, lineHeight: 1.6, maxWidth: "420px", margin: "0 auto 28px" }}>
              Your {currentTier.name} plan is active. A receipt is on its way to{" "}
              <strong style={{ color: C.text }}>{email || "aarav@example.com"}</strong>.
            </p>

            {/* Receipt Table */}
            <div
              style={{
                borderRadius: "14px",
                backgroundColor: C.bg,
                border: `1px solid ${C.border}`,
                padding: "18px 22px",
                textAlign: "left",
                marginBottom: "32px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: "14px", color: C.textMuted }}>Plan</span>
                <span style={{ fontSize: "14px", fontWeight: 600, color: C.text }}>
                  {currentTier.name} · {selectedPeriod}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: "14px", color: C.textMuted }}>Amount paid</span>
                <span style={{ fontSize: "14px", fontWeight: 700, color: C.text }}>{formatCurrency(totalNumeric)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: "14px", color: C.textMuted }}>Method</span>
                <span style={{ fontSize: "14px", fontWeight: 600, color: C.text }}>
                  {paymentMethod === "upi" ? "UPI" : paymentMethod === "card" ? "Card" : paymentMethod === "netbanking" ? "Netbanking" : "Wallet"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: "14px", color: C.textMuted }}>Payment ID</span>
                <span style={{ fontSize: "13px", fontFamily: "monospace", color: C.textBody }}>{paymentId}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
                <span style={{ fontSize: "14px", color: C.textMuted }}>Order ID</span>
                <span style={{ fontSize: "13px", fontFamily: "monospace", color: C.textBody }}>{orderId}</span>
              </div>
            </div>

            {/* Success Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Link
                href="/"
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#ffffff",
                  backgroundColor: C.blue,
                  textDecoration: "none",
                  textAlign: "center",
                  display: "block",
                  boxShadow: "0 8px 24px rgba(37, 99, 235, 0.35)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.blueHover)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.blue)}
              >
                Return to Homepage
              </Link>
              <button
                type="button"
                onClick={handleRestart}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: C.textMuted,
                  backgroundColor: "transparent",
                  border: `1px solid ${C.borderStrong}`,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.color = C.blue; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.borderStrong; e.currentTarget.style.color = C.textMuted; }}
              >
                Enroll in another plan
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCREEN 5b: PAYMENT FAILED                                                */}
        {/* ========================================================================= */}
        {currentStep === "failed" && (
          <div
            style={{
              maxWidth: "540px",
              margin: "0 auto",
              backgroundColor: C.bgSurface,
              border: `1px solid ${C.borderStrong}`,
              borderRadius: "24px",
              padding: "48px 36px",
              boxShadow: "0 24px 50px -12px rgba(0, 0, 0, 0.15)",
              textAlign: "center",
            }}
          >
            {/* Red Warning Exclamation Icon */}
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "50%",
                backgroundColor: "rgba(239, 68, 68, 0.12)",
                color: "#ef4444",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                fontWeight: 700,
                marginBottom: "20px",
              }}
            >
              !
            </div>

            <h2 style={{ fontSize: "28px", fontWeight: 700, color: C.text, letterSpacing: "-0.02em", margin: "0 0 10px" }}>
              Payment failed
            </h2>
            <p style={{ fontSize: "15px", color: C.textMuted, lineHeight: 1.6, maxWidth: "420px", margin: "0 auto 28px" }}>
              Your bank declined the payment and you haven&apos;t been charged. Try another method or retry.
            </p>

            {/* Summary Box */}
            <div
              style={{
                borderRadius: "14px",
                backgroundColor: C.bg,
                border: `1px solid ${C.border}`,
                padding: "18px 22px",
                textAlign: "left",
                marginBottom: "28px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: "14px", color: C.textMuted }}>Plan</span>
                <span style={{ fontSize: "14px", fontWeight: 600, color: C.text }}>
                  {currentTier.name} · {selectedPeriod}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: "14px", color: C.textMuted }}>Amount</span>
                <span style={{ fontSize: "14px", fontWeight: 700, color: C.text }}>{formatCurrency(totalNumeric)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
                <span style={{ fontSize: "14px", color: C.textMuted }}>Order ID</span>
                <span style={{ fontSize: "13px", fontFamily: "monospace", color: C.textBody }}>{orderId}</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button
                type="button"
                onClick={() => setIsRazorpayOpen(true)}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#ffffff",
                  backgroundColor: C.blue,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(37, 99, 235, 0.35)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.blueHover)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.blue)}
              >
                Retry payment
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep("details")}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  fontSize: "14.5px",
                  fontWeight: 500,
                  color: C.text,
                  backgroundColor: "transparent",
                  border: `1px solid ${C.borderStrong}`,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.color = C.blue; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.borderStrong; e.currentTarget.style.color = C.text; }}
              >
                Edit details
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* SCREEN 4a / 4b: RAZORPAY CHECKOUT POPUP MODAL                             */}
      {/* ========================================================================= */}
      {isRazorpayOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.68)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          {/* Modal Container */}
          <div
            style={{
              width: "100%",
              maxWidth: "680px",
              borderRadius: "16px",
              overflow: "hidden",
              backgroundColor: C.bgSurface,
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.45)",
              border: `1px solid ${C.borderStrong}`,
            }}
          >
            {/* Left Column (Razorpay Branding / Order Context) */}
            <div
              style={{
                backgroundColor: "#0d1b2a",
                padding: "28px 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                color: "#ffffff",
              }}
            >
              <div>
                {/* Logo Badge */}
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    backgroundColor: "#ffffff",
                    color: "#0d1b2a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "20px",
                    marginBottom: "16px",
                  }}
                >
                  S
                </div>
                <h4 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: 700, color: "#ffffff" }}>Solvrex</h4>
                <p style={{ margin: "0 0 4px", fontSize: "13px", color: "#93c5fd" }}>
                  {currentTier.name} · {selectedPeriod}
                </p>
                <p style={{ margin: 0, fontSize: "11px", fontFamily: "monospace", color: "#64748b" }}>{orderId}</p>
              </div>

              {/* Amount Box */}
              <div
                style={{
                  backgroundColor: "#1e3a5f",
                  borderRadius: "10px",
                  padding: "14px 16px",
                }}
              >
                <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#93c5fd", marginBottom: "4px" }}>
                  Amount payable
                </div>
                <div style={{ fontSize: "22px", fontWeight: 800, color: "#ffffff" }}>{formatCurrency(totalNumeric)}</div>
              </div>
            </div>

            {/* Right Column (Payment Methods and Outcome Trigger) */}
            <div style={{ display: "flex", flexDirection: "column", backgroundColor: C.bgSurface }}>
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 20px",
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ color: "#10b981", fontSize: "14px" }}>🛡️</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: C.textMuted }}>Razorpay Secure</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRazorpayOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "20px",
                    color: C.textMuted,
                    cursor: "pointer",
                    lineHeight: 1,
                    padding: "4px",
                  }}
                >
                  ×
                </button>
              </div>

              {/* Method Selector Tabs */}
              <div style={{ display: "flex", borderBottom: `1px solid ${C.border}` }}>
                {(["upi", "card", "netbanking", "wallet"] as const).map((method) => {
                  const isActive = paymentMethod === method;
                  return (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      style={{
                        flex: 1,
                        padding: "12px 6px",
                        fontSize: "12.5px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        backgroundColor: isActive ? C.bg : "transparent",
                        color: isActive ? C.blue : C.textMuted,
                        border: "none",
                        borderBottom: isActive ? `2px solid ${C.blue}` : "2px solid transparent",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {method}
                    </button>
                  );
                })}
              </div>

              {/* Tab Form Fields */}
              <div style={{ padding: "24px 20px", flex: 1 }}>
                {/* UPI Tab */}
                {paymentMethod === "upi" && (
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: C.text, marginBottom: "6px" }}>
                      UPI ID
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@bank"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: `1px solid ${C.borderStrong}`,
                        backgroundColor: C.bg,
                        color: C.text,
                        fontSize: "14px",
                        boxSizing: "border-box",
                        marginBottom: "12px",
                      }}
                    />
                    <p style={{ fontSize: "12.5px", color: C.textMuted, margin: "0 0 16px" }}>
                      Or scan a QR code from any UPI app (GPay, PhonePe, Paytm).
                    </p>
                    <div
                      style={{
                        padding: "18px",
                        borderRadius: "10px",
                        border: `1px dashed ${C.borderStrong}`,
                        textAlign: "center",
                        backgroundColor: C.bg,
                      }}
                    >
                      <div style={{ fontSize: "36px", marginBottom: "4px" }}>📱</div>
                      <span style={{ fontSize: "12px", color: C.textSubtle }}>Scan with any UPI app to complete payment</span>
                    </div>
                  </div>
                )}

                {/* Card Tab */}
                {paymentMethod === "card" && (
                  <div>
                    <div style={{ marginBottom: "14px" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: C.text, marginBottom: "6px" }}>
                        Card number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4111 1111 1111 1111"
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: "8px",
                          border: `1px solid ${C.borderStrong}`,
                          backgroundColor: C.bg,
                          color: C.text,
                          fontSize: "14px",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: C.text, marginBottom: "6px" }}>
                          Expiry
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          style={{
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: "8px",
                            border: `1px solid ${C.borderStrong}`,
                            backgroundColor: C.bg,
                            color: C.text,
                            fontSize: "14px",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: C.text, marginBottom: "6px" }}>
                          CVV
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="123"
                          maxLength={4}
                          style={{
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: "8px",
                            border: `1px solid ${C.borderStrong}`,
                            backgroundColor: C.bg,
                            color: C.text,
                            fontSize: "14px",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Netbanking Tab */}
                {paymentMethod === "netbanking" && (
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: C.text, marginBottom: "10px" }}>
                      Select Bank
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      {["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank"].map((bank) => (
                        <div
                          key={bank}
                          style={{
                            padding: "10px",
                            borderRadius: "8px",
                            border: `1px solid ${C.borderStrong}`,
                            backgroundColor: C.bg,
                            fontSize: "13px",
                            color: C.text,
                            fontWeight: 500,
                            textAlign: "center",
                          }}
                        >
                          {bank}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Wallet Tab */}
                {paymentMethod === "wallet" && (
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: C.text, marginBottom: "10px" }}>
                      Select Wallet
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      {["PhonePe", "Paytm", "Amazon Pay", "Mobikwik"].map((w) => (
                        <div
                          key={w}
                          style={{
                            padding: "10px",
                            borderRadius: "8px",
                            border: `1px solid ${C.borderStrong}`,
                            backgroundColor: C.bg,
                            fontSize: "13px",
                            color: C.text,
                            fontWeight: 500,
                            textAlign: "center",
                          }}
                        >
                          {w}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pay Button inside Razorpay */}
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => triggerPaymentOutcome("success")}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: C.blue,
                    color: "#ffffff",
                    fontSize: "15px",
                    fontWeight: 700,
                    border: "none",
                    cursor: isProcessing ? "wait" : "pointer",
                    marginTop: "20px",
                    boxShadow: "0 8px 20px rgba(37, 99, 235, 0.35)",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.blueHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.blue)}
                >
                  {isProcessing ? "Processing..." : `Pay ${formatCurrency(totalNumeric)}`}
                </button>
              </div>
              {/* Razorpay Footer Security Badge */}
              <div
                style={{
                  backgroundColor: C.bg,
                  borderTop: `1px solid ${C.border}`,
                  padding: "12px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  fontSize: "11.5px",
                  color: C.textSubtle,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Secured by Razorpay · ISO 27001 & PCI DSS Level 1 Certified</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default CheckoutFlow;

