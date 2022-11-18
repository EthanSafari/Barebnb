import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateReviewById } from "../../store/review";


const UpdateReview = ({ reviews, reviewId }) => {
    const sessionUser = useSelector((state) => state.session.user);

    const singleReview = reviews.find(review => review.id === reviewId);

    const [review, setReview] = useState();
    const [stars, setStars] = useState();

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedReview = {
            id: parseInt(reviewId),
            userId: sessionUser.id,
            spotId: singleReview.spotId,
            stars,
            review,
        };

        await dispatch(updateReviewById(reviewId, updatedReview));
    };

    return (
        <div>
            <h1>Update Review</h1>
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

export default UpdateReview;
