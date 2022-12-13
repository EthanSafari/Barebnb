import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addNewSpot } from "../../store/spots";

import './SpotInput.css';

const SpotInput = ({ setShowModal }) => {
    const sessionUser = useSelector((state) => state.session.user);

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setSpotState] = useState('');
    const [country, setCountry] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(15.00);

    const [previewImageUrl, setPreviewImageUrl] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newSpot = {
            ownerId: sessionUser.id,
            address,
            city,
            state,
            country,
            name,
            description,
            price,
        };

        const spot = await dispatch(addNewSpot(newSpot, previewImageUrl));
        if (spot) reset();

        setShowModal(false);
    };

    const reset = () => {
        setAddress('');
        setCity('');
        setSpotState('');
        setCountry('');
        setName('');
        setDescription('');
        setPrice(15.00);
        setPreviewImageUrl('');
    };

    return (
        <div className="inputSpot">
            <h1 style={{marginBottom: '5%'}}>Create a Listing</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder='name'
                    name='name'
                    required
                />
                <input
                    type='text'
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    placeholder='address'
                    name='address'
                    required
                />
                <input
                    type='text'
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    placeholder='city'
                    name='city'
                    required
                />
                <input
                    type='text'
                    onChange={(e) => setSpotState(e.target.value)}
                    value={state}
                    placeholder='state'
                    name='state'
                    required
                />
                <input
                    type='text'
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                    placeholder='country'
                    name='country'
                    required
                />
                <textarea
                    type='text'
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder='description'
                    name='description'
                    required
                />
                <input
                    type='number'
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    placeholder='price'
                    name='price'
                    required
                    min={15}
                />
                <input
                    type='url'
                    onChange={(e) => setPreviewImageUrl(e.target.value)}
                    value={previewImageUrl}
                    placeholder='Preview Image'
                    name="previewImage"
                    required
                />
                <button type='submit' className="spot-input-submit-button">Submit</button>
            </form>
        </div>
    );
};

export default SpotInput;
