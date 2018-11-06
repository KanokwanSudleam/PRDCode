import React, {Component} from 'react';
import {
    Step,
    Stepper,
    StepButton,
  } from 'material-ui/Stepper';
import StepMobile from 'react-stepper-horizontal';
import FormPayment from './FormPayment.js';
import moment from 'moment';
import FieldValues from './modules/FieldValues.js';
import SaveForLater from './modules/SaveLater.js';
import PropTypes from 'prop-types';
import { Affix, Button, message } from 'antd';
class Edit extends Component{

    constructor(props) {
        super(props);  
        this.state={
            stepIndex: 3,
            fieldValues : JSON.parse(FieldValues.getFieldValues()) ,
            checkweb: false,
            checkstore : false,
            loading : false,
            errors: {
		productname:false,
		purchasedate:false,
		payment :false,
		productprice : false,
		purchase : false,
    		website : false,
    		store : false,
	    }
        }
        this.dateChange = this.dateChange.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.saveLater = this.saveLater.bind(this);
        this.handleChange = this.handleChange.bind(this);   
        this.handlePrev = this.handlePrev.bind(this);
        this.valueDate = this.valueDate.bind(this);
	this.checkSave = this.checkSave.bind(this);
    }

    componentDidMount() {
        if(this.state.fieldValues.purchase == "3. ขายตรง/ตัวเเทนจำหน่าย"||this.state.fieldValues.purchase == "6. โทรศัพท์"){
            // console.log("in if fieldValues.store"+fieldValues.store)	
            this.setState({
                checkstore:false,
                checkweb:false
              })	
        }
        if(this.state.fieldValues.purchase === "1. ห้างฯ/ร้านค้า/หน่วยงาน/สาขา"||this.state.fieldValues.purchase === "2. ตลาด"){	
            this.setState({
                checkstore:true,
                checkweb:false
              })	
        }
        if(this.state.fieldValues.purchase === "4. เว็บไซต์"||this.state.fieldValues.purchase === "5. โซเชียลมีเดีย (เฟสบุ๊ค/ไลน์/อินสตราเเกรม)"){
            this.setState({
                checkweb:true,
                checkstore:false
              })
        }
    }

    	/**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  nextStep(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    const fieldValues = this.state.fieldValues;
    if(fieldValues.purchasedate == ''){
	fieldValues.purchasedate = moment(new Date()).format('YYYY-MM-DD');   
        this.setState({
		fieldValues
        });
    } 
    this.setState({
        loading:true
    })
    FieldValues.SetFieldValues(JSON.stringify(this.state.fieldValues))
    setTimeout(() => {
        this.setState({loading:false});	
        this.context.router.replace('/edittype');
      }, 2000);
  }
     /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  handleChange(event) {
    const field = event.target.id;
    const fieldValues = this.state.fieldValues;
    fieldValues[field] = event.target.value;

    this.setState({
      fieldValues
	});
    console.log("fieldValues.purchase"+fieldValues.purchase)
    if(fieldValues.purchase  == "3. ขายตรง/ตัวเเทนจำหน่าย"||fieldValues.purchase == "6. โทรศัพท์"){
		// console.log("in if fieldValues.store"+fieldValues.store)	
		this.setState({
			checkstore:false,
			checkweb:false
		  })	
	}
	if(fieldValues.purchase === "1. ห้างฯ/ร้านค้า/หน่วยงาน/สาขา"||fieldValues.purchase === "2. ตลาด"){
		console.log("in if fieldValues.store"+fieldValues.store)	
		this.setState({
			checkstore:true,
			checkweb:false
		  })	
	}
	if(fieldValues.purchase === "4. เว็บไซต์"||fieldValues.purchase === "5. โซเชียลมีเดีย (เฟสบุ๊ค/ไลน์/อินสตราเเกรม)"){
		this.setState({
			checkweb:true,
			checkstore:false
		  })
	}
  }

      /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
    dateChange(event,date){
        // const field = event.target.name;
        // var new_date = moment(date).format('DD-MM-YYYY')
        var new_date = moment(date).format('YYYY-MM-DD')
        console.log("new_date"+new_date)
        console.log("date"+date)
        const fieldValues = this.state.fieldValues;
        fieldValues.purchasedate = new_date
        
        
        this.setState({
            fieldValues
        });
    }

    valueDate(dateStr){
        if(dateStr == ""){
            return new Date()
        }else{
            console.log("dateStr"+dateStr)
            const [year,month,day] = dateStr.split("-")
            return new Date(year, month - 1, day)

        }		
    }

    saveLater(e){
	e.preventDefault();
	const fieldValues = this.state.fieldValues;
        if(!this.checkSave()){ 
            return; 
        }
	if(fieldValues.purchasedate == ''){
            fieldValues.purchasedate = moment(new Date()).format('YYYY-MM-DD');   
            this.setState({
            	fieldValues
            });
        } 
        message.success('เรื่องร้องเรียนของท่าน ยังไม่ได้ส่งเรื่องไปยังมูลนิธิเพื่อผู้บริโภค ท่านสามารถเลือกเรื่องร้องเรียนจากหน้าหลัก เพื่อแก้ไขได้ในภายหลัง',10);
        // this.props.saveforlater(this.state.fieldValues)
        SaveForLater.saveLater(this.state.fieldValues)
		//redirect
		// this.context.router.replace('/');

    }

    checkSave(){
		const fieldValues = this.state.fieldValues;
		
	let errors = Object.assign({}, this.state.errors);
        errors = {}
        this.setState({
              errors,
  
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

    
    handlePrev(){
        this.context.router.replace('/');
    };
    

    render(){
        const {stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};
        const styleload = this.state.loading == true ?{display:'block'}:{display:'none'};
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-step">

                        <div style={contentStyle}>
                            <div style={{marginTop: 12}}>
                                <form action="/" onSubmit={this.nextStep}>
                                    <Affix>
                                        <div className="z-index text-center">
                                        <div className="row">
                                            <div className="col-3">
                                            {/* <span> */}
                                                <button type="button" className="btn btnback float-left" onClick={this.handlePrev}><i className="fa fa-angle-left"></i> ย้อนหลัง</button>
                                            {/* </span> */}
                                            {/* <span> */}
                                            </div>
						                    <div className="col-6">
                                                (3/4) รายละเอียดเรื่องร้องเรียน
                                            {/* </span> */}
                                            </div>
                                            {/* <span> */}
						                    <div className="col-3">                                            
                                            <button type="submit" className="btn btn-primary float-right"  onClick={this.saveAndContinue}>ถัดไป <i className="fa fa-angle-right"></i></button>
                                            {/* </span> */}
                                            </div>
                                            </div>
                                        </div>
                                    </Affix>
                                <br></br>
                                <br></br>
                                <div>
                                    {/* <button type="button" className="btn btn-primary" style={{marginRight: 12}} onClick={this.handlePrev}>Back</button> */}
                                    <p><span className="text-color">กรุณาระบุการซื้อสินค้าหรือใช้บริการจาก</span> {this.state.fieldValues.accountname}</p>
                                    <FormPayment field={this.state.fieldValues} change={this.handleChange}  date={this.dateChange} web={this.state.checkweb} store={this.state.checkstore} valueDate={this.valueDate} error={this.state.errors} />
				
				    <button type="button" className="btn btnback float-left" onClick={this.saveLater}>บันทึกเพื่อแก้ไขภายหลัง</button>
                                    {/* <button type="submit" className="btn btn-primary float-right">Next Step</button> */}
                                    </div>
                                    <div  style={styleload}>
					                    <div className=" img-middle" style={{'background-color': 'rgba(0,0,0,.6)'}}>
                  		                    <img className="img-fluid img-loader" src="./img/color-loading.gif" />
              		                    </div>
				                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Edit.contextTypes = {
	router: PropTypes.object
  };

export default Edit;
