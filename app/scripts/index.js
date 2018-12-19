//Import required libraries needed for React and React Router
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

//Import the components required to render on the web application
import TextbookBox from './textbookBox';
import FacebookSeller from './facebookSeller';
import TextbookForm from './textbookForm';

//Use React Router to display the components
ReactDOM.render((
        <Router history={browserHistory}>
            <Route path="/" component={TextbookBox}/>
            <Route path="/sell" component={FacebookSeller}/>
            <Route path="/textbookForm" component={TextbookForm}/>
        </Router>
    ), document.getElementById('content')
);
