app.factory('Auth', function($resource){
	return $resource('http://localhost/pplplus/api/auth');
});

app.service('AuthService', function(Auth, $q, $rootScope, $http, $window){
	var self = {
		'userInfo': null,
		'loginError': false,
		'doLogin': function(loginInfo) {
			var d = $q.defer();
			$http.post("http://localhost/pplplus/api/auth", {
				username: loginInfo.username,
				password: loginInfo.password
		    }).then(function(result) {
				self.userInfo = {
					token: result.data.token,
					username: result.data.username,
					name: result.data.name,
					surname: result.data.surname
				};
				$window.sessionStorage["userInfo"] = JSON.stringify(self.userInfo);
				$rootScope.userInfo = self.userInfo;
				d.resolve(self.userInfo);
		    }, function(error) {
		    	self.loginError = true;
		      	d.reject(error);
		    });
		    return d.promise;
		},
		'doLogout': function(){
			var d = $q.defer();
			$window.sessionStorage["userInfo"] = null;
			$rootScope.userInfo = null;
			self.userInfo = null;
			d.resolve();
			return d.promise;
		}
	}
	return self;
});