import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SpotInput from './SpotInput';

import './SpotInput.css';

function SpotInputModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='right-side-user-menu'>
      <div>
        <button onClick={() => setShowModal(true)} className='create-spot-button'>barebnb your home</button>
      </div>
      <div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <SpotInput />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default SpotInputModal;
