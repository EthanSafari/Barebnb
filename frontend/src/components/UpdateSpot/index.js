import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UpdateCurrentSpot from './UpdateSpot';

function UpdateSpotModal({ spots }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Update Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateCurrentSpot spots={spots} />
        </Modal>
      )}
    </>
  );
}

export default UpdateSpotModal;
