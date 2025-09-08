import React from 'react';

const RightPanelHeader = ({ palette }) => (
  <div className="p-4" style={{ borderBottom: 'none' }}>
    <span style={{ color: palette.textPrimary, fontWeight: 600, marginLeft: 12 }}>Reviewer</span>
  </div>
);

export default RightPanelHeader;


