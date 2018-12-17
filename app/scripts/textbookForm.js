import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';

import '../css/base.css';

import {API_URL} from './global';
import FacebookLogin from "react-facebook-login";

module.exports = React.createClass({
    getInitialState: function () {
        return {
            isLoggedIn: false,
            author: '',
            title: '',
            price: '',
            course: '',
            condition: '',
            name: '',
            email: '',
            photo: ''
        };
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
    handleNameChange: function (e) {
        this.setState({name: e.target.value});
    },
    handleEmailChange: function (e) {
        this.setState({email: e.target.value});
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
    responseFacebook: function(response){
        console.log(response,'fb response');
        this.setState({
            name: response.name,
            email: response.email
    });
        console.log(user, 'user');
        this.props.onAuthenticated(user);
    },
    handleTextbookFormSubmit: function (e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var title = this.state.title.trim();
        var price = this.state.price.trim();
        var course = this.state.course.trim();
        var name = this.state.name;
        var email = this.state.email.trim();
        var condition = this.state.condition.trim();
        // var seller = this.state.seller;
        if (!title || !author || !price || !course || !condition || !name || !email) {
            return;
        }
        console.log('Running Submit Textbook');
        var textbooks = this.state.data;
        var submitTextbook = {
            title: this.state.title.trim(),
            author: this.state.author.trim(),
            price: this.state.price.trim(),
            course: this.state.course.trim(),
            name: this.state.name,
            email: this.state.email.trim(),
            condition: this.state.condition.trim(),
            photo: this.state.photo.trim()
        };

        $.ajax({
            url: '/api/newTextbook',
            dataType: 'json',
            type: 'POST',
            data: submitTextbook
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
            <div>
                <h1>Sell a Textbook</h1>
                <div className="container">
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
                                Course/Class:
                                <input
                                    type="text"
                                    value={this.state.course}
                                    onChange={this.handleCourseChange}
                                />
                            </label>
                        </div>
                        <div className="obj-center">
                            <label>
                                Book Condition:
                                <select value={this.state.condition} onChange={this.handleConditionChange}>
                                    <option value="Great">Great</option>
                                    <option value="Good">Good</option>
                                    <option value="Okay">Okay</option>
                                    <option value="Bad">Bad</option>
                                </select>
                            </label>
                        </div>

                        {/*Uploader Information (Email and Name)*/}
                        <div className="obj-center">
                            {/*Name*/}
                            <label>
                                Your Name:
                                <input
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.handleNameChange}
                                />
                            </label>
                        </div>
                        <div className="obj-center">
                            {/*Email*/}
                            <label>
                                Your Email:
                                <input
                                    type="text"
                                    value={this.state.email}
                                    onChange={this.handleEmailChange}
                                />
                            </label>
                        </div>

                        {/*Upload Photo Feature*/}
                        <div className="obj-center">
                            <label>
                                Upload a photo of your book:
                                <input type="file" onChange={this.fileConditionChange}/>
                            </label>
                            <img style={{width: 50, height: 50}} src={this.state.photo.toString()}/>
                        </div>

                        {/*Facebook Login*/}
                        <div className="button-top-right">
                            <FacebookLogin
                                appId="361886987905872"
                                autoLoad={true}
                                fields="name,email"
                                onClick={this.componentClicked}
                                callback={this.responseFacebook}
                            />
                        </div>

                    {/*Sell and Cancel Buttons*/}
                    {/*Sell Button*/}
                        <div className="obj-center">
                            <button type="button" className="sell-button"
                                    onClick={this.handleTextbookFormSubmit}>Sell</button>
                        </div>
                    </form>
                    {/*end <form>*/}

                    {/*Cancel Button*/}
                    <div className="obj-center">
                        <Link to='/'>
                            <button type="button" className="cancel-button"
                                    onClick={this.handleCancelButton}>Cancel</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
});
