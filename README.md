# React Portfolio Performance

A two-page React application for a **portfolio management company**, built as an assignment.

The app:

- Shows a **blog-style Home page** with investment insights.
- Shows a **Portfolio page** with:
  - Month-on-month **trading returns** by year (heatmap-style table).
  - **Equity curve** (growth of 1 unit) over time.
  - **Drawdown curve** (peak-to-trough decline).
  - Key statistics like **Total Return, CAGR, Max Drawdown, Period**.
- Uses the provided **Excel NAV report** as the **single source of truth**.

---

## 🔧 Tech Stack

- **React** (Vite + React setup)
- **React Router** – for multi-page navigation
- **Recharts** – for the equity curve and drawdown charts
- **xlsx** – to parse the Excel NAV file in the browser
- **JavaScript (ESNext)** – with hooks (`useState`, `useEffect`)
- Basic custom **CSS** for layout and styling

---

## 📁 Project Structure

react-portfolio-performance/
├─ public/
│  └─ data/
│     └─ nav-report.xlsx       
├─ src/
│  ├─ components/
│  │  ├─ Navbar.jsx
│  │  ├─ StatsCards.jsx
│  │  ├─ MonthlyReturnsTable.jsx
│  │  └─ EquityCurveChart.jsx
│  ├─ pages/
│  │  ├─ HomePage.jsx
│  │  └─ PortfolioPage.jsx
│  ├─ data/
│  │  └─ blogs.js             
│  ├─ utils/
│  │  └─ portfolioCalculations.js
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css                
├─ package.json
├─ vite.config.js
└─ README.md

## Clone & Install

git clone https://github.com/12jyo/portfolio-performance-dashboard.git

cd react-portfolio-performance

npm install

## Run the App in Dev Mode

npm run dev

## Netlify Link
https://portfolio-performance-dashboard.netlify.app/


<img width="1919" height="991" alt="image" src="https://github.com/user-attachments/assets/9e15d152-2ca9-4629-9ea9-a181cd5df25f" />
<img width="1919" height="984" alt="image" src="https://github.com/user-attachments/assets/a65b698e-8ede-49ba-bffb-238d101ea95b" />
