import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';

module.exports = React.createClass({
    getInitialState: function() {
        return {author: '', text: ''};
    },
    handleAuthorChange: function(e) {
        this.setState({author: e.target.value});
    },
    handleTextChange: function(e) {
        this.setState({text: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onTextbookSubmit({author: author, text: text});
        this.setState({author: '', text: ''});
    },
    render: function() {
        return (
        <Link to={'/textbookForm'}>Create a new textbook</Link>
        )
    }
});
