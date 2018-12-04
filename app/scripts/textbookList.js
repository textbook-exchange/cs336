import React from 'react';

import Textbook from './textbook';

module.exports = React.createClass({
    render: function () {
        var textbookNodes = this.props.data.map(function (textbook) {
            return (
                <Textbook id={textbook.id} author={textbook.author}
                         key={textbook.id}>
                    {textbook.id}
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
