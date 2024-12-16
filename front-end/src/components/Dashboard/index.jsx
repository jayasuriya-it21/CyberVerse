import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../images/icon/profile-pic.png';
import SkillProgress from './progress';
import './style.css';
import axios from 'axios';

function Dashboard() {
  const [courseProgress, setCourseProgress] = useState({});
  // eslint-disable-next-line 
  const [showReport, setShowReport] = useState(false);
  // eslint-disable-next-line 
  const performancePercentage = 78;
  const [userName, setUserName] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    if (firstName && lastName) {
      setUserName(`${firstName} ${lastName}`);
    }
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('/api/user');
        const { firstName, lastName } = response.data;
        setUserName(`${firstName} ${lastName}`);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const fetchCourseProgress = async () => {
      try {
        const response = await axios.get('/api/course-progress');
        setCourseProgress(response.data);
      } catch (error) {
        console.error("Error fetching course progress:", error);
      }
    };

    fetchUserDetails();
    fetchCourseProgress();
  }, []);

  // Handle navigation to the certificate page
  

  return (
    <div className="dashboard-container">
      <h1>My Learning</h1>
      <section className="user-info">
        <img src={profile} alt="profile" className="profile-pic" />
        <h2>Welcome, {userName}</h2>
      </section>

      <section className="progress-section">
        <h2>Your Progress</h2>
        <SkillProgress skill="Cybersecurity Basics" level={courseProgress["Cybersecurity Basics"] || 0} />
        <SkillProgress skill="Advanced Hacking Techniques" level={courseProgress["Advanced Hacking Techniques"] || 0} />
        <SkillProgress skill="Web Security" level={courseProgress["Web Security"] || 0} />
        <SkillProgress skill="Network Security Fundamentals" level={courseProgress["Network Security Fundamentals"] || 0} />
      </section>

      {/* Button to navigate to Certificate Page */}
      
    </div>
  );
}

export default Dashboard;
