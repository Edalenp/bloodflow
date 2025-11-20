"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import "./campaigns.css";
import { useEffect } from "react"; 
import { getAllCampaigns } from "../../lib/campaigns"; 

export default function CampaignsPage() {
  const router = useRouter();
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
/*
  const campaigns = [
    {
      id: "camp_001",
      title: "Jornada de Donación UdeC",
      location: "Hospital Universitario del Caribe",
      start_date: "2025-11-15T08:00:00Z",
      end_date: "2025-11-15T16:00:00Z",
      capacity_total: 50,
      capacity_available: 20,
      description: "Donación voluntaria organizada con apoyo universitario.",
      slots: [
        { slot_datetime: "2025-11-15T09:00:00Z", available: true },
        { slot_datetime: "2025-11-15T10:00:00Z", available: false },
      ],
    },
    {
      id: "camp_002",
      title: "Jornada Hospital Bocagrande",
      location: "Hospital Bocagrande",
      start_date: "2025-11-20T08:00:00Z",
      end_date: "2025-11-20T16:00:00Z",
      capacity_total: 40,
      capacity_available: 15,
      description: "Campaña abierta a toda la comunidad.",
      slots: [
        { slot_datetime: "2025-11-20T09:00:00Z", available: true },
        { slot_datetime: "2025-11-20T11:00:00Z", available: true },
      ],
    },
    {
      id: "camp_003",
      title: "Jornada en Universidad Tecnológica",
      location: "UTB - Campus Norte",
      start_date: "2025-11-25T08:30:00Z",
      end_date: "2025-11-25T14:30:00Z",
      capacity_total: 60,
      capacity_available: 5,
      description: "Campaña abierta a toda la comunidad.",
      slots: [
        { slot_datetime: "2025-11-20T09:00:00Z", available: true },
        { slot_datetime: "2025-11-20T11:00:00Z", available: true },
      ],
    },
    {
      id: "camp_004",
      title: "Jornada en Universidad Tecnológica",
      location: "UTB - Campus Norte",
      start_date: "2025-11-25T08:30:00Z",
      end_date: "2025-11-25T14:30:00Z",
      capacity_total: 60,
      capacity_available: 5,
      description: "Campaña abierta a toda la comunidad.",
      slots: [
        { slot_datetime: "2025-11-20T09:00:00Z", available: true },
        { slot_datetime: "2025-11-20T11:00:00Z", available: true },
      ],
    },
    {
      id: "camp_005",
      title: "Jornada en Universidad Tecnológica",
      location: "UTB - Campus Norte",
      start_date: "2025-11-25T08:30:00Z",
      end_date: "2025-11-25T14:30:00Z",
      capacity_total: 60,
      capacity_available: 5,
      description: "Campaña abierta a toda la comunidad.",
      slots: [
        { slot_datetime: "2025-11-20T09:00:00Z", available: true },
        { slot_datetime: "2025-11-20T11:00:00Z", available: true },
      ],
    },
    {
      id: "camp_006",
      title: "Jornada en Universidad Tecnológica",
      location: "UTB - Campus Norte",
      start_date: "2025-11-25T08:30:00Z",
      end_date: "2025-11-25T14:30:00Z",
      capacity_total: 60,
      capacity_available: 5,
      description: "Campaña abierta a toda la comunidad.",
      slots: [
        { slot_datetime: "2025-11-20T09:00:00Z", available: true },
        { slot_datetime: "2025-11-20T11:00:00Z", available: true },
      ],
    },
  ];
  */

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        const data = await getAllCampaigns();
        setCampaigns(data);
        setError("");
      } catch (err) {
        console.error("Error loading campaigns:", err);
        setError("Error al cargar las campañas. Intenta nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const goToAppointments = () => {
    setIsExiting(true);
    setTimeout(() => router.push("/dashboard-donors/appointments"), 350);
  };

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          key="campaigns-page"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="camp-container"
        >
          {error && (
            <div className="error-banner" role="alert">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="loading-state">
              Cargando campañas...
            </div>
          )}
          <div className="camp-header">
            <h1>Campañas Activas</h1>
            <p>Encuentra campañas disponibles y elige un horario para donar.</p>
          </div>

          <div className="camp-grid">
            {campaigns.map((camp) => (
              <div key={camp.id} className="camp-card">
                <div className="camp-title-row">
                  <svg
                    className="camp-icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#e53935"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2C8 6 5 9.5 5 13a7 7 0 0 0 14 0c0-3.5-3-7-7-11z" />
                  </svg>

                  <h2>{camp.title}</h2>
                </div>

                <p className="location">{camp.location}</p>

                <div className="capacity">
                  <span>Total: {camp.capacity_total}</span>
                  <span>Disponibles: {camp.capacity_available}</span>
                </div>

                <button
                  className="camp-btn"
                  onClick={() => setSelectedCampaign(camp)}
                >
                  Ver detalles
                </button>
              </div>
            ))}
          </div>

          {selectedCampaign && (
            <div
              className="panel-overlay"
              onClick={() => setSelectedCampaign(null)}
            >
              <div className="panel" onClick={(e) => e.stopPropagation()}>
                <button
                  className="close-btn"
                  onClick={() => setSelectedCampaign(null)}
                >
                  ✕
                </button>

                <h2 className="panel-title">{selectedCampaign.title}</h2>
                <p className="panel-location">{selectedCampaign.location}</p>
                <p className="panel-description">
                  {selectedCampaign.description}
                </p>

                <h3 className="panel-subtitle">Horarios disponibles</h3>

                <div className="slot-list">
                  {selectedCampaign.slots && selectedCampaign.slots.length > 0 ? (
                    selectedCampaign.slots.map((slot, i) => (
                      <div
                        key={i}
                        className={`slot ${slot.available ? "free" : "taken"}`}
                      >
                        {new Date(slot.slot_datetime).toLocaleString("es-ES")}
                      </div>
                    ))
                  ) : (
                    <div className="slot empty">
                      No hay horarios disponibles para esta campaña.
                    </div>
                  )}
                </div>

                <button
                  className="panel-schedule-btn"
                  onClick={goToAppointments}
                >
                  Agendar
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
