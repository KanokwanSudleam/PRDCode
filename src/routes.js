// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router';

import App from './App';
// import About from './about';
// import Login from './login';
import Signup from './Register.js';
import NotFound from './Notfound';
import LoginPage from './Login.js';
import Username from './modules/Username.js';
import ContactID from './modules/ContactID.js';
import FieldValues from './modules/FieldValues.js'
import FacebookLogin from './modules/FacebookLogin.js'
import DashboardPage from './DashboardPage.js';
import EditPage from './EditPage.js';
import EditType from './EditType.js';
import EditResponse from './EditResponse.js';
import SubmitPage from './SubmitPage.js';
import Step from './step';
import Conditions from './Conditions.js';
import Contact from './Contact.js';
import Channel from './Channel.js';

const routes = {
    // base component (wrapper for the whole application).
    component: App,
    childRoutes: [
  
      {
        path: '/',
        getComponent: (location, callback) => {
            if (Username.isUserHave()) {
            callback(null, DashboardPage);
          } else {
            callback(null, LoginPage);
          }
        }
      },
  
      {
        path: '/login',
        component: LoginPage
      },
  
      {
        path: '/signup',
        component: Signup
      },
      {
        path: '/stepper',
        component:  Step
      },
      {
        path: '/edit',
        component: EditPage
      },
      {
        path: '/edittype',
        component: EditType
      },
      {
        path: '/editresponse',
        component: EditResponse
      },
      {
        path: '/conditions',
        component: Conditions
      },
      {
        path: '/channel',
        component: Channel
      },
      {
        path: '/contact',
        component: Contact
      },
      {
        path: '/submit',
        component: SubmitPage
      },
      {
        path: '/logout',
        onEnter: (nextState, replace) => {
  
         
          Username.deUsername();
          ContactID.deContactID();
          FieldValues.deFieldValues();
          document.removeEventListener('FBObjectReady',FacebookLogin.RemoveEvent());
  
          // change the current URL to /
          replace('/');
        }
      }
  
    ]
  };
  export default routes;