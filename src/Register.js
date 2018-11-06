import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Card, CardText } from 'material-ui/Card';
import { Link } from 'react-router';
import axios from 'axios';
// import Login from './Login';
class Register extends Component {
  constructor(props){
    super(props);
    // set the initial component state
    this.state = {
      errors: {
        firstname:'',
        lastname:'',
        name:'',
        email: '',
        password: '',
        idcard: '',
        phone: ''
      },
      user: {
        firstname:'',
        lastname:'',
        email: '',
        password: '',
        idcard: '',
        phone: ''
      },
      loading:false
  }
  this.processForm = this.processForm.bind(this);
  this.changeUser = this.changeUser.bind(this);
}

/**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    event.preventDefault();
    let errors = Object.assign({}, this.state.errors);
    errors = {}
    this.setState({
      errors,
      
    });

    if(this.state.user.firstname.trim().length === 0){
      errors.firstname = 'Please provide your FirstName.'
      console.log(JSON.stringify(errors))
    }
    if(this.state.user.lastname.trim().length === 0){

      errors.lastname = 'Please provide your Lastname.'
      console.log(JSON.stringify(errors))
    }
    if(this.state.user.email.trim().length === 0){

      errors.email = 'Please provide your email address.'
      console.log(JSON.stringify(errors))

    }
    if(this.state.user.password.trim().length === 0){

      errors.password = 'Please provide your password.'
      console.log(JSON.stringify(errors))
    }
    if(this.state.user.phone.trim().length === 0){

      errors.phone = 'Please provide your Mobile Number.'

      console.log(JSON.stringify(errors))
    }

    if(JSON.stringify(errors) !== '{}'){
      console.log("Error"+JSON.stringify(errors))
      this.setState({
        errors
      });


    }else{
    console.log("onsubmit1")
    const URL = window.env.API_URL+"?function=NewContact&fname="+this.state.user.firstname+"&lname="+this.state.user.lastname+"&fbuser=&phone="+this.state.user.phone+"&email="+this.state.user.email+"&pass="+this.state.user.password+"&idcard="+this.state.user.idcard;
    this.setState({
      loading:true  
    })
    axios
      .get(URL)
      .then(response => {
          if(JSON.stringify(response.status) !== '200'){
            errors.summary = 'Check the form for errors.';
            this.setState({
              errors: {
                email: 'This email is already taken.'
              },
              loading:false 
            });
          }else if(response.data.name === undefined){
            errors.summary = 'Register Failed.';
            this.setState({
              errors
            });
            loading:false
          }else{
          console.log("test"+ JSON.stringify(response.data.response))
          this.setState({
                  errors: {},
                  loading:false
          });
          //set a message
          localStorage.setItem('successMessage', 'You have successfully signed up! Now you should be able to log in.');

          // make a redirect
          this.context.router.replace('/login');
        }
      })
      .catch(error => {
        console.log(error)
        errors.summary = 'Backend System Error.';
        this.setState({
          errors,
          loading:false
        });
      });

    } 

  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
    console.log("User"+this.state.user)
  }



  render() {
    const  errors = this.state.errors;
    const  user = this.state.user;
    const onChange = this.changeUser;
    const styleloading = this.state.loading == true?{display:'block'}:{display:'none'};
    return (
    <div>
      <Card className="container text-center">
    <form action="/" onSubmit={this.processForm}>
      <h2 className="card-heading font-text">Sign Up</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}
      <div className="field-line">
        <TextField
          floatingLabelText="ชื่อจริง"
          name="firstname"
          errorText={errors.firstname}
          onChange={onChange}
          value={user.firstname}
        />
      </div>
      <div className="field-line">
        <TextField
          floatingLabelText="นามสกุล"
          name="lastname"
          errorText={errors.lastname}
          onChange={onChange}
          value={user.lastname}
        />
      </div>
      <div className="field-line">
        <TextField
          floatingLabelText="เบอร์มือถือ"
          name="phone"
          errorText={errors.phone}
          onChange={onChange}
          value={user.phone}
        />
      </div>
      <div className="field-line">
        <TextField
          floatingLabelText="อีเมล"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="รหัสผ่าน"
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>
      <div className="field-line">
        <TextField
          floatingLabelText="เลขที่บัตรประชาชน"
          name="idcard" 
          errorText={errors.idcard}
          onChange={onChange}
          value={user.idcard}
        />
      </div>


      <div className="button-line">
        {/* <RaisedButton type="submit" label="Create New Account" primary /> */}
        <button type="Submit" className="btn btn-primary">สร้างบัญชีใหม่</button>
      </div>

      <CardText>หากมีบัญชีเเล้ว ? <Link to={'/login'}>เข้าสู่ระบบ</Link></CardText>
    </form>
  </Card>
  {/* <div id="loadID" style={styleloading}></div> */}
  <div  style={styleloading}>
      <div className=" img-middle" style={{'background-color': 'rgba(0,0,0,.6)'}}>
          <img className="img-fluid img-loader" src="./img/color-loading.gif" />
      </div>
	</div>
  </div>
    );
  }
}

Register.contextTypes = {
  router: PropTypes.object.isRequired
};
export default Register;