"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import "./appointments.css";

export default function AppointmentsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const appointments = [
    {
      id: "appt_203",
      campaign: "Jornada de Donación UdeC",
      slot_datetime: "2025-11-15T09:00:00Z",
      status: "scheduled",
    },
    {
      id: "appt_172",
      campaign: "Donación Clínica La María",
      slot_datetime: "2025-08-20T10:00:00Z",
      status: "completed",
    },
    {
      id: "appt_222",
      campaign: "Donación Clínica La María",
      slot_datetime: "2025-08-20T10:00:00Z",
      status: "completed",
    },
    {
      id: "appt_223",
      campaign: "Donación Clínica La María",
      slot_datetime: "2025-08-20T10:00:00Z",
      status: "completed",
    },
    {
      id: "appt_224",
      campaign: "Donación Clínica La María",
      slot_datetime: "2025-08-20T10:00:00Z",
      status: "completed",
    },
  ];

  const campaigns = [
    {
      id: "camp_001",
      title: "Jornada de Donación UdeC",
      slots: [
        "2025-11-15T08:00:00Z",
        "2025-11-15T09:00:00Z",
        "2025-11-15T10:00:00Z",
      ],
    },
    {
      id: "camp_002",
      title: "Hospital Bocagrande",
      slots: ["2025-11-20T09:00:00Z", "2025-11-20T11:00:00Z"],
    },
  ];

  const handleSchedule = (e) => {
    e.preventDefault();
    alert("Cita agendada (simulado)");
    setSelectedCampaign("");
    setSelectedSlot("");
  };

  return (
    <motion.main
      className="appointments-page"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <header className="ap-header">
        <div>
          <h1 className="title">Mis Citas</h1>
          <p className="subtitle">
            Consulta tu historial y agenda nuevas citas cuando lo necesites.
          </p>
        </div>
      </header>

      <section className="content-grid">
        <motion.section
          className="appointments-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08, duration: 0.5 }}
        >
          <div className="appointment-list">
            {appointments.map((appt) => (
              <article className="appointment-card" key={appt.id}>
                <div className="appt-left">
                  <div className="appt-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#e53935"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="3" />
                      <path d="M16 2v4" />
                      <path d="M8 2v4" />
                      <path d="M3 10h18" />
                    </svg>
                  </div>

                  <div className="appt-meta">
                    <h2 className="appointment-campaign">{appt.campaign}</h2>
                    <p className="appointment-date">
                      {new Date(appt.slot_datetime).toLocaleString("es-ES")}
                    </p>
                  </div>
                </div>

                <div>
                  <span className={`appointment-status ${appt.status}`}>
                    {appt.status === "scheduled" ? "Agendada" : "Completada"}
                  </span>
                </div>
              </article>
            ))}

            {appointments.length === 0 && (
              <div className="empty-state">No tienes citas registradas.</div>
            )}
          </div>
        </motion.section>

        <motion.section
          className="schedule-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.5 }}
        >
          <h2 className="section-title">Agendar Nueva Cita</h2>

          <form className="schedule-form" onSubmit={handleSchedule}>
            <div className="form-row">
              <label htmlFor="campaign-select">Campaña</label>
              <select
                id="campaign-select"
                required
                value={selectedCampaign}
                onChange={(e) => {
                  setSelectedCampaign(e.target.value);
                  setSelectedSlot("");
                }}
              >
                <option value="">Selecciona una campaña</option>
                {campaigns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="slot-select">Horario disponible</label>
              <select
                id="slot-select"
                required
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                disabled={!selectedCampaign}
              >
                <option value="">Selecciona un horario</option>
                {selectedCampaign &&
                  campaigns
                    .find((c) => c.id === selectedCampaign)
                    .slots.map((slot, i) => (
                      <option key={i} value={slot}>
                        {new Date(slot).toLocaleString("es-ES")}
                      </option>
                    ))}
              </select>
            </div>

            <button
              type="submit"
              className="schedule-button"
              aria-disabled={!selectedCampaign || !selectedSlot}
              disabled={!selectedCampaign || !selectedSlot}
            >
              Reservar Cita
            </button>
          </form>
        </motion.section>
      </section>
    </motion.main>
  );
}
