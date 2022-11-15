import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";

import './AllSpots.css';

export const objectToArray = (obj) => {
    const array = [];
    for (const property in obj) {
        array.push(obj[property]);
    };
    return array;
};

const SpotsList = () => {
    const dispatch = useDispatch();
    const spotsObject = useSelector(state => state.spots.spots);

    const spotsArray = objectToArray(spotsObject);

    console.log('spotsArray:',spotsArray)

        useEffect(() => {
            dispatch(getAllSpots());
        }, [dispatch]);

    if (!spotsArray) return null;
    else return (
        <div className="all-spots-container">
            <ul className="all-spots-ul">
                {spotsArray.map(spot => (
                    <li key={spot.id} className="all-spots-ul-li">
                        {!spot.preview ? null
                        : spot.preview.includes("doesn't have") ? null
                        : <img className='all-spots-preview-image' src={spot.preview} alt={spot.name}></img>}

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SpotsList;
