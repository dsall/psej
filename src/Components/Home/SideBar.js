import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem} from "mdbreact";
import {Redirect} from "react-router-dom"

class NavbarPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
      logOut: false,
      home: this.props.home,
      users: this.props.users, 
      live: this.props.live, 
      search: this.props.search
    };

  }

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}
SetActive = () => {
 this.setState({home: false, users: false, live: false, search: false})
}
render() {
  if(this.state.logOut){
    localStorage.clear();
    return(<Redirect to ="/auth" />)
  }
  return (
    <MDBNavbar color="green" light expand="md">
        <MDBNavbarBrand href="/" className="">
        <img src="https://senedico.com/wp-content/uploads/2017/09/appel-a-candidatures-pour-le-recrutement-de-la-seconde-cohorte-du-psej.png" alt="psej" className="img-responsive"/>
        </MDBNavbarBrand>
      <MDBNavbarToggler onClick={this.toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
        <MDBNavbarNav left className="mx-auto">
          <MDBNavItem   active={this.state.home} >
            <MDBNavLink to="/">Presences</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem active={this.state.users}>
            <MDBNavLink to="/users">Utilisateurs</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem  active={this.state.live}>
            <MDBNavLink to="/live" active>Surveillance</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem  active={this.state.search} >
            <MDBNavLink to="/search">Recherche</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
                <MDBDropdown>
                <MDBDropdownToggle className="dopdown-toggle" nav>
                  <img src="https://cdn0.iconfinder.com/data/icons/avatars-6/500/Avatar_boy_man_people_account_client_male_person_user_work_sport_beard_team_glasses-512.png" className="rounded-circle z-depth-0"
                    style={{ height: "50px", padding: 0 }} alt="" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default" right>
                  <MDBDropdownItem onClick={() => {console.log("account")}}>Compte</MDBDropdownItem>
                  <MDBDropdownItem onClick={() => {this.setState({logOut: true})}}>Deconnection</MDBDropdownItem>
                </MDBDropdownMenu>
                </MDBDropdown>
        </MDBNavbarNav>
      </MDBCollapse>
      
    </MDBNavbar>
    );
  }
}

export default NavbarPage;