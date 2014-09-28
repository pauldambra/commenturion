/**
 * @jsx React.DOM
 */

var React = require('react');

var CommonButton = React.createClass({
    handleClick: function (e) {
        this.props.onClickHandler(this.props.data);
    },
  render: function() {
    return  (
        <button className="btn btn-primary" 
                onClick={this.handleClick} 
                data-tag-text={this.props.data}>
            {this.props.data}
        </button>
    );
  }
});

module.exports = CommonButton;