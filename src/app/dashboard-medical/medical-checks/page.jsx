"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./medical-checks.css";
import { createMedicalCheck, getPendingMedicalChecks } from "../../lib/medicalChecks";

export default function MedicalChecksPage() {
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const [appointments, setAppointments] = useState([]);

  const [fields, setFields] = useState({
    bp: "",
    weight: "",
    cold: "false",
    surgery: "false",
    apt: "true",
    observ: "",
  });

  const [errors, setErrors] = useState({});
  const firstFieldRef = useRef(null);
  const modalRef = useRef(null);

  /*
  const [appointments, setAppointments] = useState([
    {
      id: "appt_203",
      donor: "Juan Pérez",
      campaign: "Jornada de Donación UdeC",
      datetime: "2025-11-15T09:00:00Z",
    },
    {
      id: "appt_204",
      donor: "María Torres",
      campaign: "Donación Clínica La María",
      datetime: "2025-11-22T10:00:00Z",
    },
  ]);
  */

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        const data = await getPendingMedicalChecks();
        setAppointments(data || []);
        setError("");
      } catch (err) {
        console.error("Error loading appointments:", err);
        setError("Error al cargar las citas. Intenta nuevamente.");
        setAppointments([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const openEvaluation = (appt) => {
    setSelectedAppointment(appt);
    setFields({
      bp: "",
      weight: "",
      cold: "false",
      surgery: "false",
      apt: "true",
      observ: "",
    });
    setErrors({});
    setOpenModal(true);
  };

  const closeEvaluation = () => {
    setOpenModal(false);
    setSelectedAppointment(null);
  };

  const saveEvaluation = async () => {
    if (!validate()) return;
    
    setIsSaving(true);
    setError("");

    try {
      // Preparar los datos según el formato que espera el backend
      const checkData = {
        appointment_id: selectedAppointment.id,
        answers: {
          has_cold: fields.cold === "true",
          recent_surgery: fields.surgery === "true",
        },
        vitals: {
          blood_pressure: fields.bp,
          weight: parseFloat(fields.weight),
        },
        apto: fields.apt === "true",
        reason_not_apto: fields.apt === "false" ? fields.observ : null,
      };

      await createMedicalCheck(checkData);

      // Remover de la lista local
      setAppointments((prev) =>
        prev.filter((a) => a.id !== selectedAppointment.id)
      );

      setSuccessModal(true);

      setTimeout(() => {
        setSuccessModal(false);
        closeEvaluation();
      }, 1600);
    } catch (err) {
      console.error("Error saving evaluation:", err);
      setError(err.message || "Error al guardar la evaluación. Intenta nuevamente.");
    } finally {
      setIsSaving(false);
    }
  };

  // CERRAR CON ESCAPE
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") closeEvaluation();
    };
    if (openModal) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [openModal]);

  // ENFOQUE AUTOMÁTICO AL MODAL
  useEffect(() => {
    if (openModal) {
      setTimeout(() => firstFieldRef.current?.focus(), 80);
    }
  }, [openModal]);

  // VALIDACIÓN
  const validate = () => {
    const newErr = {};

    if (!fields.bp.trim()) newErr.bp = "La presión arterial es obligatoria";
    if (!fields.weight.trim()) newErr.weight = "El peso es obligatorio";
    if (!fields.observ.trim())
      newErr.observ = "Las observaciones son obligatorias";

    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleField = (key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  return (
    <motion.main
      className="checks-container"
      role="main"
      aria-labelledby="page-title"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <header className="checks-header">
        <h2 id="page-title" tabIndex="0">
          Evaluaciones Médicas
        </h2>
        <p tabIndex="0">
          Evalúa a cada donante antes de su donación. Todas las citas aquí
          requieren una revisión médica previa.
        </p>
      </header>
      {error && (
        <div className="error-banner" role="alert">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="loading-state">
          Cargando evaluaciones...
        </div>
      )}
      <section
        className="checks-list"
        aria-label="Citas pendientes de evaluación"
      >
        {appointments.length === 0 ? (
          <div className="empty-state" role="status" aria-live="polite">
            <div className="empty-icon">🩺</div>
            <h3>No hay evaluaciones pendientes</h3>
            <p>Todos los donantes han sido evaluados correctamente.</p>
          </div>
        ) : (
          appointments.map((appt) => (
            <motion.div
              key={appt.id}
              className="check-card"
              role="group"
              tabIndex="0"
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
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
              </div>

              <button
                className="evaluate-button"
                onClick={() => openEvaluation(appt)}
                aria-label={`Abrir evaluación médica para ${appt.donor}`}
              >
                Evaluar
              </button>
            </motion.div>
          ))
        )}
      </section>

      <AnimatePresence>
        {openModal && (
          <motion.div
            className="modal-backdrop"
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeEvaluation}
          >
            <motion.div
              ref={modalRef}
              className="modal-card"
              tabIndex="-1"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 id="modal-title">Evaluación médica</h3>

              <p className="modal-sub">
                Donante: <strong>{selectedAppointment?.donor}</strong>
              </p>

              <form className="modal-form" noValidate>
                <div className="input-group">
                  <label htmlFor="bp">Presión arterial</label>
                  <input
                    id="bp"
                    ref={firstFieldRef}
                    aria-invalid={!!errors.bp}
                    aria-describedby="err-bp"
                    value={fields.bp}
                    onChange={(e) => handleField("bp", e.target.value)}
                    placeholder="120/80"
                  />
                  {errors.bp && (
                    <span id="err-bp" className="error-text">
                      {errors.bp}
                    </span>
                  )}
                </div>

                <div className="input-group">
                  <label htmlFor="weight">Peso (kg)</label>
                  <input
                    id="weight"
                    type="number"
                    aria-invalid={!!errors.weight}
                    aria-describedby="err-weight"
                    value={fields.weight}
                    onChange={(e) => handleField("weight", e.target.value)}
                    placeholder="68"
                  />
                  {errors.weight && (
                    <span id="err-weight" className="error-text">
                      {errors.weight}
                    </span>
                  )}
                </div>

                <div className="input-group">
                  <label htmlFor="cold">¿Resfriado reciente?</label>
                  <select
                    id="cold"
                    value={fields.cold}
                    onChange={(e) => handleField("cold", e.target.value)}
                  >
                    <option value="false">No</option>
                    <option value="true">Sí</option>
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="surgery">¿Cirugía reciente?</label>
                  <select
                    id="surgery"
                    value={fields.surgery}
                    onChange={(e) => handleField("surgery", e.target.value)}
                  >
                    <option value="false">No</option>
                    <option value="true">Sí</option>
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="apt">Apto para donar</label>
                  <select
                    id="apt"
                    value={fields.apt}
                    onChange={(e) => handleField("apt", e.target.value)}
                  >
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="observ">Observaciones</label>
                  <textarea
                    id="observ"
                    aria-invalid={!!errors.observ}
                    aria-describedby="err-observ"
                    value={fields.observ}
                    onChange={(e) => handleField("observ", e.target.value)}
                    placeholder="Sin contraindicaciones"
                  />
                  {errors.observ && (
                    <span id="err-observ" className="error-text">
                      {errors.observ}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  className="submit-evaluation"
                  disabled={!fields.bp || !fields.weight || !fields.observ || isSaving}
                  aria-disabled={!fields.bp || !fields.weight || !fields.observ || isSaving}
                  onClick={saveEvaluation}
                >
                  {isSaving ? "Guardando..." : "Guardar evaluación"}
                </button>
              </form>

              <button
                className="close-modal"
                onClick={closeEvaluation}
                aria-label="Cerrar modal"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {successModal && (
          <motion.div
            className="success-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="success-modal"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
            >
              <div className="success-check">✔</div>
              <p>Evaluación registrada correctamente</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
