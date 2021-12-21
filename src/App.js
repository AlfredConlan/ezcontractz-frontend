import React from "react";
import { Switch, Route } from "react-router-dom";
import TaskList from "./Components/TaskList";
import Navbar from "./Components/Navbar";
import ContractorSearch from "./Components/ContractorSearch";
import AdminDash from "./Components/AdminDash";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import Profile from "./Components/Profile";
import ProtectedRoute from "./auth/protected-route";
import Registration from "./Components/Registration";
import AboutUs from "./Components/AboutUs";
import Home from "./Components/Home";
import EditUser from "./Components/EditUser";

function App() {
  return (
    <Auth0ProviderWithHistory>
      <Navbar />
      <Switch>
        <ProtectedRoute exact path="/contractor-search" component={ContractorSearch} />
        <ProtectedRoute exact path="/tasks" component={TaskList} />
        <ProtectedRoute exact path="/admin" component={AdminDash} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/aboutus" component={AboutUs} />
        <ProtectedRoute exact path="/edituser" component={EditUser} />
        <ProtectedRoute exact path="/registration" component={Registration} />
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </Auth0ProviderWithHistory>
  );
}

export default App;
