'use strict';

angular.module('myTodo', ['ngRoute'])
    .config(function ($routeProvider) {
        
        var routeConfig = {
            controller: 'TodoCtrl',
            templateUrl: 'view/todo.html'
        };

        $routeProvider
            .when('/', routeConfig)
            .when('/:status', routeConfig)
            .otherwise({
                redirectTo: '/'
            });
    });
