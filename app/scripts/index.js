import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import TextbookBox from './textbookBox';
import TextbookForm from './textbookForm';
// import Nav from './nav';

import '../css/base.css';

ReactDOM.render((
        <Router history={browserHistory}>
            {/* <IndexRoute component={Home} /> */}
            <Route path="/" component={TextbookBox}>
                {/* <Route path="/nav" component={Nav} /> */}
                {/* <Route path="/login" component={Login} /> */}
                <Route path="/sell" component={TextbookForm}/>
            </Route>
        </Router>
    ), document.getElementById('content')
);
