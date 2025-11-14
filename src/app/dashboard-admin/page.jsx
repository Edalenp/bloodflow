"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import "./dashboard-admin.css";

export default function AdminDashboard() {
  const router = useRouter();

  const goToInventory = () => router.push("/dashboard-admin/inventory");
  const goToNotifications = () => router.push("/dashboard-admin/notifications");

  const logout = () => router.push("/");

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-text">
          <h2>¡Bienvenido, Administrador!</h2>
          <p>
            Supervisa el inventario de sangre y gestiona notificaciones para
            usuarios, donantes y personal médico.
          </p>
        </div>

        <button className="logout-button" onClick={logout}>
          Cerrar sesión
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={goToInventory}>
          <Image
            src="/admin-inventory.jpg"
            width={600}
            height={400}
            alt="Inventario de sangre"
            className="card-image"
            priority
          />
          <div className="card-overlay">
            <h3>Inventario</h3>
            <p>Consulta unidades disponibles por tipo sanguíneo.</p>
          </div>
        </div>

        <div className="dashboard-card" onClick={goToNotifications}>
          <Image
            src="/admin-notifications.jpg"
            width={600}
            height={400}
            alt="Centro de notificaciones"
            className="card-image"
            priority
          />
          <div className="card-overlay">
            <h3>Notificaciones</h3>
            <p>Envía avisos y recordatorios personalizados.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
