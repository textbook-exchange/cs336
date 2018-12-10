import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import textbookBox from './textbookBox';

import '../css/base.css';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={textbookBox}/>
    </Router>
), document.getElementById('content')
);