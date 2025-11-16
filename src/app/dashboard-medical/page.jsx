"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import "./dashboard-medical.css";

export default function MedicalDashboard() {
  const router = useRouter();

  const goToMedicalChecks = () =>
    router.push("/dashboard-medical/medical-checks");

  const goToDonations = () => router.push("/dashboard-medical/donations");

  const goToInventory = () => router.push("/dashboard-medical/inventory");

  const logout = () => router.push("/");

  return (
    <motion.main
      className="dashboard-container"
      role="main"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <header className="dashboard-header">
        <div className="header-text">
          <h2>¡Bienvenido, personal médico!</h2>
          <p>
            Gestiona cada etapa del proceso de donación con precisión. Desde
            evaluaciones previas, registro de donaciones hasta el control de
            inventario de sangre.
          </p>
        </div>

        <button
          className="logout-button"
          onClick={logout}
          aria-label="Cerrar sesión y volver al inicio"
        >
          Cerrar sesión
        </button>
      </header>

      <section className="actions">
        <h2>Acciones</h2>
        <p>Selecciona una opción para continuar.</p>
      </section>

      <section className="dashboard-grid" aria-label="Opciones administrativas">
        <motion.div
          className="dashboard-card"
          onClick={goToMedicalChecks}
          role="button"
          tabIndex="0"
          aria-label="Ir a evaluaciones médicas"
          whileHover={{ scale: 1.03 }}
          whileFocus={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src="/medical-evaluation.jpg"
            width={600}
            height={400}
            alt="Evaluaciones médicas"
            className="card-image"
            priority
          />
          <div className="card-overlay">
            <h3>Evaluaciones médicas</h3>
            <p>Determina la aptitud del donante antes del proceso.</p>
          </div>
        </motion.div>

        <motion.div
          className="dashboard-card"
          onClick={goToDonations}
          role="button"
          tabIndex="0"
          aria-label="Ir a registrar donación"
          whileHover={{ scale: 1.03 }}
          whileFocus={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src="/donation-process.jpg"
            width={600}
            height={400}
            alt="Registrar donación"
            className="card-image"
            priority
          />
          <div className="card-overlay">
            <h3>Registrar donación</h3>
            <p>Confirma el proceso y actualiza el inventario.</p>
          </div>
        </motion.div>

        <motion.div
          className="dashboard-card"
          onClick={goToInventory}
          role="button"
          tabIndex="0"
          aria-label="Consultar inventario de sangre"
          whileHover={{ scale: 1.03 }}
          whileFocus={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src="/blood-inventory.webp"
            width={600}
            height={400}
            alt="Inventario de sangre"
            className="card-image"
            priority
          />
          <div className="card-overlay">
            <h3>Inventario de sangre</h3>
            <p>Consulta unidades y estados de cada tipo sanguíneo.</p>
          </div>
        </motion.div>
      </section>
    </motion.main>
  );
}
