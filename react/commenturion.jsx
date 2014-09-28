/**
 * @jsx React.DOM
 */

var React = require('react');
var TagBox = require('./tagBox.jsx');
var ButtonRow = require('./buttonRow.jsx');
var CommentResult = require('./commentResult.jsx');

var data = {
    tags: [],
    common: ['Cats', 'Gifs', 'Puppies', 'Funny', 'Canada']
};

var tagsContains = function(tag) {
    for (var i = 0; i < data.tags.length; i++) {
        if (data.tags[i].text == tag) {
            return true;
        }
    }
    return false;
};

var Commenturion = React.createClass({
    getCommentFor: function(tag) {
        if(data.tags.length==0) {
            data.lastTag = '';
            return;
        }

        data.lastTag = window.tagtionary.getCommentFor(data.tags);
        if (data.lastTag.indexOf('{{lastTag}}')>=0) {
            data.lastTag = data.lastTag.replace('{{lastTag}}', tag);
        }
    },
    addNewTag: function(tag) {
        if(!tagsContains(tag)) {
            data.tags.push({text:tag});
            this.getCommentFor(tag);
            this.setState({data: data});
        }
    },
    handleRemoveTag: function(tagToRemove) {
        data.tags = data.tags.filter(function(tag) {
            return tag.text!== tagToRemove;
        });
        this.getCommentFor(data.tags);
        this.setState({data: data});
    },
    render: function() {
        return(
            <div>
                <div className="row">
                    <div className="col-sm-12" id="tag-box">
                        <TagBox data={this.props.data.tags} 
                                onRemoveTagClick={this.handleRemoveTag}
                                onAddTag={this.addNewTag}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h4>Click below to try some common tags</h4>
                        <div id="button-row">
                            <ButtonRow 
                                data={this.props.data.common} 
                                onCommonButtonClick={this.addNewTag}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h3>Your comment should be:</h3>
                        <p id="commentResult">
                            <CommentResult data={data.lastTag}/>
                        </p>
                    </div>
                </div> 
            </div> 
        );
    }
  });

React.renderComponent(
  <Commenturion data={data}/>,
  document.getElementById('commenturion')
);
