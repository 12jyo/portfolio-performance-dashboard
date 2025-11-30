export function buildPortfolioStats(dailyNav) {
  if (!dailyNav || dailyNav.length === 0) {
    return {
      equityCurve: [],
      monthlyByYear: [],
      monthNames: [],
      stats: null,
    };
  }

  const sorted = [...dailyNav].sort((a, b) => a.date - b.date);
  const startNav = sorted[0].nav;
  const startDate = sorted[0].date;
  const endNav = sorted[sorted.length - 1].nav;
  const endDate = sorted[sorted.length - 1].date;

  const equityCurve = [];
  let peak = 1;
  let maxDrawdown = 0;

  sorted.forEach((item) => {
    const equity = item.nav / startNav;
    peak = Math.max(peak, equity);
    const dd = equity / peak - 1;

    if (dd < maxDrawdown) {
      maxDrawdown = dd;
    }

    equityCurve.push({
      date: item.date,
      dateLabel: item.date.toISOString().slice(0, 10),
      equity,
      drawdown: dd,
    });
  });

  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthlyMap = {}; 

  sorted.forEach(({ date, nav }) => {
    const y = date.getFullYear();
    const m = date.getMonth();
    if (!monthlyMap[y]) monthlyMap[y] = {};
    if (!monthlyMap[y][m]) {
      monthlyMap[y][m] = { firstNav: nav, lastNav: nav };
    } else {
      monthlyMap[y][m].lastNav = nav;
    }
  });

  const years = Object.keys(monthlyMap)
    .map(Number)
    .sort((a, b) => a - b);

  const monthlyByYear = years.map((year) => {
    const row = { year };
    for (let m = 0; m < 12; m++) {
      const entry = monthlyMap[year][m];
      if (entry) {
        const ret = entry.lastNav / entry.firstNav - 1;
        row[monthNames[m]] = ret;
      } else {
        row[monthNames[m]] = null;
      }
    }
    return row;
  });

  const totalReturn = endNav / startNav - 1;
  const yearsDiff =
    (endDate.getTime() - startDate.getTime()) /
    (365.25 * 24 * 60 * 60 * 1000);
  const cagr = Math.pow(endNav / startNav, 1 / yearsDiff) - 1;

  const stats = {
    totalReturn,
    cagr,
    maxDrawdown,
    startDate,
    endDate,
  };

  return {
    equityCurve,
    monthlyByYear,
    monthNames,
    stats,
  };
}

export function formatPercent(value, digits = 2) {
  if (value == null || Number.isNaN(value)) return "-";
  return `${(value * 100).toFixed(digits)}%`;
}
