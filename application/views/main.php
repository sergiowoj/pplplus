<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>

<!DOCTYPE html>
<html lang="en" ng-app="ppl">
<head>
	<meta charset="UTF-8">
	<title>ppl</title>
	<link href="assets/libs/bootstrap/dist/css/bootstrap.min.css"
		  rel="stylesheet" >
	<link href="assets/libs/angularjs-toaster/toaster.min.css"
	      rel="stylesheet" >
	<link href="assets/libs/ladda/dist/ladda-themeless.min.css"
	      rel="stylesheet" >
	<link href="assets/style.css" 
		  rel="stylesheet" >
</head>
<body>
	<nav class="navbar navbar-inverse navbar-fixed-top" >
		<div class="container" >
			<div class="navbar-header" >
				<a class="navbar-brand"
				   href="#/" >ppl+
				</a >
			</div >

			<div ui-view="search">
			</div>

			<div class="collapse navbar-collapse" >
				<ul class="nav navbar-nav" >
					<li ui-sref-active="active">
						<a ui-sref="list" >Principal</a >
					</li >
				</ul >
			</div >

		</div >
	</nav >
	
	<div class="container-fluid main-container">
		<div ui-view="right-menu"></div>
		<div ui-view="main"></div>
	</div>
	
	<script src="assets/libs/angular/angular.min.js" ></script >
	<script src="assets/libs/angular-resource/angular-resource.min.js" ></script >
	<script src="assets/libs/angular-animate/angular-animate.min.js" ></script >
	<script src="assets/libs/ngInfiniteScroll/build/ng-infinite-scroll.min.js" ></script >
	<script src="assets/libs/spin.js/spin.js" ></script >
	<script src="assets/libs/angular-spinner/angular-spinner.min.js" ></script >
	<script src="assets/libs/angular-auto-validate/dist/jcs-auto-validate.min.js" ></script >
	<script src="assets/libs/ladda/dist/ladda.min.js" ></script >
	<script src="assets/libs/angular-ladda/dist/angular-ladda.min.js" ></script >
	<script src="assets/libs/angular-strap/dist/angular-strap.min.js" ></script >
	<script src="assets/libs/angular-strap/dist/angular-strap.tpl.min.js" ></script >
	<script src="assets/libs/angularjs-toaster/toaster.min.js" ></script >
	<script src="assets/libs/ui-router/release/angular-ui-router.min.js" ></script >
	<script src="assets/angular/app.js"></script >
	<script src="assets/angular/employee/service.js" ></script >
	<script src="assets/angular/employee/controller.js" ></script >
	<script src="assets/angular/employee/directive.js" ></script >
	<script src="assets/angular/login/service.js" ></script >
	<script src="assets/angular/login/controller.js" ></script >
	
</body>
</html>