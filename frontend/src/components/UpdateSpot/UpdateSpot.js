import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSingleSpot, updateSpotById } from "../../store/spots";

const UpdateCurrentSpot = ({ setShowModal }) => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSingleSpot(spotId));
    }, [dispatch]);

    const sessionUser = useSelector((state) => state.session.user);
    const sessionCurrentSpot = useSelector((state) => state.spots.currentSpot);

    const [currentSpot, setCurrentSpot] = useState(sessionCurrentSpot);

    const [address, setAddress] = useState(sessionCurrentSpot.address);
    const [city, setCity] = useState(sessionCurrentSpot.city);
    const [state, setSpotState] = useState(sessionCurrentSpot.state);
    const [country, setCountry] = useState(sessionCurrentSpot.country);
    const [name, setName] = useState(sessionCurrentSpot.name);
    const [description, setDescription] = useState(sessionCurrentSpot.description);
    const [price, setPrice] = useState(sessionCurrentSpot.price);

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

        await dispatch(updateSpotById(parseInt(spotId), updateSpot));

        const newCurrentSpot = dispatch(getSingleSpot(spotId));

        setCurrentSpot(newCurrentSpot);
        setShowModal(false);
    };

    return (
        <div className="inputSpot" style={{ height: '30rem'}}>
            <h1 style={{ margin: '5%' }}>Update Listing</h1>
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
                    marginBottom: '50px'
                }}>Submit</button>
            </form>
        </div>
    );
};

export default UpdateCurrentSpot;
