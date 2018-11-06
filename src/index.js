// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './loader.css';
//import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import  {browserHistory,Router}  from 'react-router';
import routes from './routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


ReactDOM.render((<MuiThemeProvider muiTheme={getMuiTheme()}><Router history={browserHistory} routes={routes}/></MuiThemeProvider>),
	 document.getElementById('root'));
// registerServiceWorker();
