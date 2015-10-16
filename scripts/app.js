var mastermind = angular.module('mastermind', ['ui.router']);

mastermind.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/instructions");

	$stateProvider
		.state('game', {
			url:"/",
			templateUrl: "../templates/game-board.html",
			controller: "game-ctrl"
		})
		.state('instructions', {
			url: "/instructions",
			templateUrl: "../templates/instructions.html",
			controller: "instructions-ctrl"
		})
		.state('tips', {
			url: "/tips",
			templateUrl: "../templates/tips.html"
		})
})
