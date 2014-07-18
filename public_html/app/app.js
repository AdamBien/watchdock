'use strict';
var docker = angular.module('docker', ['ngRoute']);

docker.config(function($routeProvider) {
    $routeProvider
            .when('/', {
                templateUrl: "empty.html"
            }).
            when('/:containerId', {
                templateUrl: "details.html",
                controller: "containerController"
            });

});




