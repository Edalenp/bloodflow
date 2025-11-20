"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./donations.css";
import { createDonation, getPendingDonations } from "../../lib/donations";

export default function DonationsPage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [formData, setFormData] = useState({
    volume: "",
    bloodType: "",
    observ: "",
  });
  const [errors, setErrors] = useState({});
  const [donationsPending, setDonationsPending] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  
  const modalRef = useRef(null);

  // Cargar donaciones pendientes desde el backend
  useEffect(() => {
    const fetchPendingDonations = async () => {
      try {
        setIsLoading(true);
        const data = await getPendingDonations();
        setDonationsPending(data || []);
        setError("");
      } catch (err) {
        console.error("Error loading donations:", err);
        setError(err.message || "Error al cargar las donaciones. Intenta nuevamente.");
        setDonationsPending([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingDonations();
  }, []);

  const openDonationModal = (appt) => {
    setSelectedAppt(appt);
    setFormData({
      volume: "",
      bloodType: appt.blood_type,
      observ: "",
    });
    setErrors({});
    setOpenModal(true);
  };

  const closeDonationModal = () => {
    setOpenModal(false);
    setSelectedAppt(null);
  };

  // ACCESSIBILITY: ESC close
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && closeDonationModal();
    if (openModal) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [openModal]);

  // Focus modal on open
  useEffect(() => {
    if (openModal && modalRef.current) modalRef.current.focus();
  }, [openModal]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.volume) newErrors.volume = "El volumen es requerido.";
    if (!formData.bloodType)
      newErrors.bloodType = "El tipo de sangre es requerido.";
    if (!formData.observ)
      newErrors.observ = "Las observaciones son requeridas.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveDonation = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);
    setError("");

    try {
      const donationData = {
        appointment_id: selectedAppt.id, // UUID de la cita seleccionada
        volume_ml: parseInt(formData.volume),
        blood_type: formData.bloodType,
        observations: formData.observ,
      };

      await createDonation(donationData);

      // Remover de la lista local
      setDonationsPending((prev) => prev.filter((d) => d.id !== selectedAppt.id));

      closeDonationModal();
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Error saving donation:", err);
      setError(err.message || "Error al registrar la donación. Intenta nuevamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <motion.main
        className="donations-container"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        aria-label="Página de registro de donaciones"
      >
        <header className="donations-header">
          <h2 tabIndex="0">Registrar Donaciones</h2>
          <p tabIndex="0">
            Confirma la extracción de sangre y actualiza el inventario del
            banco.
          </p>
        </header>
        
        {error && (
          <div className="error-banner" role="alert">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="loading-state">
            Cargando donaciones pendientes...
          </div>
        )}

        <section className="donations-list" aria-label="Donaciones pendientes">
          {!isLoading && donationsPending.length === 0 && (
            <div className="no-donations" role="status" aria-live="polite">
              <div className="no-donations-icon">🩸</div>
              <h3>No hay donaciones pendientes</h3>
              <p>Todos los donantes han sido registrados correctamente.</p>
            </div>
          )}

          {donationsPending.map((appt) => (
            <motion.div
              key={appt.id}
              className="donation-card"
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.2 }}
            >
              <div>
                <h3>{appt.donor}</h3>
                <p className="campaign">{appt.campaign}</p>
                <p className="date">
                  {new Date(appt.datetime).toLocaleString("es-ES", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <p className="blood-type">
                  Tipo de sangre: <strong>{appt.blood_type}</strong>
                </p>
              </div>

              <button
                className="register-button"
                onClick={() => openDonationModal(appt)}
                aria-label={`Registrar donación de ${appt.donor}`}
              >
                Registrar donación
              </button>
            </motion.div>
          ))}
        </section>
      </motion.main>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="success-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="success-modal"
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.75, opacity: 0 }}
            >
              <div className="success-check">✔</div>
              <p>Donación registrada correctamente</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openModal && (
          <motion.div
            className="modal-backdrop"
            aria-modal="true"
            role="dialog"
            onClick={closeDonationModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-card"
              ref={modalRef}
              tabIndex="-1"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
            >
              <h3>Registrar donación</h3>
              <p className="modal-sub">
                Donante: <strong>{selectedAppt?.donor}</strong>
              </p>

              <form onSubmit={saveDonation} className="modal-form">
                <div className="input-group">
                  <label htmlFor="volume">Volumen extraído (ml)</label>
                  <input
                    id="volume"
                    type="number"
                    value={formData.volume}
                    onChange={(e) => handleChange("volume", e.target.value)}
                    aria-invalid={!!errors.volume}
                    aria-describedby={errors.volume ? "err-volume" : undefined}
                    placeholder="450"
                  />
                  {errors.volume && (
                    <p className="error-text" id="err-volume">
                      {errors.volume}
                    </p>
                  )}
                </div>

                <div className="input-group">
                  <label htmlFor="bloodType">Tipo de sangre</label>
                  <input
                    id="bloodType"
                    type="text"
                    value={formData.bloodType}
                    onChange={(e) => handleChange("bloodType", e.target.value)}
                    aria-invalid={!!errors.bloodType}
                    aria-describedby={
                      errors.bloodType ? "err-blood" : undefined
                    }
                    readOnly
                  />
                  {errors.bloodType && (
                    <p className="error-text" id="err-blood">
                      {errors.bloodType}
                    </p>
                  )}
                </div>

                <div className="input-group">
                  <label htmlFor="observ">Observaciones</label>
                  <textarea
                    id="observ"
                    value={formData.observ}
                    onChange={(e) => handleChange("observ", e.target.value)}
                    aria-invalid={!!errors.observ}
                    aria-describedby={errors.observ ? "err-observ" : undefined}
                    placeholder="Ingrese observaciones sobre la donación..."
                    rows="4"
                  ></textarea>
                  {errors.observ && (
                    <p className="error-text" id="err-observ">
                      {errors.observ}
                    </p>
                  )}
                </div>

                <button 
                  className="submit-donation" 
                  type="submit"
                  disabled={isSaving}
                >
                  {isSaving ? "Guardando..." : "Guardar registro"}
                </button>
              </form>

              <button
                className="close-modal"
                onClick={closeDonationModal}
                aria-label="Cerrar modal"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}