"use client";

import { useEffect, useRef, useState } from "react";

export default function ServiceCard({ icon, title, text, index }) {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cardRefCurrent = cardRef.current;

    if (cardRefCurrent) observer.observe(cardRefCurrent);

    return () => {
      if (cardRefCurrent) observer.unobserve(cardRefCurrent);
    };
  }, []);

  const direction = index % 2 === 0 ? "from-left" : "from-right";

  return (
    <div
      ref={cardRef}
      className={`service-card ${
        isVisible ? `visible ${direction}` : "hidden"
      }`}
    >
      <div className="service-header">
        <div className="service-icon">{icon}</div>
        <h2 className="service-title">{title}</h2>
      </div>
      <p className="service-description">{text}</p>
    </div>
  );
}
