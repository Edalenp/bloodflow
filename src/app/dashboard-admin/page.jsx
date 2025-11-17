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
    <main
      className="dashboard-container"
      role="main"
      aria-labelledby="admin-dashboard-title"
    >
      <header className="dashboard-header">
        <div className="header-text">
          <h1 id="admin-dashboard-title" tabIndex="0">
            ¡Bienvenido, Administrador!
          </h1>

          <p tabIndex="0">
            Supervisa el inventario de sangre y gestiona notificaciones para
            donantes y personal médico.
          </p>
        </div>

        <button
          className="logout-button"
          onClick={logout}
          aria-label="Cerrar sesión y volver a la página de inicio"
        >
          Cerrar sesión
        </button>
      </header>

      <section className="actions">
        <h2>Acciones</h2>
        <p>Selecciona una opción para continuar.</p>
      </section>

      <section
        className="dashboard-grid"
        aria-label="Acciones administrativas principales"
      >
        <div
          className="dashboard-card"
          onClick={goToInventory}
          tabIndex="0"
          role="button"
          aria-label="Ir al módulo de inventario"
          onKeyDown={(e) => e.key === "Enter" && goToInventory()}
        >
          <Image
            src="/admin-inventory.png"
            width={600}
            height={400}
            alt="Inventario del banco de sangre"
            className="card-image"
            priority
          />

          <div className="card-overlay">
            <h3>Inventario</h3>
            <p>Consulta las unidades por tipo sanguíneo.</p>
          </div>
        </div>

        <div
          className="dashboard-card"
          onClick={goToNotifications}
          tabIndex="0"
          role="button"
          aria-label="Ir al módulo de notificaciones"
          onKeyDown={(e) => e.key === "Enter" && goToNotifications()}
        >
          <Image
            src="/admin-notifications.webp"
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
      </section>
    </main>
  );
}
