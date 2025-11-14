"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import "./dashboard-medical.css";

export default function MedicalDashboard() {
  const router = useRouter();

  const goToMedicalChecks = () =>
    router.push("/dashboard-medical/medical-checks");

  const goToDonations = () => router.push("/dashboard-medical/donations");

  const goToInventory = () => router.push("/dashboard-medical/inventory");

  const logout = () => router.push("/");

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-text">
          <h2>¡Bienvenido, Personal Médico!</h2>
          <p>
            Administra evaluaciones previas, registra donaciones completadas y
            consulta el inventario de sangre del hospital.
          </p>
        </div>

        <button className="logout-button" onClick={logout}>
          Cerrar sesión
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={goToMedicalChecks}>
          <Image
            src="/medical-evaluation.jpg"
            width={600}
            height={400}
            alt="Evaluaciones Médicas"
            className="card-image"
            priority
          />
          <div className="card-overlay">
            <h3>Evaluaciones médicas</h3>
            <p>Registra la aptitud del donante antes de la extracción.</p>
          </div>
        </div>

        <div className="dashboard-card" onClick={goToDonations}>
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
            <p>Confirma la extracción y actualiza el inventario.</p>
          </div>
        </div>

        <div className="dashboard-card" onClick={goToInventory}>
          <Image
            src="/blood-inventory.webp"
            width={600}
            height={400}
            alt="Inventario"
            className="card-image"
            priority
          />
          <div className="card-overlay">
            <h3>Inventario de sangre</h3>
            <p>Consulta las unidades disponibles por tipo sanguíneo.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
