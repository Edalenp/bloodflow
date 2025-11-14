"use client";

import { useState } from "react";
import "./medical-checks.css";

export default function MedicalChecksPage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Datos simulados (UI ONLY)
  const appointments = [
    {
      id: "appt_203",
      donor: "Juan Pérez",
      campaign: "Jornada de Donación UdeC",
      datetime: "2025-11-15T09:00:00Z",
      status: "pending",
    },
    {
      id: "appt_204",
      donor: "María Torres",
      campaign: "Donación Clínica La María",
      datetime: "2025-11-22T10:00:00Z",
      status: "pending",
    },
  ];

  const handleOpenModal = (appt) => {
    setSelectedAppointment(appt);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="checks-container">
      <div className="checks-header">
        <h2>Evaluaciones Médicas</h2>
        <p>
          Registra la aptitud del donante antes de realizar su donación. Solo se
          muestran citas pendientes por evaluar.
        </p>
      </div>

      <div className="checks-list">
        {appointments.map((appt) => (
          <div key={appt.id} className="check-card">
            <div>
              <h3>{appt.donor}</h3>
              <p className="campaign">{appt.campaign}</p>
              <p className="date">
                {new Date(appt.datetime).toLocaleString("es-ES", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>

            <button
              className="evaluate-button"
              onClick={() => handleOpenModal(appt)}
            >
              Realizar evaluación
            </button>
          </div>
        ))}
      </div>

      {openModal && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Evaluación médica</h3>
            <p className="modal-sub">
              Donante: <strong>{selectedAppointment?.donor}</strong>
            </p>

            <form className="modal-form">
              <div className="input-group">
                <label>Presión arterial</label>
                <input type="text" placeholder="120/80" />
              </div>

              <div className="input-group">
                <label>Peso (kg)</label>
                <input type="number" placeholder="68" />
              </div>

              <div className="input-group">
                <label>¿Resfriado reciente?</label>
                <select>
                  <option value="false">No</option>
                  <option value="true">Sí</option>
                </select>
              </div>

              <div className="input-group">
                <label>¿Cirugía reciente?</label>
                <select>
                  <option value="false">No</option>
                  <option value="true">Sí</option>
                </select>
              </div>

              <div className="input-group">
                <label>Apto para donar</label>
                <select>
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="input-group">
                <label>Observaciones</label>
                <textarea placeholder="Sin contraindicaciones" />
              </div>

              <button className="submit-evaluation">Guardar evaluación</button>
            </form>

            <button className="close-modal" onClick={handleCloseModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
