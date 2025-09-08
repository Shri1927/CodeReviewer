import React from 'react';

const FeedbackCards = ({ reviewData, collapsed, toggleCard, palette, extractCodeBlocks, copyToClipboard, applyFixBlock }) => {
  if (!reviewData) return null;
  return (
    <div className="space-y-2">
      <div 
        className="rounded-xl p-4 shadow-md" 
        style={{ 
          background: '#1b1b1b', 
          border: `1px solid ${palette.divider}`, 
          fontFamily: 'var(--ui-font)',
          marginBottom: 8,
          cursor: 'pointer'
        }}
        onClick={() => toggleCard('quality')}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2B2B2B' }}>
              {/* icon handled by parent via CSS; keep simple marker */}
            </div>
            <h3 className="font-semibold" style={{ color: palette.textPrimary, fontFamily: 'var(--ui-font)', fontWeight: 600, marginLeft: 0 }}>Quality Rating</h3>
          </div>
        </div>
        {!collapsed.quality && (
          <p className="font-medium text-sm" style={{ color: palette.run, fontFamily: 'var(--ui-font)', fontWeight: 600, marginLeft: 0 }}>{reviewData.qualityRating}</p>
        )}
      </div>

      <div 
        className="rounded-xl p-4 shadow-md" 
        style={{ 
          background: '#1b1b1b', 
          border: `1px solid ${palette.divider}`, 
          fontFamily: 'var(--ui-font)',
          marginBottom: 8,
          cursor: 'pointer'
        }}
        onClick={() => toggleCard('suggestions')}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2B2B2B' }}>
            </div>
            <h3 className="font-semibold" style={{ color: palette.textPrimary, fontFamily: 'var(--ui-font)', fontWeight: 600, marginLeft: 0 }}>Suggestions</h3>
          </div>
        </div>
        {!collapsed.suggestions && (
          <ul className="space-y-3">
            {reviewData.suggestions?.map((suggestion, index) => {
              const blocks = extractCodeBlocks(suggestion);
              return (
                <li key={index} className="text-sm" style={{ color: palette.textSecondary, fontFamily: 'var(--ui-font)', fontWeight: 600, marginLeft: 0 }}>
                  <div className="mb-2">• {suggestion.replace(/```[\s\S]*?```/g, '').trim()}</div>
                  {blocks.map((b, bi) => (
                    <div key={bi} className="rounded-md" style={{ background: '#1f1f1f', border: `1px solid ${palette.divider}` }}>
                      <div className="flex items-center justify-between px-3 py-2" style={{ borderBottom: `1px solid ${palette.divider}` }}>
                        <span className="text-xs" style={{ color: palette.textMuted }}>Suggested code</span>
                        <div className="flex items-center gap-2">
                          <button className="text-xs px-2 py-1 rounded-md" style={{ background: '#333', color: '#fff', fontFamily: 'var(--ui-font)' }} onClick={() => copyToClipboard(b)}>Copy</button>
                          <button className="text-xs px-2 py-1 rounded-md" style={{ background: palette.fix, color: '#fff', fontFamily: 'var(--ui-font)' }} onClick={() => applyFixBlock(b)}>Apply Fix</button>
                        </div>
                      </div>
                      <pre className="p-3 text-xs overflow-auto" style={{ color: palette.textSecondary, margin: 0, fontFamily: 'var(--code-font)', fontWeight: 600 }}><code>{b}</code></pre>
                    </div>
                  ))}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div 
        className="rounded-xl p-4 shadow-md" 
        style={{ 
          background: '#1b1b1b', 
          border: `1px solid ${palette.divider}`, 
          fontFamily: 'var(--ui-font)',
          marginBottom: 8,
          cursor: 'pointer'
        }}
        onClick={() => toggleCard('explanation')}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2B2B2B' }}>
            </div>
            <h3 className="font-semibold" style={{ color: palette.textPrimary, fontFamily: 'var(--ui-font)', fontWeight: 600, marginLeft: 0 }}>Step-by-Step Explanation</h3>
          </div>
        </div>
        {!collapsed.explanation && (
          <p className="text-sm" style={{ color: palette.textSecondary, fontFamily: 'var(--ui-font)', fontWeight: 600, marginLeft: 0 }}>
            {reviewData.explanation}
          </p>
        )}
      </div>

      <div 
        className="rounded-xl p-4 shadow-md" 
        style={{ 
          background: '#1b1b1b', 
          border: `1px solid ${palette.divider}`, 
          fontFamily: 'var(--ui-font)',
          marginBottom: 8,
          cursor: 'pointer'
        }}
        onClick={() => toggleCard('errors')}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2B2B2B' }}>
            </div>
            <h3 className="font-semibold" style={{ color: palette.textPrimary, fontFamily: 'var(--ui-font)', fontWeight: 600, marginLeft: 0 }}>Errors</h3>
          </div>
        </div>
        {!collapsed.errors && (
          Array.isArray(reviewData.errors) ? (
            <ul className="space-y-2">
              {reviewData.errors.map((error, index) => (
                <li key={index} className="text-sm" style={{ color: palette.textSecondary, fontFamily: 'var(--ui-font)', fontWeight: 600, marginLeft: 0 }}>• {error}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm" style={{ color: palette.textSecondary, fontFamily: 'var(--ui-font)', fontWeight: 600, marginLeft: 0 }}>{reviewData.errors}</p>
          )
        )}
      </div>

      {reviewData.improvements && (
        <div 
          className="rounded-xl p-4 shadow-md" 
          style={{ 
            background: '#1b1b1b', 
            border: `1px solid ${palette.divider}`, 
            fontFamily: 'var(--ui-font)',
            marginBottom: 8,
            cursor: 'pointer'
          }}
          onClick={() => toggleCard('improvements')}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2B2B2B' }}>
              </div>
              <h3 className="font-semibold" style={{ color: palette.textPrimary, fontFamily: 'var(--ui-font)', fontWeight: 600, marginLeft: 0 }}>Improvements</h3>
            </div>
          </div>
          {!collapsed.improvements && (
            <ul className="space-y-2">
              {reviewData.improvements.map((improvement, index) => (
                <li key={index} className="text-sm" style={{ color: palette.textSecondary, fontFamily: 'var(--ui-font)', fontWeight: 600, marginLeft: 0 }}>• {improvement}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackCards;


