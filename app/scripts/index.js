import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import TextbookBox from './textbookBox';
import TextbookForm from './textbookForm';

import '../css/base.css';

ReactDOM.render((
        <Router history={browserHistory}>
            <Route path="/" component={TextbookBox}/>
            <Route path="/textbookForm" component={TextbookForm}/>
        </Router>
    ), document.getElementById('content')
);
