'use strict';

angular.module('myTodo').controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $location, todoStorage, $filter) {
    var todos = $scope.todos = todoStorage.get();

    $scope.status = '';

    $scope.$watch('todos', function() {
        todoStorage.put(todos);
        $scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
        $scope.completedCount = todos.length - $scope.remainingCount;
        $scope.allChecked = !$scope.remainingCount;
    }, true);
    
    $scope.$on('$routeChangeSuccess', function () {
        $scope.status = $routeParams.status || '';

        $scope.statusFilter = function(todo) {
            if ($scope.status === 'active') {
                return todo.completed === false;
            } else if ($scope.status === 'completed') {
                return todo.completed === true;
            } else {
                return todo;
            }
        };
    });

/*    $scope.$on('$routeChangeSuccess', function () {
        var status = $scope.status = $routeParams.status || '';

        $scope.statusFilter = (status === 'active') ?
        { completed: false } : (status === 'completed') ?
        { completed: true } : {};
    });*/

    $scope.addTodo = function() {
        if(!$scope.newTodo.length) {
            return;
        }

        todos.push({
            title: $scope.newTodo,
            completed: false
        });

        $scope.newTodo = '';
    };

    $scope.editTodo = function(todo) {
        $scope.editedTodo = todo;
    }

    $scope.doneEditing = function(todo) {
        $scope.editedTodo = null;
        if (!todo.title) {
            $scope.removeTodo(todo);
        }
    };

    $scope.removeTodo = function (todo) {
        todos.splice(todos.indexOf(todo), 1);
    };

    $scope.markAll = function(completed) {
        todos.forEach(function(todo) {
            todo.completed = completed;
        });
    };

    $scope.toggleCompleted = function (todo, completed) {
        if (angular.isDefined(completed)) {
            todo.completed = completed;
        }
    };

    $scope.clearCompletedTodos = function() {
        $scope.todos = todos = todos.filter(function(value) {
            return !value.completed;
        });
    };
});