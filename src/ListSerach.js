import React, {Component} from 'react';
// import RaisedButton from 'material-ui/RaisedButton';

class listsearch extends Component{
	constructor(props) {
    	super(props);
    	this.saveAndContinue = this.saveAndContinue.bind(this);

    	// this.state = {
     // 		mode:''
    	// }
  	}
  	selectMode(e,mode) {
    this.setState({ 
    	mode: mode
    });
    console.log("Mode",mode)
	}
	// onclick={this.selectMode} data-mode={result}

	saveAndContinue(e) {
    e.preventDefault()

    // Get values via this.refs
    var data = {
		accountid: this.props.idsearch,
		accountname : this.props.result
    }

    this.props.saveValues(data)
    this.props.nextStep()
  }


	render(){
		let {result} = this.props
		console.log({result})
		return(

			<div>
				<div>
				<label className="padding-five"><h1>{result}</h1></label>
				<input type="hidden" ref="name" defaultValue={result} />
				 {/* <RaisedButton type="submit" label="Serach" primary onClick={ this.saveAndContinue } /> */}
				 <div className="padding-five">
					<button type="submit" className="btn btn-primary" onClick={ this.saveAndContinue }>Search</button>
				</div>	
				</div>
			</div>
		)
	}

}
export default listsearch;