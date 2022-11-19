import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createReviewForSpot } from "../../store/review";


const CreateReview = ({ spotId }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector((state) => state.session.user);
    const sessionSpots = useSelector((state) => state.spots.spots);

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(1);
    const [reviews, setReviews] = useState([]);

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
        <div>
            <h1>Create Review</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    type='text'
                    onChange={(e) => setReview(e.target.value)}
                    value={review}
                    placeholder='review'
                    name="review"
                />
                <input
                    type={'number'}
                    onChange={(e) => setStars(e.target.value)}
                    placeholder='stars'
                    name="stars"
                />
            <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default CreateReview;
