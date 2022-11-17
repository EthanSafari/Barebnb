import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotReviews } from "../../store/review";
import { objectToArray } from "../AllSpots";

const SpotReviewsById = (spot) => {
    const dispatch = useDispatch();
    const reviewsObject = useSelector(state => state.reviews.reviews);

    const reviewsArray = objectToArray(reviewsObject);
    console.log(reviewsObject)

    useEffect(() => {
        dispatch(getSpotReviews(spot.spot.id))
    }, [dispatch]);

    if (!reviewsArray) return null;
    else return (
        <div>
            <ul>
                {reviewsArray.map(review => (
                    <li key={review.id}>
                        <div>{review.review}</div>
                        <div>{review.stars}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default SpotReviewsById;
