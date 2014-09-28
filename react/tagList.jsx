/**
 * @jsx React.DOM
 */

var React = require('react');

var TagList = React.createClass({
  render: function() {
    var handler = this.props.onRemoveTagClick;
    var tagNodes = this.props.data.map(function (tag) {
        handleClick= function(e) {
            handler(tag.text);
        }
      return (
        <li className="tag-item" key={tag.text}> 
            <span>{tag.text}</span>
            <a className="remove-button"
            onClick={this.handleClick}>x</a>
        </li>
      );
    });
    return (
      <ul className="tag-list">
        {tagNodes}
      </ul>
    );
  }
});

module.exports = TagList;