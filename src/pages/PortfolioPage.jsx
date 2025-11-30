import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  buildPortfolioStats,
} from "../utils/portfolioCalculations";
import StatsCards from "../components/StatsCards";
import MonthlyReturnsTable from "../components/MonthlyReturnsTable";
import EquityCurveChart from "../components/EquityCurveChart";

const PortfolioPage = () => {
  const [loading, setLoading] = useState(true);
  const [equityCurve, setEquityCurve] = useState([]);
  const [monthlyByYear, setMonthlyByYear] = useState([]);
  const [monthNames, setMonthNames] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadExcel = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/data/nav-report.xlsx");
        if (!response.ok) {
          throw new Error("Failed to load Excel file");
        }

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const headerIndex = rawRows.findIndex(
          (row) => row && row[0] === "NAV Date"
        );

        if (headerIndex === -1) {
          throw new Error("Could not find 'NAV Date' header in Excel");
        }

        const dataRows = rawRows
          .slice(headerIndex + 1)
          .filter((row) => row && row[0] && row[1]);

        const parsedDailyNav = dataRows
          .map((row) => {
            const dateStr = row[0];
            const navVal = row[1];

            if (!dateStr || navVal == null) return null;

            const parts = dateStr.toString().split("-");
            if (parts.length !== 3) return null;

            const [dd, mm, yyyy] = parts.map((x) => Number(x));
            const jsDate = new Date(yyyy, mm - 1, dd);

            return {
              date: jsDate,
              nav: Number(navVal),
            };
          })
          .filter(Boolean)
          .sort((a, b) => a.date - b.date);

        const { equityCurve, monthlyByYear, monthNames, stats } =
          buildPortfolioStats(parsedDailyNav);

        setEquityCurve(equityCurve);
        setMonthlyByYear(monthlyByYear);
        setMonthNames(monthNames);
        setStats(stats);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong while loading data");
      } finally {
        setLoading(false);
      }
    };

    loadExcel();
  }, []);

  return (
    <div className="page-container">
      <section className="page-header">
        <h1>Portfolio Performance</h1>
        <p>
          Historical NAV analysis, monthly trading returns, and equity
          curve with drawdown.
        </p>
      </section>

      {loading && <p>Loading NAV data...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && stats && (
        <>
          <StatsCards stats={stats} />

          <section className="portfolio-layout">
            <div className="portfolio-left">
              <h2>Monthly Returns (Year × Month)</h2>
              <MonthlyReturnsTable
                monthlyByYear={monthlyByYear}
                monthNames={monthNames}
              />
            </div>
            <div className="portfolio-right">
              <h2>Equity Curve &amp; Drawdown</h2>
              <EquityCurveChart data={equityCurve} />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default PortfolioPage;
