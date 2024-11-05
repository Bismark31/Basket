// Store references to basketballs and the hoop
const basketballElements = document.querySelectorAll('.basketball');
const hoopElement = document.querySelector('.hoop');
let score = 0;
let missedShots = 0; // To track missed shots
let highScore = 0; // High score starts at 0

// Initialize the high score display
document.getElementById('highScore').innerText = `High Score: ${highScore}`;

// DRAG START - Make basketballs draggable
basketballElements.forEach(element => {
    element.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text', event.target.id);  // Set the dragged ball's ID
        event.currentTarget.classList.add('draggableFormat');  // Add some style while dragging
    });
});

// DRAG OVER - Allow hoop to accept the dropped ball
hoopElement.addEventListener('dragover', (event) => {
    event.preventDefault();  // Allow dropping the ball
});

// DROP EVENT for the hoop
hoopElement.addEventListener('drop', (event) => {
    event.preventDefault();
    const droppedBallId = event.dataTransfer.getData('text');  // Get dropped ball's ID
    const ball = document.getElementById(droppedBallId);

    if (ball) {
        // If the ball is dropped correctly in the hoop, score it
        score += 1;
        document.getElementById('remarks').innerText = "SCORE!";
        document.getElementById('scores').innerText = score;  // Update current score

        // Update high score if the current score is higher
        if (score > highScore) {
            highScore = score;
            document.getElementById('highScore').innerText = `High Score: ${highScore}`; // Display high score
        }

        // Remove the ball from the game area (simulate ball going into the hoop)
        ball.remove();

        // Reset missed shots count after a successful shot
        missedShots = 0; 
        document.getElementById('missed').innerText = `Missed shots: ${missedShots}`;
    }
});

// DRAG END - Handle missed shots
basketballElements.forEach(element => {
    element.addEventListener('dragend', (event) => {
        event.currentTarget.classList.remove('draggableFormat');  // Remove dragging style

        const ball = event.target;
        // If the ball is not dropped inside the hoop, count it as a missed shot
        if (!hoopElement.contains(ball)) {
            missedShots += 1;  // Increment missed shots
            document.getElementById('remarks').innerText = "MISSED!";
            document.getElementById('missed').innerText = `Missed shots: ${missedShots}`;
        }

        // If the ball was successfully shot, hide the "MISSED!" remark
        if (document.getElementById('remarks').innerText !== "SCORE!") {
            document.getElementById('remarks').innerText = "";  // Clear remark if not a score
        }
    });
});


document.getElementById('resetButton').addEventListener('click', () => {
    // Reset score and missed shots
    score = 0;
    missedShots = 0;

    // Reset the game UI
    document.getElementById('remarks').innerText = "";  // Clear remarks
    document.getElementById('scores').innerText = `Score: ${score}`;  // Reset score display
    document.getElementById('missed').innerText = `Missed shots: ${missedShots}`;  // Reset missed shots display

    // Optionally, reset basketballs to their original position if you remove them during the game
    basketballElements.forEach(ball => {
        // You can re-attach balls to the game area here if needed
        document.querySelector('.gameContainer').appendChild(ball);
    });
});
