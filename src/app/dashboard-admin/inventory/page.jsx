"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./inventory.css";

export default function InventoryPage() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const lastUpdated = "2025-11-15T10:00:00Z";

  useEffect(() => {
    const inventoryData = [
      { blood_type: "O+", units_available: 12 },
      { blood_type: "A+", units_available: 9 },
      { blood_type: "B+", units_available: 4 },
      { blood_type: "AB-", units_available: 2 },
    ];
    const ctx = chartRef.current;

    if (!ctx) return;

    // Destruye el gráfico anterior si existe
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
              "rgba(255, 99, 132, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 206, 86, 0.7)",
              "rgba(153, 102, 255, 0.7)",
            ],
            borderRadius: 12,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Permite relación de aspecto fija desde CSS
        animation: {
          duration: 900,
          easing: "easeOutQuart",
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            ticks: { stepSize: 1 },
          },
        },
      },
    });
  }, []);

  return (
    <div className="inventory-page">
      <h1 className="inventory-title">Inventario de Sangre</h1>

      <p className="inventory-updated">
        Última actualización:{" "}
        <span>{new Date(lastUpdated).toLocaleString()}</span>
      </p>

      <div className="inventory-grid">
        <div className="inventory-card">
          <div className="chart-wrapper">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
