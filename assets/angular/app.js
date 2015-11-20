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
		})
		.state('login', {
			url: "/login",
			views: {
				'main': {
					templateUrl: 'assets/templates/login.html',
					controller: 'LoginController'
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