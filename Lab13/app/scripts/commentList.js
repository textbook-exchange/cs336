import React from 'react';

import Comment from './comment';

module.exports = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment id={comment.id} author={comment.author}
                         key={comment.id}>
                    {comment.id}
                    {comment.title}
                    {comment.author}
                    {comment.price}
                    {comment.course}
                    {comment.condition}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});
