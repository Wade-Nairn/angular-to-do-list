var app = angular.module('app', []);

app.controller('todoCtrl', function($scope){

	$scope.add = function(){

		if(!$scope.newTodo) return;
			
			$scope.todos.push({
				content: $scope.newTodo,
				completed: false
			});
		

		$scope.newTodo = '';
		$scope.save();
	};

	$scope.clear = function(){

		$scope.todos = _.reject(
			$scope.todos, 
			function(todo){
				return todo.completed;
			}
		);
		$scope.save();	
	};

	$scope.save = function(){
		
		$scope.todos = _.map($scope.todos, function(todo){
			delete todo.$$hashkey;
			return todo;
		});

		localStorage.todos = JSON.stringify($scope.todos);
	};

	$scope.restore = function(){
		if(localStorage.todos){
			$scope.todos = JSON.parse(localStorage.todos);
		} else {
			$scope.todos = [];
		}
	};
	$scope.restore();
});