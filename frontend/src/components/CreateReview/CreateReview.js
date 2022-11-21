import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createReviewForSpot } from "../../store/review";

import './CreateReview.css';


const CreateReview = ({ spotId }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector((state) => state.session.user);
    const sessionSpots = useSelector((state) => state.spots.spots);

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            userId: sessionUser.id,
            spotId: spotId,
            stars,
            review,
        };

        const reviewData = await dispatch(createReviewForSpot(spotId, newReview));
        if (reviewData) reset();

        history.push(`/spots/${spotId}`);
    };

    const reset = () => {
        setReview('');
        setStars(1);
    };

    return (
        <div className="review-modal">
            <h1>Create Review</h1>
            <form onSubmit={handleSubmit} className='review-form'>
                <textarea
                    type='text'
                    onChange={(e) => setReview(e.target.value)}
                    value={review}
                    placeholder="Leave written review here..."
                    name="review"
                    style={{
                        width: '20em',
                        height: '15em',
                        marginBottom: '3%',
                        borderRadius: '3px',
                    }}
                />
                <input
                    type={'number'}
                    onChange={(e) => setStars(e.target.value)}
                    placeholder='Star Rating here...'
                    name="stars"
                    min={1}
                    max={5}
                    style={{
                        marginBottom: '3%',
                        width: '20em',
                        borderRadius: '3px',
                    }}
                />
            <button type='submit'>Submit Review</button>
            </form>
        </div>
    );
};

export default CreateReview;
