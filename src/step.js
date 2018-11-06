import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
  StepButton,
} from 'material-ui/Stepper';
// import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
import Search_ACC from './search_acc.js';
import Add_Acc from './Search_Add.js'
import Serach from './Search.js';
import Catalog from './CatalogPage.js';
import Form from './AllForm.js';
import SaveForm from './SavePage.js';
import Username from './modules/Username';
import {Grid,Row,Col} from 'react-bootstrap';
import StepMobile from 'react-stepper-horizontal';
import axios from 'axios';
import PropTypes from 'prop-types';
// import router from 'react-router';
import ContactID from './modules/ContactID'
// import MobileStepper from 'material-ui/MobileStepper';
// import Paper from 'material-ui/Paper';
// import Typography from 'material-ui/Typography';

/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 * Avoid using long step names in horizontal steppers.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */
var fieldValues = {
    ticketid :'',
    status : '',
    contactid : ContactID.getContactID(),
    accountid: null,
    accountname : null,
    title : '',
    category   : "ร้องเรียน",
    subcate1 : '',
    subcate2 : '',
    subcate3 : '',
    channel : "9.Mobile App",
    productname : '',
    productprice : '',
    purchasedate : '',
    payment : '',
    purchase : '',
    website : '',
    store : '',
    problem : '',
    damage : '',
    desc : '',
    new_request : '',
    ownerid : null,
    state : null,
    ddlproblem :'',
    newaccount : '',
    name     : Username.getUsername(),
  }

  const styles = theme => ({
    root: {
      maxWidth: 400,
      flexGrow: 1,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      height: 50,
      paddingLeft: theme.spacing.unit * 4,
      marginBottom: 20,
      backgroundColor: theme.palette.background.default,
    },
  });
class PageStepper extends React.Component {
  constructor(props, context) {
    super(props, context);


    // set the initial component state
    this.state = {
        fieldValues: fieldValues,
        finished: false,
        stepIndex: 0,
    };

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.saveforlater = this.saveforlater.bind(this);
    this.redirectURL = this.redirectURL.bind(this);
    this.redirectURL2 = this.redirectURL2.bind(this);
    this.handlenewAccount = this.handlenewAccount.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleinit = this.handleinit.bind(this);
  }

  componentWillMount() {
    this.saveValues(fieldValues)
  }

  handleNext(){
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 3,
    });
  };

  handlePrev(){
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };
  handlenewAccount(){
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: 1.5,
      finished: stepIndex >= 3,
    });
  };
  handleCategory(){
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: 1,
      finished: stepIndex >= 3,
    });
  }; 
  handleinit(){
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: 0,
      finished: stepIndex >= 3,
    });
  }; 
  saveValues(field_value) {
    return function() {
      console.log("field"+field_value.accountid)
      fieldValues = Object.assign({}, fieldValues, field_value)
    }.bind(this)()
  }



  submitRegistration(field_value){
    return function() {
      fieldValues = Object.assign({}, fieldValues, field_value)
      var getURL = window.env.API_URL+"?function=UpdateNewTicket&ticketid="
      // if(fieldValues.accountname == "-- ไม่ระบุคู่กรณี --"){
      //   var URL = getURL+fieldValues.ticketid+"&status=In Progress"+"&contactid="+fieldValues.contactid+"&title="+fieldValues.title+
      //   "&accountid=11x"+fieldValues.accountid+"&accountname="+fieldValues.accountname+"&category="+fieldValues.category+
      //   "&subcate1="+fieldValues.subcate1+"&subcate2="+fieldValues.subcate2+"&subcate3="+fieldValues.subcate3+
      //   "&channel="+fieldValues.channel+"&productname="+fieldValues.productname+"&productprice="+fieldValues.productprice+
      //   "&purchasedate="+fieldValues.purchasedate+"&payment="+fieldValues.payment+"&purchase="+fieldValues.purchase
      //   +"&website="+fieldValues.website+"&store="+fieldValues.store+"&problem="+fieldValues.problem+"&damage="+fieldValues.damage+"&desc="+fieldValues.newaccount+ "-" +fieldValues.desc+
      //   "&request="+fieldValues.new_request+"&ownerid=1x"+fieldValues.ownerid
      // }else{
        var URL = getURL+fieldValues.ticketid+"&status=In Progress"+"&contactid="+ContactID.getContactID()+"&title="+fieldValues.title+
        "&accountid="+fieldValues.accountid+"&accountname="+fieldValues.accountname+"&category="+fieldValues.category+
        "&subcate1="+fieldValues.subcate1+"&subcate2="+fieldValues.subcate2+"&subcate3="+fieldValues.subcate3+
        "&channel="+fieldValues.channel+"&productname="+fieldValues.productname+"&productprice="+fieldValues.productprice+
        "&purchasedate="+fieldValues.purchasedate+"&payment="+fieldValues.payment+"&purchase="+fieldValues.purchase
        +"&website="+fieldValues.website+"&store="+fieldValues.store+"&problem="+fieldValues.problem+"&damage="+fieldValues.damage+"&desc="+fieldValues.desc+
        "&request="+fieldValues.new_request+"&ownerid="+fieldValues.ownerid
      // }


    // console.log("Save URL"+URL)

    axios
      .get(URL)
      .then(response => {   
        if(response.status == 200){
          console.log("Save res"+JSON.stringify(response))
          window.location = window.location.origin;
          
        }
      })
      .catch(error => {
        console.log(error) 
      });

    }.bind(this)()
    // this.handleNext()
  }

  redirectURL2(){
    console.log("redirect")
    this.context.router.replace('/');        
  }



  saveforlater(field_value) {
    return function() {
      fieldValues = Object.assign({}, fieldValues, field_value)
      var getURL = window.env.API_URL+"?function=UpdateNewTicket&ticketid="
      // if(fieldValues.accountname == "-- ไม่ระบุคู่กรณี --"){
      //   var URL = getURL+fieldValues.ticketid+"&status=Open"+"&contactid="+fieldValues.contactid+"&title="+fieldValues.title+
      //   "&accountid=11x"+fieldValues.accountid+"&accountname="+fieldValues.accountname+"&category="+fieldValues.category+
      //   "&subcate1="+fieldValues.subcate1+"&subcate2="+fieldValues.subcate2+"&subcate3="+fieldValues.subcate3+
      //   "&channel="+fieldValues.channel+"&productname="+fieldValues.productname+"&productprice="+fieldValues.productprice+
      //   "&purchasedate="+fieldValues.purchasedate+"&payment="+fieldValues.payment+"&purchase="+fieldValues.purchase
      //   +"&website="+fieldValues.website+"&store="+fieldValues.store+"&problem="+fieldValues.problem+"&damage="+fieldValues.damage+"&desc="+fieldValues.newaccount+ "-" +fieldValues.desc+
      //   "&request="+fieldValues.new_request+"&ownerid=1x1"
      // }else{
      var URL = getURL+fieldValues.ticketid+"&status=Open"+"&contactid="+ContactID.getContactID()+"&title="+fieldValues.title+
      "&accountid="+fieldValues.accountid+"&accountname="+fieldValues.accountname+"&category="+fieldValues.category+
      "&subcate1="+fieldValues.subcate1+"&subcate2="+fieldValues.subcate2+"&subcate3="+fieldValues.subcate3+
      "&channel="+fieldValues.channel+"&productname="+fieldValues.productname+"&productprice="+fieldValues.productprice+
      "&purchasedate="+fieldValues.purchasedate+"&payment="+fieldValues.payment+"&purchase="+fieldValues.purchase
      +"&website="+fieldValues.website+"&store="+fieldValues.store+"&problem="+fieldValues.problem+"&damage="+fieldValues.damage+"&desc="+fieldValues.desc+
      "&request="+fieldValues.new_request+"&ownerid=19x1"
      // }

    console.log("Save URL"+URL)

    axios
      .get(URL)
      .then(response => {
        console.log("Save res"+JSON.stringify(response))
        this.redirectURL()
      })
      .catch(error => {
        console.log(error)
  
      });
      
    }.bind(this)()
    // this.handleNext()
  }

  redirectURL(){
    console.log("redirect")
    this.context.router.replace('/');
  }
  

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
      return <Search_ACC  fieldValues={fieldValues}
                          nextStep={this.handleNext}
                          previousStep={this.handlePrev}
                          saveValues={this.saveValues} 
                          newAccount={this.handlenewAccount}/>;
        // return <Search_ACC/>
        // return <Serach  fieldValues={fieldValues}
        //                 nextStep={this.handleNext}
        //                 previousStep={this.handlePrev}
        //                 saveValues={this.saveValues} />;
      case 1.5:
      return <Add_Acc fieldValues={fieldValues}
                   nextStep={this.handleNext}
                   previousStep={this.handlePrev}
                   saveValues={this.saveValues}
                   ToCategory={this.handleCategory} 
                   ToBack = {this.handleinit}/>;
      case 1:
        return <Catalog fieldValues={fieldValues}
                     nextStep={this.handleNext}
                     previousStep={this.handlePrev}
                     saveValues={this.saveValues} />;
      case 2:
        return <Form fieldValues={fieldValues}
                     nextStep={this.handleNext}
                     previousStep={this.handlePrev}
                     saveValues={this.saveValues}
                     submitRegistration={this.submitRegistration}
                    saveforlater={this.saveforlater} />;
      case 3 :
        return <SaveForm fieldValues={fieldValues}
                         nextStep={this.handleNext}
                         previousStep={this.handlePrev}
                         saveValues={this.saveValues}
                         submitRegistration={this.submitRegistration}
                         saveforlater={this.saveforlater}/>
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div className="container">
          {/* <div style={{width: '90%', maxWidth: 700, margin: 'auto'}}> */}
       <div className="row">
        <div className="col-12 col-step">
        {/* <div id='content-Desktop' className="margin-bottom-five">
        <Stepper className="StepStyle" activeStep={stepIndex}>
          <Step>
            <StepButton className="font-step">Make a complaint</StepButton>
          </Step>
          <Step>
            <StepButton className="font-step">About your complaint</StepButton>
          </Step>
          <Step>
            <StepButton className="font-step">Supporting documents</StepButton>
          </Step>
          <Step>
            <StepButton className="font-step">Submit</StepButton>
          </Step>
        </Stepper>
        </div>
        <div id='step-mobile' className="margin-bottom-five">
        
            <StepMobile  steps={ [{title: 'Make a complaint'}, {title: 'About your complaint'}, {title: 'Supporting documents'}, {title: 'Submit'}] } activeStep={stepIndex} />
        </div> */}
          <div style={contentStyle}>
            {finished ? (
              <p>
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    this.setState({stepIndex: 0, finished: false});
                  }}
                >
                  Click here
                </a> to reqeust again.
              </p>
            ) : (
              <div>
                <p>{this.getStepContent(stepIndex)}</p>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    );
  }
}
PageStepper.propTypes = {
router: PropTypes.object
};
PageStepper.contextTypes = {
	router: PropTypes.object
};
export default PageStepper;
