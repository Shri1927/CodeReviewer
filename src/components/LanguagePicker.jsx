import React from 'react';
import Select from 'react-select';

const LanguagePicker = ({ value, onChange, options, styles }) => {
  return (
    <div className="p-4" style={{ borderBottom: '1px solid #2D2D2D' }}>
      <Select value={value} onChange={onChange} options={options} styles={styles} className="w-full" />
    </div>
  );
};

export default LanguagePicker;


