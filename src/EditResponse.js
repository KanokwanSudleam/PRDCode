import React, {Component} from 'react';
import {
    Step,
    Stepper,
    StepLabel,
    StepButton,
  } from 'material-ui/Stepper';
import StepMobile from 'react-stepper-horizontal';
import FormResponse from './FormResponse.js';
import FieldValues from './modules/FieldValues.js';
import SaveForLater from './modules/SaveLater.js'
import PropTypes from 'prop-types';
import { Affix, Button, message } from 'antd';

class EditResponse extends Component{

    constructor(props) {
        super(props);  
        this.state={
            stepIndex: 3,
            fieldValues : JSON.parse(FieldValues.getFieldValues()) ,
            checkweb: false,
            checkstore : false,
            active : null,
            check : false,
            loading : false
        }
        this.nextStep = this.nextStep.bind(this);
        this.saveLater = this.saveLater.bind(this);
        this.handleChange = this.handleChange.bind(this);   
        this.clickrequest = this.clickrequest.bind(this);
        this.myColor = this.myColor.bind(this);
        this.BackStep = this.BackStep.bind(this);
        this.checkDisable = this.checkDisable.bind(this);
    }

    	/**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  nextStep(event) {
    event.preventDefault();
    this.setState({
        check : false,
        loading : true
	  });
    FieldValues.SetFieldValues(JSON.stringify(this.state.fieldValues))
    setTimeout(() => {
        this.setState({loading:false});	
        this.context.router.replace('/submit'); 
      }, 2000);
  }
  myColor(name){
    if (this.state.active === name) {
        return "rgb(0, 188, 212)";
      }
      return "#ffffff";
    }
     /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  handleChange(event) {

  }

  checkDisable(){
	if (this.state.check === false) {
		return false;
	  }
	  return true;
    }
  clickrequest(event){
    if (this.state.active === event.target.value) {
		this.setState({active : null,check:false})
	  } else {
		this.setState({active : event.target.value,check : true})
	  }
	// alert('You clicked the third ListGroupItem');
	console.log("event"+event)
	var id = event.target.id;
	const fieldValues = this.state.fieldValues;
	fieldValues.new_request = event.target.value;
	console.log("event.target.value"+event.target.value)
	this.setState({
		fieldValues
	  });

  }
  
    // saveValues(field_value) {
    //     return function() {
    //     fieldValues = Object.assign({}, fieldValues, field_value)
    //     }.bind(this)()
    // }

    saveLater(e){
		e.preventDefault()
        message.success('เรื่องร้องเรียนของท่าน ยังไม่ได้ส่งเรื่องไปยังมูลนิธิเพื่อผู้บริโภค ท่านสามารถเลือกเรื่องร้องเรียนจากหน้าหลัก เพื่อแก้ไขได้ในภายหลัง',10);
		SaveForLater.saveLater(this.state.fieldValues)
		//redirect
		// this.context.router.replace('/');

    }
    BackStep(){
        this.context.router.replace('/edittype');
    }
    
    render(){
        const {stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};
        const styleload = this.state.loading == true ?{display:'block'}:{display:'none'};
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-step">
                        <div style={contentStyle}>
                            <div>
                                <Affix>
                                    <div className="z-index text-center">
                                    <div className="row">
                                            <div className="col-3">
                                        {/* <span> */}
                                            <button type="button" className="btn btnback float-left" onClick={this.BackStep}><i className="fa fa-angle-left"></i> ย้อนหลัง</button>
                                        {/* </span>
                                        <span> */}
                                        </div>
                                            <div className="col-6">
                                        
                                            (3/4) รายละเอียดเรื่องร้องเรียน
                                        {/* </span>
                                        <span> */}

                                        </div>
                                        <div className="col-3">
                                            {this.checkDisable()?(
                                                <button type="button" className="btn btn-primary float-right"  onClick={this.nextStep}>ถัดไป <i className="fa fa-angle-right"></i></button>                                        
                                            ):(
                                                <button type="button" className="btn btn-primary float-right disabled" aria-disabled='ture' >ถัดไป <i className="fa fa-angle-right"></i></button>                                        
                                            )}
                                        {/* </span> */}
                                        </div>
                                        </div>
                                    </div>
                                </Affix>
                                <br></br>
                                <br></br>
                                {/* <button type="button" className="btn btn-primary"  onClick={this.BackStep}>Back</button>*/}
                                <p><span className="text-color">สิ่งที่ต้องการความรับผิดชอบจาก</span> {this.state.fieldValues.accountname}</p>
                                <FormResponse field={this.state.fieldValues} change={this.handleChange} clickrequest={this.clickrequest} myColor={this.myColor}/>
                                <br></br>
                                <br></br>
                                <button type="button" className="btn btnback float-left" onClick={this.saveLater}>บันทึกเพื่อแก้ไขภายหลัง</button>
                                {/* <button type="button" className="btn btn-primary float-right"  onClick={this.nextStep}>Next</button> */}
                                <div  style={styleload}>
                                    <div className=" img-middle" style={{'background-color': 'rgba(0,0,0,.6)'}}>
                                        <img className="img-fluid img-loader" src="./img/color-loading.gif" />
                                    </div>
				                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )


    }
}
EditResponse.contextTypes = {
	router: PropTypes.object
  };

export default EditResponse;