import React, { useState, useEffect } from 'react';
import './CandidateDashboard.css';
import profilepic from "../assets/profile-icon.png";

export default function CandidateDashboard() {

  // State to hold the current date and time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Function to format the date
  const formatDate = (date) => {
    const dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', dateOptions);
  };

  // Function to format the time
  const formatTime = (date) => {
    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    };
    return date.toLocaleTimeString('en-US', timeOptions);
  };

  // useEffect to update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const formattedDate = formatDate(currentTime);
  const formattedTime = formatTime(currentTime);


  return (
    <div>
      <html>
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Attendance Tracking System</title>
        <link
          rel="stylesheet"
          href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css">
        </link>
      </head>

      <body>

      {/* Dashboard-Header  */}
      <div className="dashboard-header">
        <h2>
          <label htmlFor="">
            <span className="las la-bars"></span>
          </label>
          Candidate Dashboard
        </h2>
        <div className="search-wrapper">
          <span className="las la-search"></span>
          <input type="search" placeholder="Search here" />
        </div>
        <div className="user-wrapper">
          <img src={profilepic} alt="" width="40px" height="40px" />
          <div>
            <h4>John Doe</h4>
            <small>Super Admin</small>
          </div>
        </div>

      </div>

      {/* Time-in Time-out box  */}
      <main class="main-container">
        <div className="card">
          <div className="card-header">
          <h2 className='welcome-heading'>Welcome John Doe</h2>
          </div>
          <div className="card-content">
            <h3 className='welcome-heading'>{formattedDate}</h3>
            <h3 className='welcome-heading'>{formattedTime}</h3>
            <div className="button-group">
              <button className="btn time-in">Time In</button>
              <button className="btn time-out">Time Out</button>
            </div>
          </div>
        </div>
      </main>

      </body>

      </html> 

    </div>
  )
}
