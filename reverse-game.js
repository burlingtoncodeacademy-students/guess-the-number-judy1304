const readline = require("readline");

async function ask(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
            rl.close();
        });
    });
}

async function guessNumber(min = 1, max = 100, secretNumber) {
    let guess;
    let response;
    let count = 0;

    while (true) {
        guess = Math.floor((max + min) / 2);
        count++;

        if (guess === secretNumber) {
            console.log(`Your number was ${guess}! I guessed it in ${count} guesses.`);
            return;
        }

        response = await ask(`Is your number higher (H) or lower (L) than ${guess}? `);

        if (response.toUpperCase() === "H") {
            min = guess + 1;
        } else if (response.toUpperCase() === "L") {
            max = guess - 1;
        } else {
            console.log("Invalid input. Please try again.");
        }
    }
}

async function askUser() {
    console.log("Please think of a number between 1 and 100.");
    const secretNumber = parseInt(await ask("Enter your secret number: "));
    await guessNumber(1, 100, secretNumber);
}

async function play() {
    const firstPlayer = await ask("Who wants to go first? (U/C) ");

    if (firstPlayer.toUpperCase() === "U") {
        askUser();
    } else if (firstPlayer.toUpperCase() === "C") {
        console.log("I'll go first.");
        await guessNumber();
    } else {
        console.log("Invalid input. Please try again.");
    }
}

module.exports = {
    game
};
