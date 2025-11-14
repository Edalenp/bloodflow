"use client";

import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "./inventory.css";

export default function InventoryPage() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [inventoryData, setInventoryData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

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

  // Render del gráfico
  useEffect(() => {
    if (!inventoryData.length) return;

    const ctx = chartRef.current;

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
              "rgba(255, 99, 132, 0.75)",
              "rgba(54, 162, 235, 0.75)",
              "rgba(255, 206, 86, 0.75)",
              "rgba(153, 102, 255, 0.75)",
            ],
            borderRadius: 12,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 900, easing: "easeOutQuart" },
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            ticks: { stepSize: 1 },
          },
        },
      },
    });
  }, [inventoryData]);

  // Formatear fecha en español
  const formatDate = (iso) => {
    if (!iso) return "";
    const date = new Date(iso);
    return date.toLocaleString("es-ES", {
      dateStyle: "long",
      timeStyle: "short",
    });
  };

  return (
    <div className="inventory-page">
      <h1 className="inventory-title">Inventario de Sangre</h1>

      <div className="inventory-grid">
        <div className="inventory-card">
          <div className="chart-wrapper">
            <canvas ref={chartRef} id="inventoryChart"></canvas>
          </div>
        </div>
      </div>

      {lastUpdated && (
        <p className="inventory-update">
          Última actualización: <span>{formatDate(lastUpdated)}</span>
        </p>
      )}
    </div>
  );
}
