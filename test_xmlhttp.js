window.onload = function () {
  var data_file = "https://private-fc7bd7-daw3.apiary-mock.com/puzzle_images";
  var http_request = false;

  //Comprobar si se está usando Internet Explorer con try{…}catch(){…}
  try {
    //Internet Explorer 6.0 o superior, hasta el 8.0
    http_request = new ActiveXObject("Msxml2.XMLHTTP");
    alert("Está usando Internet Explorer 5.0, 6.0, 7.0 u 8.0");
  } catch (e) {
    //Si no, se trata de un Internet Explorer 5.0 o anterior
    try {
      http_request = new ActiveXObject("Microsoft.XMLHTTP");
      alert("Estás usando Internet Explorer 5.0 o inferior.");
    } catch (E) {
      //Se está usando un navegador IE moderno versiones 10 o 11
      http_request = false;
    }
  }
  //Si no se está usando IE, se crea una instancia JavaScript del objeto
  if (!http_request && typeof XMLHttpRequest != "undefined") {
    http_request = new XMLHttpRequest();
    alert("No estás usando Internet Explorer 8.0 o inferior.");
  }

  http_request.onreadystatechange = function () {
    if (http_request.readyState == 4 && http_request.status == 200) {
      // Javascript function JSON.parse to parse JSON data
      var jsonObj = JSON.parse(http_request.responseText);
      // jsonObj variable now contains the data structure and can
      // be accessed as jsonObj.name and jsonObj.country.
      document.getElementById("name").innerHTML = jsonObj.level1[0].image;
      document.getElementById("country").innerHTML = jsonObj.level1[1].image;
    }
  };
  http_request.open("GET", data_file);
  http_request.send();
};
