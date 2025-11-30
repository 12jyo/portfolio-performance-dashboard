import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const EquityCurveChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No equity curve data.</p>;
  }

  const formatDate = (value) => value.slice(0, 7);

  const chartData = data.map((d) => ({
    date: d.dateLabel,
    equity: d.equity,
    drawdown: d.drawdown,
  }));

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={formatDate} minTickGap={40} />
          <YAxis
            yAxisId="left"
            tickFormatter={(v) => v.toFixed(1) + "x"}
            domain={["auto", "auto"]}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(v) => (v * 100).toFixed(0) + "%"}
          />
          <Tooltip
            formatter={(value, name) => {
              if (name === "equity") return [value.toFixed(2) + "x", "Equity"];
              if (name === "drawdown")
                return [(value * 100).toFixed(2) + "%", "Drawdown"];
              return [value, name];
            }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="equity"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="drawdown"
            stroke="#dc2626"
            fill="#fecaca"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EquityCurveChart;
