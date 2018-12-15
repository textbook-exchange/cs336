import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router'

import Facebook from './Facebook';
import { API_URL, POLL_INTERVAL } from './global';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Mailto from 'react-mailto';
// import { start } from 'repl';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            search: '',
            data: [],
            user: '',
            columns: [
                {
                    Header: 'photo',
                    Cell: (row) => {
                        return <div><img height={50} src={row.original.photo}/></div>
                    },
                }, {
                    Header: 'author',
                    accessor: 'author'
                },  {
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
                }, {
                    Header: 'email',
                    accessor: 'email',
                    Cell: e => <Mailto email={e.value} obfuscate={false}> {e.value} </Mailto>
                },{
                    Header: 'status',
                    accessor: 'status',
                    Cell: row => (
                    <span>
                    <span style={{
                    color: row.value === 'sold' ? '#ff2e00'
                            : '#57d500',
                        transition: 'all .3s ease'
                }}>
                &#x25cf;
                    </span> {
                        row.value === 'sold' ? 'Sold'
                            : 'Available'
                    }
                    </span>
                )}]
                , _isMounted: false
                , _hasUser: false //if the user is logged in. if true, seller Email will be populated
        };
    },
    loadTextbooksFromServer: function () {
        $.ajax({
            url: API_URL,
            dataType: 'json',
            cache: false,
        })
            .done(function (result) {
                console.log('load textbook from server, this.state.data should have email', result);
                if (this.state.search) {
                    var searchResult = result.filter(row => {
                        return row.title.includes(this.state.search) || row.author.includes(this.state.search) || row.course.includes(this.state.search)
                    })
                }
                else{
                    var searchResult = result;
                }
                this.setState({data: searchResult});
            }.bind(this))
            .fail(function (xhr, status, errorThrown) {
                console.error(API_URL, status, errorThrown.toString());
            }.bind(this));
    },
    handleAuthentication: function(data) {
        console.log('box received user data as:', data);
        this.setState({ _hasUser: true,
            user: {
                email: data.email,
                name: data.name,
                picture: data.picture
            }
        });
        console.log('afer setting state from handle authentication');
        this.loadTextbooksFromServer();
        setInterval(this.loadTextbooksFromServer, POLL_INTERVAL);
    },
    componentDidMount: function () {
        //grabbing of external data
        this.state._isMounted = true;
        // if (this.state._hasUser) {
        //     tableFetch = setInterval(this.loadTextbooksFromServer, POLL_INTERVAL);  
        // }
    },
    componentWillUnmount: function () {
        // Reset the isMounted flag so that the loadTextbooksFromServer callback
        // stops requesting state updates when the textbookList has been unmounted.
        // This switch is optional, but it gets rid of the warning triggered by
        // setting state on an unmounted component.
        // See https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
        this.state._isMounted = false;
    },
    componentWillUpdate: function () {
        console.log('fb authentication state set with user info', this.state.user);
    },
    handleSearchBarChange: function(e) {
        e.preventDefault();
        this.setState({search: e.target.value});
    },
    render: function() {
        var main;
        if (this.state._hasUser) {
            main = (
                <div>
                <div className="obj-center">
                    <Link to='/'>
                        <button type="button">
                            Cancel
                        </button>
                    </Link>
    
    
                    <Link to={{
                        pathname: '/textbookForm',
                        state: { user: this.state.user }
                    }}>
                        <button type="button">
                            Sell my textbook
                        </button>
                    </Link>
    
                    <Link to='/box'>
                        <button type="button">
                            textbookBox
                        </button>
                    </Link>
                </div>
                    <div>
                    <h2>Textbooks</h2>
                    Search: <input value={this.state.search} onChange={this.handleSearchBarChange}/>
                    <ReactTable data={this.state.data} columns={this.state.columns} defaultPageSize={10}/>
                    </div>
                </div>
            );
        }
        let userStatus = (
            <div>
                <div className="obj-center">
                    <Facebook onAuthenticated={this.handleAuthentication} />
                </div>
            </div>
        );
        return (
            <div>
                <h1>Textbook Exchange</h1>
                {userStatus}
                {main}
            </div>
        );
    }
});
