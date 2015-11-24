// app.module("ppl.employee.directive");

app.directive('ccCard', function () {
	return {
		'restrict': 'AE',
		'templateUrl': 'assets/templates/card-view.html',
		'scope': {
			'employee': '='
		},
		'controller': function ($scope, EmployeeService) {
			$scope.isDeleting = false;
			$scope.deleteEmployee = function () {
				console.log("deleting...");
				$scope.isDeleting = true;
				EmployeeService.deleteEmployee($scope.employee)
				.then(function () {
					$scope.isDeleting = false;
					console.log("Deleted");
				});
			};
		}
	}
});

app.directive('ccList', function () {
	return {
		'restrict': 'AE',
		'templateUrl': 'assets/templates/list-view.html',
		'scope': {
			'employee': '='
		},
		'controller': function ($scope, EmployeeService) {
			$scope.isDeleting = false;
			$scope.deleteEmployee = function () {
				console.log("deleting...");
				$scope.isDeleting = true;
				EmployeeService.deleteEmployee($scope.employee)
				.then(function () {
					$scope.isDeleting = false;
					console.log("Deleted");
				});
			};
		}
	}
});

app.directive('ccSpinner', function () {
	return {
		'restrict': 'AE',
		'templateUrl': 'assets/templates/spinner.html',
		'scope': {
			'isLoading': '=',
			'message': '@'
		}
	}
});