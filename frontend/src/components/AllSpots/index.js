import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Switch } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import FilterOptions from "../FilterOptions";
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

    const monthArray = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
    const findDates = () => {
        const days = [(Math.ceil(Math.random() * 31)), (Math.ceil(Math.random() * 31))].sort((a, b) => a - b);
        return `${days[0]} - ${days[1]}`;
    };

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);

    if (!spotsArray) return null;
    else return (
        <div className="all-spots-container">
            <FilterOptions />
            <ul className="all-spots-ul">
                {spotsArray.map(spot => (
                    <div key={spot.id} className="all-spots-card">
                        <NavLink to={`/spots/${spot.id}`}>
                            {!spot.preview ? null
                                : spot.preview.includes("doesn't have") ? null
                                    : <img className='all-spots-preview-image' src={spot.preview} alt={spot.name}></img>}
                                    <div style={{padding: '1px'}}>

                            <div className="top-part-info">
                                <div style={{
                                    display: 'flex',
                                    flexFlow: 'row wrap',
                                    justifyContent: 'space-between'
                                }}>
                                    <div>{spot.city},</div>
                                    <div style={{ paddingLeft: '5px'}}>{spot.state}</div>
                                </div>
                                <div className="rating">
                                    <div><i class="fa-solid fa-star"></i></div>
                                    {(spot.avgRating && spot.avgRating.toString().includes("doesn't")) || spot.avgRating === undefined ? (<div className="rating-number">New</div>) : (<div className="rating-number">{spot.avgRating.toFixed(1)}</div>)}
                                </div>
                            </div>
                            <p className="miles-and-dates">{(Math.random() * 1000).toFixed()} miles away</p>
                            <p className="miles-and-dates">{monthArray[(Math.floor(Math.random() * monthArray.length))]} {findDates()}</p>
                            <p style={{ fontSize: '15px'}}><strong>${spot.price}</strong> night</p>
                                    </div>
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
