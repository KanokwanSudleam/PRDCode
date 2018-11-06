import _ from 'lodash';
import React, { Component } from 'react';
import {Search} from 'semantic-ui-react';
import {Grid} from 'semantic-ui-react';
import {Header} from 'semantic-ui-react';
import axios from "axios";
import { Affix, Button } from 'antd';
import ContactID from './modules/ContactID';
import Username from './modules/Username';


  const searchURL = window.env.API_URL+"?function=GetAccountListByAccountName&accountname="
  var acclist = [];
  var idlist = [];

  const emp = {
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
    name     : Username.getUsername(),
  }
export default class SearchExampleStandard extends Component {
    constructor(props) {
        super(props);
        this.state = {
           isLoading : false,
           results: [],
           value: '',
           idacc: '',
           acc:'',
           checkdis : false,
           loading : false
        };
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.checkDisable = this.checkDisable.bind(this);
        this.addAccount = this.addAccount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetComponent = this.resetComponent.bind(this);
    }

    componentWillMount() {
      var fieldaccount = this.props.fieldValues.accountname;
      fieldaccount = "";
        this.setState({fieldaccount, checkdis : false })
      }


    checkDisable(){
      if (this.state.checkdis === false) {
        return false;
        }
        return true;
    }
  


    saveAndContinue(e) {
      e.preventDefault()

      this.setState({
          loading:true
      })

      var data = {
      accountid: "",
      accountname : this.props.fieldValues.accountname
      }
      setTimeout(() => {
        this.setState({
          loading : false
        }) 
        this.props.saveValues(data)
        this.props.ToCategory() 
      }, 2000);  
      
    }

    addAccount(e) {
      e.preventDefault()
      this.props.newAccount()
    }
    resetComponent(){

      this.setState({checkdis : false })
    }
    handleChange(event) {
          const field = event.target.id;
          const fieldValues = this.props.fieldValues;
          fieldValues[field] = event.target.value;
          this.setState({
            fieldValues,
          });
          if(this.props.fieldValues.accountname.length < 1){
            return this.resetComponent()
          }else{
            this.setState({
              fieldValues,
              checkdis : true
            });
          }
    }

    render() {
      const { isLoading, value, results } = this.state
      const styleload = this.state.loading == true ?{display:'block'}:{display:'none'};
      return (
        // <div className="ui grid container">
          // <div className="sixteen wide column">
          <div>
              <Affix>
								<div className="z-index text-center">
									<span><button type="button" className="btn btnback float-left"  onClick={this.props.ToBack}><i className="fa fa-angle-left"></i> ย้อนหลัง</button></span>
									<span> (1/4) ค้นหาคู่กรณี </span>
									<span>
                    {this.checkDisable()?(
										  <button type="button" className="btn btn-primary float-right"  onClick={this.saveAndContinue}>ถัดไป <i className="fa fa-angle-right"></i></button>                      
                    ):(
										  <button type="button" className="btn btn-primary float-right disabled" aria-disabled='ture'  >ถัดไป <i className="fa fa-angle-right"></i></button>                      
                    )}
									</span>									
								</div>
							</Affix>
                            <br></br>
							<br></br>
              <div className="container">
                <div className="form-group row">
                  <label for="productname" className="col-12 col-sm-12 col-form-label">ชื่อคู่กรณี</label>
                  <div className="col-12 col-sm-12">
                    <input type="text" className="form-control" id="accountname" placeholder="กรุณาระบุชื่อบริษัทฯ/ห้างร้าน/องค์กร/หน่วยงาน ที่ไม่พบคู่กรณีในระบบ" value={this.props.fieldValues.accountname} onChange={this.handleChange} required/>
                  </div>
                </div>
              </div>
              <div  style={styleload}>
                  <div className=" img-middle" style={{'background-color': 'rgba(0,0,0,.6)'}}>
                    <img className="img-fluid img-loader" src="./img/color-loading.gif" />
                  </div>
				      </div>
        </div>

      )
    }
  }
