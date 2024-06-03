import React, { useState, useEffect } from 'react';

import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import Sidebar from './components/Sidebar/Sidebar';
import Feed from './components/Feed/Feed';
import Connections from './components/Connections/Connections';
import Messaging from './components/Messaging/Messaging';
import './App.css'; 

function MainApp() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <PrimarySearchAppBar onSidebarToggle={handleSidebarToggle} />
      <div className="app-layout">
        {isDesktop ? (
          <Sidebar isOpen={true} onClose={() => {}} />
        ) : (
          <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
        )}
        <main className="main-content">
          <br />
          {/* Remove the nested App component to avoid the infinite loop */}
          
          <Feed />
          <Connections />
          <Messaging />
        </main>
      </div>
    </div>
  );
}

export default MainApp;
