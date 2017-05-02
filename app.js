var myapp = angular.module('myApp', []);

myapp.controller('myController', ['$scope', '$http', function($scope, $http){
    $http.get('/tasks.json').then(function(results){
        $scope.taskData = results.data;
    });
    $scope.deleteTask = function(index){
        $scope.taskData.splice(index, 1);
    }
}]);

myapp.controller('myNewTask', function($scope){
    $scope.newTask = function(item){
        item.unshift({task: "Click here to edit your new task!"});
    }
});

myapp.controller('myTaskList', function($scope){
    $scope.checkedTask = false;
    $scope.checkedRevision = false;
    $scope.permRevision = false;
    $scope.newTask = {};
    
    $scope.setActive = function(){
        $scope.permRevision = false;
        if ($scope.checkedTask === false){
            $scope.checkedTask = true;
        } else {
            $scope.checkedTask = false;
        }
    };
    $scope.tempRevisions = function(item){
        $scope.newTask = item.task;
        if ($scope.checkedRevision === true){
            $scope.checkedRevision = false;
        } else {
            $scope.checkedRevision = true
        }
    };
    $scope.editTasks = function(item){
        if ($scope.checkedRevision === false) {return false;}
        item.task = $scope.newTask;
        $scope.permRevision = true;
        $scope.tempRevisions(item);
    }
});

