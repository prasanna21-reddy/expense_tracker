import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./Reports.css";

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

  const user = JSON.parse(localStorage.getItem("user"));

  const allowance =
    Number(localStorage.getItem(`allowance_${user?.id}`)) || 0;

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  useEffect(() => {
    fetchExpenses();
  }, []);

  // RESET FILTER WHEN VIEW CHANGES
  useEffect(() => {
    setSelectedMonth("");
  }, [view]);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/expenses");
      setExpenses(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- SAFE FILTER ----------------
  const filteredExpenses =
  view === "monthly"
    ? expenses.filter((e) => {
        if (selectedMonth === "") return true;

        const expenseMonthIndex = new Date(e.date).getMonth();

        return expenseMonthIndex === Number(selectedMonth);
      })
    : expenses;

  // ---------------- TOTALS ----------------
  const totalSpent = filteredExpenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  const remaining = allowance - totalSpent;

  const totalTransactions = filteredExpenses.length;

  // ---------------- CATEGORY ----------------
  const categoryTotals = {};

  filteredExpenses.forEach((e) => {
    if (!e.category) return;

    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + Number(e.amount || 0);
  });

  const topCategory =
    Object.keys(categoryTotals).length > 0
      ? Object.keys(categoryTotals).reduce((a, b) =>
          categoryTotals[a] > categoryTotals[b] ? a : b
        )
      : "-";

  // ---------------- PIE DATA ----------------
  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#6366f1","#f59e0b","#10b981",
          "#ef4444","#3b82f6","#8b5cf6",
        ],
      },
    ],
  };

  // ---------------- MONTHLY BAR ----------------
  const monthlyTotals = {};

  expenses.forEach((e) => {
    if (!e.date) return;

    const month = months[new Date(e.date).getMonth()];
    monthlyTotals[month] =
      (monthlyTotals[month] || 0) + Number(e.amount || 0);
  });

  const barData = {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(monthlyTotals),
        backgroundColor: "#6366f1",
      },
    ],
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">

        {/* HEADER */}
        <div className="reports-header">
          <div>
            <h2>Reports</h2>
            <p>Analyze your spending habits</p>
          </div>

          <div className="report-controls">

            {view === "monthly" && (
              <select
                value={selectedMonth}
                onChange={(e) =>
                  setSelectedMonth(e.target.value)
                }
              >
                <option value="">All Months</option>

                {months.map((m) => (
                  <option key={m} value={months.indexOf(m)}>
  {m}
</option>
                ))}
              </select>
            )}

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

        {/* SUMMARY + CHART */}
        <div className="report-top">

          <div className="summary-card">
            <h3>Summary</h3>

            <div className="summary-item">
              <span>Total Spent</span>
              <strong>₹{totalSpent}</strong>
            </div>

            <div className="summary-item">
              <span>Remaining</span>
              <strong>₹{remaining}</strong>
            </div>

            <div className="summary-item">
              <span>Transactions</span>
              <strong>{totalTransactions}</strong>
            </div>

            <div className="summary-item">
              <span>Top Category</span>
              <strong>{topCategory}</strong>
            </div>
          </div>

          <div className="chart-card">
            <h3>
              {view === "monthly"
                ? "Expense Distribution"
                : "Monthly Spending"}
            </h3>

            <div className="chart-container">
              {view === "monthly" ? (
                pieData.labels.length > 0 ? (
                  <Pie data={pieData} />
                ) : (
                  <p>No Data</p>
                )
              ) : (
                barData.labels.length > 0 ? (
                  <Bar data={barData} />
                ) : (
                  <p>No Data</p>
                )
              )}
            </div>
          </div>

        </div>

        {/* CATEGORY */}
        <div className="category-card">
          <h3>Category Breakdown</h3>

          {Object.keys(categoryTotals).length === 0 ? (
            <p className="empty-text">No expenses found.</p>
          ) : (
            Object.entries(categoryTotals).map(
              ([category, amount]) => (
                <div className="category-row" key={category}>
                  <span>{category}</span>
                  <strong>₹{amount}</strong>
                </div>
              )
            )
          )}
        </div>

        {/* TABLE (FIXED - ALWAYS SHOWS DATA) */}
        <div className="transaction-card">
          <h3>Transactions</h3>

          <table className="report-table">
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
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <tr key={expense._id}>
                    <td>
                      {expense.date
                        ? new Date(expense.date).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>{expense.description || "-"}</td>
                    <td>{expense.category || "-"}</td>
                    <td>{expense.paymentMethod || "-"}</td>
                    <td className="amount">
                      ₹{expense.amount || 0}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-table">
                    No Transactions Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Reports;