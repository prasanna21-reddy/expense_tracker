import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [expenses, setExpenses] = useState([]);

  // Monthly Allowance from localStorage
  const [monthlyRevenue, setMonthlyRevenue] = useState(
    Number(localStorage.getItem("allowance")) || 0
  );

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Update allowance whenever Profile page becomes active
  useEffect(() => {
    const updateAllowance = () => {
      setMonthlyRevenue(
        Number(localStorage.getItem("allowance")) || 0
      );
    };

    updateAllowance();

    window.addEventListener("focus", updateAllowance);

    return () => {
      window.removeEventListener("focus", updateAllowance);
    };
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/expenses");
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalSpent = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const remaining = monthlyRevenue - totalSpent;

  const totalTransactions = expenses.length;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">

        <div className="topbar">
          <h2>My Profile</h2>
          <p>View your account information</p>
        </div>

        <div className="profile-container">

          <div className="profile-header">
            <div className="avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <h3>{user?.name}</h3>

            <p>{user?.email}</p>
          </div>

          <hr />

          <div className="profile-section">

            <h4>Personal Information</h4>

            <div className="profile-row">
              <span>Name</span>
              <strong>{user?.name}</strong>
            </div>

            <div className="profile-row">
              <span>Email</span>
              <strong>{user?.email}</strong>
            </div>

          </div>

          <hr />

          <div className="profile-section">

            <h4>Account Summary</h4>

            <div className="summary-grid">

              <div className="summary-box">
                <h6>Total Transactions</h6>
                <h3>{totalTransactions}</h3>
              </div>

              <div className="summary-box">
                <h6>Monthly Revenue</h6>
                <h3>₹{monthlyRevenue}</h3>
              </div>

              <div className="summary-box">
                <h6>Total Spent</h6>
                <h3>₹{totalSpent}</h3>
              </div>

              <div className="summary-box">
                <h6>Remaining</h6>
                <h3>₹{remaining}</h3>
              </div>

            </div>

          </div>

          <hr />

          <div className="action-buttons">

            <button className="btn btn-primary">
              Edit Profile
            </button>

            <button
              className="btn btn-warning"
              onClick={() => navigate("/forgot-password")}
            >
              Change Password
            </button>

            <button
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;