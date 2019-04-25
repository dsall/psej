import React, { Component, Fragment } from 'react';
import "./home.css"
import { MDBContainer, MDBBtn} from 'mdbreact';
import {  MDBDataTable, MDBIcon} from 'mdbreact';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavBarPage from "./SideBar";
import {Verify} from "../Auth/Check"
import {Redirect} from "react-router-dom"
// import DatePicker from "react-date-picker"
const axios = require("axios")

const addZero = (number) => {
  if(number <10) {
      return '0'+ number;
  }
  else {
      return number
  }
}
var myColumns = [
     {   
      label: 'Date',
      field: 'date',
      sort: 'asc',
      width: 200
    },
    {
      label: 'Name',
      field: 'name',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Time',
      field: 'time',
      sort: 'asc',
      width:300
    }
  ]

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(), 
      loggedIn: false,
      data : {
        columns:myColumns,
        rows: []
    }
  }
}
 
  onChange = async (date) => {
    this.setState({ date })
    var dtime= `${addZero(date.getDate())}${addZero(date.getMonth()+1)}${date.getFullYear()}`
    const response = await axios.get(`http://admin.psej.xyz/checkin/find/${dtime}`)
    if(response.data.data){
      this.setState({data: {columns: myColumns, rows: response.data.data[0].attendents}})
    }

  }
  
  async componentDidMount () {
      var login = await Verify()
      this.setState({loggedIn: login})
      var t = new Date()
      var dtime= `${addZero(t.getDate())}${addZero(t.getMonth()+1)}${t.getFullYear()}`
      const response = await axios.get(`http://admin.psej.xyz/checkin/find/${dtime}`)
      if(response.data.data){
        this.setState({data: {columns: myColumns, rows: response.data.data[0].attendents}})
   
      }
  }
  ChekLogin = async () => {

  }

  render() {
    if(this.state.loggedIn){
      return(   <Redirect to="/auth" />);
    }
    return (
      <div>
        <NavBarPage home={true}/>
      <MDBContainer>
      <div className="md-8 mx-10">
          <div className="horizontal">
              <div className="Date">
              <label style={{marginLeft: 10, fontWeight: "bold", marginRight: 10}}>
                Liste de presence du 
              </label>
              <DatePicker
                onChange={this.onChange}
                selected={this.state.date}
                todayButton={"Today"}
                dateFormat="yyyy/MM/dd"
              />
               <Fragment>
              <MDBBtn  floating gradient="blue"   onClick= {async () => {await axios.get("http://admin.psej.xyz/open")}}>
                 <MDBIcon icon="lock" ></MDBIcon> Ouvrir la porte
              </MDBBtn>
              </Fragment>
              </div>
              <div className="table">
              <MDBDataTable
                data={this.state.data}
                striped
                searching={true}
              />
              </div>
          </div>
      </div>
      </MDBContainer>
   </div>

    );
  }
}



export default Home;
