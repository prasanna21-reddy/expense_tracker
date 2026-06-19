import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">

      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3" to="/">
            💰 Expense Tracker
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#features">
                  Features
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section py-5">
        <div className="container">
          <div className="row align-items-center">

            {/* Left */}
            <div className="col-lg-6 text-center text-lg-start">
              <h1 className="hero-title fw-bold mb-4">
                Manage Your Expenses Smartly 💸
              </h1>

              <p className="hero-text mb-4">
                Track your daily spending, control your budget,
                and save more money with ease. Build better
                financial habits and achieve your goals.
              </p>

              <div>
                <Link
                  to="/register"
                  className="btn btn-success btn-lg me-3"
                >
                  Get Started
                </Link>

                <Link
                  to="/login"
                  className="btn btn-outline-dark btn-lg"
                >
                  Login
                </Link>
              </div>
            </div>

            {/* Right */}
            <div className="col-lg-6 text-center mt-5 mt-lg-0">
              <img
                src="https://img.freepik.com/free-vector/finance-concept-illustration_114360-1545.jpg"
                alt="Expense Tracker"
                className="img-fluid hero-image"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-5 bg-light">
        <div className="container text-center">

          <h2 className="fw-bold mb-5">
            Why Choose Expense Tracker?
          </h2>

          <div className="row">

            <div className="col-md-4 mb-4">
              <div className="card feature-card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h1>📊</h1>

                  <h5 className="card-title fw-bold">
                    Track Expenses
                  </h5>

                  <p className="card-text text-muted">
                    Easily record and organize your daily expenses.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card feature-card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h1>💵</h1>

                  <h5 className="card-title fw-bold">
                    Budget Planning
                  </h5>

                  <p className="card-text text-muted">
                    Set monthly budgets and avoid overspending.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card feature-card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h1>📈</h1>

                  <h5 className="card-title fw-bold">
                    Insightful Reports
                  </h5>

                  <p className="card-text text-muted">
                    Understand spending habits through reports and summaries.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-5">
        <div className="container text-center">

          <h2 className="fw-bold mb-4">
            About Expense Tracker
          </h2>

        <p className="about-text mx-auto">
  Expense Tracker is a user-friendly personal finance management
  application designed to help individuals take control of their
  daily expenses and improve their financial habits. Users can
  easily record income and expenses, categorize transactions,
  monitor spending patterns, and set budgets to avoid unnecessary
  expenditures.
  <br /><br />
  The application provides insightful reports and summaries that
  help users understand where their money goes and make informed
  financial decisions. With a simple interface and secure access,
  Expense Tracker aims to make money management easier, more
  organized, and stress-free for everyone.
</p>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <small>
          © {new Date().getFullYear()} Expense Tracker | Built with React & Bootstrap
        </small>
      </footer>

    </div>
  );
}

export default Home;