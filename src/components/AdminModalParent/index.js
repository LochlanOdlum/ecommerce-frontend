import React, { useRef } from 'react';

import AdminGreyBackgroundCenter from '../AdminGreyBackgroundCenter';
import useOnClickOutsideElement from '../../hooks/useOnClickOutsideElement';

const AdminModalParent = ({ children, closeModal }) => {
  const childRef = useRef(null);
  useOnClickOutsideElement(childRef, closeModal);

  return (
    <AdminGreyBackgroundCenter>
      <div ref={childRef}>{children}</div>
    </AdminGreyBackgroundCenter>
  );
};

export default AdminModalParent;
