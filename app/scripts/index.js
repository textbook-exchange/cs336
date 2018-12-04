import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import TextbookBox from './textbookBox';
import TextbookEdit from './textbookEdit';

import '../css/base.css';

ReactDOM.render((
        <Router history={browserHistory}>
            <Route path="/" component={TextbookBox}/>
            <Route path="/:id" component={TextbookEdit}/>
        </Router>
    ), document.getElementById('content')
);
