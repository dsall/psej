<form >
<img src="https://senedico.com/wp-content/uploads/2017/09/appel-a-candidatures-pour-le-recrutement-de-la-seconde-cohorte-du-psej.png" alt="psej" className="logo"/>

<p className="form_name">{!this.state.register ? "LOGIN" : "REGISTER"}</p>
<label className="grey-text">
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
<div className="text-center mt-4 mb-4">
  <MDBBtn color="indigo"  onClick={this.Login}>{!this.state.register ? "LOGIN" : "REGISTER"}</MDBBtn>
</div>
</form>