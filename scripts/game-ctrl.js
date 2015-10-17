mastermind.controller('game-ctrl', function($scope){
	$scope.rows = [];

	$scope.currentRow = 1;

	$scope.secretConfiguration = [
		{
			'position': 0,
			'color': 'red'
		},
		{
			'position': 1,
			'color': 'red'
		},
		{
			'position': 2,
			'color': 'blue'
		},
		{
			'position': 3,
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
		this.color = '',
		this.evaluated = false
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
	function secretToDict(){
		var dict = {};
		$scope.secretConfiguration.forEach(function(secret){
			if(typeof dict[secret.color] === 'number'){
				dict[secret.color]++;
			} else {
				dict[secret.color] = 1;
			}
		});
		return dict;
	}

	function buildFeedback(guesses, secretCode){
		var feedback = [];
		var secretDict = secretToDict();

		//check for exact matches first
		guesses.forEach(function(guess, guessIdx){
			for(var k=0;k < secretCode.length; k++){
				if(guess.color === secretCode[guessIdx].color){
					feedback.push({'type': 'exact', 'idx': k});
					secretDict[guess.color]--;
					//mark this guess as evaluated, so we don't create
					//partial matches with the same one later.
					guess.evaluated = true;
					break;
				}
			}
		});
		//check for partial matches second
		guesses.forEach(function(guess, guessIdx){
			for(var k=0;k < secretCode.length; k++){
				if (guess.color === secretCode[k].color && secretDict[guess.color] > 0 && guess.evaluated === false){
					feedback.push({'type': 'color', 'idx': k});
					secretDict[guess.color]--;
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
			$scope.numberOfAttempts = $scope.currentRow;
			$scope.currentRow = 0;
		} else {
			$scope.currentRow++;
		}

	}

})
