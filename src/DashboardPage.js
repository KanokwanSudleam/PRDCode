import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Username from './modules/Username.js';
import ContactID from './modules/ContactID'
import PropTypes from 'prop-types';
import FieldValues from './modules/FieldValues.js';

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
  newaccount : '',
  ownerid : null,
  state : null,
  ddlproblem :'',
  name     : Username.getUsername(),
}

class DashboardPage extends Component {
constructor(props){
  super(props);
  // set the initial component state
  this.state = {
    secretData: '',
    listdata : [],
    active : null,
    accarr : [],
    loadingpage:false
 }
 this.getdata = this.getdata.bind(this);
 this.nextEdit = this.nextEdit.bind(this);
 this.myColor = this.myColor.bind(this);
 this.split_desc = this.split_desc.bind(this);
}

// componentDidMount() {
  componentWillMount() {

  var URL = window.env.API_URL+"?function=GetTicketListByContactID&contactid="+ContactID.getContactID();
  // var URL = window.env.API_URL+"?function=GetTicketListByContactID&contactid="+ContactID.getContactID();
  
  // var URL = window.env.API_URL+"?function=GetTicketListByContactID&contactid="+ContactID.getContactID(); 
  axios
    .get(URL,{
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"
      }
    })
    .then(response => {
      if(Array.isArray(response.data) === true){
        this.setState({
          listdata : response.data
  
        })
      }else{
        this.setState({
          listdata : 'NewUser'
  
        })
        
      }

      
    })
    .catch(error => {
      console.log(error)

    });

    var data={
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
    this.saveValues(data) 

    FieldValues.deFieldValues();

  }

  saveValues(field_value) {
    return function() {
      fieldValues = Object.assign({}, fieldValues, field_value)
    }.bind(this)()
  }

  myColor(id){
		if (this.state.active === id) {
			return "rgb(0, 188, 212)";
		  }
		  return "#ffffff";
	}


  nextEdit(value){
    if (this.state.active === value) {
			this.setState({active : null})
		  } else {
			this.setState({active : value})
		  }

    var CardURL = window.env.API_URL+"?function=GetTicketDetailByTicketID&ticketid="+value;
    this.setState({
      loadingpage:true
    })
    axios
      .get(CardURL)
      .then(response => {
          var fieldValues = {
            ticketid :response.data.ticketid,
            status : response.data.status,
            contactid : ContactID.getContactID(),
            accountid: response.data.accountid,
            accountname : response.data.accountname,
            category   : "ร้องเรียน",
            subcate1 : response.data.subcate1,
            subcate2 :response.data.subcate2,
            subcate3 : response.data.subcate3,
            channel : "9.Mobile App",
            productname : response.data.productname,
            productprice : response.data.productprice,
            purchasedate : response.data.purchasedate,
            payment : response.data.payment,
            purchase : response.data.purchase,
            website : response.data.website,
            store : response.data.store,
            problem : response.data.problem,
            damage : response.data.damage,
            desc : response.data.desc,
            new_request : response.data.reques,
            ddlproblem : [],
            ownerid : 1,
            name     : Username.getUsername(),
          }
        // }
       

          FieldValues.SetFieldValues(JSON.stringify(fieldValues));
        //{"data":{"ticketid":"17x150119","ticketno":"TT118","accountid":"11x12540","accountname":"ร้านดาวจูเนี่ย","status":"Open","ticketdate":"2018-04-13","category":"ร้องเรียน","subcate1":"3.สื่อและโทรคมนาคม","subcate2":"3.2 การกระจายเสียงและโทรทัศน์",
        //"problem":"","productname":"สินค้า","productprice":"0.00000000","purchasedate":"","desc":"","website":"","store":"","channel":"9.Mobile App","purchase":"","payment":"","damage":"0.00000000","reques":""}

        if(response.data.productname == "" ||response.data.productprice == "0.00000000" || response.data.purchasedate == ""||response.data.payment == ""||response.data.purchase == "" ){
          this.setState({
            loadingpage:false
          })
          return this.context.router.replace('/edit');
        }
        else if(response.data.problem === ""|| response.data.damage === "0.00000000" || response.data.desc === ""){
          this.setState({
            loadingpage:false
          })
          return this.context.router.replace('/edittype');
        }
        else if(response.data.reques === ""){
          this.setState({
            loadingpage:false
          })
          return this.context.router.replace('/editresponse');
        }
        this.setState({
          loadingpage:false
        })
        this.context.router.replace('/submit'); 
        // this.context.router.replace('/stepper');
      })
      .catch(error => {
        console.log(error)
        this.setState({
          loadingpage:false
        })
      });
  }


  split_desc(desc_name){
    var arr_desc = []
    if(desc_name.indexOf('-') != -1){
        arr_desc = desc_name.split('-')
        return <p>arr_desc[0]</p>
    }else{
      return null
    }
  }

  getdata(){
    // let bgColor = this.state.color_black ? "#ffffff" : "rgb(0, 188, 212)"
    var list = this.state.listdata;
    try{
    return list.map((result,index) =><div key={index} className='margin-top-15'>
        {result.status.toLowerCase() === "open"?(
           <div>
             <div className="cardMain" style={{backgroundColor: this.myColor(result.ticketid)}} onClick={() => this.nextEdit(result.ticketid)} >
                <div className="cards-list">
                {/* {result.accountname == "-- ไม่ระบุคู่กรณี --"?(
                  <div>
                  {this.split_desc(result.desc)}
                  </div>
                ):(
                  <p>{result.accountname}</p>
                )} */}
                  <p>{result.accountname}</p>
                  <p>{result.ticketdate}</p>
                  <p><span className="float-left">{result.ticketno}</span><span className="text-right">Status: {result.status}</span></p>
                </div>
             </div>
              {/* <Card onClick={this.nextEdit} >
                <CardHeader
                  title={result.ticketid}
                  subtitle={result.ticketdate}
                />
                <CardText>
                  {result.accountname}
                  <p>Status: {result.status}</p>
                </CardText>
            </Card> */}
         </div>
        ):(
          <div>
            <div className="cardMain">
                <div className="cards-list">
                {/* {result.accountname == "-- ไม่ระบุคู่กรณี --"?(
                  <div>
                  {this.split_desc(result.desc)}
                  </div>
                ):(
                  <p>{result.accountname}</p>
                )} */}
                  <p>{result.accountname}</p>
                  <p>{result.ticketdate}</p>
                  <p><span className="float-left">{result.ticketno}</span><span className="text-right">Status: {result.status}</span></p>
                </div>
             </div>
        </div>
        )
      }
      </div>
      )

    }catch(e){
        console.log("Error Try Catch"+e)
    }
    
  }


render() {
    var listerr = this.state.listdata
    const style = this.state.loadingpage == true?{display:'block'}:{display:'none'};
    return (
      listerr != '' ? (
        <div>
        <div className="container">
          <div className="row">
            <div className="col-12 col-complaint">
              <div className="card card-makecomplaint">
                {/* <div className="card-header">
                    Make New a complaint
                </div> */}
                <div className="card-body">
                  <div className="row">
                    <div className="col-4">
                        <img src="./img/myicon.jpg" className="img-fluid"  />                      
                    </div>
                    <div className="col-8">
                      <h5 className="card-title font-all">ศูนย์พิทักษ์สิทธิผู้บริโภค มูลนิธิเพื่อผู้บริโภค เปิดช่องทางระบบร้องทุกข์ออนไลน์</h5>
                      <Link to="/conditions"><p className="card-text">** <u>เงื่อนไขการร้องทุกข์ออนไลน์</u></p></Link>
                    </div>
                  </div> 
                  <br></br>
                  <br></br> 
                  <Link to={'/stepper'}><button type="button" className="btn btn-outline-primary btn-lg btn-blocks btn-complaint">เริ่มการร้องเรียน</button></Link>
                </div>
              </div>
              <div className="card card-makecomplaint herdercard">
                  ติดตามเรื่องร้องเรียน
              </div>
              {this.getdata()}
              <div  style={style}>
                  <div className=" img-middle" style={{'background-color': 'rgba(0,0,0,.6)'}}>
                     <img className="img-fluid img-loader" src="./img/color-loading.gif" />
                  </div>
				     </div>
            </div>      
          </div>
        </div>      
    </div>
      ):(
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className=" img-middle">
                  <img className="img-fluid img-loader" src="./img/color-loading.gif" />
              </div>
            </div>
          </div>  
        </div>
      )
    );
  }
}
DashboardPage.contextTypes = {

  router: PropTypes.object
}

export default DashboardPage ;