import React from 'react';
import Remarkable from 'remarkable';
import {Link} from 'react-router';

module.exports = React.createClass({
    rawMarkup: function () {
        var md = new Remarkable({html: true});
        var rawMarkup = md.render(this.props.children.toString());
        return {__html: rawMarkup};
    },
    render: function () {
        return (
            <div className="textbook">
                <div className="textbookInfo">
                    {this.props.author}
                </div>
                <img style={{width: 60, height: 60}} src={this.props.photo.toString()}/>
                <span dangerouslySetInnerHTML={this.rawMarkup()}/>
            </div>
        );
    }
});
