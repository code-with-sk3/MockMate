import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UploadResume from "./pages/UploadResume";
import ResumeList from "./pages/ResumeList";
import Interview from "./pages/Interview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/resumes" element={<ResumeList />} />
        <Route path="/interview/:id" element={<Interview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;