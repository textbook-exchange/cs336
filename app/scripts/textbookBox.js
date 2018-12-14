import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router';

import Facebook from '../components/Facebook';
import Nav from './nav';
import { API_URL, POLL_INTERVAL } from './global';

module.exports = React.createClass({
    getInitialState: function() {
        return {data: [], user: [], _hasUser: false, _isMounted: false};
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
    handleAuthentication: function(data) {
        this.setState(
            { _hasUser: true,
                user: data
            });
        console.log(this.state.user);
        console.log(this.state._hasUser);
        this.loadTextbooksFromServer();
    },
    render: function() {
        let main;
        if (this.state._hasUser) {
            main =(
                <div>
                    <h1>This is main for Textbook Exchange when there is a user</h1>
                    <Link to={'/textbookForm'}>
                        <button type="button">
                            Create a new textbook (kevin)
                        </button>
                    </Link>
                    
                </div>
            );
        } else {
            main = <Facebook onAuthenticated={this.handleAuthentication} />;
        }
        return (
            <div>
                <Nav />
                {main}
            </div>
        );
    }
});
