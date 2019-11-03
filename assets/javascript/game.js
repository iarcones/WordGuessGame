var cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "San Francisco",
  "Columbus",
  "Fort Worth",
  "Indianapolis",
  "Charlotte",
  "Seattle",
  "Denver",
  "Washington",
  "Boston",
  "El Paso",
  "Detroit",
  "Nashville",
  "Memphis",
  "Portland",
  "Oklahoma City",
  "Las Vegas",
  "Louisville",
  "Baltimore",
  "Milwaukee",
  "Albuquerque",
  "Tucson",
  "Fresno",
  "Sacramento",
  "Mesa",
  "Kansas City",
  "Atlanta",
  "Long Beach",
  "Omaha",
  "Raleigh",
  "Colorado Springs",
  "Miami",
  "Virginia Beach",
  "Oakland",
  "Minneapolis",
  "Tulsa",
  "Arlington",
  "New Orleans",
  "Wichita"
];

var alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

var city;
var lCity;
var arraylCity;
var attempts;
var lettersFail;
var word;
var wins = 0;
var losses = 0;

function reset() {
  city = cities[Math.floor(Math.random() * cities.length)];
  console.log(city);
  lCity = city.toLowerCase();
  attempts = 6;
  lettersFail = "";
  word = "";

  var img = "./assets/images/" + city.split(" ").join("") + ".jpg";

  document.getElementById("idimg").src = img;

  var hangmanImgPath = "./assets/images/Hangman-0.png";
  document.getElementById("idhangman").src = hangmanImgPath;
  document.getElementById("idhangman").innerHTML = hangmanImgPath;

  document.querySelector("#idFail").innerHTML = "Left: " + attempts;
  document.querySelector("#idlettersFail").innerHTML = "Wrong Guesses:";

  for (var i = 0; i < lCity.length; i++) {
    if (lCity[i] === " ") {
      word += " ";
    } else {
      word += "-";
    }
  }

  document.querySelector("#idtheword").innerHTML = word;
  document.querySelector("#idFinal").innerHTML = "";
  document.querySelector("#iderrors").innerHTML = "";
}

function updateFail() {
  document.querySelector("#idFail").innerHTML = "left: " + attempts;
  document.querySelector("#idlettersFail").innerHTML =
    "Wrong Guesses: " + lettersFail;
  var hangmanImgPath = "./assets/images/Hangman-" + attempts + ".png";
  document.getElementById("idhangman").src = hangmanImgPath;
  document.getElementById("idhangman").innerHTML = hangmanImgPath;

  if (attempts === 0) {
    document.querySelector("#idFinal").innerHTML = ":-( You lost.Try again";
    losses++;
    document.querySelector("#idtheword").innerHTML =
      "<strong><font color='red'>" + city + "</font></strong>";
    document.querySelector("#losses").textContent = losses;
    setTimeout(reset, 5000);
  }
}

function checkletters(userInput) {
  if (lCity.includes(userInput)) {
    var wordTemp = "";
    for (var i = 0; i < lCity.length; i++) {
      if (lCity[i] === userInput) {
        wordTemp += userInput;
      } else {
        wordTemp += word[i];
      }
    }
    word = wordTemp;

    document.querySelector("#idtheword").innerHTML = word;

    if (!word.includes("-")) {
      document.querySelector("#idFinal").innerHTML =
        "Congrats you won!. Try again";
      wins++;
      attempts = 0;
      document.querySelector("#idtheword").innerHTML =
        "<strong><font color='blue'>" + city + "</font></strong>";
      document.querySelector("#wins").innerHTML = wins;
      setTimeout(reset, 5000);
    }
  } else {
    attempts--;
    lettersFail += userInput;
    updateFail();
  }
}

document.onkeyup = function(event) {
  if (attempts > 0) {
    var userInput = event.key.toLowerCase();
    document.querySelector("#iderrors").innerHTML = "";

    if (alphabet.indexOf(userInput) === -1) {
      document.querySelector("#iderrors").innerHTML = "It's not a letter";
    } else {
      if (!word.includes(userInput) && !lettersFail.includes(userInput)) {
        checkletters(userInput);
      } else {
        document.querySelector("#iderrors").innerHTML = "Key repeated";
      }
    }
  }
};

reset();
