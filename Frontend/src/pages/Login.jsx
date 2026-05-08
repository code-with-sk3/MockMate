import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/auth/login", formData);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", formData.email);

      alert("Login successful");
      navigate("/upload");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
  <div className="page">
    <div className="card-box">
      <h2 className="mb-4 text-center">Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
        />

        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>
      </form>
    </div>
  </div>
);
}

export default Login;