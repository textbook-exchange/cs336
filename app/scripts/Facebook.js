import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import {Link} from 'react-router';

module.exports = React.createClass({
  getInitialState: function() {
      return {
        data: {userID: "", name: "", email: "", picture: "" },
        // _isMounted: false,
        isLoggedIn: false
      };
  },

  // componentDidMount: function () {
  //   //grabbing of external data
  //   this.state._isMounted = true;
  // },
  // componentWillUnmount: function () {
  //     // Reset the isMounted flag so that the loadTextbooksFromServer callback
  //     // stops requesting state updates when the textbookList has been unmounted.
  //     // This switch is optional, but it gets rid of the warning triggered by
  //     // setting state on an unmounted component.
  //     // See https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
  //     this.state._isMounted = false;
  // },
  responseFacebook: function(response){
    console.log(response,'fb response');
    var user = {
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    };
    this.setState({
      isLoggedIn: true,
      data: user
    });
    console.log(user, 'user');
    this.props.onAuthenticated(user);
    },
    render() {
      let fbContent;

      if (this.state.isLoggedIn) {
        fbContent = (
          <div
            style={{
              width: "400px",
              margin: "auto",
              background: "#f4f4f4",
              padding: "20px"
            }}
          >
            <img src={this.state.data.picture} alt={this.state.data.name} />
          <h2>Welcome, {this.state.data.name}</h2>
          email: {this.state.data.email} <br />
          state of books here in the future?
          
        </div>
      );
    } else {
        fbContent = (
          <div>
            <p> to get started, authenticate with Facebook.</p>
            <FacebookLogin
              appId="575578059546434"
              autoLoad={true}
              fields="name,email,picture"
              callback={this.responseFacebook}
            />
          </div>
        );
      }
    return (
      <div>
        {fbContent}
      </div>
      );
  }
});
