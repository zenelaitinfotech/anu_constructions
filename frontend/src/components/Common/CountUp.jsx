import React, { useState, useEffect, useRef } from "react";

/**
 * CountUp Component
 * Animates numbers when they enter the viewport.
 * Supports numbers with prefixes, commas, and suffixes (e.g. 20+, 2,500+, 500+, 50+, ₹10Cr+, 96%, 45).
 */
export default function CountUp({ value, duration = 1600, className = "" }) {
  const [displayValue, setDisplayValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.15 }
    );

    const el = elementRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const str = String(value ?? "");
    // Match prefix, numeric portion, and suffix
    const match = str.match(/^([^\d]*)([\d,.]+)(.*)$/);
    if (!match) {
      setDisplayValue(str);
      return;
    }

    const prefix = match[1] || "";
    const rawNum = match[2];
    const suffix = match[3] || "";

    const hasCommas = rawNum.includes(",");
    const isDecimal = rawNum.includes(".");
    const decimalPlaces = isDecimal ? rawNum.split(".")[1].length : 0;
    const targetNumber = parseFloat(rawNum.replace(/,/g, ""));

    if (isNaN(targetNumber) || targetNumber === 0) {
      setDisplayValue(str);
      return;
    }

    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Cubic ease out
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentNumber = easeProgress * targetNumber;

      let formattedNumber = isDecimal
        ? currentNumber.toFixed(decimalPlaces)
        : Math.round(currentNumber).toString();

      if (hasCommas) {
        const parts = formattedNumber.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        formattedNumber = parts.join(".");
      }

      setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(str);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasAnimated, value, duration]);

  const initialRender = () => {
    const str = String(value ?? "");
    const match = str.match(/^([^\d]*)([\d,.]+)(.*)$/);
    if (!match) return str;
    return `${match[1] || ""}0${match[3] || ""}`;
  };

  return (
    <span
      ref={elementRef}
      className={`runnable-number ${className}`}
      style={{
        display: "inline-block",
        fontVariantNumeric: "tabular-nums"
      }}
    >
      {hasAnimated ? displayValue : initialRender()}
    </span>
  );
}
