import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteReviewById, getSpotReviews } from "../../store/review";
import { getSingleSpot } from "../../store/spots";
import { objectToArray } from "../AllSpots";

import './SpotReview.css';

const SpotReviewsById = ({ spot }) => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const reviewsObject = useSelector(state => state.reviews);
    const sessionUser = useSelector(state => state.session.user);

    const reviewsArray = objectToArray(reviewsObject.reviews);

    useEffect(() => {
        dispatch(getSpotReviews(spotId));
    }, [dispatch, reviewsArray.length]);

    if (!reviewsArray.length) return (
        <div className="no-reviews">
            <h3 style={{ marginTop: '5%' }}>Reviews:</h3>
            <h5 style={{
                margin: '5% auto',
                width: '50%',
                display: 'flex',
                justifyContent: 'center',
            }}>This Listing doesn't have any reviews yet!</h5>
        </div>
    );
    else return (
        <div className="reviews">
            <h3 style={{ marginTop: '5%' }}><i class="fa-solid fa-star"></i> {spot.avgStarRating.toFixed(1)} ~ {spot.numReviews} {spot.numReviews > 1 ? (<>Reviews</>) : (<>Review</>)}:</h3>
            <ul className="review-container">
                {reviewsArray.map(review => (
                    <li key={review.id} className='review'>
                        <div className="user-info-review">
                            <i class="fa-solid fa-circle-user" style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '30px',
                                marginRight: '10px'
                            }}></i>
                            <div>
                                {sessionUser && review.userId === sessionUser.id ? (
                                    <div style={{ marginTop: '3px', paddingTop: '8px', fontWeight: 'bolder' }}>
                                        {sessionUser.firstName} {sessionUser.lastName}
                                    </div>
                                ) : (
                                    <div style={{ marginTop: '3px', paddingTop: '8px', fontWeight: 'bolder' }}>
                                        {review.User.firstName} {review.User.lastName}
                                    </div>
                                )}
                                <div style={{ color: 'grey', margin: '3px 0', fontSize: '14px'}}>{new Date(review.createdAt).toDateString()}</div>
                            </div>
                        </div>
                        <div>{review.review}</div>
                        <div className="review-stars">{(review.stars > 1) ? `${review.stars} stars` : `${review.stars} star`}</div>
                        {/* {review.ReviewImages !== undefined ? (
                            <div>
                                {review.ReviewImages.map(image => (
                                    <img src={image.url} />
                                ))}
                            </div>
                        ) : null} */}
                        {sessionUser && review.userId === sessionUser.id ? (
                            <div style={{ display: 'flex', justifyContent: 'center'}}>
                            <button onClick={async e => {
                                e.preventDefault();
                                const singleReview = reviewsArray.find(thisReview => thisReview.id === review.id);
                                await dispatch(deleteReviewById(singleReview.id));
                                await dispatch(getSingleSpot(spotId));
                            }} style={{
                                marginTop: '3%',
                                border: '1px solid grey',
                                borderRadius: '3px',
                                width: '10rem'
                            }}>
                                Delete Review
                            </button>
                            </div>
                        ) : null}
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default SpotReviewsById;
