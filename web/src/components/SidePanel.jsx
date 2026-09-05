import React, { useState } from 'react';
import './SidePanel.css';

const SidePanel = ({ chatHistory, currentModel, setCurrentModel }) => {
  const [showModels, setShowModels] = useState(false);

  const models = [
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI' },
    { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI' },
    { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google' }
  ];

  return (
    <div className="side-panel">
      <div className="panel-header">
        <h2>📋 Vedai</h2>
      </div>

      <div className="model-selector">
        <button 
          className="model-button"
          onClick={() => setShowModels(!showModels)}
        >
          <span>🤖</span>
          <span className="current-model">
            {models.find(m => m.id === currentModel)?.name}
          </span>
        </button>
        {showModels && (
          <div className="model-dropdown">
            {models.map(model => (
              <button
                key={model.id}
                className={`model-option ${currentModel === model.id ? 'active' : ''}`}
                onClick={() => {
                  setCurrentModel(model.id);
                  setShowModels(false);
                }}
              >
                <span>{model.name}</span>
                <span className="provider">{model.provider}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="history-section">
        <h3>💬 History</h3>
        <div className="history-list">
          {chatHistory.length === 0 ? (
            <p className="empty-message">No messages yet</p>
          ) : (
            chatHistory.map((chat, idx) => (
              <div key={idx} className="history-item">
                <p className="message-preview">{chat.message.substring(0, 30)}...</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="panel-footer">
        <button className="settings-button">⚙️ Settings</button>
        <button className="logout-button">🚪 Logout</button>
      </div>
    </div>
  );
};

export default SidePanel;
