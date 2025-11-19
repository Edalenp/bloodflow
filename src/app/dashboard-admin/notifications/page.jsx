"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./notifications.css";
import { sendNotification } from "../../lib/notifications";

export default function SendNotificationPage() {
  const [formData, setFormData] = useState({
    user_id: "",
    type: "email",
    subject: "",
    body: "",
  });

  const [statusMessage, setStatusMessage] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setStatusMessage({
        type: "error",
        text: "Por favor, completa todos los campos requeridos.",
      });
      return;
    }

    setIsSending(true);
    setStatusMessage(null);

    try {
      await sendNotification(formData);

      setStatusMessage({
        type: "success",
        text: "Notificación programada correctamente.",
      });

      // Limpiar formulario después del éxito
      setFormData({
        user_id: "",
        type: "email",
        subject: "",
        body: "",
      });
      setErrors({});

      setTimeout(() => {
        setStatusMessage(null);
      }, 2000);
    } catch (err) {
      console.error("Error sending notification:", err);
      setStatusMessage({
        type: "error",
        text: err.message || "Error al enviar la notificación. Intenta nuevamente.",
      });
    } finally {
      setIsSending(false);
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.user_id.trim()) {
      newErrors.user_id = "El ID del usuario es requerido.";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "El asunto es requerido.";
    }
    
    if (!formData.body.trim()) {
      newErrors.body = "El mensaje es requerido.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <main
      className="notifications-page"
      role="main"
      aria-labelledby="notifications-title"
    >
      <h1 id="notifications-title" className="notifications-title" tabIndex="0">
        Enviar Notificación
      </h1>

      <AnimatePresence>
        {statusMessage && (
          <motion.div
            key="status"
            className={`status-message ${
              statusMessage.type === "success" ? "success" : "error"
            }`}
            role="alert"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            {statusMessage.text}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section
        className="notifications-card"
        aria-label="Formulario para enviar notificaciones"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <form onSubmit={handleSubmit} className="notification-form" noValidate>
          <div className="input-group">
            <label htmlFor="user_id">ID del usuario</label>
            <input
              type="text"
              id="user_id"
              placeholder="Ej: user_83ab1"
              required
              value={formData.user_id}
              onChange={(e) => {
                setFormData({ ...formData, user_id: e.target.value });
                setErrors({ ...errors, user_id: "" });
              }}
              aria-required="true"
              aria-invalid={!!errors.user_id}
              disabled={isSending}
            />
            {errors.user_id && (
              <p className="error-text">{errors.user_id}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="type">Tipo de notificación</label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              aria-required="true"
              disabled={isSending}
            >
              <option value="email">Correo electrónico</option>
              <option value="sms">SMS</option>
              <option value="push">Notificación push</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="subject">Asunto</label>
            <input
              type="text"
              id="subject"
              placeholder="Recordatorio de Cita"
              required
              value={formData.subject}
              onChange={(e) => {
                setFormData({ ...formData, subject: e.target.value });
                setErrors({ ...errors, subject: "" });
              }}
              aria-required="true"
              aria-invalid={!!errors.subject}
              disabled={isSending}
            />
            {errors.subject && (
              <p className="error-text">{errors.subject}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="body">Mensaje</label>
            <textarea
              id="body"
              rows="6"
              placeholder="Escribe el mensaje que se enviará al usuario..."
              required
              value={formData.body}
              onChange={(e) => {
                setFormData({ ...formData, body: e.target.value });
                setErrors({ ...errors, body: "" });
              }}
              aria-required="true"
              aria-invalid={!!errors.body}
              disabled={isSending}
            ></textarea>
            {errors.body && (
              <p className="error-text">{errors.body}</p>
            )}
          </div>

          <button 
            type="submit" 
            className="send-button"
            disabled={isSending}
          >
            {isSending ? "Enviando..." : "Enviar notificación"}
          </button>
        </form>
      </motion.section>
    </main>
  );
}
