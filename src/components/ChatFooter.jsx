import React from 'react';
import { Send } from 'lucide-react';

const ChatFooter = ({ palette, chatMessages, chatInput, setChatInput, sendChatMessage }) => {
  return (
    <div style={{ borderTop: `1px solid ${palette.divider}`, background: '#1e1e1e', padding: 12 }}>
      <div 
        className="rounded-xl p-4 shadow-md" 
        style={{ 
          background: palette.cardGradient, 
          border: `1px solid ${palette.divider}`, 
          fontFamily: 'var(--ui-font)'
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold" style={{ color: palette.textPrimary }}>Chat with Reviewer</h3>
        </div>
        <div className="flex flex-col gap-3" style={{ background: '#202020', border: `1px solid ${palette.divider}`, borderRadius: 8, padding: 12, maxHeight: 140, overflowY: 'auto' }}>
          {chatMessages.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ color: '#9ca3af', fontSize: 12, minWidth: 56 }}>{m.role === 'user' ? 'You' : 'Codie'}</span>
              <p style={{ color: palette.textSecondary, whiteSpace: 'pre-wrap', margin: 0 }}>{m.content}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') sendChatMessage(); }}
            placeholder="Ask a follow-up (e.g., Can you optimize this?)"
            style={{ 
              flex: 1, 
              background: '#1f1f1f', 
              color: palette.textPrimary, 
              border: `1px solid ${palette.divider}`, 
              borderRadius: 8, 
              padding: '10px 12px', 
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = palette.fix;
              e.target.style.boxShadow = `0 0 0 2px ${palette.fix}20`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = palette.divider;
              e.target.style.boxShadow = 'none';
            }}
          />
          <button 
            onClick={sendChatMessage} 
            className="px-3 py-2 rounded-md" 
            style={{ 
              background: palette.fix, 
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: 8
            }}
            onMouseEnter={(e) => {
              e.target.style.background = palette.fixHover;
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = palette.fix;
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
            title="Send"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatFooter;


