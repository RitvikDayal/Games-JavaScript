var hangman = {
  /* [GAME SETTINGS] */
  // Total number of allowed guesses before hanging
  guesses : 6, 
  // Available words for guessing
  // You might want to dynamically load this
  dictionary : ["impress", "incapable", "satisfaction", "develop", "determine"], 

  /* [FLAGS] */
  // Current chosen word
  word : null,
  // Word length
  wordlen : 0,
  // Current number of correct words
  rights : 0,
  // Current number of wrong guesses
  wrongs : 0,
  // HTML reference to hangman IMG
  elImg : null,
  // HTML reference to words DIV
  elWord : null,
  // HTML reference to characters DIV
  elChar : null,
  // HTML reference to lives left
  elLives : null,

  init : function () {
  // init() : game initialization

    // Get HTML elements
    hangman.elImg = document.getElementById("hangman-img");
    hangman.elWord = document.getElementById("hangman-words");
    hangman.elChar = document.getElementById("hangman-char");
    hangman.elLives = document.getElementById("hangman-lives");

    // - @TODO -
    // The dictionary can get pretty massive...
    // You might want to dynamically load more dictionaries from a file via AJAX.

    // Generate available characters
    var charwrap = document.getElementById("hangman-char");
    for (var i=65; i<91; i++) {
      var charnow = document.createElement("input");
      charnow.type = "button";
      charnow.value = String.fromCharCode(i);
      charnow.disabled = true;
      charnow.addEventListener("click", hangman.check);
      charwrap.appendChild(charnow);
    }

    // Start game
    hangman.reset();
    document.getElementById("hangman-reset").addEventListener("click", hangman.reset);
    document.getElementById("hangman-reset").disabled = false;
  },

  toggle : function (disable) {
  // toggle() : toggle enable/disable character select
  // PARAM disable : enable or disable buttons

    var all = document.querySelectorAll("#hangman-char input");
    for (var i of all) {
      i.disabled = disable;
    }
  },

  reset : function () {
  // reset() : reset the game

    // Reset stats
    hangman.rights = 0;
    hangman.wrongs = 0;
    hangman.elLives.innerHTML = hangman.guesses;
    hangman.elImg.style.opacity = 0;

    // Choose a random word from the dictionary
    hangman.word = hangman.dictionary[Math.floor(Math.random() * Math.floor(hangman.dictionary.length))];
    hangman.word = hangman.word.toUpperCase();
    hangman.wordlen = hangman.word.length;

    // Draw the blanks
    hangman.elWord.innerHTML = "";
    for (var i=0; i<hangman.word.length; i++) {
      var charnow = document.createElement("span");
      charnow.innerHTML = "_";
      charnow.id = "hangword-" + i;
      hangman.elWord.appendChild(charnow);
    }

    // Enable controls
    hangman.toggle(false);
  },

  check : function () {
  // check() : check if selected character is in the word

    // Check for hits
    var index = 0, hits = [];
    while (index >= 0) {
      index = hangman.word.indexOf(this.value, index);
      if (index == -1) { break; }
      else { 
        hits.push(index);
        index++;
      }
    }

    // Show the hits + calculate score
    if (hits.length > 0) {
      // Reveal words
      for (var hit of hits) {
        document.getElementById("hangword-" + hit).innerHTML = this.value;
      }

      // All hit - WIN!
      hangman.rights += hits.length;
      if (hangman.rights == hangman.wordlen) {
        hangman.toggle(true);
        alert("YOU WIN!");
      }
    } else {
      // Wrong - strike life off & show hangman
      hangman.wrongs++;
      var livesleft = hangman.guesses - hangman.wrongs;
      hangman.elLives.innerHTML = livesleft;
      hangman.elImg.style.opacity = (1 - (livesleft/hangman.guesses)).toFixed(2);

      // Run out of guesses - LOSE!
      if (hangman.wrongs == hangman.guesses) {
        hangman.toggle(true);
        alert("YOU LOSE!");
      }
    }

    // Disable selected character
    this.disabled = true;
  }
};

window.addEventListener("load", hangman.init);