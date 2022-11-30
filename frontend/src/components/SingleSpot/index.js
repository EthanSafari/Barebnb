import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteSpotById, getAllSpots, getSingleSpot } from '../../store/spots';
import UpdateSpotModal from '../UpdateSpot';
import SpotReviewsById from '../SpotReviews';
import CreateReviewModal from '../CreateReview';
import { useEffect } from 'react'

import './SingleSpot.css';

const SingleSpot = () => {
    const { spotId } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSingleSpot(spotId));
    }, [dispatch]);

    const history = useHistory();

    const sessionSpots = useSelector(state => state.spots.spots);
    const sessionUser = useSelector(state => state.session.user);
    const sessionCurrentSpot = useSelector(state => state.spots.currentSpot);
    const sessionReviews = useSelector(state => state.reviews.reviews);
    if (!sessionSpots || !sessionCurrentSpot) return null;

    const spots = Object.values(sessionSpots);
    if (!spots) return null;

    const singleSpot = spots.find(spot => spot.id === Number(spotId));

    const deleteSpot = (e) => {
        e.preventDefault();
        dispatch(deleteSpotById(singleSpot.id));
        history.push('/');
    };

    return (
        <div className='full-single-spot-page'>
            <div className='spot-name'>
                <h1>{sessionCurrentSpot.name}</h1>
            </div>
            <div className='info-under-spot-name'>
                <div className='rating-info'>
                {singleSpot.avgRating.toString().includes("doesn't") ? (<h3>New Listing</h3>) : (
                    <div className='average-rating'>
                        <h3><i class="fa-solid fa-star"></i></h3>
                        <h3>{singleSpot.avgRating}</h3>
                    </div>)}


                    {console.log(sessionReviews.length)}


                    
                {(sessionReviews && !sessionReviews.length) ? (<h3>~ this place has no reviews yet!</h3>)
                : (sessionReviews && sessionReviews.length === 1) ? (<h3>~ {sessionReviews.length} review</h3>)
                : (<h3>~ {sessionReviews.length} reviews</h3>)}
                </div>
            </div>
            <div className='single-spot-images-container'>
                {sessionCurrentSpot.SpotImages.map(image => (
                    <img src={image.url} alt={sessionCurrentSpot.name} className='single-spot-image' />
                ))}
            </div>
            <div className='hosted-by'>
                <h3>Hosted by {sessionCurrentSpot.Owner.firstName} {sessionCurrentSpot.Owner.lastName}</h3>
            </div>
            <div className='description'>
                <h4>{sessionCurrentSpot.description}</h4>
            </div>
            <div className='full-address'>
                <h3>{sessionCurrentSpot.address}</h3>
                <h4>{sessionCurrentSpot.city}, {sessionCurrentSpot.state}</h4>
                <h4>{sessionCurrentSpot.country}</h4>
            </div>
            <div className='price'>
            <h5><strong>${sessionCurrentSpot.price}</strong> night</h5>
            </div>
            <div>
                <SpotReviewsById spot={singleSpot} />
                {sessionUser && sessionUser.id === singleSpot.ownerId || !sessionUser ?
                    null : <CreateReviewModal spotId={Number(spotId)} />
                }
            </div>
            <div className='spot-owner-options'>
                {sessionUser && sessionUser.id === singleSpot.ownerId ? (
                    <button onClick={deleteSpot} className="delete-button">
                        Delete Listing
                    </button>
                ) : null}
                {sessionUser && sessionUser.id === singleSpot.ownerId ? (
                    <UpdateSpotModal spots={spots} />
                ) : null}
            </div>
        </div >
    );
};

export default SingleSpot;
