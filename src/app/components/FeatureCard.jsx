function FeatureCard({ icon, title, text, accent }) {
  return (
    <div className="feature-card">
      <div className="feature-left">
        <div className="feature-icon" style={{ background: accent }}>
          {icon}
        </div>
      </div>
      <div className="feature-right">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
