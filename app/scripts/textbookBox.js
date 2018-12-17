import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router'

import {API_URL, POLL_INTERVAL} from './global';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Mailto from 'react-mailto';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            search: '',
            data: [],
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
                }, {
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
                    )
                }]
            , _isMounted: false
        };
    },
    loadTextbooksFromServer: function () {
        if (this.state._isMounted) {
            $.ajax({
                url: API_URL,
                dataType: 'json',
                cache: false,
            })
                .done(function (result) {
                    if (this.state.search) {
                        var searchResult = result.filter(row => {
                            return row.title.includes(this.state.search) || row.author.includes(this.state.search) || row.course.includes(this.state.search)
                        })
                    }
                    else {
                        var searchResult = result;
                    }
                    this.setState({data: searchResult});
                }.bind(this))
                .fail(function (xhr, status, errorThrown) {
                    console.error(API_URL, status, errorThrown.toString());
                }.bind(this));
        }
    },
    handleTextbookSubmit: function (textbook) {
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
            .done(function (result) {
                this.setState({data: result});
            }.bind(this))
            .fail(function (xhr, status, errorThrown) {
                this.setState({data: textbooks});
                console.error(API_URL, status, errorThrown.toString());
            }.bind(this));
    },
    componentDidMount: function () {
        this.state._isMounted = true;
        this.loadTextbooksFromServer();
        setInterval(this.loadTextbooksFromServer, POLL_INTERVAL);
    },
    componentWillUnmount: function () {
        // Reset the isMounted flag so that the loadTextbooksFromServer callback
        // stops requesting state updates when the textbookList has been unmounted.
        // This switch is optional, but it gets rid of the warning triggered by
        // setting state on an unmounted component.
        // See https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
        this.state._isMounted = false;
    },
    handleSearchBarChange: function (e) {
        e.preventDefault();
        this.setState({search: e.target.value});

    },
    render: function () {
        return (
            <div>
                {/*Title/Header*/}
                <h1>Textbook Exchange</h1>

                {/*Sell Textbook Button*/}
                <div className="button-top-right">
                    <Link to={'/textbookForm'}>
                        <button type="button" className="sell-button">
                            Sell a Textbook
                        </button>
                    </Link>
                </div>

                {/*Search Bar*/}
                <div className="searchbar">
                    Search Title or Course or Author: <input value={this.state.search}
                                                             onChange={this.handleSearchBarChange}/>
                </div>

                {/*ReactTable*/}
                <ReactTable data={this.state.data} columns={this.state.columns} defaultPageSize={10}/>
            </div>
        );
    }
});
