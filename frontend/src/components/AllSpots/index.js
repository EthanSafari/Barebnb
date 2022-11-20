import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Switch } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import SingleSpot from "../SingleSpot";

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

    const date = new Date();

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);

    if (!spotsArray) return null;
    else return (
        <div className="all-spots-container">
            <ul className="all-spots-ul">
                {spotsArray.map(spot => (
                    <div key={spot.id} className="all-spots-card">
                        <NavLink to={`/spots/${spot.id}`}>
                            {!spot.preview ? null
                                : spot.preview.includes("doesn't have") ? null
                                    : <img className='all-spots-preview-image' src={spot.preview} alt={spot.name}></img>}
                            <div className="top-part-info">
                                <h3>{spot.city}, {spot.state}</h3>
                                <div className="rating">
                                <h4><i class="fa-solid fa-star"></i></h4>
                                {spot.avgRating.toString().includes("doesn't") ? (<h3>New</h3>) : (<h3>{spot.avgRating}</h3>)}
                                </div>
                            </div>
                            <p><strong>${spot.price}</strong> night</p>
                        </NavLink>
                    </div>
                ))}
            </ul>
            <Switch>
                <Route path='/spots/:spotId'>
                    <SingleSpot />
                </Route>
            </Switch>
        </div>
    );
};

export default SpotsList;
