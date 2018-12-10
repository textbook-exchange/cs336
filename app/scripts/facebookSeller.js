import React, { Component } from 'react'

import '../css/base.css';

import Facebook from './components/Facebook';

import Remarkable from 'remarkable';

module.exports = React.createClass({
    rawMarkup: function () {
        var md = new Remarkable({html: true});
        var rawMarkup = md.render(this.props.children.toString());
        return {__html: rawMarkup};
    },
    render: function () {
        return (
            <div className="login">
                <div className="fbLogin">
                    <h1>Facebook Auth Example</h1>
                </div>
                <p> to get started, authenticate with Facebook.</p>
                <Facebook />
            </div>
        );
    }
});
