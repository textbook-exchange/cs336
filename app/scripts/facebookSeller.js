import React, { Component } from 'react'

import Facebook from '../components/Facebook';
import Remarkable from 'remarkable';
import {Link} from "react-router";

module.exports = React.createClass({
    rawMarkup: function () {
        var md = new Remarkable({html: true});
        var rawMarkup = md.render(this.props.children.toString());
        return {__html: rawMarkup};
    },
    render: function () {
        return (
            <div>
                <div className="obj-center">
                    <h1>Facebook Login</h1>
                    <p> to get started, authenticate with Facebook.</p>
                    <Facebook />
                </div>
                <div className="obj-center">
                <Link to='/'>
                    <button type="button">
                        Cancel
                    </button>
                </Link>
                </div>
            </div>
        );
    }
});
