import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteSpotById, getAllSpots } from '../../store/spots';
import UpdateSpotModal from '../UpdateSpot';
import SpotReviewsById from '../SpotReviews';
import CreateReviewModal from '../CreateReview';

const SingleSpot = () => {
    const dispatch = useDispatch();

    const { spotId } = useParams();
    const history = useHistory();

    const sessionSpots = useSelector(state => state.spots.spots);
    const sessionUser = useSelector(state => state.session.user);

    const spots = Object.values(sessionSpots);

    if (!sessionUser) return null;
    if (!spots) return null;

    const singleSpot = spots.find(spot => spot.id === Number(spotId));
    if (!singleSpot) return null;

    const deleteSpot = (e) => {
        e.preventDefault();
        dispatch(deleteSpotById(singleSpot.id));
        history.push('/spots')
    };


    return (
        <div>
            <div>
            {!singleSpot.preview ? null
                : singleSpot.preview.includes("doesn't have") ? null
                    : <img className='all-spots-preview-image' src={singleSpot.preview} alt={singleSpot.name}></img>}
            <h1>{singleSpot.name}</h1>
            <h3>{singleSpot.description}</h3>
            <h3>{singleSpot.address}</h3>
            <h4>{singleSpot.city}, {singleSpot.state}</h4>
            <h4>{singleSpot.country}</h4>
            <h5>${singleSpot.price}/night</h5>
            {sessionUser && sessionUser.id === singleSpot.ownerId ? (
                <button onClick={deleteSpot}>
                    Delete Listing
                </button>
            ) : null}
            {sessionUser && sessionUser.id === singleSpot.ownerId ? (
                <UpdateSpotModal spots={spots} />
            ) : null}
            </div>
            <SpotReviewsById spot={singleSpot} />
            <CreateReviewModal spotId={Number(spotId)} />
        </div>
    );
};

export default SingleSpot;
