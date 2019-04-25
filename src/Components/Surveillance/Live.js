import React, { Component } from 'react';
import NavBar from "../Home/SideBar"
import ReactPlayer from 'react-player'
import {Verify} from "../Auth/Check"
import {Redirect} from "react-router-dom"
class Live extends Component {
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
          <NavBar live ={true}/>
          <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing />

      </div>
    );
  }
}

export default Live;
