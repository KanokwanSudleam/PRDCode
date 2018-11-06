import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { Grid, Image } from 'semantic-ui-react'
import Category from './Category.js';
import CategoryType from './CategoryType.js';
import CategoryProblem from './CategoryProblem.js';
import { ListGroup,ListGroupItem } from 'react-bootstrap';
import axios from 'axios';
import { Affix, Button } from 'antd';

let piccategory = {
	food: [{
		name: 'Food',
		pic: './img/icon-food.jpg'
	},
	{
		name: 'Drink',
		pic: './img/icon-home.jpg'
	},
	{
		name: 'Healthy',
		pic: './img/icon-medical.jpg'
	}],
	shoping: ['./img/icon-produc.jpg']
}


class Catalog extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.saveAndContinue = this.saveAndContinue.bind(this);
		this.showCategory = this.showCategory.bind(this);
		this.GetSubCategoryByMainCategory = this.GetSubCategoryByMainCategory.bind(this);
		this.subtwoCilck = this.subtwoCilck.bind(this);
		this.getStep = this.getStep.bind(this);
		this.saveAndNext = this.saveAndNext.bind(this);
		this.getDisplay = this.getDisplay.bind(this);
		this.clicksub2 = this.clicksub2.bind(this);
		this.BackStep = this.BackStep.bind(this);
		this.myColor = this.myColor.bind(this);
		this.css = this.css.bind(this);
		this.sub2Click = this.sub2Click.bind(this);
		this.GetSubCategoryBack = this.GetSubCategoryBack.bind(this);
		this.GetSubCategoryProblem = this.GetSubCategoryProblem.bind(this);
		this.checkDisable = this.checkDisable.bind(this);
		this.checkDisableProblem = this.checkDisableProblem.bind(this);
		this.state = {
			last : false,
			nextValue : 0,
			namePic: '',
			nCategory: this.props.fieldValues.category,
			Category_name: '',
			sourcefield: '',
			targetfield: '',
			sub_category: '',
			show_sub: false,
			show_subtwo: false,
			active: null,
			checkpic : null,
			check : false,
			checkProblem : false,
			checkType : false,
			loading:false
		}
	}

	BackStep(){
		const {last,nextValue} = this.state;
		// console.log("{stepBackBefore}",this.state.nextValue)
		if(nextValue == 2){
			this.GetSubCategoryBack(this.props.fieldValues.subcate1,"cf_753", "cf_755")
		}
		else if (nextValue == 1) {
		  this.setState({
				nextValue: nextValue-1,
				last: false
			});
		}
		// console.log("{stepBack}",this.state.nextValue)
	};

	myColor(name){
		if (this.state.active === name) {
			// this.setState({
			// 	check : true
			// });
			return "rgb(0, 188, 212)";
		}else{
			// this.setState({
			// 	check : false
			// });
			return "#ffffff";
		}
	}

	css(checkpic){
		if (this.state.checkpic === checkpic) {
			return "2px solid rgb(0, 188, 212)";
		  }
		  return null;
	}

	checkDisable(){
		if (this.state.check === false) {
			return false;
		  }
		  return true;
	}

	checkDisableProblem(){
		if (this.state.checkProblem === false) {
			return false;
		  }
		  return true;
	}



	handleClick(e) {
		if (this.state.checkpic === e.target.dataset.name) {
			this.setState({checkpic : null,check : false})
		} else {
			this.setState({checkpic : e.target.dataset.name,check : true})
		}
		const fieldValues = this.props.fieldValues;
		fieldValues.subcate1 = e.target.dataset.name;
		// console.log("Sub 1" + e.target.dataset.name)
		this.setState({
			fieldValues,
			Category_name: e.target.dataset.name
		});

		
	}

	sub2Click(e) {
		if (this.state.checkpic === e.target.dataset.name) {
			this.setState({checkpic : null})
		} else {
			this.setState({checkpic : e.target.dataset.name})
		}
		const fieldValues = this.props.fieldValues;
		fieldValues.subcate2 = e.target.dataset.name;
		// console.log("Sub 2" + e.target.dataset.name)
		this.setState({
			fieldValues
		});		
	}

	GetSubCategoryByMainCategory(category, sourcefield, targetfield) {

		let nextValue = this.state.nextValue;
		var getURL = window.env.API_URL+"?function=GetSubCategoryByMainCategory&category="+category+"&sourcefield="+sourcefield+"&targetfield="+targetfield;
	  
		  console.log("Save URL"+getURL)
	  
		  axios
			.get(getURL)
			.then(response => {
			  if(response.data === ""){

				this.setState({last: false,loading:false});
			    this.props.nextStep()
			  }else{
			  return this.setState({
					sub_category: response.data,
					nextValue: nextValue+1,
					last: nextValue >= 1,
					loading:false
				});
				}
			})
			.catch(error => {
			  console.log(error)
		
			});
		// console.log("fild "+category, sourcefield, targetfield)
	}

	GetSubCategoryBack(category, sourcefield, targetfield) {

		let nextValue = this.state.nextValue;
		var getURL = window.env.API_URL+"?function=GetSubCategoryByMainCategory&category="+category+"&sourcefield="+sourcefield+"&targetfield="+targetfield;	  	  
		  axios
			.get(getURL)
			.then(response => {
			//   console.log("Save res"+JSON.stringify(response))
			 
			  return this.setState({
					sub_category: response.data,
					nextValue: nextValue-1,
					last: false
				});
			})
			.catch(error => {
			  console.log(error)
		
			});
		// console.log("fildBack "+category, sourcefield, targetfield)
	}

	GetSubCategoryProblem(category, sourcefield, targetfield) {
		const fieldValues = this.props.fieldValues;
		let nextValue = this.state.nextValue;
		var getURL = window.env.API_URL+"?function=GetSubCategoryByMainCategory&category="+category+"&sourcefield="+sourcefield+"&targetfield="+targetfield;
	  
		  console.log("Save URL"+getURL)
	  
		  axios
			.get(getURL)
			.then(response => {
			//   console.log("Save res"+JSON.stringify(response))
			  fieldValues.problem = JSON.stringify(response.data);
			  return this.setState({
				  fieldValues
			  });	
			  
			})
			.catch(error => {
			  console.log(error)
		
			});
		// console.log("fildBack "+category, sourcefield, targetfield)
	}

	getDisplay(sub){
		// console.log("getDisPlay")		
		// console.log("sub_category"+sub)

		try{
			return sub.map((result,index) =><div key={index}>
				<ListGroup>
					<ListGroupItem className="text-left" style={{backgroundColor: this.myColor(result)}} id="sub2" value={result} onClick={this.clicksub2}>{result}</ListGroupItem>
				</ListGroup>
			</div>
			)

		}catch(e){
			console.log("Error Try Catch"+e)
		}


	}
	clicksub2(event){
		if (this.state.active === event.target.value) {
			this.setState({active : null,checkProblem: false})
		  } else {
			this.setState({active : event.target.value,checkProblem : true})
		  }
		// console.log("event"+event)
		var next = this.state.nextValue;
		if(next == 1){
		var id = event.target.id;
		const fieldValues = this.props.fieldValues;
		fieldValues.subcate2 = event.target.value;
		fieldValues.title = this.props.fieldValues.accountname + event.target.value;
		// console.log("event.target.value sub2"+event.target.value)
		this.setState({
			fieldValues
		});
		}
		if(next == 2){
			var id = event.target.id;
			const fieldValues = this.props.fieldValues;
			fieldValues.subcate3 = event.target.value;
			// console.log("event.target.value sub3"+event.target.value)
			this.setState({
				fieldValues
			});	
		}

	}
	subtwoCilck(e) {
		this.setState({
			sourcefield: 'category',
			targetfield: 'cf_1516',
			show_subtwo: true
		});

		this.GetSubCategoryByMainCategory(this.state.Category_name, this.state.sourcefield, this.state.targetfield);
	}


	saveAndContinue(e) {
		e.preventDefault()
		this.setState({
			loading:true
		})
		var data = {
			type: this.state.namePic
		}

		this.props.saveValues(data)
		setTimeout(() => {
			this.setState({ loading:false });
		  }, 3000);
		setTimeout(() => {
			this.setState({nextValue: 0, last: false});	
			this.props.nextStep()
		  }, 2000);
	}

	saveAndNext(e) {
		e.preventDefault()
		let nextValue = this.state.nextValue;
		console.log("NextValue"+ nextValue)
		console.log("sub2"+ this.props.fieldValues.subcate2)
		this.setState({
			loading:true
		})
		switch (nextValue) {
			case 0:
				this.setState({check: false});
				this.GetSubCategoryByMainCategory(this.props.fieldValues.subcate1, "cf_753", "cf_755");
				break;
			case 1:
				this.setState({checkProblem: false});				
				this.GetSubCategoryByMainCategory(this.props.fieldValues.subcate2, "cf_755", "cf_757");
				break;
		}

	}

	showCategory() {

		switch (this.state.nCategory) {
			case 'food':
				return piccategory.food.map((category) => <Grid.Column>
					<div class="ui blue ribbon label">
						<i class="hotel icon"></i> {category.name}
					</div>
					<Image className='image' key={category.name} src={category.pic} centered size='small' data-name={category.name} responsive='true' onClick={this.handleClick} /></Grid.Column>);

			case 'shoping':
				return piccategory.shoping.map((category) => <Image.Group size='tiny'><Col className='bg-img' md={4} ><Image className='image' key={category} src={category} data-name={category} responsive='true' onClick={this.handleClick} /></Col> </Image.Group>);
		}
	}
	

	

	getStep(nextValue){
		console.log("nextStep"+ nextValue);
		const styleloading = this.state.loading == true?{display:'block'}:{display:'none'};
		switch (nextValue) {
			case 0:
			return 	<div>
				<p>
					{/* <div className="fixed-bar" id="backnext"> */}
					<Affix>
						<div className="text-center">
							<div className="row">
								<div className="col-3">
								{/* <span> */}
								<button type="submit" className="btn btnback float-left" onClick={this.props.previousStep}><i className="fa fa-angle-left"></i> ย้อนหลัง</button>
								{/* </span> */}
								</div>
								<div className="col-6">
								<span >
									(2/4) ระบุหมวดเรื่องร้องเรียน 
								</span>
								</div>
								<div className="col-3">
								{/* <span> */}
									{this.checkDisable()?(
											<button type="submit" className="btn btn-primary float-right " onClick={this.saveAndNext}>ถัดไป <i className="fa fa-angle-right"></i></button>									
										):(
											<button type="submit" className="btn btn-primary float-right disabled" aria-disabled='ture'>ถัดไป <i className="fa fa-angle-right"></i></button>										
										)}
								
								{/* </span> */}
								</div>
							</div>
						</div>
					</Affix>
					{/* </div> */}
				</p>
				<br></br>
				<br></br>
				<Category field={this.props.fieldValues} change={this.handleClick} css={this.css} />
				<div  style={styleloading}>
					<div className=" img-middle" style={{'background-color': 'rgba(0,0,0,.6)'}}>
                  		<img className="img-fluid img-loader" src="./img/color-loading.gif" />
              		</div>
				</div>
				</div>
			
			case 1:
			return 	<div>
					<p>
						<Affix>
							<div className="z-index">
								<div className="row">
									<div className="col-3">
										{/* <span> */}
											<button type="button" className="btn btnback float-left"  onClick={this.BackStep}><i className="fa fa-angle-left"></i> ย้อนหลัง</button>
										{/* </span> */}
									</div>
									<div className="col-6 text-center">
									<span >
										(2/4) ระบุหมวดเรื่องร้องเรียน 
									</span>
									</div>
									<div className="col-3">
									{/* <span> */}
										{/* <button type="submit" className="btn btn-primary float-right" onClick={this.saveAndNext}>Next <i className="fa fa-angle-right"></i></button> */}
										
										{this.checkDisableProblem()?(
											<button type="submit" className="btn btn-primary float-right" onClick={this.saveAndNext}>ถัดไป <i className="fa fa-angle-right"></i></button>
											):(
											<button type="submit" className="btn btn-primary float-right disabled" aria-disabled='ture' >ถัดไป <i className="fa fa-angle-right"></i></button>
											)}
										
									{/* </span> */}
									</div>
								</div>
							</div>
						</Affix>
					<br></br>
					</p>
					<CategoryType field={this.props.fieldValues} change={this.handleClick} TypeCategory={this.getDisplay} sub={this.state.sub_category}/>
					<div  style={styleloading}>
						 <div className=" img-middle" style={{'background-color': 'rgba(0,0,0,.6)'}}>
                  			<img className="img-fluid img-loader" src="./img/color-loading.gif" />
              			</div>
					</div>
					</div>
					
			default:
			return "fail"
		}
		


	}


	render() {
		const { namePic } = this.state;
		let { nCategory } = this.state;
		let next = this.state.nextValue;
		let last = this.state.last;
		const { show_sub ,show_subtwo} = this.state;
		const stylenext = this.state.loading == true ? {display:'block'}:{display:'none'};
		return (

				<div>	
					{last ?(	
						<div>
						<p>
							<Affix>
								<div className="z-index text-center">
								<div className="row">
									<div className="col-3">
									
										<button type="submit" className="btn btnback float-left" onClick={this.BackStep}><i className="fa fa-angle-left"></i> ย้อนหลัง</button>
									
									</div>
									<div className="col-6">
									<span>
										(2/4) ระบุหมวดเรื่องร้องเรียน
									</span>									
									</div>
									<div className="col-3">
									
									{this.checkDisableProblem()?(
										<button type="submit" className="btn btn-primary float-right"  onClick={this.saveAndContinue}>ถัดไป <i className="fa fa-angle-right"></i></button>
										
									):(
										<button type="submit" className="btn btn-primary float-right disabled"  aria-disabled='ture'>ถัดไป <i className="fa fa-angle-right"></i></button>	
									)
									}
									
									</div>
								</div>
								</div>
							</Affix>
						<br></br>
						<br></br>
						</p>
						<CategoryProblem field={this.props.fieldValues} TypeCategory={this.getDisplay} sub={this.state.sub_category}/>
						<div  style={stylenext}>
						 <div className=" img-middle" style={{'background-color': 'rgba(0,0,0,.6)'}}>
                  			<img className="img-fluid img-loader" src="./img/color-loading.gif" />
              			</div>
						</div>
						</div>
					):(
						<div>
						
						{this.getStep(next)}
						</div>
					)}
				</div>
		);
	}

}
export default Catalog;
