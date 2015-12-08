// app.module("ppl.employee.controller");

app.controller('EmployeeListController', function($scope, $state, EmployeeService){
	$scope.employees = EmployeeService;
	$scope.viewType = "grid";

	$scope.loadEmployees = function(){
		$scope.employees.loadEmployees();
	}
});

app.controller('EmployeeCreateController', function($scope, $state, EmployeeService, $http, Upload){
	$scope.mode = "create";
	$scope.employees = EmployeeService;
	$scope.employees.selectedEmployee = {};

	$scope.uploadPic = function(file) {
	    file.upload = Upload.upload({
	      url: 'upload',
	      data: {file: file},
	    });

	    file.upload.then(function (response) {
	        file.result = response.data;
	        if(response.data.uploaded){
	        	file.result.message = "Foto atualizada!";
	        	$scope.employees.selectedEmployee.photo = response.data.photo_url;
	        }	        
	    }, function (response) {
	      if (!response.data.uploaded)
	      	if(response.data.err_message == 'ext_not_allowed'){
	      		file.result.message = 'Extensão não permitida.';
	      	} else if (response.data.err_message == 'file_size_exceeded'){
	        	file.result.message = 'O arquivo deve ser menor que 2mb.';
	        } else {
	        	file.result.message = 'Erro ao salvar foto. Tente novamente.';
	        }
	    }, function (evt) {
	    	if(evt.type == 'progress') {
	    		$scope.isUploadingPhoto = true;
	    	} else if (evt.type == 'load'){
	    		$scope.isUploadingPhoto = false;
	    	}
	    });
    };

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

	$scope.setSearchTerm = function(term, bank_id){
		$scope.searchTerm = term;
		$scope.employees.selectedEmployee.bank_id = bank_id;
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

	$scope.getBankById = function(id){
		$http.get('http://localhost/pplplus/api/banks/'+id)
				.success(function(data){
					$scope.setSearchTerm(data.name, data.id);
				})
				.error(function(data){
				});
	}

	$scope.save = function () {
		$scope.employees.createEmployee($scope.employees.selectedEmployee).then(function () {
			$state.go("list");
		});
	};
});

app.controller('EmployeeEditController', function($http, $scope, $stateParams, $state, EmployeeService, Upload){
	$scope.mode = "edit";
	$scope.employees = EmployeeService;
	$scope.employees.getEmployee($stateParams.id).then(function(){
		$scope.getBankById($scope.employees.selectedEmployee.bank_id);
	});

	$scope.uploadPic = function(file) {
	    file.upload = Upload.upload({
	      url: 'upload',
	      data: {file: file},
	    });

	    file.upload.then(function (response) {
	        file.result = response.data;
	        if(response.data.uploaded){
	        	file.result.message = "Foto atualizada!";
	        	$scope.employees.selectedEmployee.photo = response.data.photo_url;
	        }	        
	    }, function (response) {
	      if (!response.data.uploaded)
	      	if(response.data.err_message == 'ext_not_allowed'){
	      		file.result.message = 'Extensão não permitida.';
	      	} else if (response.data.err_message == 'file_size_exceeded'){
	        	file.result.message = 'O arquivo deve ser menor que 2mb.';
	        } else {
	        	file.result.message = 'Erro ao salvar foto. Tente novamente.';
	        }
	    }, function (evt) {
	    	if(evt.type == 'progress') {
	    		$scope.isUploadingPhoto = true;
	    	} else if (evt.type == 'load'){
	    		$scope.isUploadingPhoto = false;
	    	}
	    });
    };

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

	$scope.setSearchTerm = function(term, bank_id){
		$scope.searchTerm = term;
		$scope.employees.selectedEmployee.bank_id = bank_id;
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

	$scope.getBankById = function(id){
		$http.get('http://localhost/pplplus/api/banks/'+id)
				.success(function(data){
					$scope.setSearchTerm(data.name, data.id);
				})
				.error(function(data){
				});
	}

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
