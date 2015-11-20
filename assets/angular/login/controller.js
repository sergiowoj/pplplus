app.controller('LoginController', function($scope, $state, LoginService){
	$scope.loginService = LoginService;
	$scope.loginInfo = [];

	$scope.login = function(){
		$scope.loginService.doLogin($scope.loginInfo);
	}
});