import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';


import '../css/base.css';

import {API_URL} from './global';

module.exports = React.createClass({
    getInitialState: function () {
        return {author: '', title: '', price: '', course: '', condition: 'Like New', photo: '', email: '', status: ''};
    },
    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
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
        this.getBase64(e.target.files[0], (result) => {
            this.setState({photo: result})
        });
    },
    handleCancelButton: function (e) {
        this.context.router.push('/');
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
        // var user = this.props.location.state;
        if (!title || !author || !price || !course || !condition) {
            return;
        }
        console.log('Testing for handleTextbookFormSubmit');
        console.log('this.props.location.state', this.props.location.state.user.email);
        var email = this.props.location.state.user.email.trim();
        var userName = this.props.location.state.user.name.trim();
        var textbooks = this.state.data;
        var submitTextbook = {
            title: title,
            author: author,
            price: price,
            course: course,
            condition: condition,
            photo: this.state.photo.trim(),
            email: email,
            status: "available"
        }
        console.log('submitting textbook through ajax', submitTextbook);

        $.ajax({
                url: '/api/newTextbook',
                dataType: 'json',
                type: 'POST',
                data: submitTextbook
            })
                .done(function (result) {
                    console.log('posted', submitTextbook);
                    this.context.router.push('/');
                }.bind(this))
                .fail(function (xhr, status, errorThrown) {
                    this.setState({data: textbooks});
                    console.error(API_URL, status, errorThrown.toString());
                }.bind(this)); 
    },
    handleReturnButton: function (e) {
        
    },
    render: function () {
        return (
            <div className="container">
                <h1>Enter a New Textbook</h1>
                <form className="textbookForm">
                    <div className="obj-center">
                        <label>
                            Title:
                        <input
                            type="text"
                            value={this.state.title}
                            onChange={this.handleTitleChange}
                        />
                        </label>
                    </div>
                    <div className="obj-center">
                        <label>
                            Author:
                        <input
                            type="text"
                            value={this.state.author}
                            onChange={this.handleAuthorChange}
                        />
                        </label>
                    </div>
                    <div className="obj-center">
                        <label>
                            Price:
                        <input
                            type="text"
                            value={this.state.price}
                            onChange={this.handlePriceChange}
                        />
                        </label>
                    </div>
                    <div className="obj-center">
                        <label>
                            Course: 
                        <input
                            type="text"
                            value={this.state.course}
                            onChange={this.handleCourseChange}
                        />
                        </label>
                    </div>
                    <div className="obj-center">
                        <label>
                            Condition: 
                            <select value={this.state.condition} onChange={this.handleConditionChange}>
                                <option value="Great">Great</option>
                                <option value="Good">Good</option>
                                <option value="Okay">Okay</option>
                                <option value="Bad">Bad</option>
                            </select>
                        </label>
                    </div>
                    <div className="obj-center">
                        <label>
                            Photo: 
                            <input type="file" onChange={this.fileConditionChange}/>
                        </label>
                        <img style={{width: 50, height: 50}} src={this.state.photo.toString()}/>
                    </div>
                    <div className="obj-center">
                        <button type="button" onClick={this.handleTextbookFormSubmit}>Sell Textbook</button>
                    </div>
                </form>
                <div className="obj-center">
                    <Link to='/'>
                        <button type="button" onClick={this.handleCancelButton}>
                            Cancel
                        </button>
                    </Link>

                    <Link to={{
                        pathname: '/',
                        state: { _hasUser: true,
                            user: {
                                email: email,
                                name: userName,
                                picture: this.props.location.state.user.picture.trim()
                            }
                        }
                    }} >
                        <button type="button">
                            Return to main
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
});
