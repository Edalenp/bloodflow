"use client";

import { useState } from "react";
import "./donations.css";

export default function DonationsPage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);

  // DATA SIMULADA (solo UI)
  const donationsPending = [
    {
      id: "appt_203",
      donor: "Juan Pérez",
      blood_type: "O+",
      campaign: "Jornada de Donación UdeC",
      datetime: "2025-11-15T09:00:00Z",
      apto: true,
    },
    {
      id: "appt_208",
      donor: "Laura Gómez",
      blood_type: "A+",
      campaign: "Donación Clínica La María",
      datetime: "2025-11-22T10:30:00Z",
      apto: true,
    },
  ];

  const openDonationModal = (appt) => {
    setSelectedAppt(appt);
    setOpenModal(true);
  };

  const closeDonationModal = () => {
    setSelectedAppt(null);
    setOpenModal(false);
  };

  return (
    <div className="donations-container">
      <div className="donations-header">
        <h2>Registrar Donaciones</h2>
        <p>
          Confirma la extracción de sangre de un donante y actualiza el
          inventario del banco de sangre.
        </p>
      </div>

      <div className="donations-list">
        {donationsPending.map((appt) => (
          <div key={appt.id} className="donation-card">
            <div>
              <h3>{appt.donor}</h3>
              <p className="campaign">{appt.campaign}</p>

              <p className="date">
                {new Date(appt.datetime).toLocaleString("es-ES", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>

              <p className="blood-type">Tipo de sangre: {appt.blood_type}</p>
            </div>

            <button
              className="register-button"
              onClick={() => openDonationModal(appt)}
            >
              Registrar donación
            </button>
          </div>
        ))}
      </div>

      {openModal && (
        <div className="modal-backdrop" onClick={closeDonationModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Registrar donación</h3>
            <p className="modal-sub">
              Donante: <strong>{selectedAppt?.donor}</strong>
            </p>

            <form className="modal-form">
              <div className="input-group">
                <label>Volumen extraído (ml)</label>
                <input type="number" placeholder="450" />
              </div>

              <div className="input-group">
                <label>Tipo de sangre</label>
                <input type="text" placeholder={selectedAppt?.blood_type} />
              </div>

              <div className="input-group">
                <label>Observaciones</label>
                <textarea placeholder="Extracción exitosa" />
              </div>

              <button className="submit-donation">Guardar registro</button>
            </form>

            <button className="close-modal" onClick={closeDonationModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
