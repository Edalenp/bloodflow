"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./notifications.css";

export default function SendNotificationPage() {
  const [formData, setFormData] = useState({
    user_id: "",
    type: "email",
    subject: "",
    body: "",
  });

  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setStatusMessage({
      type: "success",
      text: "Notificación programada correctamente.",
    });

    setTimeout(() => {
      setStatusMessage(null);
    }, 2000);
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
              onChange={(e) =>
                setFormData({ ...formData, user_id: e.target.value })
              }
              aria-required="true"
            />
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
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              aria-required="true"
            />
          </div>

          <div className="input-group">
            <label htmlFor="body">Mensaje</label>
            <textarea
              id="body"
              rows="6"
              placeholder="Escribe el mensaje que se enviará al usuario..."
              required
              value={formData.body}
              onChange={(e) =>
                setFormData({ ...formData, body: e.target.value })
              }
              aria-required="true"
            ></textarea>
          </div>

          <button type="submit" className="send-button">
            Enviar notificación
          </button>
        </form>
      </motion.section>
    </main>
  );
}
