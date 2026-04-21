import { useState } from "react";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
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
      const res = await axios.post(
        "http://localhost:5000/auth/signup",
        formData
      );

      alert("Signup successful");
      console.log(res.data);

    } catch (err) {
      console.log("Full error:", err);
      console.log("Response data:", err.response?.data);
      console.log("Status:", err.response?.status);
      console.log("Message:", err.message);
      alert("Signup failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Enter name" onChange={handleChange} />
        <br /><br />

        <input type="email" name="email" placeholder="Enter email" onChange={handleChange} />
        <br /><br />

        <input type="password" name="password" placeholder="Enter password" onChange={handleChange} />
        <br /><br />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;