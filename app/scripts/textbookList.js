import React from 'react';

import Textbook from './textbook';

module.exports = React.createClass({
    render: function () {
        var textbookNodes = this.props.data.map(function (textbook) {
            return (
                <Comment id={textbook.id} author={textbook.author}
                         key={textbook.id}>
                    {textbook.text}
                </Comment>
            );
        });
        return (
            <div className="textbookList">
                {textbookNodes}
            </div>
        );
    }
});
