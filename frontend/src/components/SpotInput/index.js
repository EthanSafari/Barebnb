import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SpotInput from './SpotInput';

function SpotInputModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='right-side-user-menu'>
      <div>
        <button onClick={() => setShowModal(true)}>Create Spot</button>
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
