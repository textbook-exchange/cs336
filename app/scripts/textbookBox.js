import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router';

import TextbookList from './textbookList';
import { API_URL, POLL_INTERVAL } from './global';

module.exports = React.createClass({
    getInitialState: function() {
        return {data: [], _isMounted: false};
    },
    loadTextbooksFromServer: function() {
        if (this.state._isMounted) {
            $.ajax({
                url: API_URL,
                dataType: 'json',
                cache: false,
            })
                .done(function (result) {
                    this.setState({data: result});
                }.bind(this))
                .fail(function (xhr, status, errorThrown) {
                    console.error(API_URL, status, errorThrown.toString());
                }.bind(this));
        }
    },
    handleTextbookSubmit: function(textbook) {
        var textbooks = this.state.data;
        textbook.id = Date.now();
        var newTextbooks = textbooks.concat([textbook]);
        this.setState({data: newTextbooks});
        $.ajax({
            url: API_URL,
            dataType: 'json',
            type: 'POST',
            data: textbook
        })
         .done(function(result){
             this.setState({data: result});
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             this.setState({data: textbooks});
             console.error(API_URL, status, errorThrown.toString());
         }.bind(this));
    },
    componentDidMount: function() {
        this.state._isMounted = true;
        this.loadTextbooksFromServer();
        setInterval(this.loadTextbooksFromServer, POLL_INTERVAL);
    },
    componentWillUnmount: function() {
        // Reset the isMounted flag so that the loadTextbooksFromServer callback
        // stops requesting state updates when the textbookList has been unmounted.
        // This switch is optional, but it gets rid of the warning triggered by
        // setting state on an unmounted component.
        // See https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
        this.state._isMounted = false;
    },
    render: function() {
        return (
            <div className="textbookBox">
                <h1>Textbooks</h1>
                <TextbookList data={this.state.data} />

                <Link to={'/textbookForm'}>
                    <button type="button">
                        Create a new textbook (kevin)
                    </button>
                </Link>
                <Link to={'/sell'}>Login, link created by judy</Link>
            </div>
        );
    }
});
