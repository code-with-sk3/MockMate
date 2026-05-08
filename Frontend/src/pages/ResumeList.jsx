import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ResumeList() {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        const res = await axios.get(`http://localhost:5000/resume/user/${email}`);
        setResumes(res.data);
      } catch (err) {
        console.log(err);
        alert("Error fetching resumes");
      }
    };

    fetchResumes();
  }, []);

  const startInterview = async (resumeId) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/interview/questions/${resumeId}`
      );

      alert("Interview started successfully");
      navigate(`/interview/${res.data._id}`);
    } catch (err) {
      console.log(err);
      alert("Error starting interview");
    }
  };

  return (
  <div className="page">
    <h2 className="mb-4 text-center">All Resumes</h2>

    {resumes.length === 0 && (
      <div className="alert alert-warning text-center">
        No resumes uploaded yet.
      </div>
    )}

    {resumes.map((resume) => (
      <div className="card-box" key={resume._id}>
        <h5>{resume.fileName}</h5>

        <p className="text-muted">
          <b>Path:</b> {resume.filePath}
        </p>

        <button
          className="btn btn-primary"
          onClick={() => startInterview(resume._id)}
        >
          Start Interview
        </button>
      </div>
    ))}
  </div>
);
}

export default ResumeList;