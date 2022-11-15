import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from '../../store/spots';


const getAllSpots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state)

    useEffect(() => {
        dispatch(spotActions.getAllSpots());
    }, [dispatch]);

    return (
        <div>
            <button onClick={e => console.log(spots)}>
                spots
            </button>
        </div>
    )
};
