import React, {Component} from 'react';
import {
    Step,
    Stepper,
    StepButton,
  } from 'material-ui/Stepper';
import StepMobile from 'react-stepper-horizontal';
import FormType from './FormType.js';
import FieldValues from './modules/FieldValues.js';
import SaveForLater from './modules/SaveLater.js';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Affix, Button, message } from 'antd';

class EditType extends Component{

    constructor(props) {
        super(props);  
        this.state={
            stepIndex: 3,
            fieldValues : JSON.parse(FieldValues.getFieldValues()) ,
            checkweb: false,
            checkstore : false,
            loading : false
        }
        this.nextStep = this.nextStep.bind(this);
        this.saveLater = this.saveLater.bind(this);
        this.handleChange = this.handleChange.bind(this);   
        this.BackStep = this.BackStep.bind(this);
	this.checkProblem = this.checkProblem.bind(this);
    }

    componentDidMount() {
		var URL = window.env.API_URL+"?function=GetSubCategoryByMainCategory&category="+this.state.fieldValues.subcate2+"&sourcefield=cf_755&targetfield=cf_1011"
		axios
		  .get(URL)
		  .then(response => {
			console.log("Save res"+JSON.stringify(response))

			const fieldValues = this.state.fieldValues;
			fieldValues.ddlproblem = response.data
		
			this.setState({
			  fieldValues
			});


		  })
		  .catch(error => {
			console.log(error)
	  
		  });		
	}

    	/**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  nextStep(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    this.setState({
        loading : true
    })
    FieldValues.SetFieldValues(JSON.stringify(this.state.fieldValues))
    setTimeout(() => {
        this.setState({loading:false});	
        this.context.router.replace('/editresponse');   
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
	console.log("fieldValues.store"+fieldValues.store)
	if(fieldValues.store === "1. ห้างฯ/ร้านค้า/หน่วยงาน"||fieldValues.store === "2. ตลาด"||fieldValues.store === "3. ขายตรง/ตัวเเทนจำหน่าย"){
		console.log("in if fieldValues.store"+fieldValues.store)	
		this.setState({
			checkweb:false,
			checkstore:true
		  })	
	}
	if(fieldValues.store === "4. เว็บไซต์"||fieldValues.store === "5. โซเชียลมีเดีย (เฟสบุ๊ค/ไลน์/อินสตราเเกรม)"){
        this.setState({
			checkstore:false,
			checkweb:true
		  })
	}
  }


    saveLater(e){
        e.preventDefault()
        message.success('เรื่องร้องเรียนของท่าน ยังไม่ได้ส่งเรื่องไปยังมูลนิธิเพื่อผู้บริโภค ท่านสามารถเลือกเรื่องร้องเรียนจากหน้าหลัก เพื่อแก้ไขได้ในภายหลัง',10);
        SaveForLater.saveLater(this.state.fieldValues)
		//redirect
		// this.context.router.replace('/');

    }
    BackStep(){
        this.context.router.replace('/edit');
    }

    ddlproblem(value){
		try{
			return value.map((result,index)=>	
					<option value={result}>{result}</option>
				)
		}catch(e){

		}
	}

    checkProblem(){
		const fieldValues = this.state.fieldValues;
		if(fieldValues.problem == ''){
			return false;
		}else{
			return true;
		}
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
                            <div style={{marginTop: 12}}>
                                {/* <button type="button" className="btn btn-primary"  onClick={this.BackStep}>Back</button> */}
                                <form action="/" onSubmit={this.nextStep}>
                                <Affix>
                                    <div className="z-index text-center">
                                    <div className="row">
                                        <div className="col-3">
                                        {/* <span> */}
                                            <button type="button" className="btn btnback float-left" onClick={this.BackStep}><i className="fa fa-angle-left"></i> ย้อนหลัง</button>
                                        {/* </span> */}
                                        </div>
                                        {/* <span> */}
                                        <div className="col-6">
                                        
                                            (3/4) รายละเอียดเรื่องร้องเรียน
                                        {/* </span> */}
                                        </div>
                                        {/* <span> */}
                                        <div className="col-3">
                                        
                                        <button type="submit" className="btn btn-primary float-right">ถัดไป <i className="fa fa-angle-right"></i></button>
                                        {/* </span> */}
                                        </div>
                                        </div>
                                    </div>
                                </Affix>
                                <br></br>
                                <br></br>
                                <div>
                                <p><span className="text-color">กรุณาระบุรายละเอียดลักษณะปัญหาที่พบจาก </span> {this.state.fieldValues.accountname}</p>
                                    <FormType field={this.state.fieldValues} change={this.handleChange} ddlproblem={this.ddlproblem}/>
				    {this.checkProblem()?(
                                        <button type="button" className="btn btnback float-left" onClick={this.saveLater}>บันทึกเพื่อแก้ไขภายหลัง</button>
                                    ):(
                                        <button type="button" className="btn btnback float-left disabled" aria-disabled='ture'>บันทึกเพื่อแก้ไขภายหลัง</button>
                                    )}			            
                                    {/* <button type="submit" className="btn btn-primary float-right">Next Step</button> */}
                                <div  style={styleload}>
                                    <div className=" img-middle" style={{'background-color': 'rgba(0,0,0,.6)'}}>
                                        <img className="img-fluid img-loader" src="./img/color-loading.gif" />
                                    </div>
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
EditType.contextTypes = {
	router: PropTypes.object
  };

export default EditType;
