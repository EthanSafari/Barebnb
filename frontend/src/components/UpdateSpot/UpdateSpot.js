import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateSpotById } from "../../store/spots";

const UpdateCurrentSpot = ({ spots }) => {
    const { spotId } = useParams();
    const history = useHistory();
    const singleSpot = spots.find(spot => spot.id === Number(spotId));

    const sessionUser = useSelector((state) => state.session.user);

    const [address, setAddress] = useState(singleSpot.address);
    const [city, setCity] = useState(singleSpot.city);
    const [state, setSpotState] = useState(singleSpot.state);
    const [country, setCountry] = useState(singleSpot.country);
    const [name, setName] = useState(singleSpot.name);
    const [description, setDescription] = useState(singleSpot.description);
    const [price, setPrice] = useState(singleSpot.price);

    const previewImageUrl = singleSpot.preview;

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateSpot = {
            id: Number(spotId),
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

        history.push(`/`);
    };

    return (
        <div className="inputSpot">
            <h1>Update Spot</h1>
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
                <input
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
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default UpdateCurrentSpot;
