import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Username from './modules/Username.js';
import {Link} from 'react-router';
// import Link  from 'react-router';
import './App.css';
import './Cardcss.css';
import Loginscreen from './Loginscreen'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[]
    }
  }
  componentWillMount(){
    var loginPage =[];
    loginPage.push(<Loginscreen parentContext={this}/>);
    this.setState({
    loginPage:loginPage
    })
  }
  render() {
    return (
      <div className="App">
            <header>
      
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          {/* <a className="navbar-brand"><IndexLink to="/">React App</IndexLink></a> */}
          <Link to="/" className="navbar-brand">Consumer Complaint</Link>
          {/* <div className="navbar-brand">Complaint App </div> */}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              {/* <li className="nav-item active"> */}
              <li className="nav-item">
              <Link to="/conditions" className="nav-link" style={{color: 'white'}}> <span className="sr-only">(current)</span>เงื่อนไขการร้องทุกข์ออนไลน์</Link>
              </li>
              <li className="nav-item">
                <Link to="/channel" className="nav-link" style={{color: 'white'}}>ช่องทางการร้องทุกข์อื่นๆ</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link" style={{color: 'white'}}>ติดต่อเรา</Link>
              </li>
            </ul>
            <form className="form-inline mt-2 mt-md-0 top-bar-right">
              {/* {Auth.isUserAuthenticated() ? ( */}
                <div>
                  {Username.isUserHave() && <div><div className="my-2 my-sm-0 username-header">{Username.getUsername()}</div>
                  <Link to="/logout"><button className="btn btn-light my-2 my-sm-0" type="submit"> ออกจากระบบ</button></Link></div>
              }
                </div>
                {/* {Username.isUserHave() ? (
                <div>
                {Username.getUsername()}

                {Username.isUserHave() && <p className="success-message">{Username.getUsername()}</p>}
                <button className="btn btn-light my-2 my-sm-0" type="submit"> <Link to="/logout">Log out</Link></button>
              </div>
              ) : (
                null
                  // <div>
                  // <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><Link to="/login">Log in</Link></button>
                  // <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><Link to="/signup">Sign up</Link></button>
                  // </div>

              )} */}

            </form>
          </div>
      </nav>
    </header>
      {/* <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">Make a Complaint </h1>
          <p className="text-muted">Ombudsman Services' handy step by step guidance to help you when complaining to a company. Advice that is good for consumers and good for business.</p>
        </div>
      </section> */}
      
        {/* header */}
        {/* add this */}
        {this.props.children}
        {/* {this.state.loginPage}
        {this.state.uploadScreen} */}
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default App;
