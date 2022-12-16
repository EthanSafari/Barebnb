import { useEffect, useState } from "react";
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

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const errorArray = [];
        if (review.length === 0) errorArray.push('Please enter a review of the Listing');
        if (stars > 5 || stars < 1) errorArray.push('Please enter a Star Rating between 1 and 5');
        setErrors(errorArray);
    }, [review, stars]);

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
    };

    const reset = () => {
        setReview('');
        setStars(1);
    };

    return (
        <div className="review-modal">
            <h1>Leave a Review</h1>
            {errors.length > 0 && <ul style={{margin: '10px 0'}}>
                {errors.map((error, idx) => <li key={idx} style={{color: 'red', fontSize: '13px'}}>{error}</li>)}
            </ul>}
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
            }} disabled={errors.length > 0}>Submit Review</button>
            </form>
        </div>
    );
};

export default CreateReview;
