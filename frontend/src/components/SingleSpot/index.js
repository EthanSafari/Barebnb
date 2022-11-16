import { useParams } from 'react-router-dom';

const SingleSpot = ({ spots }) => {
    const { id } = useParams();
    const singleSpot = spots.find(spot => spot.id == id);
    console.log(singleSpot)
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
        </div>
    );
};

export default SingleSpot;
