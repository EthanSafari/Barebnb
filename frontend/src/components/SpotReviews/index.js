import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReviewById, getSpotReviews } from "../../store/review";
import { objectToArray } from "../AllSpots";

const SpotReviewsById = (spot) => {
    const dispatch = useDispatch();
    const reviewsObject = useSelector(state => state.reviews);
    const sessionUser = useSelector(state => state.session.user);

    const reviewsArray = objectToArray(reviewsObject.reviews);

    useEffect(() => {
        dispatch(getSpotReviews(spot.spot.id))
    }, [dispatch]);

    if (!reviewsArray.length) return null;
    else return (
        <div>
            <ul>
                {reviewsArray.map(review => (
                    <li key={review.id}>
                        <div>{review.review}</div>
                        <div>{(review.stars > 1) ? `${review.stars} stars` : `${review.stars} star`}</div>
                        {/* {review.ReviewImages !== undefined ? (
                            <div>
                                {review.ReviewImages.map(image => (
                                    <img src={image.url} />
                                ))}
                            </div>
                        ) : null} */}
                        {sessionUser && review.userId === sessionUser.id ? (
                            <button onClick={e => {
                                e.preventDefault();
                                const singleReview = reviewsArray.find(thisReview => thisReview.id === review.id);
                                dispatch(deleteReviewById(singleReview.id));
                            }}>
                                Delete Review
                            </button>
                        ) : null}
                    </li>
                ))}
            </ul>
            <ul>

            </ul>
        </div>
    )
};

export default SpotReviewsById;
