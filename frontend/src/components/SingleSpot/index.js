import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
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

    const sessionUser = useSelector(state => state.session.user);
    const sessionCurrentSpot = useSelector(state => state.spots.currentSpot);
    const sessionReviews = useSelector(state => state.reviews.reviews);

    if (!sessionCurrentSpot) return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
        }}>
            <h1>Constructing the barebnb...</h1>
            <p style={{ maxWidth: '70vw' }}>If you aren't redirected in a few seconds, please click the home button or <strong><Link to='/'>here</Link></strong> to return to the <strong><Link to='/'>homepage.</Link></strong></p>
        </div>
    );

    const deleteSpot = (e) => {
        e.preventDefault();
        dispatch(deleteSpotById(sessionCurrentSpot.id));
        // dispatch(getAllSpots());
        setTimeout(history.push('/'), 1250);
    };

    return (
        <div className='full-single-spot-page'>
            <div className='spot-name'>
                <h1>{sessionCurrentSpot.name}</h1>
            </div>
            <div className='info-under-spot-name'>
                <div className='rating-info'>
                    {sessionCurrentSpot.avgStarRating === undefined || sessionCurrentSpot.avgStarRating === 0 ? (<h3>New Listing</h3>) : (
                        <div className='average-rating'>
                            <h3><i class="fa-solid fa-star"></i></h3>
                            <h3>{sessionCurrentSpot.avgStarRating.toFixed(1)}</h3>
                        </div>)}
                    {(sessionReviews && sessionCurrentSpot.numReviews > 1) ? (<h3>~ {sessionCurrentSpot.numReviews} reviews</h3>)
                        : (sessionReviews && sessionCurrentSpot.numReviews === 1) ? (<h3>~ {sessionCurrentSpot.numReviews} review</h3>)
                            : (<h3>~ this place has no reviews yet!</h3>)}
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
                <SpotReviewsById spot={sessionCurrentSpot} />
                {((sessionUser && sessionUser.id === sessionCurrentSpot.ownerId) || !sessionUser) ?
                    null : <CreateReviewModal spotId={parseInt(spotId)} />
                }
            </div>
            <div className='spot-owner-options'>
                {sessionUser && sessionUser.id === sessionCurrentSpot.ownerId ? (
                    <button onClick={deleteSpot} className="delete-button">
                        Delete Listing
                    </button>
                ) : null}
                {sessionUser && sessionUser.id === sessionCurrentSpot.ownerId ? (
                    <UpdateSpotModal />
                ) : null}
            </div>
        </div >
    );
};

export default SingleSpot;
