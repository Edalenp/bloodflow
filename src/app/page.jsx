"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Droplet,
  Droplets,
  BriefcaseMedical,
  RotateCw,
  CalendarDays,
  Bell,
  LineChart,
  Menu,
  X,
} from "lucide-react";
import FeatureCard from "./components/FeatureCard";
import KPI from "./components/KPI";
import "./page.css";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="landing">
      <header className="nav">
        <div className="nav-left">
          <Link href="/" className="brand">
            <Droplet size={40} color="#E53935" />
            <span className="brand-title">BloodFlow</span>
          </Link>
        </div>

        <nav className={`nav-center ${menuOpen ? "open" : ""}`}>
          <a href="#start">Inicio</a>
          <a href="#services">Servicios</a>
          <a href="#why">Por qué</a>
          <a href="#how">Cómo funciona</a>
          <a href="#credits">Créditos</a>
        </nav>

        <div className="nav-right">
          <Link href="/form" className="btn btn-ghost">
            Iniciar sesión
          </Link>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((s) => !s)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <div className={`mobile-menu-modal ${menuOpen ? "open" : ""}`}>
        <button
          className="mobile-menu-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Cerrar menú"
        >
          <X size={32} />
        </button>

        <a href="#start" onClick={() => setMenuOpen(false)}>
          Inicio
        </a>
        <a href="#services" onClick={() => setMenuOpen(false)}>
          Servicios
        </a>
        <a href="#why" onClick={() => setMenuOpen(false)}>
          Por qué
        </a>
        <a href="#how" onClick={() => setMenuOpen(false)}>
          Cómo funciona
        </a>
        <a href="#credits" onClick={() => setMenuOpen(false)}>
          Créditos
        </a>

        <Link
          href="/form"
          className="btn btn-primary"
          onClick={() => setMenuOpen(false)}
        >
          Iniciar sesión
        </Link>
      </div>

      <section id="start" className="hero-visual">
        <div className="hero-left">
          <h1 className="hero-title">
            Cuando <span className="accent-red">cada gota</span> importa,
            BloodFlow hace que todo
            <span className="accent-blue"> funcione</span>.
          </h1>

          <p className="hero-sub">
            Plataforma visual y colaborativa que conecta donantes, personal
            médico y centros hospitalarios — agenda, coordina y responde en
            tiempo real para salvar más vidas.
          </p>

          <div className="hero-ctas">
            <Link href="/form" className="btn btn-primary">
              Comienza ahora
            </Link>
          </div>

          <div className="hero-kpis">
            <KPI
              icon={<Droplets size={22} color="#fff" />}
              value="+3,500"
              label="Citas coordinadas"
              accent="135deg, rgba(229,83,83,0.95), rgba(255,122,122,0.6)"
            />
            <KPI
              icon={<BriefcaseMedical size={22} color="#fff" />}
              value="+1,200"
              label="Donantes activos"
              accent="135deg, rgba(33,150,243,0.95), rgba(66,165,245,0.55)"
            />
            <KPI
              icon={<RotateCw size={22} color="#fff" />}
              value="Tiempo real"
              label="Actualizaciones del sistema"
              accent="135deg, rgba(67,160,71,0.95), rgba(129,199,132,0.45)"
            />
          </div>
        </div>

        <div className="hero-right">
          <div className="visual-card">
            <div className="visual-glow" />
            <Image
              src="/doctors.png"
              alt="Equipo médico"
              width={880}
              height={640}
              className="visual-img"
              priority
            />
          </div>
        </div>
      </section>

      <section id="services" className="services-split">
        <div className="services-media">
          <div className="media-stack">
            <Image
              src="/doctor.png"
              alt="Ilustración features"
              width={700}
              height={560}
              className="features-img"
            />
          </div>
        </div>

        <div className="services-content">
          <h2 className="section-title">
            Todo lo que necesitas para gestionar donaciones
          </h2>
          <p className="section-sub">
            Un panel unificado para coordinar campañas, agendar citas, hacer
            seguimiento clínico y generar reportes en tiempo real.
          </p>

          <div className="features-list">
            <FeatureCard
              icon={<CalendarDays size={20} color="#fff" />}
              title="Agendamiento inteligente"
              text="Confirmaciones automáticas y recordatorios multicanal."
              accent="linear-gradient(180deg,#E53935,#FF7B7B)"
            />
            <FeatureCard
              icon={<Bell size={20} color="#fff" />}
              title="Alertas críticas"
              text="Notificaciones prioritarias cuando un tipo de sangre es urgente."
              accent="linear-gradient(180deg,#1565C0,#4DA0FF)"
            />
            <FeatureCard
              icon={<LineChart size={20} color="#fff" />}
              title="Reportes y stock"
              text="Dashboard de inventario por tipo de sangre y métricas visuales."
              accent="linear-gradient(180deg,#43A047,#81C784)"
            />
          </div>
        </div>
      </section>

      <section id="why" className="why-section">
        <h2 className="section-title centered">¿Por qué usar BloodFlow?</h2>
        <p className="section-sub centered">
          Diseñado por equipos médicos, pensado para salvar vidas.
        </p>

        <div className="why-grid">
          <div className="why-item">
            <div className="why-icon">
              <Droplet size={22} color="#E53935" />
            </div>
            <h3>Confiable</h3>
            <p>
              Auditable y conforme a procesos clínicos, con logs y trazabilidad.
            </p>
          </div>

          <div className="why-item">
            <div className="why-icon">
              <BriefcaseMedical size={22} color="#1565C0" />
            </div>
            <h3>Rápido</h3>
            <p>Menos tiempo de espera para pacientes.</p>
          </div>

          <div className="why-item">
            <div className="why-icon">
              <LineChart size={22} color="#43A047" />
            </div>
            <h3>Inteligente</h3>
            <p>
              Decisiones basadas en datos: planificación óptima de jornadas.
            </p>
          </div>

          <div className="why-item">
            <div className="why-icon">
              <RotateCw size={22} color="#F39C12" />
            </div>
            <h3>Automatizable</h3>
            <p>Escala con flujos de trabajo y notificaciones programadas.</p>
          </div>
        </div>
      </section>

      <section id="how" className="how-section">
        <h2 className="section-title centered">Cómo funciona</h2>
        <div className="how-steps">
          <div className="step">
            <div className="step-circle">1</div>
            <h3>Regístrate</h3>
            <p>Donantes crean perfil y registran su tipo de sangre.</p>
          </div>
          <div className="step">
            <div className="step-circle">2</div>
            <h3>Agenda</h3>
            <p>Selecciona campaña y reserva el slot disponible.</p>
          </div>
          <div className="step">
            <div className="step-circle">3</div>
            <h3>Dona</h3>
            <p>Registro clínico y seguimiento de la donación.</p>
          </div>
          <div className="step">
            <div className="step-circle">4</div>
            <h3>Reporta</h3>
            <p>Inventario y métricas accesibles para el equipo.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-card">
          <div>
            <h3>Listo para mejorar la logística de donación?</h3>
            <p>Únete a BloodFlow y coordina campañas de manera efectiva.</p>
          </div>
          <div className="cta-actions">
            <Link href="/form" className="btn btn-primary large">
              Comenzar gratis
            </Link>
          </div>
        </div>
      </section>

      <footer id="credits" className="footer">
        <h2 className="brand small">
          <Droplet size={30} color="#E53935" />
          <span className="brand-title">BloodFlow</span>
        </h2>
        <p className="muted">
          © {new Date().getFullYear()} BloodFlow · Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
}
