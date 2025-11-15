"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import "./form.css";

export default function FormPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [userType, setUserType] = useState(null);
  const [exitAnimation, setExitAnimation] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const birthDateRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const pRef = useRef(null);

  const router = useRouter();

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setPassword("");
    setConfirmPassword("");
    setPasswordMatch(true);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (confirmPassword) {
      setPasswordMatch(value === confirmPassword);
    }
  };

  const handleConfirmChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordMatch(value === password);
  };

  const validateBirthDate = (dateStr) => {
    const birth = new Date(dateStr);
    const today = new Date();

    if (birth > today) return true;
    else return false;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim().toLowerCase();
    const isMedical = email.includes("med") || email.includes("hospital");

    if (isMedical) {
      router.push("/dashboard-medical");
    } else {
      router.push("/dashboard-donors");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!passwordMatch) {
      confirmPasswordRef.current?.focus();
      return;
    }

    const birthDate = e.target.birth_date.value;

    if (validateBirthDate(birthDate)) {
      birthDateRef.current?.focus();
      pRef.current.textContent = "Ingresa una fecha válida.";
      return;
    } else {
      pRef.current.textContent = "";
    }

    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
      toggleForm();
    }, 2000);
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="form-container">
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="success-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="success-modal"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="success-icon">✔</div>
              <p className="success-text">Cuenta registrada correctamente</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!userType && !exitAnimation && (
          <motion.div key="select-card" className="form-card select-card">
            <h1 className="form-title">Elige tu tipo de acceso</h1>
            <p className="form-subtitle">
              Selecciona cómo deseas ingresar a BloodFlow.
            </p>

            <button
              className="select-button donor"
              onClick={() => setUserType("donor")}
            >
              Donante
            </button>

            <button
              className="select-button staff"
              onClick={() => setUserType("staff")}
            >
              Personal Médico
            </button>

            <Link href="/" className="back-home">
              Volver al inicio
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {userType && !exitAnimation && (
          <motion.div
            key="form-card"
            className={`form-card ${
              userType === "staff" ? "staff-mode" : "donor-mode"
            }`}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35 }}
          >
            <h1 className="form-title">
              {isRegister ? "Crear cuenta" : "Iniciar sesión"}
            </h1>

            <p className="form-subtitle">
              {isRegister ? (
                userType === "staff" ? (
                  <>
                    Regístrate como{" "}
                    <span className="highlight-medical">personal médico</span>.
                  </>
                ) : (
                  <>
                    Regístrate como <span className="highlight">donante</span>.
                  </>
                )
              ) : userType === "staff" ? (
                <>
                  Accede a tu cuenta de{" "}
                  <span className="highlight-medical">personal médico</span>.
                </>
              ) : (
                <>
                  Accede a tu cuenta de{" "}
                  <span className="highlight">donante</span>.
                </>
              )}
            </p>

            <AnimatePresence mode="wait">
              {!isRegister ? (
                <motion.form
                  key="login-form"
                  className="login-form"
                  onSubmit={handleLogin}
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.4 }}
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

                  <button
                    type="submit"
                    className={
                      userType === "donor"
                        ? "form-button"
                        : "form-button-medical"
                    }
                  >
                    Ingresar
                  </button>

                  {userType === "staff" ? null : (
                    <p className="form-footer">
                      ¿No tienes una cuenta?{" "}
                      <span className="register-link" onClick={toggleForm}>
                        Regístrate
                      </span>
                    </p>
                  )}
                </motion.form>
              ) : (
                <motion.form
                  key="register-form"
                  className="register-form"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  onSubmit={handleRegister}
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
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="P@ssw0rd123"
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="confirm_password">
                      Confirmar contraseña
                    </label>
                    <input
                      type="password"
                      id="confirm_password"
                      value={confirmPassword}
                      ref={confirmPasswordRef}
                      onChange={handleConfirmChange}
                      placeholder="Repite tu contraseña"
                      required
                      className={!passwordMatch ? "error" : ""}
                    />
                    {!passwordMatch && (
                      <p className="error-text">
                        Las contraseñas no coinciden.
                      </p>
                    )}
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
                    <input
                      type="date"
                      id="birth_date"
                      required
                      ref={birthDateRef}
                    />

                    <p ref={pRef} className="error-text"></p>
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

            <button
              className={
                userType === "donor"
                  ? "back-role-select"
                  : "back-role-select-medical"
              }
              onClick={() => {
                setExitAnimation(true);
                setTimeout(() => {
                  setUserType(null);
                  setIsRegister(false);
                  setExitAnimation(false);
                }, 350);
              }}
            >
              <span className="arrow-icon">←</span> Escoger nuevamente el rol
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
