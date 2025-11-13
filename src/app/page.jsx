"use client";

import { useState } from "react";
import { Bell, CalendarDays, Droplet, LineChart, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ServiceCard from "./components/ServiceCard";
import "./page.css";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="app">
      <nav className="nav-bar">
        <div className="nav-logo">
          <Droplet size={40} color="#E53935" />
          <h1 className="nav-title">LiFlow</h1>
        </div>

        <ul className="nav-links">
          <li>
            <a className="nav-link" href="#start">
              Inicio
            </a>
          </li>
          <li>
            <a className="nav-link" href="#services">
              Servicios
            </a>
          </li>
          <li>
            <a className="nav-link" href="#credits">
              Créditos
            </a>
          </li>
        </ul>

        <Link href="/form" className="button-session">
          Iniciar Sesión
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X size={32} color="#E53935" />
          ) : (
            <Menu size={32} color="#2E2E2E" />
          )}
        </div>
      </nav>

      {isMenuOpen && (
        <div className="menu-modal">
          <ul className="menu-modal-list">
            <li>
              <a href="#start" onClick={closeMenu}>
                Inicio
              </a>
            </li>
            <li>
              <a href="#services" onClick={closeMenu}>
                Servicios
              </a>
            </li>
            <li>
              <a href="#credits" onClick={closeMenu}>
                Créditos
              </a>
            </li>
            <li>
              <Link href="/form" onClick={closeMenu}>
                Iniciar Sesión
              </Link>
            </li>
          </ul>
        </div>
      )}

      <section id="start" className="hero-section">
        <div className="hero-image-container">
          <Image
            className="hero-image"
            src="/doctors.png"
            alt="Equipo médico profesional"
            width={700}
            height={500}
            priority
          />
        </div>
        <div className="hero-content">
          <h2 className="hero-title">
            Cada <span className="highlight">gota</span> cuenta. LiFlow permite
            que todo fluya más <span className="highlight-medical">fácil</span>
          </h2>
          <p className="hero-subtitle">
            Una plataforma innovadora que conecta de manera eficiente a{" "}
            <span className="highlight-medical">donantes</span>,{" "}
            <span className="highlight-medical">profesionales de salud</span> y{" "}
            <span className="highlight-medical">centros médicos</span>,
            facilitando la atención oportuna de pacientes en situación crítica
            de forma rápida y organizada.
          </p>
        </div>
      </section>

      <section id="services" className="services-section">
        <h1 className="services-title">SERVICIOS</h1>
        <div className="services-cards">
          <ServiceCard
            index={0}
            icon={<Droplet size={26} color="#fff" />}
            title="Gestión de Donaciones"
            text="Registra y consulta tus donaciones, revisa tu tipo sanguíneo y conoce cuándo puedes donar nuevamente."
          />
          <ServiceCard
            index={1}
            icon={<CalendarDays size={26} color="#fff" />}
            title="Campañas Cercanas"
            text="Encuentra campañas activas en tu zona, agenda una cita y recibe confirmaciones en tiempo real."
          />
          <ServiceCard
            index={2}
            icon={<Bell size={26} color="#fff" />}
            title="Alertas y Recordatorios"
            text="Recibe notificaciones automáticas cuando tu tipo de sangre sea requerido o tengas una cita próxima."
          />
          <ServiceCard
            index={3}
            icon={<LineChart size={26} color="#fff" />}
            title="Reportes y Seguimiento"
            text="Los médicos y administradores pueden generar reportes de disponibilidad y donantes inscritos."
          />
        </div>
      </section>

      <footer id="credits" className="credits-section">
        <h1>Créditos</h1>
        <div className="authors">
          <p>Santiago Quintero Pareja</p>
          <p>Eduardo Alejandro Negrín Pérez</p>
          <p>Fabián Camilo Quintero Pareja</p>
        </div>
      </footer>
    </div>
  );
}
