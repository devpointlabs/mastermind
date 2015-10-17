mastermind.controller('instructions-ctrl', function($scope){
	$scope.examplePegs = [
		{color: 'red'},
		{color: 'blue'},
		{color: 'green'},
		{color: 'purple'}
	];

	$scope.toggleColor = function(circle){
		switch (circle.color) {
			case '':
				circle.color = 'red';
				break;
			case 'red':
				circle.color = 'blue';
				break;
			case 'blue':
				circle.color = 'green';
				break;
			case 'green':
				circle.color = 'purple';
				break;
			case 'purple':
				circle.color = 'orange';
				break;
			case 'orange':
				circle.color = 'white';
				break;
			case 'white':
				circle.color = 'red';
				break;
		}

	}
})
