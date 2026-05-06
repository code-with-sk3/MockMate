import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function UploadResume() {
    const navigate = useNavigate();
    const [resume, setResume] = useState(null);

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!resume) {
            alert("Please select a resume");
            return;
        }

        const formData = new FormData();
        formData.append("resume", resume);

        try {
            const res = await axios.post(
                "http://localhost:5000/resume/upload",
                formData
            );

            alert(res.data);
            navigate("/resumes");
        } catch (err) {
            console.log(err);
            alert("Resume upload failed");
        }
    };

    return (
        <div>
            <h2>Upload Resume</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                />

                <br /><br />

                <button type="submit">Upload Resume</button>
            </form>
        </div>
    );
}

export default UploadResume;