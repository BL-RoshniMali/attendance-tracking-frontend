import React from "react";
import "./AdminDashboard.css";
import profilepic from "../assets/profile-icon.png";

export default function dashboard() {
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
            href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
          ></link>
        </head>
        <body>
          <input type="checkbox" id="nav-toggle" />
          <div className="side-nav">
            <div className="side-nav-title">
              <h2>
                <span className="lab la-accusoft"></span>
                <span>Admin</span>
              </h2>
            </div>
            <div className="side-nav-menu">
              <ul>
                <li>
                  <a href="" className="active">
                    <span className="las la-igloo"></span>
                    <span>Dashboard</span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span className="las la-users"></span>
                    <span>Project</span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span className="las la-clipboard-list"></span>
                    <span>Tasks</span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span className="las la-user-circle"></span>
                    <span>Settings</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="main-content">
            <header>
              <h2>
                <label htmlFor="nav-toggle">
                  <span className="las la-bars"></span>
                </label>
                Admin Dashboard
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
            </header>

            <main>
              <div className="cards">
                <div className="card-single">
                  <div>
                    <h1>54</h1>
                    <span>Candidate</span>
                  </div>
                  <div>
                    <span className="las la-users"></span>
                  </div>
                </div>
                <div className="card-single">
                  <div>
                    <h1>54</h1>
                    <span>Project</span>
                  </div>
                  <div>
                    <span className="las la-clipboard-list"></span>
                  </div>
                </div>
                <div className="card-single">
                  <div>
                    <h1>54</h1>
                    <span>Task</span>
                  </div>
                  <div>
                    <span className="las la-clipboard-list"></span>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </body>
      </html>
    </div>
  );
}
