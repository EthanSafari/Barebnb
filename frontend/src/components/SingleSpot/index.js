import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SingleSpot = ({ spots }) => {
    const { id } = useParams();
    const singleSpot = spots.find(spot => spot.id == id);
    const sessionUser = useSelector(state => state.session.user);
    // console.log(sessionUser.id)
    // console.log(singleSpot.ownerId)
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
                {/* {sessionUser && sessionUser.id === singleSpot.ownerId ? (
                    <button>
                        click me
                    </button>
                ) : null} */}
        </div>
    );
};

export default SingleSpot;
