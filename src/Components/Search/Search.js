import React, { Component } from 'react';
import NavBar from "../Home/SideBar"

import {Verify} from "../Auth/Check"
import {Redirect} from "react-router-dom"

class Search extends Component {
  constructor(props){
    super(props)
    this.state={
      loggedIn: false,
    }
  }
  async componentDidMount () {
    const login = await Verify();
    this.setState({loggedIn: login})
  }
  render() {
    if(this.state.loggedIn){
      return(   <Redirect to="/auth" />);
    }
    return (
      <div >
        <NavBar search={true}/>
        <h1>Search</h1>
      </div>
    );
  }
}

export default Search;
