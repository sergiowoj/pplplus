var app = angular.module('ppl', [
	'ngResource',
	'infinite-scroll',
	'angularSpinner',
	'jcs-autoValidate',
	'angular-ladda',
	'mgcrea.ngStrap',
	'toaster',
	'ngAnimate',
	'ui.router',
	'ngFileUpload'
	]);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('list', {
			url: "/",
			views: {
				'main': {
					templateUrl: 'assets/templates/list.html',
					controller: 'EmployeeListController'
				}
				// 'right-menu': {
				// 	templateUrl: 'assets/templates/right-menu.html'
				// }
			},
			authRequired: true
		})
		.state('edit', {
			url: "/edit/:id",
			views: {
				'main': {
					templateUrl: 'assets/templates/edit.html',
					controller: 'EmployeeEditController'
				}
			},
			authRequired: true
		})
		.state('view', {
			url: "/view/:cpf",
			views: {
				'main': {
					templateUrl: 'assets/templates/view.html',
					controller: 'EmployeeViewController'
				}
			},
			authRequired: true
		})
		.state('create', {
			url: "/create",
			views: {
				'main': {
					templateUrl: 'assets/templates/edit.html',
					controller: 'EmployeeCreateController'
				}
			},
			authRequired: true
		})
		.state('login', {
			url: "/login",
			views: {
				'main': {
					templateUrl: 'assets/templates/login.html',
					controller: 'AuthController'
				}
			}
		});

	$urlRouterProvider.otherwise('/');
});

app.config(function($httpProvider, $resourceProvider, laddaProvider, $datepickerProvider) {
	//console.log(AuthService.userInfo.token);
	$httpProvider.defaults.headers.common['Token'] = 'swk0c0sk4c8k84o8gko0css0cc00o4c440ck4gkk';
	$resourceProvider.defaults.stripTrailingSlashes = false;
	laddaProvider.setOption({
		style: 'expand-right'
	});
	angular.extend($datepickerProvider.defaults, {
		dateFormat: 'd/M/yyyy',
		autoclose: true
	});
});

app.run(function($rootScope, $window, $state, AuthService, validator, defaultErrorMessageResolver){
    validator.setValidElementStyling(false);
    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
          errorMessages['required'] = 'Este campo é obrigatório.';
          errorMessages['maxlength'] = 'Máximo de {0} caracteres permitidos.';
          errorMessages['minlength'] = 'Necessário ter no mínimo {0} caracteres.';
          errorMessages['email'] = 'Formato de email inválido.';
        });

	// console.log("This is the current info present in session:");
	// console.log($window.sessionStorage['userInfo']);
	// console.log("This is the current info present in AuthService:");
	// console.log(AuthService.userInfo);

	if (AuthService.userInfo == null && $window.sessionStorage['userInfo'] != null){
		// console.log("Passing values from session to AuthService");
		AuthService.userInfo = JSON.parse($window.sessionStorage['userInfo']);
	}
	// console.log("This is the new info present in AuthService:");
	// console.log(AuthService.userInfo);

	$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
		var requireLogin = toState.authRequired;
		if (requireLogin && AuthService.userInfo == null) {
		  event.preventDefault();
		  // console.log("Login required.");
		  $state.go('login');
		}
	});
});