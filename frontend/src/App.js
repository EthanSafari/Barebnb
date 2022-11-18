import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";
import SpotsList from "./components/AllSpots";
import SingleSpot from "./components/SingleSpot";

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
      </Switch>
    </>
  );
}

export default App;
