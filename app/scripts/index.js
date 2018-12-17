import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import TextbookBox from './textbookBox';
import FacebookSeller from './facebookSeller';
import TextbookForm from './textbookForm';

ReactDOM.render((
        <Router history={browserHistory}>
            <Route path="/" component={TextbookBox}/>
            <Route path="/sell" component={FacebookSeller}/>
            <Route path="/textbookForm" component={TextbookForm}/>
        </Router>
    ), document.getElementById('content')
);
