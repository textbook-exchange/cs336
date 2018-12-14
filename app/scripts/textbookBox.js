import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router';

import { API_URL, POLL_INTERVAL } from './global';
import ReactTable from "react-table";
import 'react-table/react-table.css'

module.exports = React.createClass({
    getInitialState: function() {
        return {
            data: [],
            columns: [
                {
                    Header: 'author',
                    accessor: 'author' // String-based value accessors!
                }, {
                    Header: 'title',
                    accessor: 'title',
                }, {
                    Header: 'price',
                    accessor: 'price',
                }, {
                    Header: 'course',
                    accessor: 'course',
                }, {
                    Header: 'condition',
                    accessor: 'condition',
                    Cell: e =><a href={e.value}> {e.value} </a>
                }
            ]
            , _isMounted: false};
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
            <div>
                <h1>Textbooks</h1>
                <ReactTable data={this.state.data} columns={this.state.columns}/>
                <Link to={'/textbookForm'}>
                    <button type="button">
                        Create a new textbook (kevin)
                    </button>
                </Link>
                <Link to={'/sell'}>
                    <button type="button">
                        Login, link created by judy
                    </button>
                </Link>
        </div>
        );
    }
});
