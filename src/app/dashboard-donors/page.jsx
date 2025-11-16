"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import "./dashboard-donors.css";
import { FiCalendar, FiPhone } from "react-icons/fi";

export default function DonorDashboard() {
  const router = useRouter();

  const goToCampaigns = () => router.push("/dashboard-donors/campaigns");
  const goToAppointments = () => router.push("/dashboard-donors/appointments");
  const logout = () => router.push("/");

  return (
    <div className="donor-dashboard-container">
      <header className="donor-header">
        <div className="donor-header-text">
          <h1>¡Bienvenido, Donante!</h1>
          <div className="title-underline"></div>

          <p>
            Gracias por aportar a BloodFlow. Desde aquí puedes ver campañas
            activas y gestionar tus próximas citas.
          </p>
        </div>

        <button className="logout-btn" onClick={logout}>
          Cerrar sesión
        </button>
      </header>

      <section className="actions">
        <h2>Acciones</h2>
        <p>Selecciona una opción para continuar.</p>
      </section>

      <div className="donor-grid">
        <div className="donor-card" onClick={goToCampaigns}>
          <Image
            src="/campaigns.jpg"
            alt="Campañas"
            width={800}
            height={500}
            className="donor-card-img"
            priority
          />
          <div className="donor-card-overlay">
            <h3>
              Campañas <FiPhone className="icon-inline" />
            </h3>
            <p>Encuentra jornadas cerca de ti.</p>
          </div>
        </div>

        <div className="donor-card" onClick={goToAppointments}>
          <Image
            src="/donation.jpg"
            alt="Citas"
            width={800}
            height={500}
            className="donor-card-img"
            priority
          />
          <div className="donor-card-overlay">
            <h3>
              Citas <FiCalendar className="icon-inline" />
            </h3>
            <p>Consulta tus próximas citas programadas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
