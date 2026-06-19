import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Reports() {
  const [expenses, setExpenses] = useState([]);
  const [view, setView] = useState("monthly");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/expenses");
    setExpenses(res.data);
  };

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  // FILTER MONTH
  const filtered = expenses.filter((e) => {
    const m = new Date(e.date).getMonth();
    return selectedMonth ? months[m] === selectedMonth : true;
  });

  // TOTAL SPENT
  const totalSpent = filtered.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const allowance = 20000;
  const remaining = allowance - totalSpent;

  // CATEGORY MAP
  const categoryMap = {};
  filtered.forEach((e) => {
    categoryMap[e.category] =
      (categoryMap[e.category] || 0) + Number(e.amount);
  });

  const pieData = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        data: Object.values(categoryMap),
        backgroundColor: [
          "#6366f1",
          "#f59e0b",
          "#ef4444",
          "#10b981",
          "#3b82f6",
        ],
      },
    ],
  };

  // YEARLY DATA
  const yearlyMap = {};
  expenses.forEach((e) => {
    const m = months[new Date(e.date).getMonth()];
    yearlyMap[m] = (yearlyMap[m] || 0) + Number(e.amount);
  });

  const barData = {
    labels: Object.keys(yearlyMap),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(yearlyMap),
        backgroundColor: "#6366f1",
      },
    ],
  };

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="main-content">

        {/* HEADER */}
        <div className="report-header">

          <h2>Reports</h2>

          <div className="report-controls">

            <select
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="">All Months</option>
              {months.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>

            <button
              className={view === "monthly" ? "active" : ""}
              onClick={() => setView("monthly")}
            >
              Monthly
            </button>

            <button
              className={view === "yearly" ? "active" : ""}
              onClick={() => setView("yearly")}
            >
              Yearly
            </button>

          </div>

        </div>

        {/* CHART SECTION */}
        <div className="chart-wrapper">

          {view === "monthly" ? (
            <div className="chart-card">

              <h3 className="chart-title">
                Category Breakdown
              </h3>

              <div className="pie-container">
                <Pie data={pieData} />
              </div>

            </div>
          ) : (
            <div className="chart-card">

              <h3 className="chart-title">
                Yearly Expenses
              </h3>

              <Bar data={barData} />

            </div>
          )}

        </div>

        {/* INSIGHTS */}
        <div className="insights">

          <div className="insight-card">
            <h4>Total Spent</h4>
            <p>₹{totalSpent}</p>
          </div>

          <div className="insight-card">
            <h4>Allowance</h4>
            <p>₹{allowance}</p>
          </div>

          <div className="insight-card">
            <h4>Remaining</h4>
            <p>₹{remaining}</p>
          </div>

          <div className="insight-card">
            <h4>Top Category</h4>
            <p>
              {Object.keys(categoryMap).reduce(
                (a, b) =>
                  categoryMap[a] > categoryMap[b] ? a : b,
                ""
              )}
            </p>
          </div>

        </div>

        {/* TRANSACTIONS TABLE */}
        <div className="table-card">

          <h3>Transactions</h3>

          <table className="transaction-table">

            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Payment</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((e) => (
                <tr key={e._id}>
                  <td>
                    {new Date(e.date).toLocaleDateString()}
                  </td>
                  <td>{e.description}</td>
                  <td>{e.category}</td>
                  <td>{e.paymentMethod}</td>
                  <td>₹{e.amount}</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default Reports;