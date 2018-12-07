import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';

import {API_URL} from './global';

module.exports = React.createClass({
    handleAuthorChange: function (e) {
        this.setState({author: e.target.value});
    },
    handleTitleChange: function (e) {
        this.setState({title: e.target.value});
    },
    handlePriceChange: function (e) {
        this.setState({price: e.target.value});
    },
    handleCourseChange: function (e) {
        this.setState({course: e.target.value});
    },
    handleConditionChange: function (e) {
        this.setState({condition: e.target.value});
    },
    handleSubmit: function () {
        console.log('Running Submit Textbook');
        var textbooks = this.state.data;
        var submitComment = {
            title: this.state.title.trim(),
            author: this.state.author.trim(),
            price: this.state.price.trim(),
            course: this.state.course.trim(),
            condition: this.state.condition.trim()
        };
        $.ajax({
            url: API_URL + "/api/newTextbook",
            dataType: 'json',
            type: 'POST',
            data: JSON.stringify(submitComment)
        })
            .done(function (result) {
                this.setState({data: result});
            }.bind(this))
            .fail(function (xhr, status, errorThrown) {
                this.setState({data: textbooks});
                console.error(API_URL, status, errorThrown.toString());
            }.bind(this));
    },
    render: function () {
        return (
            <div>
                <form className="textbookForm">
                    <h1>Comment Edit - {this.props.params.id}</h1>
                    <div>
                        <input
                            type="text"
                            value={this.state.title}
                            onChange={this.handleTitleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={this.state.author}
                            onChange={this.handleAuthorChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={this.state.price}
                            onChange={this.handlePriceChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={this.state.course}
                            onChange={this.handleCourseChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={this.state.condition}
                            onChange={this.handleConditionChange}
                        />
                    </div>
                    <div>
                        <button type="button" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </form>
                <Link to='/'>Cancel</Link>
            </div>
        );
    }
});