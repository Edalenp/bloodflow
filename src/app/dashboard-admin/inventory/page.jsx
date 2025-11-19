"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Chart from "chart.js/auto";
import "./admin-inventory.css";
import { getInventory } from "../../lib/inventory";

export default function InventoryPage() {
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  const [inventoryData, setInventoryData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState("");

  /*
  // Simulación de API
  useEffect(() => {
    let isMounted = true;

    const loadMockData = () => {
      const mockResponse = {
        data: [
          { blood_type: "O+", units_available: 12 },
          { blood_type: "A+", units_available: 9 },
          { blood_type: "B+", units_available: 4 },
          { blood_type: "AB-", units_available: 2 },
        ],
        last_updated: "2025-11-15T10:00:00Z",
      };

      if (isMounted) {
        setInventoryData(mockResponse.data);
        setLastUpdated(mockResponse.last_updated);
      }
    };

    loadMockData();

    return () => {
      isMounted = false;
    };
  }, []);
  */

  useEffect(() => {
    let isMounted = true;

    const fetchInventory = async () => {
      try {
        const response = await getInventory();

        if (isMounted) {
          setInventoryData(response.data || []);
          setLastUpdated(response.last_updated);
          setError("");
        }
      } catch (err) {
        console.error("Error loading inventory:", err);
        if (isMounted) {
          setError("Error al cargar el inventario. Intenta nuevamente.");
        }
      }
    };

    fetchInventory();

    return () => {
      isMounted = false;
    };
  }, []);

  // Chart rendering: usamos getContext para asegurar compatibilidad
  useEffect(() => {
    if (!inventoryData.length || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: inventoryData.map((i) => i.blood_type),
        datasets: [
          {
            label: "Unidades disponibles",
            data: inventoryData.map((i) => i.units_available),
            backgroundColor: [
              "rgba(21,101,192,0.88)",
              "rgba(13,71,161,0.88)",
              "rgba(25,118,210,0.88)",
              "rgba(66,165,245,0.88)",
            ],
            borderRadius: 12,
            maxBarThickness: 64,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 900, easing: "easeOutQuart" },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true, mode: "nearest" },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 },
            title: {
              display: true,
              text: "Unidades",
              font: { size: 13, weight: "600" },
            },
          },
          x: {
            title: {
              display: true,
              text: "Tipo sanguíneo",
              font: { size: 13, weight: "600" },
            },
          },
        },
      },
    });

    // cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [inventoryData]);

  const formatDate = (iso) => {
    if (!iso) return "";
    const date = new Date(iso);
    return date.toLocaleString("es-ES", {
      dateStyle: "long",
      timeStyle: "short",
    });
  };

  return (
    <motion.main
      className="inventory-page"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      role="main"
      aria-labelledby="inv-title"
    >
      <div className="inventory-top">
        <header className="inventory-header">
          <h1 id="inv-title" tabIndex="0" className="inventory-title">
            Inventario de Sangre
          </h1>

          <p className="inventory-desc" tabIndex="0">
            Consulta la disponibilidad actual de unidades sanguíneas del banco
            de sangre. Esta información se actualiza automáticamente cuando se
            registran nuevas donaciones.
          </p>
        </header>
        {error && (
          <div className="error-banner" role="alert">
            {error}
          </div>
        )}
        <section
          className="inventory-cards-row"
          aria-label="Resumen de unidades por tipo"
        >
          {inventoryData.map((item) => (
            <motion.div
              key={item.blood_type}
              className="summary-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              tabIndex="0"
              role="group"
              aria-label={`${item.blood_type}: ${item.units_available} unidades disponibles`}
            >
              <h2>{item.blood_type}</h2>
              <p>{item.units_available} unidades</p>
            </motion.div>
          ))}
        </section>
      </div>

      <section className="inventory-grid" aria-label="Gráfica de inventario">
        <div
          className="inventory-card"
          role="region"
          aria-labelledby="chart-title"
        >
          <h2 id="chart-title" className="chart-title" tabIndex="0">
            Distribución por tipo sanguíneo
          </h2>

          <div
            className="chart-wrapper"
            role="img"
            aria-label="Gráfica de barras con unidades disponibles por tipo sanguíneo"
          >
            <canvas ref={canvasRef} id="inventoryChart" />
          </div>
        </div>
      </section>

      {lastUpdated && (
        <p className="inventory-update" aria-live="polite">
          Última actualización: <span>{formatDate(lastUpdated)}</span>
        </p>
      )}
    </motion.main>
  );
}
