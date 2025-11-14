"use client";

import { useState } from "react";
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

    setTimeout(() => {
      setStatusMessage({
        type: "success",
        text: "Notificación programada correctamente.",
      });
    }, 700);
  };

  return (
    <div className="notifications-page">
      <h1 className="notifications-title">Enviar Notificación</h1>

      {statusMessage && (
        <div
          className={`status-message ${
            statusMessage.type === "success" ? "success" : "error"
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      <div className="notifications-card">
        <form onSubmit={handleSubmit} className="notification-form">
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
            ></textarea>
          </div>

          <button type="submit" className="send-button">
            Enviar notificación
          </button>
        </form>
      </div>
    </div>
  );
}
