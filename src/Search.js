import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
// import JSONP              from 'jsonp';
import Listsearch from './ListSerach.js';
import axios from "axios";
// import utf8  from 'utf8';

/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */

const googleAutoSuggestURL = `
//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=`;


const searchURL = window.env.API_URL+"?function=GetAccountListByAccountName&accountname="

var acclist = [];
var idlist = [];
export default class AutoCompleteExampleSimple extends Component {

  constructor(props) {
    super(props);

    this.state = {
        dataSource : [],
        inputValue : '',
        result : '',
        condition : false,
        idsearch : '',
        errors: {}
    };
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.onNewRequest = this.onNewRequest.bind(this);
}

  onUpdateInput(inputValue) {
    const self = this;
    this.setState({
      inputValue: inputValue
    }, function() {
      self.performSearch();
    });
  }

  performSearch() {
    const
       self = this,
       url  = googleAutoSuggestURL + this.state.inputValue;
    let retrievedSearchTerms;

    var errors = Object.assign({}, this.state.errors);
    errors = {}

     if(this.state.inputValue.length%3==0 && this.state.inputValue.length >= 3 && this.state.inputValue !== '') {
      axios
      .get(searchURL+ this.state.inputValue,{
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"
        }
      })
      .then(response => {
        if(JSON.stringify(response.status) != '200'){
          errors.summary =  "Backend fail :"+response.status;
        this.setState({
          errors
        });


        }else{
            acclist = []
            idlist = []
          if(Array.isArray(response.data) == true)
          {
            var resarray = response.data;
            resarray.map((result,index) => {
                acclist.push(result.accountname);
                idlist.push(result.id);
            })
              if(acclist.length != 0){
                this.setState({
                dataSource: acclist
                });
    
              }
              errors.summary = '';
              this.setState({
                errors
              });
  
           
          }else{
            console.log("Response"+JSON.stringify(response)),
            console.log('Format response worng')
          }

        }
      })
      .catch(error => {
        console.log(error)
        errors.summary =  "Backend fail";
        this.setState({
          errors
        });

      })
     }
   }

   onNewRequest(searchTerm) {
    this.setState({
      errors:{}
    });
    const idsearchTerm = idlist[acclist.indexOf(searchTerm)]
    this.setState({
        result: searchTerm,
        idsearch : idsearchTerm,
        condition : true
     })
  }
 


  render() {
    const {result} = this.state;
    const condition = this.state.condition;
    const {idsearch} = this.state;
    const {errors} = this.state;
    return (
      <div>
          <div className="text-center">        
          <div className="padding-five">
            <h2>Who do you have a complaint about?</h2>
          </div>
          {errors.summary && <p className="error-message">{errors.summary}</p>}
          <div className="padding-five">
            <AutoComplete
              hintText= "Search..."
              // floatingLabelText="Type 'peah', fuzzy search"
              filter={AutoComplete.fuzzyFilter}
              dataSource={this.state.dataSource}
              onUpdateInput = {this.onUpdateInput}
              onNewRequest  ={this.onNewRequest} 
              popoverProps={{
                style: {
                  //bottom: 0,
                  overflowY: 'auto'
                }
              }}
              listStyle ={{maxHeight: 150,overflow : 'auto'}}
            />
            
            {condition ? (<Listsearch result={result} 
            idsearch = {idsearch}
            fieldValues={this.props.fieldValues} 
            saveValues={this.props.saveValues}
            nextStep={this.props.nextStep}
            previousStep={this.props.previousStep}/>) :null }
          </div>
            <div className="padding-five">
              <p>Can't find who you want to make a complaint about?</p>
            </div>
          </div>
      </div>
    );
  }
}