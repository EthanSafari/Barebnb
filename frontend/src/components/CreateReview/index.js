import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReview from './CreateReview';

import './CreateReview.css';

function CreateReviewModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='review-modal-button-container'>
        <button onClick={() => setShowModal(true)} className='review-modal-button'>Create Review</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <CreateReview setShowModal={setShowModal} />
          </Modal>
        )}
      </div>
    </>
  );
};

export default CreateReviewModal;
