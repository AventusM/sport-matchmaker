import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import * as routes from "../constants/routes";
import Navigation from "./Navigation";
import LandingPage from "./nonLoggedInUserComponents/Landing";
import SignInPage from "./nonLoggedInUserComponents/SignIn";
import SignUpPage from "./nonLoggedInUserComponents/SignUp";
import Home from "./loggedInUserComponents/Home";

/*
REDUX BEGIN
*/

// import { createStore } from "redux";

// const store = createStore(userReducer);

// const INITIAL_STATE = {
//   authUser: null
// };
// const userReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case "SET_USER":
//       console.log([...state, action.authUser]);
//       return { ...state, authUser: action.authUser };
//     default:
//       console.log(state);
//       return state;
//   }
// };

/*
REDUX END -- SIIRRETÄÄN OMAAN MODUULIINSA MYÖHEMMIN
*/

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //Staten muutos tänne reduxin kautta
    //Navigation authUser poimittava reduxarvosta
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation authUser={null} />
          <Route
            exact
            path={routes.LANDING}
            component={() => <LandingPage />}
          />
          <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
          <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
          <Route exact path={routes.HOME} component={() => <Home />} />
        </div>
      </Router>
    );
  }
}

export default App;
