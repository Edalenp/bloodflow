"use client";

import { useState } from "react";
import "./appointments.css";

export default function AppointmentsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  // Data simulada que luego vendrá del backend
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
  };

  return (
    <div className="appointments-page">
      <h1 className="title">Mis Citas</h1>
      <p className="subtitle">
        Consulta tu historial y agenda nuevas citas cuando lo necesites.
      </p>

      <section className="appointments-section">
        <h2 className="section-title">Citas Agendadas</h2>

        <div className="appointment-list">
          {appointments.map((appt) => (
            <div className="appointment-card" key={appt.id}>
              <h3 className="appointment-campaign">{appt.campaign}</h3>

              <p className="appointment-date">
                {new Date(appt.slot_datetime).toLocaleString("es-ES")}
              </p>

              <span className={`appointment-status ${appt.status}`}>
                {appt.status === "scheduled" ? "Agendada" : "Completada"}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="schedule-section">
        <h2 className="section-title">Agendar Nueva Cita</h2>

        <form className="schedule-form" onSubmit={handleSchedule}>
          <div className="form-group">
            <label>Campaña</label>
            <select
              required
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
            >
              <option value="">Selecciona una campaña</option>
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Horario disponible</label>
            <select
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

          <button type="submit" className="schedule-button">
            Reservar Cita
          </button>
        </form>
      </section>
    </div>
  );
}
