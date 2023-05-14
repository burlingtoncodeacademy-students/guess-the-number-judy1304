// const { game } = require('./reverse-game');
const readline = require("readline");
const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function ask(question) {
  return new Promise((resolve) => {
    readlineInterface.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function guessNumber(min, max) {
  let guess = Math.floor((max + min) / 2);
  let response = await ask(`Is your number... ${guess}? (Y/N) `);
  let count = 1; // the guess counter to 1
  let previousResponse;

  while (response.toUpperCase() !== "Y") {
    if (response.toUpperCase() === "H") {
      if (previousResponse && previousResponse.toUpperCase() === "L" && guess + 1 <= max) {
        console.log(`You said it was lower than ${guess}, so it can't also be higher than ${guess + 1}!`);
        readlineInterface.close();
        return;
      }
      min = guess + 1;
    } else if (response.toUpperCase() === "L") {
      if (previousResponse && previousResponse.toUpperCase() === "H" && guess - 1 >= min) {
        console.log(`You said it was higher than ${guess}, so it can't also be lower than ${guess - 1}!`);
        readlineInterface.close();
        return;
      }
      max = guess - 1;
    } else {
      console.log("Please enter 'Y', 'H', or 'L'");
    }

    // ask if the number is higher or lower
    if (min === max) {
      break;
    }
    previousResponse = response;
    response = await ask(`Is your number higher(H) or lower(L)? `);
    if (response.toUpperCase() === "H") {
      guess = Math.floor((max + guess + 1) / 2);
    } else if (response.toUpperCase() === "L") {
      guess = Math.floor((guess + min - 1) / 2);
    } else {
      console.log("Please enter 'H' or 'L'");
    }

    response = await ask(`Is it... ${guess}? (Y/N) `);
    count++; // increment the guess counter each time the computer makes a new guess
  }

  console.log(`Your number was ${guess}! I guessed it in ${count} guesses.`);
  readlineInterface.close();
}

async function play() {
  let firstPlayer = await ask("Who wants to go first? (U/C) ");
  console.log("Please think of a number between 1 and 100.");

  if (firstPlayer.toUpperCase() === "U") {
    console.log("You go first.");
    let secretNumber = parseInt(await ask("Enter your secret number: "));
    await guessNumber(1, 100, secretNumber);
  } else if (firstPlayer.toUpperCase() === "C") {
    console.log("I'll go first.");
    await guessNumber(1, 100);
  } else {
    console.log("Please enter 'U' or 'C'");
    await play();
  }
}

play();

