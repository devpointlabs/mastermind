var mastermind = angular.module('mastermind', ['ui.router']);

mastermind.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/instructions");

	$stateProvider
		.state('game', {
			url:"/",
			templateUrl: "game-board.html",
			controller: "game-ctrl"
		})
		.state('instructions', {
			url: "/instructions",
			templateUrl: "instructions.html",
			controller: "instructions-ctrl"
		})
		.state('tips', {
			url: "/tips",
			templateUrl: "tips.html"
		})
})
