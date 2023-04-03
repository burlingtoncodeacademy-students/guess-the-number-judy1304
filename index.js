const { randomInt } = require('crypto');
const { exit } = require('process');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  let userInput = await ask("Ready to play a guess game? ");
  // Check to see if the user typed in Y
  console.log(userInput)

  if (!userInput.toLowerCase() == "y") {
    // THIS WILL END THE GAME
    return process.exit();

  }
  // Random numbers to choose. Also added tracker for how many guesses. 

  let guesses = 0
  let min = 1;
  let max = 100;
  let guess = Math.floor((max - min) / 2 + min);

  // The while loop if the user guessed it correct or no. 
  while (true) {
    guess = Math.floor((max - min) / 2 + min);
    console.log(`Is it... ${guess}?`);
    userInput = await ask("yes or no")
    if (userInput.toLowerCase() === "yes") {
      console.log(`Your number was ${guess}! you guessed it ${guesses} tries!`);
      return process.exit();
    } else if (userInput.toLowerCase() === "no")


      // The while loop for computer to ask questions. User input the response 
      computerResponse = await ask("Is it higher (H), or lower (L)?");
    console.log(computerResponse);
    if (computerResponse.toLowerCase() === "h") {
      min = guess + 1
      guesses++
    } else if (computerResponse.toLowerCase() === "l") {
      max = guess - 1
      guesses++
    } else {
      console.log("Invalid input. Please enter, 'h', 'l', or 'y'. ");

    }

  }
}

