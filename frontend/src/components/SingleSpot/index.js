import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteSpotById } from '../../store/spots';

const SingleSpot = ({ spots }) => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const singleSpot = spots.find(spot => spot.id === Number(spotId));
    const sessionUser = useSelector(state => state.session.user);

    const deleteSpot = (e) => {
        e.preventDefault();
        dispatch(deleteSpotById(singleSpot.id));
        history.push('/spots')
    };

    if (!sessionUser) return null;
    if (!singleSpot) return null;
    else return (
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
        </div>
    );
};

export default SingleSpot;
