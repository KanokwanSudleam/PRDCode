import React, {Component} from 'react';
import {
    Step,
    Stepper,
    StepLabel,
    StepButton,
  } from 'material-ui/Stepper';
import StepMobile from 'react-stepper-horizontal';
import FieldValues from './modules/FieldValues.js';
import { ListGroup,ListGroupItem } from 'react-bootstrap';
import Submitform from './modules/SubmitForm.js';
import PropTypes from 'prop-types';
import { Affix, Button , message } from 'antd';
import 'antd/dist/antd.css';
class SubmitPage extends Component{
	
	constructor(props) {
        super(props);  
        this.state={
            stepIndex : 4,
            fieldValues:JSON.parse(FieldValues.getFieldValues()),
            active : null,
            checkDis : false
        }
		this.saveAndContinue = this.saveAndContinue.bind(this);
		// this.state = {
		// }

		this.handleChange = this.handleChange.bind(this);
        this.clickownerid = this.clickownerid.bind(this);
        this.myColor = this.myColor.bind(this);
        this.checkDisable = this.checkDisable.bind(this);
        this.BackPage = this.BackPage.bind(this);
	}
	 
	handleChange(event) {
		const field = event.target.id;
		this.props.fieldValues.status = "In-Progress";
		const fieldValues = this.props.fieldValues;
		fieldValues[field] = event.target.value;
		this.setState({
			
		  fieldValues
		  
		});
        }
        
    checkDisable(){
            if (this.state.checkDis === false) {
                return false;
              }
              return true;
        }
		
	clickownerid(event){
            if (this.state.active === event.target.value) {
                this.setState({active : null,checkDis : false})
            } else {
                this.setState({active : event.target.value,checkDis : true})
            }
			// alert('You clicked the third ListGroupItem');
			console.log("event"+event)
			var id = event.target.id;
			const fieldValues = this.state.fieldValues;
			fieldValues.ownerid = event.target.value;
			console.log("event.target.value"+event.target.value)
			this.setState({
				fieldValues
			});
		
    }
    myColor(name){
		if (this.state.active === name) {
			return "rgb(0, 188, 212)";
		  }
		  return "#ffffff";
    }
    
    BackPage(){
        this.context.router.replace('/editresponse');
    }

	saveAndContinue(e) {
		e.preventDefault()

        
		this.setState({
            checkDis: false
        })
		message.success('เรื่องร้องเรียนของท่าน ทางมูลนิธิเพื่อผู้บริโภค ได้รับเรื่องร้องเรียนเป็นที่เรียบร้อยแล้ว และจะติดต่อกลับไปให้เร็วที่สุด',10);        
        Submitform.sendForm(this.state.fieldValues)
		//Clear
		// this.context.router.replace('/');
		
		// this.props.nextStep()
	  }
  	

	render(){
        const {stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};
		// let {indexStep} = this.props
		return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-step">
                        <div>
                            <div>
                                <Affix>
                                    <div className="z-index text-center">
                                    <div className="row">
									<div className="col-3">
                                        {/* <span> */}
                                            <button type="button" className="btn btnback float-left" onClick={this.BackPage}><i className="fa fa-angle-left"></i> ย้อนหลัง</button>
                                        {/* </span> */}
                                        </div>
                                        
									<div className="col-6">
                                        {/* <span> */}
                                             (4/4) ส่งเรื่อง
                                              {/* </span> */}
                                        </div>
                                        </div>
                                    </div>
                                </Affix>
                            </div>
                            <br></br>
                            <br></br>                  
                            <p className="text-center text-color">เพื่อดำเนินงานต่ออย่างมีประสิทธิภาพ<br></br>กรุณาระบุหน่วยงานรัยผิดชอบที่ท่านต้องการ</p>
                            <div>
                            <ListGroup>
                                <ListGroupItem className="text-left" id="ownerid" value="19x6" style={{backgroundColor: this.myColor("19x6")}} onClick={this.clickownerid}>มูลนิธิเพื่อผู้บริโภค (สำนักงานใหญ่) </ListGroupItem>
                                <ListGroupItem className="text-left" id="ownerid" value="19x14" style={{backgroundColor: this.myColor("19x14")}} onClick={this.clickownerid} >สมาคมผู้บริโภคขอนแก่น (ภาคอีสาน)</ListGroupItem>
                                <ListGroupItem className="text-left" id="ownerid" value="19x16" style={{backgroundColor: this.myColor("19x16")}} onClick={this.clickownerid}>สมาคมผู้บริโภคสงขลา (ภาคใต้)</ListGroupItem>
                                <ListGroupItem className="text-left" id="ownerid" value="19x17" style={{backgroundColor: this.myColor("19x17")}} onClick={this.clickownerid}>มูลนิธิพะเยาเพื่อการพัฒนา (ภาคเหนือ) </ListGroupItem>
                                <ListGroupItem className="text-left" id="ownerid" value="19x18" style={{backgroundColor: this.myColor("19x18")}} onClick={this.clickownerid} >สมาคมผู้บริโภคภาคตะวันตก (ภาคตะวันตก)</ListGroupItem>
                                <ListGroupItem className="text-left" id="ownerid" value="19x19" style={{backgroundColor: this.myColor("19x19")}} onClick={this.clickownerid}>สมาคมผู้บริโภคภาคตะวันออก (ภาคตะวันออก)</ListGroupItem>
                                <ListGroupItem className="text-left" id="ownerid" value="19x20" style={{backgroundColor: this.myColor("19x20")}} onClick={this.clickownerid}>มูลนิธิเพื่อผู้บริโภค (ภาคกลาง)</ListGroupItem>
                            </ListGroup>
                        </div>
                            <div style={{marginTop: 12}}>
                                {/* <button type="button"  className="btn btn-primary" style={{marginRight: 12}} onClick={this.props.previousStep}>Back</button> */}
                                {/* <button type="button" className="btn btn-primary float-left">Save For Later</button> */}
                                {this.checkDisable()?(
                                    <button type="button" className="btn btn-primary float-right"  onClick={this.saveAndContinue}>ส่งเรื่อง</button>                                
                                ):(
                                    <button type="button" className="btn btn-primary float-right disabled" aria-disabled='ture' >ส่งเรื่อง</button>                                    
                                )}
                            </div>
                        </div>
                    <div>
                </div>
            </div>
            </div>
            </div>
		);
	}

}
SubmitPage.contextTypes = {
	router: PropTypes.object
  };
export default SubmitPage;