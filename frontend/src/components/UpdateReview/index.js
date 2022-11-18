import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UpdateReview from './UpdateReview';

function ReviewUpdateModal({ reviews, reviewId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='right-side-user-menu'>
      <div>
        <button onClick={() => setShowModal(true)}>Update Review</button>
      </div>
      <div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <UpdateReview reviews={reviews} reviewId={reviewId}/>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ReviewUpdateModal;
