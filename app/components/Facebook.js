import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import {Link} from 'react-router';

module.exports = React.createClass({
  getInitialState: function() {
      return {data: { isLoggedIn: false, userID: "", name: "", email: "", picture: "" }
              , _isMounted: false};
  },

  responseFacebook: function(response){
    // console.log(response);
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    });
  },

  componentClicked: function(){ console.log("clicked") },

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
          <img src={this.state.picture} alt={this.state.name} />
          <h2>Welcome {this.state.name}</h2>
          Email: {this.state.email}
        <Link to={'/textbookForm'}> Sell a textbook</Link>
        </div>
      );
    } else {
      fbContent = (
        <FacebookLogin
          appId="575578059546434"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    }
    return (
      <div>
        {fbContent}
      </div>

      );
  }
});
