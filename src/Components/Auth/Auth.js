import React from "react";
import "./Auth.css"
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard} from 'mdbreact';
import { Redirect } from 'react-router-dom'
const axios = require("axios")

class Auth extends React.Component  {
constructor(props){
  super(props);
  this.state = {
    email: "",
    password: "", 
    register: false,
    rppassword: "",
    name: "",
    phone: "", 
    goHome: false
  }
}

Login = async () => {
  console.log("trying to log in")
 const response = await axios.post("http://admin.psej.xyz/auth/login", {
   username: this.state.email,
   password: this.state.password
 } ,{
  headers: {
      'Content-Type': 'application/json'
  }
})
 console.log(response.data)
 if(response.data.Authenticated){
 localStorage.setItem('usertoken', response.data.token);
 console.log(localStorage.getItem('usertoken')+"hello")
 this.setState({goHome: true})

}

}
Register = async () => {
  const response = await axios.post("http://admin.psej.xyz/auth/register", {
    username: this.state.email,
    password: this.state.password,
    fullname: this.state.name,
    phone: this.state.phone
  })
  console.log(response.data.success)
  if(!response.data.success){
    alert(response.data.message)
  }
}

  render() {
    if(this.state.goHome){
      return (<Redirect to='/' />)
    }
  return (
    <div className="Container">
    <MDBContainer className="mx-auto">
        <MDBCard style={{width: "30rem"}} className="mx-auto">
        <MDBRow > 
          <MDBCol md="10" className="mx-auto" >
          <form >
              <img src="https://senedico.com/wp-content/uploads/2017/09/appel-a-candidatures-pour-le-recrutement-de-la-seconde-cohorte-du-psej.png" alt="psej" className="mx-auto d-block"/>
              
              <p className="">{!this.state.register ? "LOGIN" : "REGISTER"}</p>
              <label className="grey-text ">
                Email
              </label>
              <input
                type="email"
                id="defaultFormLoginEmailEx"
                className="form-control"
                value={this.state.email}
                onChange={(e) => this.setState({email: e.target.value})}
              />
              <br />
              <label className="grey-text">
                Password
              </label>
              <input
                type="password"
                id="defaultFormLoginPasswordEx"
                className="form-control"
                value={this.state.password}
                onChange={(e) => this.setState({password: e.target.value})}
              />
              <br />
               {!this.state.register 
                ? 
                <a><h1 style={{ fontSize: 15, color: "blue", marginVertical: 10}}
                onClick={() => {this.setState({register: !this.state.register})}}
                >Click here to create an account</h1></a>
                : 
                <div>
                <label className="grey-text">
                Repeat password
                </label>
                <input
                  type="password"
                  id="repeatpassword"
                  className="form-control"
                  value={this.state.rppassword}
                  onChange={(e) => this.setState({rppassword: e.target.value})}
                />
                <br />
                <label className="grey-text">
                Full Name
                </label>
                <input
                type="name"
                id="name"
                className="form-control"
                value={this.state.name}
                onChange={(e) => this.setState({name: e.target.value})}
                />
                <br />
                <label className="grey-text">
                Phone Number
                </label>
                <input
                type="name"
                id="phone"
                className="form-control"
                value={this.state.phone}
                onChange={(e) => this.setState({phone: e.target.value})}
                />
                <br />
                <a><h1 style={{ fontSize: 15, color: "blue", marginVertical: 10}}
                onClick={() => {this.setState({register: !this.state.register})}}
                >Click here to login</h1></a>
                </div>}
              <div className="text-center mt-3 mb-3">
                <MDBBtn color="indigo"  onClick={!this.state.register? this.Login: this.Register}>{!this.state.register ? "LOGIN" : "REGISTER"}</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
        </MDBCard>
    </MDBContainer>
    </div>
  );
  }
}

export default Auth;