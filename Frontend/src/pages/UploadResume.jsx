import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UploadResume() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("userEmail", localStorage.getItem("userEmail"));

    try {
      console.log("User email:", localStorage.getItem("userEmail"));

      await axios.post("http://localhost:5000/resume/upload", formData);

      alert("Resume uploaded successfully");
      navigate("/resumes");
    } catch (err) {
      console.log(err);
      alert("Resume upload failed");
    }
  };

  return (
  <div className="page">
    <div className="card-box">
      <h2 className="mb-4 text-center">Upload Resume</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button className="btn btn-success w-100" type="submit">
          Upload Resume
        </button>
      </form>
    </div>
  </div>
);
}

export default UploadResume;