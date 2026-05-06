import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{ padding: "15px", background: "white", marginBottom: "20px" }}>
      <Link to="/">Home</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
      <Link to="/upload">Upload Resume</Link>
      <Link to="/resumes">Resumes</Link>
    </div>
  );
}

export default Navbar;