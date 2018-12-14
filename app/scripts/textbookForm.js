import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';

import '../css/base.css';

import {API_URL} from './global';

module.exports = React.createClass({
    getInitialState: function () {
        return {author: '', title: '', price: '', course: '', condition: 'Like New', photo: null};
    },
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
    fileConditionChange: function (e) {
        this.setState({photo: event.target.files[0]})
    },
    contextTypes: {
        router: React.PropTypes.object
    },
    handleTextbookFormSubmit: function (e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var title = this.state.title.trim();
        var price = this.state.price.trim();
        var course = this.state.course.trim();
        var condition = this.state.condition.trim();
        var seller = this.state.seller;
        if (!title || !author || !price || !course || !condition || !seller) {
            return;
        }
        console.log('Running Submit Textbook');
        var textbooks = this.state.data;
        var submitComment = {
            title: this.state.title.trim(),
            author: this.state.author.trim(),
            price: this.state.price.trim(),
            course: this.state.course.trim(),
            condition: this.state.condition.trim(),
            photo: this.state.photo
        };
        // $.ajax({
        //     url: '/api/photos',
        //     dataType: 'binData',
        //     type: 'POST',
        //     data: this.state.photo
        // })
        //     .done(function (result) {
        //         // this.context.router.push('/');
        //         // this.setState({author: '', title: '', price: '', course: '', condition: ''});
        //
        //     }.bind(this))
        //     .fail(function (xhr, status, errorThrown) {
        //         this.setState({data: textbooks});
        //         console.error(API_URL, status, errorThrown.toString());
        //     }.bind(this));

        $.ajax({
            url: '/api/newTextbook',
            dataType: 'json',
            type: 'POST',
            data: submitComment
        })
            .done(function (result) {
                this.context.router.push('/');

            }.bind(this))
            .fail(function (xhr, status, errorThrown) {
                this.setState({data: textbooks});
                console.error(API_URL, status, errorThrown.toString());
            }.bind(this));

    },
    render: function () {
        return (
            <div className="container">
                <h1>New textbook entry form</h1>
                <form className="textbookForm">
                    <div className="labelobj">
                        <label>
                            Title:
                        <input
                            type="text"
                            value={this.state.title}
                            onChange={this.handleTitleChange}
                        />
                        </label>
                    </div>
                    <div className="labelobj">
                        <label>
                            Author:
                        <input
                            type="text"
                            value={this.state.author}
                            onChange={this.handleAuthorChange}
                        />
                        </label>
                    </div>
                    <div className="labelobj">
                        <label>
                            Price:
                        <input
                            type="text"
                            value={this.state.price}
                            onChange={this.handlePriceChange}
                        />
                        </label>
                    </div>
                    <div className="labelobj">
                        <label>
                            What course is this book for:
                        <input
                            type="text"
                            value={this.state.course}
                            onChange={this.handleCourseChange}
                        />
                        </label>
                    </div>
                    <div className="labelobj">
                        <label>
                            What is the condition of the book:
                            <select value={this.state.condition} onChange={this.handleConditionChange}>
                                <option value="Like new">Like new</option>
                                <option value="Lightly Used">Lightly Used</option>
                                <option value="Used">Used</option>
                                <option value="Trash?">Trash</option>
                            </select>
                        </label>
                    </div>
                    <div className="labelobj">
                        <label>
                            Upload a photo of your book:
                            <input type="file" onChange={this.fileConditionChange}/>
                        </label>
                    </div>
                    <div>
                        <button type="button" onClick={this.handleTextbookFormSubmit} className="labelobj">Sell Textbook</button>
                    </div>
                </form>
                <Link to='/'>
                    <button type="button" className="labelobj">
                        Cancel
                    </button>
                </Link>
            </div>
        );
    }
});
