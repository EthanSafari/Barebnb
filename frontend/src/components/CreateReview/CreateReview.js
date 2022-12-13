import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReviewForSpot } from "../../store/review";
import { getSingleSpot } from "../../store/spots";

import './CreateReview.css';


const CreateReview = ({ setShowModal }) => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector((state) => state.session.user);

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

        setShowModal(false)

        await dispatch(getSingleSpot(spotId))

        history.push(`/spots/${spotId}`);
    };

    const reset = () => {
        setReview('');
        setStars(1);
    };

    return (
        <div className="review-modal">
            <h1>Leave a Review</h1>
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
                    required
                />
                <input
                    type={'number'}
                    onChange={(e) => setStars(e.target.value)}
                    placeholder='Star Rating here...'
                    name="stars"
                    min={1}
                    max={5}
                    style={{
                        marginLeft: 0,
                        marginBottom: '3%',
                        width: '20em',
                        borderRadius: '3px',
                    }}
                    required
                />
            <button type='submit' style={{
                border: '1px solid grey',
                borderRadius: '3px',
                padding: '0 3px'
            }}>Submit Review</button>
            </form>
        </div>
    );
};

export default CreateReview;
