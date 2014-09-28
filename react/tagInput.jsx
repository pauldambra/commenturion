/**
 * @jsx React.DOM
 */

var React = require('react');

var TagInput = React.createClass({
  getInitialState: function() {
    return {tagValue: ''};
  },
  handleChange: function(e) {
    this.setState({tagValue: e.target.value});
  },
  handleAddTag: function(e) {
    var enter = 13;
    var space = 32;
    if(e.which===enter||e.which===space) {
        this.props.onAddTag(e.target.value);
        this.setState({tagValue: ''});
    }
  },
  render: function() {
    return (
      <input className="input" 
             type="text" 
             placeholder="Add a tag" 
             value={this.state.tagValue}
             onChange={this.handleChange}
             onKeyUp={this.handleAddTag}
             ref="tagInput"/>
    );
  }
});

module.exports = TagInput;