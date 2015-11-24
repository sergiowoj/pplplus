// app.module("ppl.employee.controller");

app.controller('EmployeeListController', function($scope, $state, EmployeeService){
	$scope.employees = EmployeeService;
	$scope.viewType = "grid";

	$scope.loadEmployees = function(){
		$scope.employees.loadEmployees();
	}
});

app.controller('EmployeeCreateController', function($scope, $state, EmployeeService){
	$scope.mode = "create";
	$scope.employees = EmployeeService;
	$scope.employees.selectedEmployee = {};
	$scope.tabs = [
		{
			'title': 'Informações Pessoais',
			'contentTag' : 'info-pessoal'
		},
		{
			'title': 'Informações Profissionais',
			'contentTag' : 'info-profissional'
		},
		{
			'title': 'Documentos',
			'contentTag' : 'documentos'
		},
		{
			'title': 'Ativos alocados',
			'contentTag' : 'ativos'
		},
		{
			'title': 'Relatórios',
			'contentTag' : 'relatorios'
		},
		{
			'title': 'Emergência',
			'contentTag' : 'emergencia'
		},
		{
			'title': 'Observações',
			'contentTag' : 'obs'
		}		
	];
	$scope.tabs.activeTab = 'info-pessoal';

	$scope.save = function () {
		$scope.employees.createEmployee($scope.employees.selectedEmployee).then(function () {
			$state.go("list");
		});
	};
});

app.controller('EmployeeEditController', function($http, $scope, $stateParams, $state, EmployeeService){
	$scope.mode = "edit";
	$scope.employees = EmployeeService;
	$scope.employees.getEmployee($stateParams.cpf);
	$scope.searchTerm = "";

	$scope.tabs = [
		{
			'title': 'Informações Pessoais',
			'contentTag' : 'info-pessoal',
			'glyphiconClass' : 'glyphicon glyphicon-user'
		},
		{
			'title': 'Informações Profissionais',
			'contentTag' : 'info-profissional',
			'glyphiconClass' : 'glyphicon glyphicon-briefcase'
		},
		{
			'title': 'Documentos',
			'contentTag' : 'documentos',
			'glyphiconClass' : 'glyphicon glyphicon-folder-open'
		},
		{
			'title': 'Ativos alocados',
			'contentTag' : 'ativos',
			'glyphiconClass' : 'glyphicon glyphicon-tag'
		},
		{
			'title': 'Relatórios',
			'contentTag' : 'relatorios',
			'glyphiconClass' : 'glyphicon glyphicon-stats'
		},
		{
			'title': 'Emergência',
			'contentTag' : 'emergencia',
			'glyphiconClass' : 'glyphicon glyphicon-plus-sign'
		},
		{
			'title': 'Observações',
			'contentTag' : 'obs',
			'glyphiconClass' : 'glyphicon glyphicon-file'
		}		
	];
	$scope.tabs.activeTab = 'info-pessoal';

	$scope.setSearchTerm = function(term){
		$scope.searchTerm = term;
		$scope.completing = false;
	}

	$scope.bankSearch = function(bank){
		$scope.setSearchTerm(bank);
		if($scope.searchTerm == ""){
			$scope.completing = false;
		} else {
			$http.post('http://localhost/pplplus/api/banks', {"search": $scope.searchTerm})
				.success(function(data){
					if(data.count > 0) {
						$scope.completing = true;
						$scope.tips = data.results;
					} else {
						$scope.completing = false;
						$scope.tips = [];
					}
				})
				.error(function(data){
				});
		}
	};

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
