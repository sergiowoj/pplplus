app.controller('AuthController', function($rootScope, $scope, $state, AuthService){
	$scope.authService = AuthService;

	$scope.loginInfo = [];

	$scope.login = function(){
		$scope.authService.doLogin($scope.loginInfo).then(function(){
			$scope.authService.loginError = false;
			$state.go('list');
		});
	}

	$scope.logout = function(){
		$scope.authService.doLogout().then(function(){
			$state.go('login');
		});
	}
});