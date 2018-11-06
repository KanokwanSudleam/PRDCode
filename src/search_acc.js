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
    newaccount : '',
    ownerid : null,
    state : null,
    ddlproblem :'',
    name     : Username.getUsername(),
  }
export default class SearchAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
           isLoading : false,
           results: [],
           value: '',
           idacc: '',
           acc:'',
           checkdis : false,
           loadingPage:false,
           typing: false,
           typingTimeout: 0
        };
        this.resetComponent = this.resetComponent.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.handleSearchChange = this. handleSearchChange.bind(this);
        this.callservice = this.callservice.bind(this);
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.backpage = this.backpage.bind(this);
        this.checkDisable = this.checkDisable.bind(this);
        this.addAccount = this.addAccount.bind(this);
    }

    componentWillMount() {
      this.props.saveValues(emp)
      this.resetComponent()
    }

    checkDisable(){
      if (this.state.checkdis === false) {
        return false;
        }
        return true;
    }
  
    resetComponent(){
        this.setState({ isLoading: false, results: [], value: '',checkdis : false })
    }
  
    handleResultSelect(e, { result }){
        this.setState({ value: result.title,idacc:result.accid,acc:result.title,checkdis : true })
    }
   
    handleSearchChange(e, { value }){

      this.setState({ value,typing: true })
      var text = value
      if (text.length == 0) {
        clearTimeout(this.state.typingTimeout);
        this.resetComponent()
      }
      if(text.length >= 3){
          if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
          }  

          this.setState({
            typing: false,
            typingTimeout: setTimeout(() => {
              this.callservice(text)
              }, 1000),
            isLoading: true
          });
      }

    }

    callservice(data){

        const re = new RegExp(_.escapeRegExp(data), 'i')
        // console.log("re"+re)
        axios
        .get(searchURL+ data,{
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"
          }
        })
        .then(response => {
          if(JSON.stringify(response.status) != '200'){
                console.log("status fail:"+response.status)
          }else{
              acclist = []
              idlist = []
            if(Array.isArray(response.data) == true)
            {
              var resarray = response.data;
              resarray.map((result,index) => {
                  acclist.push({title: result.accountname,accid:result.id});
                  idlist.push(result.id);
              })
              if(acclist.length != 0){
                const isMatch = result => re.test(result)

                this.setState({
                  isLoading: false,
                  results: acclist
                })
              }               
            }else{
              this.setState({
                isLoading: false,
                results : [{title : "no result found."}]
              })
            }
  
          }
        })
        .catch(error => {
          console.log(error)  
        })
    }

    saveAndContinue(e) {
      this.setState({loadingPage:true});
      e.preventDefault()
      // Get values via this.refs
      var data = {
      accountid: this.state.idacc,
      accountname : this.state.acc
      }
  
      this.props.saveValues(data)
      setTimeout(() => {
        this.setState({ loadingPage:false });
      }, 3000);
      setTimeout(() => {
      this.props.nextStep()
      },2000);
    }

    addAccount(e) {
      e.preventDefault()
  
      
      this.props.newAccount()
    }

    backpage(){
      window.location = window.location.origin;
    }

    render() {
      const { isLoading, value, results } = this.state
      const stylenext = this.state.loadingPage == true ? {display:'block'}:{display:'none'};
      return (
          <div>
              <Affix>
								<div className="z-index text-center font-all">
									<span><button type="button" className="btn  float-left btnback"  onClick={this.backpage}><i className="fa fa-angle-left"></i> ย้อนหลัง</button></span>
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
              
            <Search
              fluid
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              showNoResults = {false}
              results={results}
              value={value}
              input={{ fluid: true }}
              {...this.props}
            />

            <br></br>
						<br></br>
            <div className="text-center text-color font-all">
              <p>กรุณาระบุคู่กรณี</p>
              <p>บริษัท/ห้างร้าน/องค์กร/หน่วยงาน</p>
              <p>ที่ท่านต้องการร้องเรียน</p>
            </div>
            <br></br>
            <br></br>
            <div className="text-center">
              <p className="font-gray">หากไม่พบคู่กรณีในระบบสามารถเพิ่มคู่กรณีใหม่ได้</p>
              <button type="button" className="btn btnback font-all"  onClick={this.addAccount}>เพิ่มคู่กรณี</button>
            </div>
            <div  style={stylenext}>
						 <div className=" img-middle" style={{'background-color': 'rgba(0,0,0,.6)'}}>
                  <img className="img-fluid img-loader" src="./img/color-loading.gif" />
            </div>
					</div>
        </div>
      )
    }
  }
