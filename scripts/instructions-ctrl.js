mastermind.controller('instructions-ctrl', function($scope){
	$scope.examplePegs = [
		{color: 'red'},
		{color: 'blue'},
		{color: 'green'},
		{color: 'purple'}
	];

	$scope.toggleColor = function(peg){
		switch (peg.color) {
			case '':
				peg.color = 'red';
				break;
			case 'red':
				peg.color = 'blue';
				break;
			case 'blue':
				peg.color = 'green';
				break;
			case 'green':
				peg.color = 'purple';
				break;
			case 'purple':
				peg.color = 'orange';
				break;
			case 'orange':
				peg.color = 'white';
				break;
			case 'white':
				peg.color = 'red';
				break;
		}

	}
})
