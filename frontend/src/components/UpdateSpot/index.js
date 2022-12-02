import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UpdateCurrentSpot from './UpdateSpot';

function UpdateSpotModal(spot) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Update Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateCurrentSpot />
        </Modal>
      )}
    </>
  );
}

export default UpdateSpotModal;
