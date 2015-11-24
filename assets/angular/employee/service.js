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
		'getEmployee': function(id){
			Employee.get({cpf:id}, function(data){
				self.selectedEmployee = data;
			});
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