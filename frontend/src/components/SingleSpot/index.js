import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { deleteSpotById, getAllSpots, getSingleSpot } from '../../store/spots';
import UpdateSpotModal from '../UpdateSpot';
import SpotReviewsById from '../SpotReviews';
import CreateReviewModal from '../CreateReview';
import BookingCard from '../BookingCard';
import { useEffect, useState } from 'react'

import './SingleSpot.css';

const SingleSpot = () => {
    const { spotId } = useParams();

    const dispatch = useDispatch();

    const [presentReview, setPresentReview] = useState(false);

    useEffect(() => {
        dispatch(getSingleSpot(spotId));
    }, [dispatch]);

    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const sessionCurrentSpot = useSelector(state => state.spots.currentSpot);
    const sessionReviews = useSelector(state => state.reviews.reviews);

    let reviewsArray = [];
    if (sessionReviews) reviewsArray = Object.values(sessionReviews);

    useEffect(() => {
        if (sessionReviews && sessionUser) {
            if (reviewsArray.find(review => review.userId === sessionUser.id)) setPresentReview(true);
            else setPresentReview(false);
        };
        dispatch(getSingleSpot(spotId));
    }, [reviewsArray.length]);

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
        setTimeout(history.push('/'), 1250);
    };

    return (

        <div className='full-single-spot-page'>
            <div className='spot-name'>
                <h2>{sessionCurrentSpot.name}</h2>
            </div>
            <div className='info-under-spot-name'>
                <div className='rating-info'>
                    {sessionCurrentSpot.avgStarRating === undefined || sessionCurrentSpot.avgStarRating === 0 ? (<h3>New Listing</h3>) : (
                        <div className='average-rating'>
                            <p><i class="fa-solid fa-star"></i> {sessionCurrentSpot.avgStarRating.toFixed(1)}</p>
                        </div>)}
                    {(sessionReviews && sessionCurrentSpot.numReviews > 1) ? (<p>~ {sessionCurrentSpot.numReviews} reviews</p>)
                        : (sessionReviews && sessionCurrentSpot.numReviews === 1) ? (<p>~ {sessionCurrentSpot.numReviews} review</p>)
                            : (<p>~ this place has no reviews yet!</p>)}
                </div>
                <div style={{ marginLeft: '3px' }}>
                    ~ {sessionCurrentSpot.city}, {sessionCurrentSpot.state}, {sessionCurrentSpot.country}
                </div>
            </div>
            <div className='single-spot-images-container'>
                {sessionCurrentSpot.SpotImages.map(image => (
                    <img src={image.url} alt={sessionCurrentSpot.name} className='single-spot-image' />
                ))}
            </div>
            <div className='info-and-bookings'>
                <div className='information'>
                    <div className='top-part-of-information'>
                        <div className='hosted-by'>
                            <h4>Entire home hosted by {sessionCurrentSpot.Owner.firstName} {sessionCurrentSpot.Owner.lastName}</h4>
                            <p style={{ fontSize: '14px' }}>{(Math.random() * 10).toFixed()} guests ~ {(Math.random() * 10).toFixed()} bedrooms ~ {(Math.random() * 10).toFixed()} beds ~ {(Math.random() * 10).toFixed()} baths</p>
                        </div>
                        <div className='host-image'>
                            <i class="fa-solid fa-circle-user" style={{
                                fontSize: '50px'
                            }}></i>
                        </div>
                    </div>
                    <div className='basic-place-information'>
                        <div className='self-checkin'>
                            <div style={{ display: 'flex', alignItems: 'center'}}>
                                <i class="fa-solid fa-unlock-keyhole" style={{ margin: '0 10px 0 0', fontSize: '20px' }}></i>
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold' }}>
                                    Self check-in
                                </div>
                                <div style={{ fontSize: '14px', color: 'grey' }}>
                                    Pretty self explainatory. You sit there and try the number lock as many times as you need to until you get the code.
                                </div>
                            </div>
                        </div>
                        <div className='self-checkin' >
                            <div style={{ display: 'flex', alignItems: 'center'}}>
                            <i class="fa-solid fa-location-dot" style={{ margin: '0 10px 0 0', fontSize: '20px' }}></i>
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold' }}>
                                    Great location
                                </div>
                                <div style={{ fontSize: '14px', color: 'grey' }}>
                                    Not actually sure if this is a great location or not. Half the places on this site are underwater, so make sure you bring a diving suit!
                                </div>
                            </div>
                        </div>
                        <div className='self-checkin' >
                            <div style={{ display: 'flex', alignItems: 'center'}}>
                            <i class="fa-solid fa-person-rays" style={{ margin: '0 10px 0 0', fontSize: '20px' }}></i>
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold' }}>
                                {sessionCurrentSpot.Owner.firstName} is a Superhost
                                </div>
                                <div style={{ fontSize: '14px', color: 'grey' }}>
                                    Not sure what that means, but it seems that Superhosts' provide excellent experiences for their guests? Whatever. Good luck, and bring protection.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='description'>
                        <div className='barecover'>
                            <div className='barecover-logo'><strong>bare</strong>cover</div>
                        <div className='barecover-info'>
                            For some reason this has the largest font on the whole single spot page for airbnb. Basically your purchase is covered for a certain amount of time (48 minutes after booking). If your purchase is to pass this time, it is no longer protected and we keep all your money.
                        </div>
                        </div>
                    </div>
                    <div className='price'>
                    <p>{sessionCurrentSpot.description}</p>
                    </div>
                </div>
                {/* put booking comp here  */}
                <BookingCard spot={sessionCurrentSpot} />
            </div>
            <div className='review-section'>
                <SpotReviewsById spot={sessionCurrentSpot} />
                {((sessionUser && sessionUser.id === sessionCurrentSpot.ownerId) || !sessionUser || (presentReview === true)) ?
                    null : <CreateReviewModal />
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
