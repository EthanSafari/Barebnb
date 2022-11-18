import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReview from './CreateReview';

function CreateReviewModal({ spotId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>CreateReview</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReview spotId={spotId} />
        </Modal>
      )}
    </>
  );
}

export default CreateReviewModal;
