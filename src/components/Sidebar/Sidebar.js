import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>User Profile</h2>
        </div>
        <div className="sidebar-content">
          <div className="profile-section">
            <img src="profile-picture.jpg" alt="Profile" />
            <h3>User Name</h3>
            <p>Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Location: City, Country</p>
          </div>
          <div className="edit-profile-section">
            <div className="edit-profile-btn">Edit Profile</div>
            <div className="edit-privacy-btn">Edit Privacy Settings</div>
          </div>
          <div className="statistics-section">
            <h3>Statistics</h3>
            <p>Scam Reports Submitted: 10</p>
            <p>Helpful Votes Received: 20</p>
            <p>Connections: 30</p>
          </div>
          <div className="actions-section">
            <h3>Actions</h3>
            <div className="action">Alerts</div>
            <div className="action">Report Scams</div>
            <div className="action">Danger Zone</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
