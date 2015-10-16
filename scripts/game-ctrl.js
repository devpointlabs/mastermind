mastermind.controller('game-ctrl', function($scope){
	$scope.rows = [];

	$scope.currentRow = 1;

	$scope.secretConfiguration = [
		{
			'position': 1,
			'color': 'red'
		},
		{
			'position': 2,
			'color': 'red'
		},
		{
			'position': 3,
			'color': 'blue'
		},
		{
			'position': 4,
			'color': 'blue'
		}
	];

	var Row = function(id){
		this.id = id;
		this.guesses = [];
		this.feedback = [];

		for(var j=0;j < 4; j++){
			this.guesses.push(new Peg());
		}
	}

	var Peg = function(){
		this.color = ''
	}

	for(var i=1;i <= 12;i++){
		$scope.rows.push(new Row(i));
	}

	$scope.toggleColor = function(peg,row){
		if(row.id === $scope.currentRow){
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
	}

	function buildFeedback(guesses, secretCode){
		var feedback = [];
		debugger;
		guesses.forEach(function(guess, guessIdx){
			for(var k=guessIdx;k < secretCode.length; k++){
				if(guess.color === secretCode[k].color && guessIdx === k){
					feedback.push({'type': 'exact', 'idx': k});
					break;
				} else if (guess.color ===secretCode[k].color){
					feedback.push({'type': 'color', 'idx': k});
					break;
				}
			};
		});
		return feedback;
	}

	$scope.evaluate = function(){
		var rowToBeEvaluated = $scope.rows[($scope.currentRow - 1)];
		var copyofSecret = angular.copy($scope.secretConfiguration, copyofSecret);
		var exactCount = 0;

		rowToBeEvaluated.feedback = buildFeedback(rowToBeEvaluated.guesses, copyofSecret);

		rowToBeEvaluated.feedback.forEach(function(heart){
			if(heart.type === 'exact'){
				exactCount++;
			}
		});

		if(exactCount === 4){
			alert('you win');
			$scope.currentRow = 0;
		} else {
			$scope.currentRow++;
		}

	}

})
