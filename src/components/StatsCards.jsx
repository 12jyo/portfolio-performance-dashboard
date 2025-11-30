import { formatPercent } from "../utils/portfolioCalculations";

const StatsCards = ({ stats }) => {
  const { totalReturn, cagr, maxDrawdown, startDate, endDate } = stats;

  const formatDate = (d) =>
    d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <section className="stats-cards">
      <div className="stat-card">
        <div className="stat-label">Total Return</div>
        <div className="stat-value">{formatPercent(totalReturn)}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">CAGR</div>
        <div className="stat-value">{formatPercent(cagr)}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Max Drawdown</div>
        <div className="stat-value">
          {formatPercent(maxDrawdown)}
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Period</div>
        <div className="stat-value small">
          {formatDate(startDate)} – {formatDate(endDate)}
        </div>
      </div>
    </section>
  );
};

export default StatsCards;
