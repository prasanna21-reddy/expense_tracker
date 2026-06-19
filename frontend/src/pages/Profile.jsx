import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Profile.css";

function Profile() {

  const navigate = useNavigate();

 const [user, setUser] = useState(() => {
  return JSON.parse(localStorage.getItem("user")) || {};
});

  const [expenses, setExpenses] = useState([]);

  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(user?.name || "");
const [email, setEmail] = useState(user?.email || "");

  const monthlyRevenue =
  Number(
    localStorage.getItem(`allowance_${user?.id}`)
  ) || 0;

  useEffect(() => {
  if (user?.id) {
    fetchExpenses();
  }
}, [user]);

  const fetchExpenses = async () => {
  try {
    if (!user?.id) return;

    const res = await axios.get(
      `http://localhost:5000/expenses/${user.id}`
    );

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

  const handleUpdate = async () => {

    try {

      const res = await axios.put(

        `http://localhost:5000/update-profile/${user.id}`,

        {
          name,
          email,
        }

      );

      const updatedUser = {
        ...user,
        name: res.data.name,
        email: res.data.email,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);

      setEditing(false);

      alert("Profile updated successfully");

    } catch (err) {

      console.log(err);

      alert("Unable to update profile");

    }

  };

  return (

<div className="dashboard-layout">

<Sidebar />

<div className="main-content">

<div className="topbar">

<h2>My Profile</h2>

<p>Manage your personal information</p>

</div>

<div className="profile-container">

<div className="profile-header">

<div className="avatar">

{user?.name?.charAt(0).toUpperCase()}

</div>

{editing ? (

<input
className="profile-input"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

) : (

<h3>{user.name}</h3>

)}

{editing ? (

<input
className="profile-input"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

) : (

<p>{user.email}</p>

)}

</div>

<hr />

<div className="profile-section">

<h4>Personal Information</h4>

<div className="profile-row">

<span>Name</span>

{editing ? (

<input
className="profile-input"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

) : (

<strong>{user.name}</strong>

)}

</div>

<div className="profile-row">

<span>Email</span>

{editing ? (

<input
className="profile-input"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

) : (

<strong>{user.email}</strong>

)}

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

<hr /><div className="action-buttons">

  {!editing ? (

    <button
      className="btn btn-primary"
      onClick={() => setEditing(true)}
    >
      Edit Profile
    </button>

  ) : (

    <>
      <button
        className="btn btn-success"
        onClick={handleUpdate}
      >
        Save
      </button>

      <button
        className="btn btn-secondary"
        onClick={() => {
          setEditing(false);
          setName(user.name);
          setEmail(user.email);
        }}
      >
        Cancel
      </button>
    </>

  )}

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