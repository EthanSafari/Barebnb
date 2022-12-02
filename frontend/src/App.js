import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";
import SpotsList from "./components/AllSpots";
import SingleSpot from "./components/SingleSpot";

import BeachImage from "./image-folder/beach.jpg";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded}
      <Switch>
        <Route exact path='/' component={SpotsList} />
        <Route path='/spots/:spotId' component={SingleSpot} />
        <Route>
          <div style={{
            margin: '10rem',
          }}>
            <h1>Page Not Found</h1>
            <p>Looks like you've stumbled upon a barebn-beach! Please press the home button to continue looking at barebnb's!</p>
          </div>
        </Route>
      </Switch>
    </>
  );
}

export default App;
