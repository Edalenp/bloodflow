function KPI({ icon, value, label, accent }) {
  return (
    <div className="kpi">
      <div
        className="kpi-icon"
        style={{ background: `linear-gradient(${accent})` }}
      >
        {icon}
      </div>
      <div className="kpi-body">
        <div className="kpi-value">{value}</div>
        <div className="kpi-label">{label}</div>
      </div>
    </div>
  );
}

export default KPI;
