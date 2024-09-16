document.addEventListener('DOMContentLoaded', function () {
	const spinBtn = document.getElementById('spin-btn');
	const ballElements = document.querySelectorAll('.balls p');
	const numbersEl = document.getElementById('numbers-el');
	const bonusEl = document.getElementById('bonus-el');

	let spinIntervals = []; // Array to store intervals for each ball

	const randomizeNumbers = (element, index) => {
		// Set interval to change the number inside the ball rapidly
		spinIntervals[index] = setInterval(() => {
			element.textContent = Math.floor(Math.random() * 49) + 1;
		}, 100); // Change number every 100ms
	};

	const stopSpin = () => {
		// Stop all intervals after the spin is complete
		spinIntervals.forEach((interval) => clearInterval(interval));
		spinIntervals = []; // Reset the intervals array
	};

	const renderGame = () => {
		// Start randomizing numbers inside each ball
		ballElements.forEach((element, index) => randomizeNumbers(element, index));

		// Set a timeout to stop the spinning effect and display the final numbers
		setTimeout(() => {
			// Stop the spinning effect
			stopSpin();

			// Generate 5 random numbers between 1 and 49
			let numbers = [];
			while (numbers.length < 5) {
				let num = Math.floor(Math.random() * 49) + 1;
				if (!numbers.includes(num)) {
					numbers.push(num);
				}
			}

			// Sort numbers for better presentation
			numbers.sort((a, b) => a - b);

			// Generate the bonus number
			let bonus;
			do {
				bonus = Math.floor(Math.random() * 49) + 1;
			} while (numbers.includes(bonus)); // Ensure the bonus number is unique

			// Display numbers in the balls
			for (let i = 0; i < 5; i++) {
				ballElements[i].textContent = numbers[i];
			}

			// Display bonus ball
			ballElements[5].textContent = bonus;

			// Display winning numbers
			numbersEl.textContent = numbers.join(' - ');
			bonusEl.textContent = `Bonus: ${bonus}`;

			// Reset button to allow the game to be spun again
			spinBtn.textContent = 'Reset';
			spinBtn.removeEventListener('click', renderGame);
			spinBtn.addEventListener('click', resetGame);
		}, 3000); // Stop spinning after 3 seconds
	};

	const resetGame = () => {
		// Clear all ball contents
		ballElements.forEach((el) => (el.textContent = ''));

		// Clear the displayed results
		numbersEl.textContent = '';
		bonusEl.textContent = '';

		// Change the button back to spin
		spinBtn.textContent = 'Spin';
		spinBtn.removeEventListener('click', resetGame);
		spinBtn.addEventListener('click', renderGame);
	};

	spinBtn.addEventListener('click', renderGame);
});
