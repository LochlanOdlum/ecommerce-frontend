import React, { useState } from 'react';

import './AdminPhotoPositionField.css';

const AdminPhotoPositionField = ({ position, onSubmit }) => {
  const [positionInputValue, setPositionInputValue] = useState(position);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log('submited');
        onSubmit(positionInputValue);
      }}
    >
      <input
        className='admin-table-cell-input admin-table-cell-orderPos-input'
        value={positionInputValue}
        onChange={(e) => {
          setPositionInputValue(e.target.value);
        }}
      />
    </form>
  );
};

export default AdminPhotoPositionField;
