// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some scrabble!");
  let currentWord = input.question("Enter a word:");
  // let score = oldScrabbleScorer(currentWord);
  // console.log(score);

  return currentWord;
};

let simpleScorer = function(word) {
  return word.length;
};

let vowelBonusScorer = function(word) {
  let score = 0;
  for(let i = 0; i < word.length; i++) {
    if(word[i].toLowerCase() === 'a'||
    word[i].toLowerCase() === 'e'||
    word[i].toLowerCase() === 'i'||
    word[i].toLowerCase() === 'o'||
    word[i].toLowerCase() === 'u') {
      score += 3;
    } else {
      score += 1;
    }
  }
  return score;
};

let scrabbleScorer = function(word, structure = newPointStructure) {
  let score = 0;
  for(let i = 0; i < word.length; i++) {
    score += Number(structure[word[i]]);
  }
  return score;
};

const scoringAlgorithms = [
  {
    name : "Simple Score",
    description : "Each letter is worth 1 point", 
    scorerFunction : simpleScorer
  }, 
  {
    name : "Vowel Bonus Score",
    description : "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction : vowelBonusScorer
  }, 
  {
    name: "Scrabble Score",
    description: "The traditional scoring algorithm.",
    scorerFunction : scrabbleScorer
  }
];

function scorerPrompt() {
  console.log("Which scorer would you like to use? ");
  for(let i = 0; i < scoringAlgorithms.length; i++) {
    console.log(`${i} : ${scoringAlgorithms[i].name} - ${scoringAlgorithms[i].description}`);
  }

  let pickedIndex = input.question("Which number do you choose?: ");
  while(Number(pickedIndex) < 0 || 
      Number(pickedIndex) >= 3 ||
      isNaN(pickedIndex)) {
    pickedIndex = input.question("it says 0, 1 or 2, what did you enter? try again PLEASE! :) ");
  }
  return scoringAlgorithms[Number(pickedIndex)];
}

function transform(structure) {
  let newPointStructure = {};
  for(let num in structure) {
    for(let i = 0; i < structure[num].length; i++) {
      newPointStructure[structure[num][i].toLowerCase()] = Number(num);
    }
  }

  return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let currentWord = initialPrompt();
   let scorerObject = scorerPrompt();
   let score = scorerObject.scorerFunction(currentWord);
   console.log(`Users score for ${currentWord} is ${score}`);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
