/**
 * @jsx React.DOM
 */

var React = require('react');
var TagList = require('./tagList.jsx');
var TagInput = require('./tagInput.jsx');

var TagBox = React.createClass({
  render: function() {
    return (
        <div className="tags">
            <TagList data={this.props.data} onRemoveTagClick={this.props.onRemoveTagClick}/>
            <TagInput onAddTag={this.props.onAddTag}/>
        </div>
    );
  }
});

module.exports = TagBox;