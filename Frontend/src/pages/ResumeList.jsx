import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function ResumeList() {
    const [resumes, setResumes] = useState([]);
    const navigate = useNavigate();

    const getResumes = async () => {
        try {
            const res = await axios.get("http://localhost:5000/resume/all");
            setResumes(res.data.filter((resume) => resume.extractedText));
        } catch (err) {
            console.log(err);
            alert("Failed to fetch resumes");
        }
    };

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

    useEffect(() => {
        getResumes();
    }, []);

    return (
        <div>
            <h2>Uploaded Resumes</h2>

            {resumes.length === 0 ? (
                <p>No resumes uploaded yet</p>
            ) : (
                resumes.map((resume) => (
                    <div key={resume._id}>
                        <h4>{resume.fileName}</h4>
                        <p>{resume.filePath}</p>

                        <button onClick={() => startInterview(resume._id)}>
                            Start Interview
                        </button>

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default ResumeList;