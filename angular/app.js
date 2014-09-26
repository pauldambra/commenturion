(
    function(app) {
        'use strict';

        app.factory('tagtionary', function() {
            return window.tagtionary;
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
