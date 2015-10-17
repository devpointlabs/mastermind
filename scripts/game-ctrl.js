mastermind.controller('game-ctrl', function($scope){
	$scope.rows = [];

	$scope.currentRow = 1;

	//configure the secret. swap out the colors for any of the
	//following to change the secret: red,blue,green,purple,orange,white
	$scope.secretConfiguration = [
		{
			//we track the position of each secret so we can more easily
			//evaluate the feedback later on
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

	// variable declarations with a capital letter followed by a function
	// are called constructors. This is a template for what all rows will
	// look like. It also fills its own guesses by using a for loop to push
	// a new Circle to the guesses array 4 times, for the four guesses per row.
	var Row = function(id){
		this.id = id;
		this.guesses = [];
		this.feedback = [];

		for(var j=0;j < 4; j++){
			this.guesses.push(new Circle());
		}
	}

	// here we see another constructor, this time the Circle constructor.
	// each circle has two properties, color, and evaluated. the evaluated
	// property is here to make the validation step easier.
	var Circle = function(){
		this.color = '',
		this.evaluated = false
	}

	// using a for loop we create new Row's and push them to the
	// $scope.rows array, 12 times - creating 12 rows on the board.
	for(var i=1;i <= 12;i++){
		$scope.rows.push(new Row(i));
	}

	// this toggleColor function accepts two arguments, circle and row,
	// and then after making sure that that row is the same is current row
	// it adjusts the circle's color according to a switch statement.
	$scope.toggleColor = function(circle,row){
		if(row.id === $scope.currentRow){
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
	}

	// this function takes our secret configuration array and converts it
	// to a dictionary tracking how many of each color are present in the
	// secret. this aids in the validation process.
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

	// this is probably the biggest brain freeze in the whole game.
	// it accepts an array of guesses and a secret code and starts by
	// looking for exact matches of color and position. then it looks
	// for partial matches.
	function buildFeedback(guesses, secretCode){
		var feedback = [];
		// call our secretToDict function from earlier and store it on the
		// secretDict variable for later.
		var secretDict = secretToDict();

		// check for exact matches first by iterating through each guess
		guesses.forEach(function(guess, guessIdx){
			// for each guess we will also iterate through the secretCode
			// array, checking for exact matches.
			for(var k=0;k < secretCode.length; k++){
				// if the guesses color and the currently observed secretCode
				// circle are the same then we push an object containing a type
				// with the value of the string 'exact'
				if(guess.color === secretCode[guessIdx].color){
					feedback.push({'type': 'exact', 'idx': k});
					// decrement this color's count on our dictionary so we don't
					// count more colors than we have.
					secretDict[guess.color]--;
					// mark this guess as evaluated, so we don't create
					// partial matches with the same one later.
					guess.evaluated = true;
					break;
				}
			}
		});
		// check for partial matches second
		guesses.forEach(function(guess, guessIdx){
			for(var k=0;k < secretCode.length; k++){
				// if the current guesses color is the same is the current observed
				// secretCode circle's color AND that color's count is greater than 0
				// AND we haven't already evaluated this guess then push an object
				// containing a type property with the value of 'color' to indicate
				// a partial match
				if (guess.color === secretCode[k].color && secretDict[guess.color] > 0 && guess.evaluated === false){
					feedback.push({'type': 'color', 'idx': k});
					secretDict[guess.color]--;
					break;
				}
			};
		});
		// after we've iterated through all the guesses we return our feedback
		// array to the caller inside $scope.evaluate
		return feedback;
	}

	$scope.evaluate = function(){
		// create variable for easier access to the current row we're evaluating
		var rowToBeEvaluated = $scope.rows[($scope.currentRow - 1)];

		// copy the secret configuration so we don't over-write any data in the
		// buildFeedback function
		var copyofSecret = angular.copy($scope.secretConfiguration, copyofSecret);

		// track how many exact matches we found.
		var exactCount = 0;

		// on the right hand side of the equals sign we call our bulidFeedback function
		// passing in the rowTobeEvaluated's guess, and our copy of the secret
		// the result that comes back will be assigned to the rowToBeEvaluated's own
		// feedback property as an array
		rowToBeEvaluated.feedback = buildFeedback(rowToBeEvaluated.guesses, copyofSecret);

		// iterate through the feedback array objects
		rowToBeEvaluated.feedback.forEach(function(heart){
			// for each object that has a type of 'exact' increment our exactCount
			if(heart.type === 'exact'){
				exactCount++;
			}
		});

		// if the count is 4 that means you guessed the code correctly
		if(exactCount === 4){
			// set the number of attempts to be the same as the current row
			$scope.numberOfAttempts = $scope.currentRow;

			//set the current row to 0 to end play
			$scope.currentRow = 0;
		// if the count wasn't 4 then increment the current row variable to move
		// the game forward
		} else {
			$scope.currentRow++;
		}

	}

})
