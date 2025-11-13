"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import "./form.css";

export default function FormPage() {
  const [isRegister, setIsRegister] = useState(false);

  const toggleForm = () => setIsRegister(!isRegister);

  // Variantes de animación
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1 className="form-title">
          {isRegister ? "Crear Cuenta" : "Iniciar Sesión"}
        </h1>
        <p className="form-subtitle">
          {isRegister
            ? "Completa los siguientes datos para registrarte en "
            : "Accede a tu cuenta de "}
          <span className="highlight">LiFlow</span>
        </p>

        {/* Transición entre Login y Registro */}
        <AnimatePresence mode="wait">
          {!isRegister ? (
            <motion.form
              key="login-form"
              className="login-form"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="input-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button type="submit" className="form-button">
                Ingresar
              </button>

              <p className="form-footer">
                ¿No tienes una cuenta?{" "}
                <span className="register-link" onClick={toggleForm}>
                  Regístrate
                </span>
              </p>
            </motion.form>
          ) : (
            <motion.form
              key="register-form"
              className="register-form"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="input-group">
                <label htmlFor="full_name">Nombre completo</label>
                <input
                  type="text"
                  id="full_name"
                  placeholder="Juan Pérez"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  placeholder="juan@example.com"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  placeholder="P@ssw0rd123"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="document_type">Tipo de documento</label>
                <select id="document_type" required>
                  <option value="">Seleccione</option>
                  <option value="CC">Cédula de ciudadanía</option>
                  <option value="TI">Tarjeta de identidad</option>
                  <option value="CE">Cédula de extranjería</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="document_number">Número de documento</label>
                <input
                  type="text"
                  id="document_number"
                  placeholder="1029384756"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="birth_date">Fecha de nacimiento</label>
                <input type="date" id="birth_date" required />
              </div>

              <div className="input-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="3001234567"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="blood_type">Tipo de sangre</label>
                <select id="blood_type" required>
                  <option value="">Seleccione</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <button type="submit" className="form-button">
                Registrarme
              </button>

              <p className="form-footer">
                ¿Ya tienes una cuenta?{" "}
                <span className="register-link" onClick={toggleForm}>
                  Inicia sesión
                </span>
              </p>
            </motion.form>
          )}
        </AnimatePresence>

        <Link href="/" className="back-home">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
