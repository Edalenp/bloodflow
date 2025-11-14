"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import "./dashboard-donors.css";

export default function DonorDashboard() {
  const router = useRouter();

  const goToCampaigns = () => router.push("/dashboard-donors/campaigns");
  const goToAppointments = () => router.push("/dashboard-donors/appointments");
  const logout = () => router.push("/");

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-text">
          <h2>¡Bienvenido, Donante!</h2>
          <p>
            Gracias por ayudar a salvar vidas. Aquí puedes ver campañas activas
            y mantener control sobre tus próximas citas.
          </p>
        </div>

        <button className="logout-button" onClick={logout}>
          Cerrar sesión
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={goToCampaigns}>
          <Image
            src="/campaigns.jpg"
            width={600}
            height={400}
            alt="Campañas"
            className="card-image"
            priority
          />
          <div className="card-overlay">
            <h3>Campañas</h3>
            <p>Encuentra jornadas activas cerca de ti.</p>
          </div>
        </div>

        <div className="dashboard-card" onClick={goToAppointments}>
          <Image
            src="/donation.jpg"
            width={600}
            height={400}
            alt="Citas"
            className="card-image"
            priority
          />
          <div className="card-overlay">
            <h3>Citas</h3>
            <p>Consulta tus próximas citas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
