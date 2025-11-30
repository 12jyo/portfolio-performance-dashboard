import { formatPercent } from "../utils/portfolioCalculations";

const MonthlyReturnsTable = ({ monthlyByYear, monthNames }) => {
  if (!monthlyByYear || monthlyByYear.length === 0) {
    return <p>No monthly return data.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="returns-table">
        <thead>
          <tr>
            <th>Year</th>
            {monthNames.map((m) => (
              <th key={m}>{m}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {monthlyByYear.map((row) => (
            <tr key={row.year}>
              <td className="year-cell">{row.year}</td>
              {monthNames.map((m) => {
                const value = row[m];
                const className =
                  value == null
                    ? "cell-empty"
                    : value >= 0
                    ? "cell-positive"
                    : "cell-negative";
                return (
                  <td key={m} className={className}>
                    {value == null ? "-" : formatPercent(value, 1)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyReturnsTable;
