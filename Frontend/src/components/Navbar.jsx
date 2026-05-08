import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const logout = () => {
    localStorage.removeItem("isLoggedIn");

    alert("Logged out");

    navigate("/login");

    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand fw-bold" to="/">
        MockMate
      </Link>

      <div className="navbar-nav">

        {!isLoggedIn && (
          <>
            <Link className="nav-link" to="/signup">
              Signup
            </Link>

            <Link className="nav-link" to="/login">
              Login
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link className="nav-link" to="/upload">
              Upload
            </Link>

            <Link className="nav-link" to="/resumes">
              Resumes
            </Link>
          </>
        )}
      </div>

      {isLoggedIn && (
        <button className="btn btn-light ms-auto" onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;