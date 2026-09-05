import React, { useState, useEffect } from 'react';
import './App.css';
import Avatar3D from './components/Avatar3D';
import ChatInterface from './components/ChatInterface';
import SidePanel from './components/SidePanel';

function App() {
  const [userId, setUserId] = useState(localStorage.getItem('userId') || 'user_' + Date.now());
  const [chatHistory, setChatHistory] = useState([]);
  const [currentModel, setCurrentModel] = useState('gpt-3.5-turbo');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('userId', userId);
  }, [userId]);

  const handleSendMessage = async (message) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          userId,
          model: currentModel
        })
      });
      const data = await response.json();
      if (data.success) {
        setChatHistory([...chatHistory, {
          message,
          response: data.response,
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <SidePanel chatHistory={chatHistory} currentModel={currentModel} setCurrentModel={setCurrentModel} />
        <div className="main-content">
          <Avatar3D userId={userId} />
          <ChatInterface onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;
