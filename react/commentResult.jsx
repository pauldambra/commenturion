/**
 * @jsx React.DOM
 */

var React = require('react');

var CommentResult = React.createClass({
    render: function() {
        return (
            <strong>{this.props.data}</strong>
        );
    }
});

module.exports = CommentResult;