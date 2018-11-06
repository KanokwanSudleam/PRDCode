import React, {Component} from 'react';
import FormResponse from './FormResponse.js';
import FormPayment from './FormPayment.js';
import FormType from './FormType.js';
import {Redirect}  from 'react-router'
import moment from 'moment';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Affix, Button, message } from 'antd';

class AllForm extends Component{
	constructor(props) {
		super(props);  
		this.state = {
			redirect: false,
			stepForm: 0,
			complete: false,
			errors: {
				productname:false,
				purchasedate:false,
				payment :false,
				productprice : false,
				purchase : false,
    			website : false,
    			store : false,
			},
			err_problem : false,			
			checkweb:false,
			checkstore:false,
			active : null,
			checkdis : false,
			loadRes:false,
			loadPay:false,
			loadType:false
		 }
		this.saveAndContinue = this.saveAndContinue.bind(this);
		this.nextStep = this.nextStep.bind(this);
		this.getStep = this.getStep.bind(this);
		this.BackStep = this.BackStep.bind(this);
		
		this.handleChange = this.handleChange.bind(this);
		this.dateChange = this.dateChange.bind(this);
		this.clickrequest = this.clickrequest.bind(this);
		this.saveLater = this.saveLater.bind(this);
		this.myColor = this.myColor.bind(this);
		this.valueDate = this.valueDate.bind(this);
		this.checkDisable = this.checkDisable.bind(this);
                this.checkSave = this.checkSave.bind(this);
		this.checkProblem = this.checkProblem.bind(this);
	}
	componentDidMount() {
		var URL = window.env.API_URL+"?function=GetSubCategoryByMainCategory&category="+this.props.fieldValues.subcate2+"&sourcefield=cf_755&targetfield=cf_1011"
		axios
		  .get(URL)
		  .then(response => {
			// console.log("Save res"+JSON.stringify(response))

			const fieldValues = this.props.fieldValues;
			fieldValues.ddlproblem = response.data
		
			this.setState({
			  fieldValues
			});


		  })
		  .catch(error => {
			console.log(error)
	  
		  });		
	}
	myColor(name){
		if (this.state.active === name) {
			return "rgb(0, 188, 212)";
		  }
		  return "#ffffff";
	}
	/**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  nextStep(event) {
    // prevent default action. in this case, action is the form submission event
	event.preventDefault();
	const fieldValues = this.props.fieldValues;
	if(fieldValues.purchasedate == ''){
		fieldValues.purchasedate = moment(new Date()).format('YYYY-MM-DD');   
		this.setState({
			fieldValues
		});
	}
	this.setState({
		loadPay:true
	})
	const {stepForm} = this.state;

	setTimeout(() => {
		this.setState({
			loadPay:false,
			stepForm: stepForm+1,
			complete: stepForm >= 1
		});
	  }, 2000);
  }
  BackStep(){
	const {complete,stepForm} = this.state;
	// console.log("{stepBackBefore}",this.state.stepForm)
	if(stepForm == 2){
		this.setState({
			complete: complete-1,
			stepForm: stepForm-1
		  });
	}
    else if (stepForm > 0) {
      this.setState({
		  stepForm: stepForm-1
		});
	}
	console.log("{stepBack}",this.state.stepForm)
  };
   /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  handleChange(event) {
    const field = event.target.id;
    const fieldValues = this.props.fieldValues;
    fieldValues[field] = event.target.value;

    this.setState({
      fieldValues
	});
	if(fieldValues.purchase == "3. ขายตรง/ตัวเเทนจำหน่าย"||fieldValues.purchase == "6. โทรศัพท์"){		
		this.setState({
			checkstore:false,
			checkweb:false
		  })	
	}
	if(fieldValues.purchase == "1. ห้างฯ/ร้านค้า/หน่วยงาน/สาขา"||fieldValues.purchase == "2. ตลาด"){
		this.setState({
			checkstore:true,
			checkweb:false
		  })	
	}
	if(fieldValues.purchase == "4. เว็บไซต์"||fieldValues.purchase == "5. โซเชียลมีเดีย (เฟสบุ๊ค/ไลน์/อินสตราเเกรม)"){
		this.setState({
			checkweb:true,
			checkstore:false
		  })
	}
  }
  checkDisable(){
	if (this.state.checkdis === false) {
		return false;
	  }
	  return true;
}

  clickrequest(event){
	if (this.state.active === event.target.value) {
		this.setState({active : null,checkdis : false})
	  } else {
		this.setState({active : event.target.value,checkdis : true})
	  }
	var id = event.target.id;
	const fieldValues = this.props.fieldValues;
	fieldValues.new_request = event.target.value;
	this.setState({
		fieldValues
	  });

  }
  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  dateChange(event,date){
	var new_date = moment(date).format('YYYY-MM-DD')
	const fieldValues = this.props.fieldValues;
	fieldValues.purchasedate = new_date   
    this.setState({
		fieldValues
	});
	}
	
	valueDate(dateStr){
		console.log("dateStr"+dateStr)
		if(dateStr == ''){
			return new Date()
		}else{
		const [year,month,day] = dateStr.split("-")
		return new Date(year, month - 1, day)
		}
}

	
	saveAndContinue(e) {
		e.preventDefault()
		this.setState({
			loadRes : true
		})
		setTimeout(() => {
			this.setState({stepForm: 0, 
				complete: false,
				checkdis : false,
				loadRes:false
			});
			this.props.saveValues(this.props.fieldValues)
			this.props.nextStep();
		  }, 2000);
	  }

	saveLater(e){
		e.preventDefault()

		var namebutton = e.currentTarget.getAttribute('name');
		if(namebutton == "purchase_save"){
			if(!this.checkSave()){ 
				return; 
			}
		}else if(namebutton == "problem_save"){
			if(!this.checkProblem()){
				return;
			}
		}
		const fieldValues = this.props.fieldValues;
		if(fieldValues.purchasedate == ''){
			fieldValues.purchasedate = moment(new Date()).format('YYYY-MM-DD');   
			this.setState({
				fieldValues
			});
		}
		message.success('เรื่องร้องเรียนของท่าน ยังไม่ได้ส่งเรื่องไปยังมูลนิธิเพื่อผู้บริโภค ท่านสามารถเลือกเรื่องร้องเรียนจากหน้าหลัก เพื่อแก้ไขได้ในภายหลัง',10);
		this.props.saveforlater(this.props.fieldValues)
		this.setState({ redirect: true })
	}

	checkSave(){
		const fieldValues = this.props.fieldValues;
		let errors = Object.assign({}, this.state.errors);
    		errors = {}
    		this.setState({
      			errors
      
    		});
		if(fieldValues.productname == '')
		{
			errors.productname = true;
		}

		if(fieldValues.payment == ''){
			errors.payment = true;
		}

		if(fieldValues.productprice == ''){
			errors.productprice = true;
		}

		if(fieldValues.purchase == ''){
			errors.purchase = true;
		}
		
		if(this.state.checkstore == true){
			if(fieldValues.store == ''){
				errors.store = true;
			}
		}
		if(this.state.checkweb == true){
			if(fieldValues.website == ''){
				errors.website = true;
			}
		}
		
		if(JSON.stringify(errors) !== '{}'){
			console.log("Error"+JSON.stringify(errors))
			this.setState({
			  errors
			});	  
		}else{
			return true;
		}
	}
	checkProblem(){
		const fieldValues = this.props.fieldValues;
		if(fieldValues.problem == ''){
			this.setState({
				err_problem : true
			  });	 
			return false;
		}else{
			return true;
		}
	}
	getStep(stepForm){
		const stylePay = this.state.loadPay == true ?{display:'block'}:{display:'none'};
		switch (stepForm) {
			case 0:
			return <div>
				<Affix>
							<div className="z-index text-center">
							<div className="row">
								<div className="col-3">
								<button type="button" className="btn btnback float-left" style={{marginRight: 12}} onClick={this.props.previousStep}><i className="fa fa-angle-left"></i> ย้อนหลัง</button>
								</div>
								<div className="col-6">
									(3/4) รายละเอียดเรื่องร้องเรียน
								</div>
								<div className="col-3">
									<button type="submit" className="btn btn-primary float-right">ถัดไป <i className="fa fa-angle-right"></i></button>
								</div>
								</div>
							</div>
				</Affix>
				<br></br>
				<br></br>
				{this.props.fieldValues.accountname == "-- ไม่ระบุคู่กรณี --"?(
					<p><span className="text-color">กรุณาระบุการซื้อสินค้าหรือใช้บริการจาก</span> {this.props.fieldValues.newaccount}</p>
				):(
					<p><span className="text-color">กรุณาระบุการซื้อสินค้าหรือใช้บริการจาก</span> {this.props.fieldValues.accountname}</p>
				)}
				<FormPayment field={this.props.fieldValues} change={this.handleChange}  date={this.dateChange} web={this.state.checkweb} store={this.state.checkstore} valueDate={this.valueDate} error={this.state.errors} />
				
				<button type="button" className="btn btnback float-left" value="บันทึกเพื่อแก้ไขภายหลัง" name="purchase_save" onClick={this.saveLater}>บันทึกเพื่อแก้ไขภายหลัง</button>
				
				<div  style={stylePay}>
					<div className=" img-middle" style={{'background-color': 'rgba(0,0,0,.6)'}}>
                  		<img className="img-fluid img-loader" src="./img/color-loading.gif" />
              		</div>
				</div>

				</div>
			
			case 1:
			return <div>
					<Affix>
							<div className="z-index text-center">
							<div className="row">
								<div className="col-3">
									<button type="button" className="btn btnback float-left"  onClick={this.BackStep}><i className="fa fa-angle-left"></i> ย้อนหลัง</button>
								</div>
								<div className="col-6">
									(3/4) รายละเอียดเรื่องร้องเรียน
								</div>
								<div className="col-3">
									<button type="submit" className="btn btn-primary float-right">ถัดไป <i className="fa fa-angle-right"></i></button>
								</div>
								</div>
							</div>
					</Affix>
					<br></br>
					<br></br>
					{this.props.fieldValues.accountname == "-- ไม่ระบุคู่กรณี --"?(
						<p><span className="text-color">กรุณาระบุรายละเอียดลักษณะปัญหาที่พบจาก </span> {this.props.fieldValues.newaccount}</p>
					):(
						<p><span className="text-color">กรุณาระบุรายละเอียดลักษณะปัญหาที่พบจาก </span> {this.props.fieldValues.accountname}</p>
					)}
					{/* <button type="button" className="btn btn-primary"  onClick={this.BackStep}>Back</button> */}
					<FormType field={this.props.fieldValues} change={this.handleChange} ddlproblem={this.ddlproblem} error={this.state.err_problem} />
					<button type="button" className="btn btnback float-left" onClick={this.saveLater} name="problem_save">บันทึกเพื่อแก้ไขภายหลัง</button>					
					
					<div  style={stylePay}>
					<div className=" img-middle" style={{'background-color': 'rgba(0,0,0,.6)'}}>
                  		<img className="img-fluid img-loader" src="./img/color-loading.gif" />
              		</div>
					</div>

					</div>
			default:
			return "fail"
		}

	}

	ddlproblem(value){
		try{
			return value.map((result,index)=>	
					<option value={result}>{result}</option>
				)
		}catch(e){

		}
	}


	render(){
		let {indexStep} = this.props
		const {complete, stepForm} = this.state;
		const  redirect  = this.state.redirect;
		const style = this.state.loadRes == true ?{display:'block'}:{display:'none'};
		return(
			<div>
			{/* <h2>Tell us about your purchase from Ueser : <span>{this.props.fieldValues.name}</span></h2> */}
			<div style={{marginTop: 12}}>
					<form action="/" onSubmit={this.nextStep}>
						{complete ? (
						<div>
							<Affix>
								<div className="z-index text-center">
								<div className="row">
									<div className="col-3">
										<button type="button" className="btn btnback float-left"  onClick={this.BackStep}><i className="fa fa-angle-left"></i> ย้อนหลัง</button>
									</div>
									<div className="col-6">
										 (3/4) รายละเอียดเรื่องร้องเรียน
									</div>
									<div className="col-3">
										{this.checkDisable()?(
											<button type="button" className="btn btn-primary float-right"  onClick={this.saveAndContinue}>ถัดไป <i className="fa fa-angle-right"></i></button>											
										):(
											<button type="button" className="btn btn-primary float-right disabled" aria-disabled='ture' >ถัดไป <i className="fa fa-angle-right"></i></button>										
										)}
									</div>
									</div>				
								</div>
							</Affix>
							<br></br>
							<br></br>
							{this.props.fieldValues.accountname == "-- ไม่ระบุคู่กรณี --"?(
								<p><span className="text-color">สิ่งที่ต้องการความรับผิดชอบจาก </span> {this.props.fieldValues.newaccount}</p>
							):(
							<p><span className="text-color">สิ่งที่ต้องการความรับผิดชอบจาก</span> {this.props.fieldValues.accountname}</p>
							)}
							
							<FormResponse field={this.props.fieldValues} change={this.handleChange} clickrequest={this.clickrequest} myColor={this.myColor}/>
							<br></br>
							<br></br>
							<button type="button" className="btn btnback float-left" onClick={this.saveLater}>บันทึกเพื่อแก้ไขภายหลัง</button>	
							<div  style={style}>
								<div className=" img-middle" style={{'background-color': 'rgba(0,0,0,.6)'}}>
                  					<img className="img-fluid img-loader" src="./img/color-loading.gif" />
              					</div>
							</div>
						</div>
						)
						:
						(
							<div>{this.getStep(stepForm)}
							</div>
						)
						}
					</form>
		</div>   
			</div>
		)
	}

}
AllForm.contextTypes = {
	router: PropTypes.object
  };
export default AllForm;
