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
    return <h2>Loading interview...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Interview Questions</h2>

      {interview.questions?.map((question, index) => (
        <div key={index} style={{background: "white",padding: "15px",marginBottom: "15px",borderRadius: "8px"}}>
          <p>
            <b>Question {index + 1}:</b> {question}
          </p>

          <textarea
            placeholder="Write your answer"
            value={answers[index] || ""}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />

          <br />
          <br />
        </div>
      ))}

      <button onClick={submitAnswers}>Submit Answers</button>
        <br />
        <br />
      <button onClick={generateFeedback}>Generate Feedback</button>

      {feedback && (
        <div style={{ background: "white",padding: "15px",marginTop: "20px",borderRadius: "8px" }}>
          <h2>Feedback</h2>

          <p>
            <b>Score:</b> {feedback.score}
          </p>

          <h3>Strengths</h3>
          <ul>
            {feedback.strengths?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>Weaknesses</h3>
          <ul>
            {feedback.weaknesses?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>Suggestions</h3>
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