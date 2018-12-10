import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import textbookBox from './textbookBox';

//Bootstrap table import
import Table1 from './table';

import '../css/base.css';

ReactDOM.render((
        <Router history={browserHistory}>
            <Route path="/" component={Table1}/>
        </Router>
    ), document.getElementById('content')
);
