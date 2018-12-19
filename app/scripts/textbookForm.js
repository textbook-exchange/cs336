//Import required libraries needed for React and React Router
import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';
import {API_URL} from './global';

//Import the CSS required to display the web application interface
import '../css/base.css';

//Import the Facebook Login API
import FacebookLogin from "react-facebook-login";

module.exports = React.createClass({
    getInitialState: function () {
        return {
            //All of the parts of the textbook object contained in MongoDB
            author: '',
            title: '',
            price: '',
            course: '',
            condition: 'Great',
            name: '',
            email: '',
            photo: ''
        };
    },

    //This handles the photo upload feature and handle the photo displaying in the web application
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

    //all of the handle..Change will ensure the state of the information will be sent successfully
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

    //The Cancel button revert back to the index or home page
    handleCancelButton: function (e) {
        this.context.router.push('/');
    },

    contextTypes: {
        router: React.PropTypes.object
    },

    //The Facebook API Login configuration will upload the user's FB information into the corresponding states after login
    responseFacebook: function (response) {
        console.log(response, 'fb response');
        this.setState({
            name: response.name,
            email: response.email
        });
    },

    //This will ensure that the user has provided all of the information (photo is optional) and send the data successfully
    handleTextbookFormSubmit: function (e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var title = this.state.title.trim();
        var price = this.state.price.trim();
        var course = this.state.course.trim();
        var condition = this.state.condition.trim();
        var name = this.state.name;
        var email = this.state.email.trim();
        if (!title || !author || !price || !course || !condition || !name || !email) {
            return;
        }

        //Submit the textbook once all of the above conditions have been met
        console.log('Running Submit Textbook');
        var textbooks = this.state.data;
        var submitTextbook = {
            title: this.state.title.trim(),
            author: this.state.author.trim(),
            price: this.state.price.trim(),
            course: this.state.course.trim(),
            condition: this.state.condition.trim(),
            name: this.state.name,
            email: this.state.email.trim(),
            photo: this.state.photo.trim()
        };

        //POST the data for MongoDB to create the new object
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
                {/*Header of the page*/}
                <h1>Sell a Textbook</h1>

                {/*Container for the form*/}
                <div className="container">
                    {/*Form begins here*/}
                    <form className="textbookForm">
                        {/*User input Title of the textbook*/}
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
                        {/*User input Author of the textbook*/}
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
                        {/*User input Price of the textbook*/}
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
                        {/*User input Course of the textbook*/}
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
                        {/*User input Book Condition of the textbook*/}
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

                        {/*Sell Button*/}
                        <div className="obj-center">
                            <button type="button" className="sell-button"
                                    onClick={this.handleTextbookFormSubmit}>Sell
                            </button>
                        </div>
                    </form>
                    {/*end <form>*/}

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

                    {/*Cancel Button*/}
                    <div className="obj-center">
                        <Link to='/'>
                            <button type="button" className="cancel-button"
                                    onClick={this.handleCancelButton}>Cancel
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
});
