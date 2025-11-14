"use client";

import { useState } from "react";
import "./campaigns.css";

export default function CampaignsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Esta sería la data que luego vendrá del backend
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
  ];

  return (
    <div className="campaigns-container">
      <h1 className="campaigns-title">Campañas Activas</h1>
      <p className="campaigns-subtitle">
        Encuentra campañas disponibles y elige un horario para donar.
      </p>

      <div className="campaigns-grid">
        {campaigns.map((camp) => (
          <div key={camp.id} className="campaign-card">
            <h3 className="campaign-card-title">{camp.title}</h3>
            <p className="campaign-card-location">{camp.location}</p>

            <div className="capacity-box">
              <span>Total: {camp.capacity_total}</span>
              <span>Disponibles: {camp.capacity_available}</span>
            </div>

            <button
              className="details-button"
              onClick={() => setSelectedCampaign(camp)}
            >
              Ver detalles
            </button>
          </div>
        ))}
      </div>

      {selectedCampaign && (
        <div
          className="side-panel-overlay"
          onClick={() => setSelectedCampaign(null)}
        >
          <div className="side-panel" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-panel"
              onClick={() => setSelectedCampaign(null)}
            >
              ✕
            </button>

            <h2 className="panel-title">{selectedCampaign.title}</h2>
            <p className="panel-location">{selectedCampaign.location}</p>
            <p className="panel-description">{selectedCampaign.description}</p>

            <h3 className="panel-subtitle">Horarios disponibles</h3>

            <div className="slots-list">
              {selectedCampaign.slots.map((slot, i) => (
                <div
                  key={i}
                  className={`slot-item ${
                    slot.available ? "available" : "unavailable"
                  }`}
                >
                  {new Date(slot.slot_datetime).toLocaleString("es-ES")}
                </div>
              ))}
            </div>

            <button className="schedule-button">Agendar</button>
          </div>
        </div>
      )}
    </div>
  );
}
