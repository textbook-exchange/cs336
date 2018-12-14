import React from 'react';

import Textbook from './textbook';

import '../css/base.css';

module.exports = React.createClass({
    render: function () {
        var textbookNodes = this.props.data.map(function (textbook) {
            return (
                <Textbook author={textbook.author}>
                    {textbook.author}
                    {textbook.title}
                    {textbook.author}
                    {textbook.price}
                    {textbook.course}
                    {textbook.condition}
                </Textbook>
            );
        });
        return (
            <div className="textbookList">
                {textbookNodes}
            </div>
        );
    }
});
