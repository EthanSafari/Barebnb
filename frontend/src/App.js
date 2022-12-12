import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
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
        <Route exact path={['/','/spots']} component={SpotsList} />
        <Route path='/spots/:spotId' component={SingleSpot} />
        <Route>
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: 'center',
            width: '80vw',
            height: '100vh',
            margin: '0 10%'
          }}>
            <div style={{ margin: '1.5rem 0'}}>
              <h1>Page Not Found</h1>
              <p>Looks like you've stumbled upon a barebn-beach! Please press the home button or <strong><Link to='/'>here</Link></strong> to continue looking at barebnb's!</p>
            </div>
            <Link to='/'><img alt="test" style={{
              width: '50vw',
              borderRadius: '0 10px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, .7)',
            }} src={BeachImage} /></Link>
          </div>
        </Route>
      </Switch>
    </>
  );
}

export default App;
