var mastermind = angular.module('mastermind', []);

mastermind.controller('game-ctrl', function($scope){
	$scope.rows = [];

	$scope.currentRow = 1;

	$scope.secretCode = ['red', 'red', 'blue', 'blue'];

	var Row = function(id){
		this.id = id;
		this.guesses = [];
		this.feedback = {
			"exact": [],
			"colorMatch": []
		};

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

	function matchesAnyPeg(color){
		var bool = false;
		$scope.secretCode.forEach(function(secretColor){
			if(color === secretColor){
				bool = true;
			}
		})
		return bool;
	}

	$scope.evaluate = function(){
		var rowToBeEvaluated = $scope.rows[($scope.currentRow - 1)];
		rowToBeEvaluated.guesses.forEach(function(guess, idx){
			if(guess.color === $scope.secretCode[idx]){
				rowToBeEvaluated.feedback.exact.push(guess);
			} else if (matchesAnyPeg(guess.color) === true){
				rowToBeEvaluated.feedback.colorMatch.push(guess);
			}
		});
		console.log(rowToBeEvaluated.feedback.exact)
		if(rowToBeEvaluated.feedback.exact.length === 4){
			alert('you win');
			$scope.currentRow = 0;
		} else {
			$scope.currentRow++;
		}

	}

})
