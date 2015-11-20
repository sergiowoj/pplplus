app.factory('Login', function($resource){
	return $resource('http://localhost/pplplus/api/login');
});

app.service('LoginService', function(Login, $q, $rootScope){
	var self = {
		'username': '',
		'role': '',
		'doLogin': function(loginInfo) {
			console.log(loginInfo);
			self.username = loginInfo.username;
		},
		'doLogout': function(username){
			// Login.get(username);
		}
	}
	return self;
});