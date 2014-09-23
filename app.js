(
    function(app) {
        'use strict';

        app.factory('tagtionary', function() {

            var comments = [{
                tags: ['funny', 'weird', 'strange'],
                comment: 'But... But.. why?'
            }, {
                tags: ['canada'],
                comment: 'Sorry, eh'
            }, {
                tags: ['gf', 'romance'],
                comment: 'Wife her!'
            }, {
                tags: ['bf', 'romance'],
                comment: 'Wife him!'
            }, {
                tags: ['firefly'],
                comment: 'Always upvote firefly'
            }];

            var randoms = [
                'Put...put your dick in it.', 
                'my username is relevant', 
                'this. I like this ', 
                'always upvote {{lastTag}}'
            ];

            function randomComment() {
                var min = 0;
                var max = randoms.length - 1;
                var n = Math.floor(Math.random()*(max-min+1)+min);
                return randoms[n];
            };

            var tagtionary = {};

            var matchCounts = [];

            var isInComment = function(tag, comment) {
                return comment.tags.indexOf(tag) > -1 ? 1 : 0;
            };

            var searchCommentsForTag = function(tag) {
                tag = tag.text.toLowerCase();
                for (var commentsIndex = 0, len = comments.length; commentsIndex < len; commentsIndex++) {
                    var currentComment = comments[commentsIndex];
                    var result = isInComment(tag, currentComment);
                    var current = matchCounts[commentsIndex] ? matchCounts[commentsIndex] : 0
                    matchCounts[commentsIndex] = current + result;
                }
            };

            tagtionary.getCommentFor = function(tagsToMatch) {
                for (var matchIndex = 0, len = tagsToMatch.length; matchIndex < len; matchIndex++) {
                    var currentTag = tagsToMatch[matchIndex];
                    searchCommentsForTag(currentTag);
                }
                var largestCount = Math.max.apply(Math, matchCounts);
                if(largestCount == 0) {
                    var match = randomComment();
                } else {
                    var largestCountIndex = matchCounts.indexOf(largestCount);
                    var match = comments[largestCountIndex].comment;
                }

                matchCounts = [];
                return match;
            };
            return tagtionary;
        });

        app.controller('tagCtrl', function($scope, $http, tagtionary) {
            $scope.tags = [];

            $scope.addTag = function(tag) {
                $scope.tags.push({
                    text: tag
                });
                $scope.lastTag = tag;
            };

            $scope.tagsContains = function(tag) {
                for (var i = 0; i < $scope.tags.length; i++) {
                    if ($scope.tags[i].text == tag) {
                        return true;
                    }
                }
                return false;
            };

            $scope.$watch('tags.length', function(value) {
                if ($scope.tags.length > 0) {
                    var matchedComment = tagtionary.getCommentFor($scope.tags);
                    if (matchedComment.indexOf('{{lastTag}}')>=0) {
                        matchedComment = matchedComment.replace('{{lastTag}}', $scope.lastTag);
                    }
                    $scope.comment = matchedComment;
                } else {
                    $scope.comment = '';
                }
            });
        });
    }(window.app = window.app || angular.module('commenturion', ['ngTagsInput']))
);
