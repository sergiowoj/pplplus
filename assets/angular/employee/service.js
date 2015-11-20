// app.module("ppl.employee.service");

app.factory('Employee', function($resource){
	return $resource("http://localhost/pplplus/api/employees/:cpf", {cpf:'@cpf'}, {
		update: {
			method: 'PUT'
		}
	});
});

app.service('EmployeeService', function(Employee, $q, $rootScope){

	var self = {
		'persons': [],
		'selectedEmployee': null,
		'isDeleting': false,
		'isSaving': false,
		'isLoading': false,
		'search': null,
		'ordering': 'name',
		'loadEmployees': function(){
			var d = $q.defer();
			if(!self.isLoading){
				self.isLoading = true;

				var params = {
					'search': self.search,
					'ordering': self.ordering
				};

				self.persons = [];
				Employee.get(params, function(data){
					angular.forEach(data.results, function(person){
						self.persons.push(new Employee(person));
					});
					self.isLoading = false;
					d.resolve();
				});
			}
			return d.promise;
		},
		'getEmployee': function(cpf){
			for (var i = 0; i < self.persons.length; i++) {
				var obj = self.persons[i];
				if (obj.cpf == cpf) {
					return obj;
				} else {
					console.log("User not found.");
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
		},
		'doSearch': function () {
			self.persons = [];
			self.loadEmployees();
		},
		'doOrder': function () {
			self.persons = [];
			self.loadEmployees();
		},
		'watchFilters': function () {
			$rootScope.$watch(function () {
				return self.search;
			}, function (newVal) {
				if (angular.isDefined(newVal)) {
					self.doSearch();
				}
			});

			$rootScope.$watch(function () {
				return self.ordering;
			}, function (newVal) {
				if (angular.isDefined(newVal)) {
					self.doOrder();
				}
			});
		}
	};

	self.watchFilters();
	self.loadEmployees();

	return self;
});


app.factory('BankList', function($resource){
	return $resource("http://localhost/pplplus/api/banks/");
});

app.service('BankListService', function(BankList, $q, $rootScope){
	var self = {
		'bankList': [],
		'loadBanks': function(){
			var d = $q.defer();
			BankList.get(function(banks){
				self.bankList = banks;
				d.resolve();
			});
			return d.promise;
		}
	}
	return self;
});