import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SpotInput from './SpotInput';

function SpotInputModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SpotInput />
        </Modal>
      )}
    </>
  );
}

export default SpotInputModal;
