import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Use the same CSS as Login

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      alert(res.data.message || "Registration Successful");

      // If backend returns a token after registration
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Navigate to Dashboard after successful registration
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="text-center mb-4">

          <div className="logo-circle">
            💰
          </div>

          <h2 className="mt-3 fw-bold">
            Create Account
          </h2>

          <p className="text-muted">
            Create your Expense Tracker account
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Create Account
          </button>

        </form>

        <hr />

        <p className="text-center mb-0">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;