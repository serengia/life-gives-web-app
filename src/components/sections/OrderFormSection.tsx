"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { PRODUCTS, WHATSAPP_BUSINESS_E164 } from "@/lib/constants";

const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy";

const REFERRAL_OPTIONS = [
  "Instagram",
  "Facebook",
  "WhatsApp",
  "Friend/Family",
  "Twitter/X",
  "Other",
] as const;

const [completeBook, fullToolkit] = PRODUCTS;

function countDigits(value: string) {
  return value.replace(/\D/g, "").length;
}

const inputBase =
  "w-full rounded-lg border bg-white/5 px-4 py-2.5 text-white placeholder:text-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gold";

export default function OrderFormSection() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [productId, setProductId] = useState(completeBook.id);
  const [referral, setReferral] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const nameInvalid = submitted && !fullName.trim();
  const phoneInvalid = submitted && countDigits(phone) < 9;
  const locationInvalid = submitted && !deliveryLocation.trim();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    if (
      !fullName.trim() ||
      countDigits(phone) < 9 ||
      !deliveryLocation.trim()
    ) {
      return;
    }

    const product =
      productId === fullToolkit.id ? fullToolkit : completeBook;

    let message = `Hello! I'd like to order:
Name: ${fullName.trim()}
Phone: ${phone.trim()}
Location: ${deliveryLocation.trim()}
Product: ${product.name} — ${product.priceLabel}`;

    if (email.trim()) {
      message += `\nEmail: ${email.trim()}`;
    }
    if (referral) {
      message += `\nHow I heard about you: ${referral}`;
    }

    const url = `https://wa.me/${WHATSAPP_BUSINESS_E164}?text=${encodeURIComponent(message)}`;
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      window.location.href = url;
    }
    setSuccess(true);
  }

  function resetForm() {
    setSuccess(false);
    setSubmitted(false);
    setFullName("");
    setPhone("");
    setEmail("");
    setDeliveryLocation("");
    setProductId(completeBook.id);
    setReferral("");
  }

  if (success) {
    return (
      <div className="mx-auto max-w-lg">
        <div
          className="rounded-2xl border-2 border-gold bg-navy p-8 text-center shadow-lg"
          role="status"
          aria-live="polite"
        >
          <Check
            className="mx-auto h-12 w-12 text-gold"
            strokeWidth={2.5}
            aria-hidden
          />
          <p className="mt-4 font-heading text-xl font-semibold text-white">
            You&apos;re almost done
          </p>
          <p className="mt-3 text-sm text-gray-300">
            Your order draft was opened in WhatsApp. Send the message there to
            confirm your order.
          </p>
          <button
            type="button"
            onClick={resetForm}
            className={`mt-6 w-full rounded-lg border-2 border-gold bg-transparent px-6 py-3 text-sm font-bold text-gold transition-colors hover:bg-gold hover:text-white ${focus}`}
          >
            Place another order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="rounded-2xl border-2 border-gold bg-navy p-6 shadow-lg md:p-8">
        <h3 className="text-center font-heading text-2xl font-semibold text-white md:text-3xl">
          Place Your Order
        </h3>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
          <div>
            <label htmlFor="order-full-name" className="block text-sm text-gray-200">
              Full name <span className="text-gold">*</span>
            </label>
            <input
              id="order-full-name"
              name="fullName"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              aria-invalid={nameInvalid}
              className={`mt-1.5 ${inputBase} ${nameInvalid ? "border-red-500 focus:ring-red-500" : "border-white/15"}`}
            />
            {nameInvalid ? (
              <p id="order-name-error" className="mt-1 text-sm text-red-400">
                Please enter your full name.
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="order-phone" className="block text-sm text-gray-200">
              Phone number <span className="text-gold">*</span>
            </label>
            <input
              id="order-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="e.g. 712345678 or +254 712 345 678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={phoneInvalid}
              aria-describedby="order-phone-hint"
              className={`mt-1.5 ${inputBase} ${phoneInvalid ? "border-red-500 focus:ring-red-500" : "border-white/15"}`}
            />
            <p id="order-phone-hint" className="mt-1 text-xs text-gray-400">
              Use your number with Kenya country code (+254).
            </p>
            {phoneInvalid ? (
              <p id="order-phone-error" className="mt-1 text-sm text-red-400">
                Enter at least 9 digits (including your number after 254).
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="order-email" className="block text-sm text-gray-200">
              Email <span className="text-gray-500">(optional)</span>
            </label>
            <input
              id="order-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1.5 ${inputBase} border-white/15`}
            />
          </div>

          <div>
            <label
              htmlFor="order-location"
              className="block text-sm text-gray-200"
            >
              Location / town for delivery <span className="text-gold">*</span>
            </label>
            <input
              id="order-location"
              name="location"
              type="text"
              autoComplete="address-level2"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              aria-invalid={locationInvalid}
              className={`mt-1.5 ${inputBase} ${locationInvalid ? "border-red-500 focus:ring-red-500" : "border-white/15"}`}
            />
            {locationInvalid ? (
              <p id="order-location-error" className="mt-1 text-sm text-red-400">
                Please enter your delivery location.
              </p>
            ) : null}
          </div>

          <fieldset className="space-y-3">
            <legend className="text-sm text-gray-200">
              Product <span className="text-gold">*</span>
            </legend>
            <label
              className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 p-3 transition-colors ${productId === completeBook.id ? "border-gold bg-white/5" : "border-white/15 hover:border-white/25"}`}
            >
              <input
                type="radio"
                name="product"
                value={completeBook.id}
                checked={productId === completeBook.id}
                onChange={() => setProductId(completeBook.id)}
                className="mt-1 h-4 w-4 shrink-0 accent-gold"
              />
              <span className="text-sm text-gray-100">
                <span className="font-semibold text-white">
                  {completeBook.name}
                </span>
                <span className="text-gray-300"> — {completeBook.priceLabel}</span>
              </span>
            </label>
            <label
              className={`relative flex cursor-pointer items-start gap-3 rounded-lg border-2 p-3 pr-24 transition-colors ${productId === fullToolkit.id ? "border-gold bg-white/5" : "border-white/15 hover:border-white/25"}`}
            >
              <input
                type="radio"
                name="product"
                value={fullToolkit.id}
                checked={productId === fullToolkit.id}
                onChange={() => setProductId(fullToolkit.id)}
                className="mt-1 h-4 w-4 shrink-0 accent-gold"
              />
              <span className="text-sm text-gray-100">
                <span className="font-semibold text-white">
                  {fullToolkit.name}
                </span>
                <span className="text-gray-300"> — {fullToolkit.priceLabel}</span>
              </span>
              <span className="absolute right-3 top-3 rounded-md bg-gold px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-navy">
                BEST VALUE
              </span>
            </label>
          </fieldset>

          <div>
            <label htmlFor="order-referral" className="block text-sm text-gray-200">
              How did you hear about us?{" "}
              <span className="text-gray-500">(optional)</span>
            </label>
            <select
              id="order-referral"
              name="referral"
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
              className={`mt-1.5 ${inputBase} cursor-pointer border-white/15 pr-10`}
            >
              <option value="">Select an option</option>
              {REFERRAL_OPTIONS.map((opt) => (
                <option key={opt} value={opt} className="bg-navy text-white">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className={`w-full rounded-lg bg-gold px-6 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-amber-600 ${focus}`}
          >
            Place My Order
          </button>

          <p className="text-center text-sm text-gray-300">
            You&apos;ll be redirected to WhatsApp to confirm your order.
          </p>
        </form>
      </div>
    </div>
  );
}
