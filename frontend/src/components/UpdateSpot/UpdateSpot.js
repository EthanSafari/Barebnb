import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getAllSpots, getSingleSpot, updateSpotById } from "../../store/spots";

const UpdateCurrentSpot = ({ spot }) => {
    const { spotId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const sessionSpots = useSelector((state) => state.spots.spots)
    const sessionCurrentSpot = useSelector((state) => state.spots.currentSpot);

    const [currentSpot, setCurrentSpot] = useState(sessionCurrentSpot)

    const [address, setAddress] = useState(sessionCurrentSpot.address);
    const [city, setCity] = useState(sessionCurrentSpot.city);
    const [state, setSpotState] = useState(sessionCurrentSpot.state);
    const [country, setCountry] = useState(sessionCurrentSpot.country);
    const [name, setName] = useState(sessionCurrentSpot.name);
    const [description, setDescription] = useState(sessionCurrentSpot.description);
    const [price, setPrice] = useState(sessionCurrentSpot.price);

    // TODO need to find out how to get the preview images without having to get the state
    const singleSpot = sessionSpots.find(spot => spot.id === parseInt(spotId));
    const previewImageUrl = singleSpot.preview;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateSpot = {
            id: parseInt(spotId),
            ownerId: sessionUser.id,
            address,
            city,
            state,
            country,
            name,
            description,
            price,
        };

        await dispatch(updateSpotById(parseInt(spotId), updateSpot, previewImageUrl));

        const newCurrentSpot = await dispatch(getSingleSpot(spotId));

        setCurrentSpot(newCurrentSpot);

        return <Redirect to={`/spots/${spotId}`} />;
    };

    return (
        <div className="inputSpot">
            <h1 style={{marginBottom: '5%'}}>Update Spot</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder='name'
                    name='name'
                />
                <input
                    type='text'
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    placeholder='address'
                    name='address'
                />
                <input
                    type='text'
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    placeholder='city'
                    name='city'
                />
                <input
                    type='text'
                    onChange={(e) => setSpotState(e.target.value)}
                    value={state}
                    placeholder='state'
                    name='state'
                />
                <input
                    type='text'
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                    placeholder='country'
                    name='country'
                />
                <textarea
                    type='text'
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder='description'
                    name='description'
                />
                <input
                    type='number'
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    placeholder='price'
                    name='price'
                />
                <button type='submit' style={{
                    marginTop: '3%',
                    border: '1px solid grey',
                    borderRadius: '3px',
                }}>Submit</button>
            </form>
        </div>
    );
};

export default UpdateCurrentSpot;
