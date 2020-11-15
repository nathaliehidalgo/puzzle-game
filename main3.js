var subLevel = 0;

var mySettings = {
  shuffle: true,
  rows: 5,
  cols: 5,
  control: {
    shufflePieces: true, // display 'Shuffle' button [true|false]
    confirmShuffle: true, // ask before shuffling [true|false]
    toggleOriginal: true, // display 'Original' button [true|false]
    toggleNumbers: false, // display 'Numbers' button [true|false]
    counter: true, // display moves counter [true|false]
    timer: true, // display timer (seconds) [true|false]
    pauseTimer: true, // pause timer if 'Original' button is activated
  },
  success: {
    callback: function (results) {
      onPuzzleCompleted();
    },
  },
};

// define your own texts
var myTexts = {
  shuffleLabel: "Barajear",
  toggleOriginalLabel: "Original",
  toggleNumbersLabel: "Numeros",
  confirmShuffleMessage: "Segur@ que quieres barajear?",
  movesLabel: " Movimientos",
  secondsLabel: " Segundos",
};

$(document).ready(function () {
  // define your own settings

  // call jqPuzzle with mySettings and myTexts on images with class 'myPics'
  $(".customPuzzle").jqPuzzle(mySettings, myTexts);
});

function onLevelFinished() {
  location.href = "final.html";
}

function onPuzzleCompleted() {
  subLevel++;
  if (subLevel > 4) {
    $("#puzzleContainer").append(
      '<button id="completed" onClick="onLevelFinished()"> ¡Finalizar! </button>'
    );
  } else {
    getNextPuzzle(subLevel);
  }
}

function getNextPuzzle(subLevel) {
  var data_file = "https://private-fc7bd7-daw3.apiary-mock.com/puzzle_images";
  var http_request = false;

  //Comprobar si se está usando Internet Explorer con try{…}catch(){…}
  try {
    //Internet Explorer 6.0 o superior, hasta el 8.0
    http_request = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    //Si no, se trata de un Internet Explorer 5.0 o anterior
    try {
      http_request = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      //Se está usando un navegador IE moderno versiones 10 o 11
      http_request = false;
    }
  }
  //Si no se está usando IE, se crea una instancia JavaScript del objeto
  if (!http_request && typeof XMLHttpRequest != "undefined") {
    http_request = new XMLHttpRequest();
  }

  http_request.onreadystatechange = function () {
    if (http_request.readyState == 4 && http_request.status == 200) {
      $("#puzzleImage").remove();
      // Javascript function JSON.parse to parse JSON data
      var jsonObj = JSON.parse(http_request.responseText);
      // jsonObj variable now contains the data structure and can
      // be accessed as jsonObj.name and jsonObj.country.

      var nextImage = jsonObj.level3[subLevel].image;

      $("#puzzleContainer").prepend(
        '<img id="puzzleImage" src="' +
          nextImage +
          '" alt="Puzzle" class="customPuzzle" />'
      );
      $(".customPuzzle").jqPuzzle(mySettings, myTexts);
    }
  };
  http_request.open("GET", data_file);
  http_request.send();
}
