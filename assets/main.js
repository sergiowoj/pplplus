var app = angular.module('ppl', [
	'ngResource',
	'infinite-scroll',
	'angularSpinner',
	'jcs-autoValidate',
	'angular-ladda',
	'mgcrea.ngStrap',
	'toaster',
	'ngAnimate',
	'ui.router'
	]);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('list', {
			url: "/",
			views: {
				'main': {
					templateUrl: 'assets/templates/list.html',
					controller: 'EmployeeListController'
				},
				'right-menu': {
					templateUrl: 'assets/templates/right-menu.html'
				}
			}
		})
		.state('edit', {
			url: "/edit/:cpf",
			views: {
				'main': {
					templateUrl: 'assets/templates/edit.html',
					controller: 'EmployeeEditController'
				}
			}
		})
		.state('view', {
			url: "/view/:cpf",
			views: {
				'main': {
					templateUrl: 'assets/templates/view.html',
					controller: 'EmployeeViewController'
				}
			}
		})
		.state('create', {
			url: "/create",
			views: {
				'main': {
					templateUrl: 'assets/templates/edit.html',
					controller: 'EmployeeCreateController'
				}
			}
		});

	$urlRouterProvider.otherwise('/');
});

app.config(function($resourceProvider, laddaProvider, $datepickerProvider) {
	$resourceProvider.defaults.stripTrailingSlashes = false;
	laddaProvider.setOption({
		style: 'expand-right'
	});
	angular.extend($datepickerProvider.defaults, {
		dateFormat: 'd/M/yyyy',
		autoclose: true
	});
});

app.factory('Employee', function($resource){
	return $resource("http://localhost/rh2/api/employees/:cpf", {cpf:'@cpf'}, {
		update: {
			method: 'PUT'
		}
	});
})

app.directive('ccCard', function () {
	return {
		'restrict': 'AE',
		'templateUrl': 'assets/templates/card.html',
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

app.controller('EmployeeListController', function($scope, $state, EmployeeService){
	$scope.employees = EmployeeService;

	$scope.loadEmployees = function(){
		$scope.employees.loadEmployees();
	}
});

app.controller('EmployeeCreateController', function($scope, $state, EmployeeService){
	$scope.mode = "Create";
	$scope.employees = EmployeeService;
	$scope.employees.selectedEmployee = {};

	$scope.save = function () {
		$scope.employees.createEmployee($scope.employees.selectedEmployee).then(function () {
			$state.go("list");
		});
	};
});

app.controller('EmployeeEditController', function($scope, $stateParams, $state, EmployeeService){
	$scope.mode = "Edit";
	$scope.employees = EmployeeService;

	$scope.employees.loadEmployees().then(function(){
		$scope.employees.selectedEmployee = $scope.employees.getEmployee($stateParams.cpf);
	});

	$scope.save = function () {
		$scope.employees.updateEmployee($scope.employees.selectedEmployee).then(function () {
			$state.go("list");
		});
	};
});

app.controller('EmployeeViewController', function($scope, $stateParams, $state, EmployeeService){
	$scope.employees = EmployeeService;	

	

	console.log($scope.employees.selectedEmployee);
});

app.service('EmployeeService', function(Employee, $q, $rootScope){

	var self = {
		'persons': [],
		'selectedEmployee': null,
		'isDeleting': false,
		'isSaving': false,
		'isLoading': false,
		'loadEmployees': function(){
			var d = $q.defer();
			self.isLoading = true;
			self.persons = [];
			Employee.get(function(data){
				console.log(data);
				angular.forEach(data.results, function(person){
					self.persons.push(new Employee(person));
				});
				self.isLoading = false;
				d.resolve();
			});
			return d.promise;
		},
		'getEmployee': function(cpf){
			for (var i = 0; i < self.persons.length; i++) {
				var obj = self.persons[i];
				if (obj.cpf == cpf) {
					return obj;
				}
			}
		},
		'createEmployee': function(employee){
			var d = $q.defer();
			self.isSaving = true;
			Employee.save(employee).$promise.then(function(){
				self.isSaving = false;
				self.selectedEmployee = null;
				self.persons = [];
				self.loadEmployees();
				d.resolve();
			});
			return d.promise;
		},
		'updateEmployee' : function(employee){
			var d = $q.defer();
			self.isSaving = true;
			employee.$update().then(function(){
				self.isSaving = false;
				self.selectedEmployee = null;
				self.persons = [];
				self.loadEmployees();
				d.resolve();
			});
			return d.promise;
		},
		'deleteEmployee': function(employee){
			var d = $q.defer();
			self.isDeleting = true;
			employee.$remove().then(function(){
				self.isDeleting = false;
				var index = self.persons.indexOf(employee);
				self.persons.splice(index, 1);
				d.resolve();
			});
			return d.promise;
		}
	};

	self.loadEmployees();

	return self;
});
