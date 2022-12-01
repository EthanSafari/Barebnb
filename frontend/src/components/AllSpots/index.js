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
                                <div style={{
                                    display: 'flex',
                                    flexFlow: 'row wrap',
                                    justifyContent: 'space-between'
                                }}>
                                    <h3>{spot.city},</h3>
                                    <h3 style={{ paddingLeft: '5px'}}>{spot.state}</h3>
                                </div>
                                <div className="rating">
                                    <h4><i class="fa-solid fa-star"></i></h4>
                                    {spot.avgRating && spot.avgRating.toString().includes("doesn't") ? (<h3>New</h3>) : (<h3>{spot.avgRating.toFixed(1)}</h3>)}
                                </div>
                            </div>
                            <p><strong>${spot.price}</strong> night</p>
                        </NavLink>
                    </div>
                ))}
            </ul>
            <button style={{
                marginTop: '3%',
                border: '1px solid grey',
                borderRadius: '3px',
                padding: '.5%'
            }}>
                <a href='https://github.com/EthanSafari/API-Project/blob/main/README.md'>
                    Github Link
                </a>
            </button>
            <Switch>
                <Route path='/spots/:spotId'>
                    <SingleSpot />
                </Route>
            </Switch>
        </div>
    );
};

export default SpotsList;
