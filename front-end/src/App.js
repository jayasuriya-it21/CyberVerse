import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Main from "./components/Main";
import BasicQuiz from "./components/BasicQuiz";
import IntermediateQuiz from "./components/IntermediateQuiz";
import AdvancedQuiz from "./components/AdvancedQuiz";
import Dashboard from "./components/Dashboard";
import CertificatePage from './components/Certificate';
import Certificateintermediate from "./components/IntermediateQuiz/certificateintermediate";
import Certificateadv from "./components/AdvancedQuiz/certificateadv";

function App() {
  const user = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {user && <Route path="/" exact element={<Main />} />}
        <Route path="/signup" exact element={<Signup />} />
			  <Route path="/login" exact element={<Login />} />
			  <Route path="/" element={<Navigate replace to="/main" />} />
			  <Route path="/main" element={<Main />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/certificateintermediate" element={<Certificateintermediate />} />
        <Route path="/certificateadv" element={<Certificateadv />} />
        <Route path="/certificate" element={<CertificatePage />} />
        <Route path="/basicQuiz" element={<BasicQuiz />} />
        <Route path="/intermediateQuiz" element={<IntermediateQuiz />} />
        <Route path="/advancedQuiz" element={<AdvancedQuiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
