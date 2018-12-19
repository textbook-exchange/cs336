//Import required libraries needed for React and React Router
import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router'

//Import React Table, and MailTo libraries to use the Table and Email features
import {API_URL, POLL_INTERVAL} from './global';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Mailto from 'react-mailto';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            //This is used for the search bar feature that filters the React Table
            search: '',
            //This will contain the data extracted from the MongoDB
            data: [],
            //Configuration for the React Table to determine the specific columns and which data is accessed
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
                },{
                    Header: 'name',
                    accessor: 'name',
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
    //Retrieve the data from the MongoDB (the server continuously requests data from the DB)
    loadTextbooksFromServer: function () {
        if (this.state._isMounted) {
            $.ajax({
                url: API_URL,
                dataType: 'json',
                cache: false,
            })
                .done(function (result) {
                    //Search bar feature configuration to filter the data and change the state.search
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
    //The server will POST the data when the user submits the completed form for the MongoDB to receive
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
    // This will handle the search bar's  state changes for the state.search
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
