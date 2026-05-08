import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Interview() {
  const { id } = useParams();

  const [interview, setInterview] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/interview/${id}`);

        const interviewData = res.data.data || res.data;

        setInterview(interviewData);
        setAnswers(interviewData.answers || []);
        setFeedback(interviewData.feedback || null);
      } catch (err) {
        console.log(err);
        alert("Error fetching interview");
      }
    };

    fetchInterview();
  }, [id]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const submitAnswers = async () => {
    try {
      await axios.post(`http://localhost:5000/interview/answer/${id}`, {
        answers: answers
      });

      alert("Answers saved successfully");
    } catch (err) {
      console.log(err);
      alert("Error saving answers");
    }
  };

  const generateFeedback = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/interview/feedback/${id}`
      );

      setFeedback(res.data.feedback);
      alert("Feedback generated successfully");
    } catch (err) {
      console.log(err);
      alert("Error generating feedback");
    }
  };

  if (!interview) {
    return <h2 style={{ padding: "20px" }}>Loading interview...</h2>;
  }

  return (
  <div className="page">
    <h2 className="mb-4 text-center">Interview Questions</h2>

    {interview.questions?.map((question, index) => (
      <div className="card-box" key={index}>
        <p>
          <b>Question {index + 1}:</b> {question}
        </p>

        <textarea
          className="form-control"
          placeholder="Write your answer"
          value={answers[index] || ""}
          onChange={(e) => handleAnswerChange(index, e.target.value)}
        />
      </div>
    ))}

    <button className="btn btn-success me-2" onClick={submitAnswers}>
      Submit Answers
    </button>

    <button className="btn btn-primary" onClick={generateFeedback}>
      Generate Feedback
    </button>

    {feedback && (
      <div className="card-box mt-4">
        <h2 className="text-center mb-3">Feedback</h2>

        <p className="fs-5">
          <b>Score:</b> {feedback.score}/10
        </p>

        <h4 className="text-success">Strengths</h4>
        <ul>
          {feedback.strengths?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h4 className="text-danger">Weaknesses</h4>
        <ul>
          {feedback.weaknesses?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h4 className="text-primary">Suggestions</h4>
        <ul>
          {feedback.suggestions?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);
}

export default Interview;