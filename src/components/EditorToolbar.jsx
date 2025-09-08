import React from 'react';
import { Play, Wrench, Save } from 'lucide-react';

const EditorToolbar = ({ palette, fixing, onReview, onFix, onSave, onUndo }) => {
  return (
    <div className="flex items-center justify-between p-4 toolbar" style={{ borderBottom: `1px solid ${palette.divider}` }}>
      <div className="flex items-center gap-3">
        <div className="flex items-center" style={{ gap: '8px' }}>
          <button 
            className="btn btn-success"
            style={{
              background: palette.run,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = palette.runHover;
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = palette.run;
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
            onClick={onReview}
          >
            <Play size={16} />
            Review
          </button>
          <button 
            className="btn btn-primary"
            style={{
              background: palette.fix,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              opacity: fixing ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!fixing) {
                e.target.style.background = palette.fixHover;
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!fixing) {
                e.target.style.background = palette.fix;
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }
            }}
            onClick={onFix}
            disabled={fixing}
          >
            <Wrench size={16} />
            {fixing ? 'Fixing...' : 'Fix'}
          </button>
          <button 
            className="btn btn-neutral"
            style={{
              background: palette.save,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = palette.saveHover;
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = palette.save;
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
            onClick={onSave}
          >
            <Save size={16} />
            Save
          </button>
        </div>
        <button
          className="btn btn-ghost"
          style={{
            background: 'transparent',
            color: palette.textSecondary,
            border: `1px solid ${palette.divider}`,
            borderRadius: '8px',
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = palette.divider;
            e.target.style.color = palette.textPrimary;
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = palette.textSecondary;
            e.target.style.transform = 'translateY(0)';
          }}
          onClick={onUndo}
        >Undo Fix</button>
      </div>

      <div className="flex items-center gap-3">
        {/* History select is still in parent; keep toolbar minimal */}
      </div>
    </div>
  );
};

export default EditorToolbar;


