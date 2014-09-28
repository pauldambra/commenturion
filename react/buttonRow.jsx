/**
 * @jsx React.DOM
 */

var React = require('react');
var CommonButton = require('./commonButton.jsx');

var ButtonRow = React.createClass({
  render: function() {
      var handler = this.props.onCommonButtonClick;
      return (
          <div>
          {this.props.data.map(function (common) {
              return <CommonButton key={common} 
                                   data={common} 
                                   onClickHandler={handler}/>;
          })}
          </div>
      );
  }
});

module.exports = ButtonRow;