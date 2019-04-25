import React, { Component } from 'react';
import "./App.css"
import Home from "./Components/Home/Home"
import Auth from "./Components/Auth/Auth"
import Live from "./Components/Surveillance/Live"
import Users from "./Components/Utilisateurs/Users"
import Search from "./Components/Search/Search"
import NavBarPage from "./Components/Home/SideBar"
import {BrowserRouter , Route, Switch} from 'react-router-dom';

const Routes = ()  => {
  return(
    <BrowserRouter>
      <Switch>
      <Route exact path="/auth" component={Auth} />
      <Route exact path="/" component={Home} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/live" component={Live} />
      <Route exact path="/search" component={Search} />
      {/* <Route component={ErrorPage} /> */}
      </Switch>

    </BrowserRouter>
  );
}
class App extends Component {
  render() {
    return (
      <div >
       <Routes />
      </div>
    );
  }
}

export default App;
