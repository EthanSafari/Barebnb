import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotReviews } from "../../store/review";
import { objectToArray } from "../AllSpots";

const SpotReviewsById = (spot) => {
    const dispatch = useDispatch();
    const reviewsObject = useSelector(state => state.reviews);

    const reviewsArray = objectToArray(reviewsObject.reviews);

    const reviewImagesArray = objectToArray(reviewsObject)
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
                        <div>{(review.stars > 1) ? `${review.stars} stars` : `${review.stars} star`}</div>
                        <div>{review.ReviewImages.map(image => (
                            <img src={image.url} />
                        ))}</div>
                    </li>
                ))}
            </ul>
            <ul>

            </ul>
        </div>
    )
};

export default SpotReviewsById;
