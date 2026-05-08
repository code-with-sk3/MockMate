import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page">
      <div className="card-box text-center">
        <h1 className="mb-3">Welcome to MockMate</h1>

        <p className="lead">
          AI-powered mock interview platform based on your resume.
        </p>

        <p>
          Upload your resume, generate interview questions, answer them, and get AI feedback.
        </p>

        <div className="mt-4">
          <Link to="/signup" className="btn btn-primary me-2">
            Get Started
          </Link>

          <Link to="/login" className="btn btn-outline-primary">
            Login
          </Link>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card-box text-center">
            <h4>Upload Resume</h4>
            <p>Upload your PDF resume easily.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card-box text-center">
            <h4>AI Questions</h4>
            <p>Generate interview questions from your resume.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card-box text-center">
            <h4>Smart Feedback</h4>
            <p>Get score, strengths, weaknesses, and suggestions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;