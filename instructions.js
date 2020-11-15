var instructionCounter = 0;

function nextInstruction() {
  instructionCounter++;

  var instructionParagraph = document.getElementById("paragraph");

  switch (instructionCounter) {
    case 1:
      instructionParagraph.innerHTML =
        "3. Para mover las piezas debes hacer click sobre la pieza que deseas mover y automáticamente se moverá a la posición vacía del rompecabezas. <br><br>  4. Si la pieza que deseas mover no está contigua a la posición vacía del rompecabezas, no se moverá. <br><br> ";
      break;
    case 2:
      instructionParagraph.style.display = "none";
      document.getElementById("startGameBtn").style.display = "inline";
      document.getElementById("ready").style.display = "inline";
      document.getElementById("btn").style.display = "none";
      break;
    default:
      break;
  }
}
