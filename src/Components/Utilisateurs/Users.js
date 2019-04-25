import React, { Component, Fragment } from 'react';
import "./Users.css"
import { MDBContainer, MDBBtn, MDBModal, MDBModalHeader, MDBModalFooter, MDBModalBody, MDBInput} from 'mdbreact';
import {  MDBDataTable, MDBIcon} from 'mdbreact';
import "react-datepicker/dist/react-datepicker.css";
import NavBarPage from "../Home/SideBar";

const axios = require("axios")

var myColumns = [
  {   
   label: 'Name',
   field: 'name',
   sort: 'asc',
   width: 200
 },
 {
   label: 'Phone',
   field: 'phone',
   sort: 'asc',
   width: 150
 },
 {   
  label: 'Company',
  field: 'company',
  sort: 'asc',
  width: 200
},
 {
   label: 'Email',
   field: 'email',
   sort: 'asc',
   width:300
 }
]
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      modal: false, 
      file_name: "Choose a picture",
      name: "",
      phone: "",
      company: "", 
      email: "",
      file: {}, 
      alert: false, 
      alertModal: "", 
      message: "", 
      failure: false,
      data : {
        columns: [],
        rows: []
      }
    };
  }
 
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  async componentDidMount() {
      const response = await axios.get("http://admin.psej.xyz/users")
      this.setState({data: {columns: myColumns,rows: response.data.data}})
  }
  Upload = (event) => {
    this.setState({ file_name: event.target.files[0].name, file: event.target.files[0]})
  }
  Submit = async ()  => {
    const fd = new FormData()
    fd.append('image', this.state.file, this.state.file.name )
    fd.append('name', this.state.name)
    fd.append('company', this.state.company)
    fd.append('phone', this.state.phone)
    fd.append('email', this.state.email)
    const rs = await axios.post("http://admin.psej.xyz/recog/enroll", fd);
    if(!rs.data.success){
      this.setState({modal: false, failure: true, message:rs.data.message })
      setTimeout(() => {this.setState({failure: false, modal: false, name: "", email: "", company: "", phone: "", file: {}})}, 2000)

    }
    if(rs.data.success){
      this.setState({modal: false, alert: true, message: "Successfully added" })
      setTimeout(() => {this.setState({alert: false,  name: "", email: "", company: "", phone: "", message: "", file: {}})}, 2000)
    }
  }

  render() {
    return (
      <div className="Main"> 
      <NavBarPage users={true}/>
      <MDBContainer>
      <div className="md-8 mx-10">
              <div className="horizontal">
               <Fragment>
              <MDBBtn  floating gradient="blue" style={{width: 300}}   onClick={this.toggle}>
                 <MDBIcon icon="user"></MDBIcon> Enregistrer Une Personne
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
          <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalHeader toggle={this.toggle}>Fiche d'enregistrement</MDBModalHeader>
          <MDBModalBody>
          <MDBInput label="Full Name" value={this.state.name} onChange = {(e) => {this.setState({name: e.target.value})}}/>
          <MDBInput label="Company or Project Name" value={this.state.company} onChange = {(e) => {this.setState({company: e.target.value})}}/>
          <MDBInput label="Phone Number" value={this.state.phone} onChange = {(e) => {this.setState({phone: e.target.value})}}/>
          <MDBInput label="Email" value={this.state.email} onChange = {(e) => {this.setState({email: e.target.value})}} validate={true} type="email" />
          <div className="input-group">
            <div className="input-group-prepend">

                <span className="input-group-text" id="inputGroupFileAddon01">
                  Upload
                </span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  onChange={this.Upload}
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  {this.state.file_name}
                </label>
              </div>
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
            <MDBBtn color="primary" onClick={this.Submit}>Submit</MDBBtn>
          </MDBModalFooter>
          </MDBModal>
        <MDBModal isOpen={this.state.alert} style={{borderRadius: 20}} toggle={this.toggle}>
            <MDBModalBody className="mx-auto" style={{textAlign: "center"}}>
               <MDBIcon icon="check-circle" size="5x" color="green" style={{color: "green"}}/>
               <h1 style={{textAlign: "center"}}>{this.state.message}</h1>
            </MDBModalBody>
        </MDBModal>
        <MDBModal isOpen={this.state.failure} style={{borderRadius: 20}} toggle={this.toggle}>
            <MDBModalBody className="mx-auto" style={{textAlign: "center"}}>
               <MDBIcon icon="exclamation-triangle" size="5x"  style={{color: "orange"}}/>
               <h1 style={{textAlign: "center"}}>{this.state.message.toUpperCase()}</h1>
            </MDBModalBody>
        </MDBModal>

      </MDBContainer>
      </div>

    );
  }
}



export default Users;
