


var cities = ["NewYork", "LosAngeles", "Chicago", "Houston" , "Phoenix", "Philadelphia", "SanAntonio", "SanDiego", "Dallas", "SanJose", "Austin", "Jacksonville", "SanFrancisco", "Columbus", "FortWorth", "Indianapolis", "Charlotte", "Seattle", "Denver", "Washington", "Boston", "ElPaso", "Detroit", "Nashville", "Memphis", "Portland", "OklahomaCity", "LasVegas", "Louisville", "Baltimore", "Milwaukee", "Albuquerque", "Tucson", "Fresno", "Sacramento", "Mesa", "KansasCity", "Atlanta", "LongBeach", "Omaha", "Raleigh", "ColoradoSprings", "Miami", "VirginiaBeach", "Oakland", "Minneapolis", "Tulsa", "Arlington", "NewOrleans", "Wichita"];

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  

var city = cities[Math.floor(Math.random() * cities.length)];

console.log(city);

var lCity = city.toLowerCase();
var arraylCity = lCity.split('');


var arrayCity = city.split(" ");
var numberWords = arrayCity.length;

var attempts = 0;
var lettersFail = [];
var gameEnded = false;


var img = "./assets/images/" + city + ".jpg";
document.getElementById("idimg").src = img;
document.getElementById("idimg").innerHTML = img;

var hangmanImgPath = "./assets/images/Hangman-0.png";
document.getElementById("idhangman").src = hangmanImgPath;
document.getElementById("idhangman").innerHTML = hangmanImgPath;

document.querySelector("#idFail").innerHTML = "Attempts failed: " + attempts;
document.querySelector("#idlettersFail").innerHTML = "Misses:";

function reset() {
//  reset word array
attempts = 0
}


    var nlfirstWord = city.length;
    document.querySelector("#idfirstWord").innerHTML = "Number of letters: " + nlfirstWord;
    
    var word = [];
  
    for (var i = 0; i < nlfirstWord; i++) { 
       
        word.push("-");
        }

    document.querySelector("#idtheword").innerHTML = "City: " + word;
  

// FUNCTIONS
//==============================================================

    // Function that updates fails
    function updateFail() {
        document.querySelector("#idFail").innerHTML = "Attempts failed: " + attempts;
        document.querySelector("#idlettersFail").innerHTML = "Misses: " + lettersFail;
        var hangmanImgPath = "./assets/images/Hangman-" + attempts + ".png"
        document.getElementById("idhangman").src = hangmanImgPath;
        document.getElementById("idhangman").innerHTML = hangmanImgPath;
    }  

    function checkletters(userInput) {
 
        var lettersFounded = "";
        var letterPosition = [];
        var nlettersFounded = 0;
     
        for (var i = 0; i < lCity.length; i++) {
            if (lCity[i] === userInput) {
       
                lettersFounded =  lettersFounded + userInput;
                letterPosition.push(i);
            }
        }
     
        nlettersFounded = lettersFounded.length;
    

        if (nlettersFounded ===  0 ) {
            attempts++
            lettersFail.push(userInput);
            updateFail();
        }
        else {
        
            for (var i = 0; i < lCity.length; i++) {
                var n = (letterPosition.indexOf(i));

                if (n !== -1) {
                    word[i] = userInput;
                }
            }
     
            document.querySelector("#idtheword").innerHTML = "City: " + word;
        }
    }
// MAIN PROCESS
//==============================================================


    // When the user presses a key, it will run the following function...
    document.onkeyup = function(event) {
        var userInput = event.key.toLowerCase();

       if (alphabet.indexOf(userInput) === -1){

        document.querySelector("#iderrors").innerHTML = "It's not a letter";
       }
        else {  
            if (gameEnded){ 
                document.querySelector("#endgame").innerHTML = "GAME HAS ENDED, IF YOU WANT TO PLAY RELOAD THE PAGE";
            }
            else {      
                var rletterFail = (lettersFail.indexOf(userInput));
                var rletterNofail = (word.indexOf(userInput));

                document.querySelector("#iderrors").innerHTML = " ";

                if (rletterFail === -1 && rletterNofail === -1) {
                    checkletters(userInput);

                    if (word.toString() === arraylCity.toString()) {
                        document.querySelector("#idFinal").innerHTML = "Congrats you won!. <br> Game Over!";
                        gameEnded = true;
                        //reset()
                    }

                    if (attempts === 6) {
                        document.querySelector("#idFinal").innerHTML = ":-( You lost. <br> Game Over!";
                        gameEnded = true;
                        //reset()
                    }
                
                }
                else {
                    document.querySelector("#iderrors").innerHTML = "Key repeated";
                }
            }
        }
    }
