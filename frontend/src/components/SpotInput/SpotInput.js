import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addNewSpot } from "../../store/spots";

const SpotInput = () => {
    const sessionUser = useSelector((state) => state.session.user);

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setSpotState] = useState('');
    const [country, setCountry] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0.00);

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

        const spot = await dispatch(addNewSpot(newSpot));
        if (spot) reset();

        history.push('/spots');
    };

    const reset = () => {
        setAddress('');
        setCity('');
        setSpotState('');
        setCountry('');
        setName('');
        setDescription('');
        setPrice(0.00);
    };

    return (
        <div className="inputSpot">
            <h1>Create Spot</h1>
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
                    type='text'
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

export default SpotInput;
