import React, {Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link,Redirect,Router} from 'react-router';
import axios from 'axios';
import { Card, CardText } from 'material-ui/Card';
import Username from './modules/Username.js';
import ContactID from './modules/ContactID'
class Login extends Component {
constructor(props){
  super(props);
//   this.state={
//   username:'',
//   password:''
//   }
  // set the initial component state
  this.state = {
    errors: {
      email:'',
      password: ''
    },
    successMessage : '',
    user: {
      name: '',
      email: '',
      password: ''
    },
    username: '',
    loader:false
 }
 this.processForm = this.processForm.bind(this);
 this.changeUser = this.changeUser.bind(this);
 this.initializeFacebookLogin = this.initializeFacebookLogin.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
    this.facebookLoginHandler = this.facebookLoginHandler.bind(this);
    this.onFacebookLogin = this.onFacebookLogin.bind(this);
    this.checkloader = this.checkloader.bind(this);
}

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    let errors = Object.assign({}, this.state.errors);
    errors = {}
    this.setState({
      errors,
      
    });

    if(this.state.user.email.trim().length === 0){

      errors.email = 'Please provide your email address.'
      console.log(JSON.stringify(errors))

    }
    if(this.state.user.password.trim().length === 0){

      errors.password = 'Please provide your password.'
      console.log(JSON.stringify(errors))
    }

    if(JSON.stringify(errors) !== '{}'){
      console.log("Error"+JSON.stringify(errors))
      this.setState({
        errors
      });
    }else{
      const URL = window.env.API_URL+"?function=CheckLogin&type=manual&email="+this.state.user.email+"&pass="+this.state.user.password+"&fbuser=";
      this.setState({
        loader : true
      })
      axios
        .get(URL)
        .then(response => {
            if(JSON.stringify(response.status) != '200'){
              errors.summary = "Network error";
              this.setState({
                errors,
                loader : false
              });
            }else  if(response.data.name == undefined){
              console.log('Incorrect email or password')
              errors.summary = 'Incorrect email or password';
              this.setState({
                errors,
                loader : false
              });
          }else{
          console.log("test"+ JSON.stringify(response.data))
          // change the component-container state
            this.setState({
              errors: {},
              user:{
                name : response.data.name,
                loader : false
              }
            });
            Username.SetUser(response.data.name);
            ContactID.SetContactID(response.data.contactid)
            // change the current URL to /
            this.context.router.replace('/');
            // <Redirect to="/"/>
            // Router.browserHistory.push('/'); 
          }
        })
        .catch(error => {
          console.log(error)
          errors.summary = 'Could not process the form.';
          this.setState({
            errors,
            loader : false
          });
        });

    }
}
checkloader(){
  // const Login = document.getElementsByClassName('Login')[0];
  // console.log(Login)
  // // console.log(Login.classList)
  // if(this.state.loader == true){
  //   Login.classList.add('loader')
  // }
  // else if(this.state.loader == false){
  //   Login.classList.remove('loader');
  // }

  var x = document.getElementById("loadID");
  if(this.state.loader == true){
    x.style.display = "block";
  }else{
    x.style.display = "none";
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
  }



/**
   * Facebook Login
   */
//  componentDidMount() {
//    document.addEventListener('FBObjectReady', this.initializeFacebookLogin)
//  }

  componentWillUnmount() {
    document.removeEventListener('FBObjectReady', this.initializeFacebookLogin);
  }

  /**
   * Init FB object and check Facebook Login status
   */
  initializeFacebookLogin(){
    this.FB = window.FB;
    this.checkLoginStatus();
  }

  /**
   * Check login status
   */
  checkLoginStatus (){
    window.FB.getLoginStatus(this.facebookLoginHandler);
  }

  /**
   * Check login status and call login api is user is not logged in
   */
  facebookLogin (){
    document.addEventListener('FBObjectReady', this.initializeFacebookLogin);
    if (!window.FB) return;
    window.FB.getLoginStatus(response => {
      if (response.status === 'connected') {
        if(Username.getUsername() == null){
          window.FB.login(this.facebookLoginHandler, {scope: 'public_profile,email,user_birthday', auth_type: 'reauthenticate', auth_nonce: '{random-nonce}' });
        }else{
        this.facebookLoginHandler(response);
        }
      } else {
        window.FB.login(this.facebookLoginHandler, {scope: 'public_profile,email,user_birthday', auth_type: 'reauthenticate', auth_nonce: '{random-nonce}' });
      }
    }, );
  }

  /**
   * Handle login response
   */
  facebookLoginHandler(response){
    if (response.status === 'connected') {
      
      window.FB.api('/me?fields=name,email,birthday', userData => {
        console.log("handler"+JSON.stringify(userData))
        let result = {
         response:response,
          user: userData
        };
        this.onFacebookLogin(true, result);
      });
    } else {
       this.onFacebookLogin(false);
    }
  }

  onFacebookLogin(loginStatus, resultObject){
    var errors = this.state.errors;
    console.log("Onfacebooklogin")
    if (loginStatus === true) {
      this.setState({
        username: resultObject.user.name,
        loader : true
      });
      console.log("User facebook"+this.state.username)
      console.log("response"+JSON.stringify(resultObject))
      console.log("response"+JSON.stringify(resultObject.response))
      console.log("response"+JSON.stringify(resultObject.user))
      // Auth.authenticateUser(resultObject.response.authResponse.accessToken);
      Username.SetUser(this.state.username);
      const facebookRegister = window.env.API_URL+"?function=NewContact&fname=&lname=&fbuser="+resultObject.user.name+"&email="+resultObject.user.email+"&pass=&idcard=";
      const facebookLogin = window.env.API_URL+"?function=CheckLogin&type=facebook&email=&pass=&fbuser="+resultObject.user.name;
      axios
      .get(facebookLogin,{
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"
        }
      })
      .then(response => {
        console.log("test"+ JSON.stringify(response.data))
          if(JSON.stringify(response.status) != '200'){
            console.log("Error" + response.status)
            errors.summary = 'Network Error';
              this.setState({
                errors,
                loader : false
               });
          }else{
          console.log("test"+ JSON.stringify(response.data.response))
          if(response.data.response === "failure"){
            axios
            .get(facebookRegister,{
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"
              }
            })
            .then(res => {
              console.log(JSON.stringify(response.data))
              console.log("res facebook"+JSON.stringify(res))
              console.log("facebookRegister UserName" + JSON.stringify(res.data.name))
              Username.SetUser(res.data.name);
              ContactID.SetContactID(res.data.contactid)
              this.setState({
                loader : false
               });
            })
            .catch(err =>{
              errors.summary = 'Could not connect Facebook.';
              this.setState({
                errors,
                loader : false
               });
            })
          }else{
            console.log("facebookLogin UserName" + response.data.name)
            Username.SetUser(response.data.name);
            ContactID.SetContactID(response.data.contactid)
            this.setState({
              loader : false
             });
          }
          this.setState({
            loader : false
           });
          // change the current URL to /
          this.context.router.replace('/');
        }
      })
      .catch(error => {
        console.log(error)
        errors.summary = 'Could not connect Facebook.';
        this.setState({
          errors,
          loader : false
        });
      });

    } else {
      console.log("Facebook error")
    }
  }



render() {
  const style = this.state.loader == true?{display:'block'}:{display:'none'};
    return (
      <div className="Login">
      <br></br>
      <br></br>
      <br></br>
      <Card className="container text-center" style={{width: '80%'}}>
          <form action="/" onSubmit={this.processForm}>
            <br></br>
            <h2 className="jumbotron-heading font-text">เข้าสู่ระบบ</h2>

            {this.state.successMessage && <p className="success-message">{this.state.successMessage}</p>}
            {this.state.errors.summary && <p className="error-message">{this.state.errors.summary}</p>}

            <div class="field-line font-text">
              <TextField
                floatingLabelText="อีเมล"
                name="email"
                errorText={this.state.errors.email}
                onChange={this.changeUser}
                value={this.state.user.email}
              />
            </div>

            <div class="field-line font-text">
              <TextField
                floatingLabelText="รหัสผ่าน"
                type="password"
                name="password"
                onChange={this.changeUser}
                errorText={this.state.errors.password}
                value={this.state.user.password}
              />
            </div>
            <div class="button-line font-text">
              <button type="submit" className="btn btn-primary">เข้าสู่ระบบ</button>
              {/* <RaisedButton type="submit" label="Log in" primary /> */}
            </div>     
          </form>      
          <div className="text-center font-text"><p>หรือ</p></div>
        <div>
          <button className="btn btn-primary font-text" onClick={this.facebookLogin}>เข้าสู่ระบบด้วย Facebook</button>
        </div >
          <CardText className="font-text" >หากยังไม่มีบัญชี ? <Link to={'/signup'}>สร้างบัญชี</Link>.</CardText>
        </Card>
        <div>
        </div>                
        <div  style={style}>
          <div className=" img-middle" style={{'background-color': 'rgba(0,0,0,.6)'}}>
            <img className="img-fluid img-loader" src="./img/color-loading.gif" />
          </div>
	      </div>
      </div>
    );
  }
}
Login.contextTypes = {
  router: PropTypes.object.isRequired
};
export default Login;
