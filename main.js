/*
* Declared Functions
* Places constructor function -> will create an object for each location and add the object to an array.
*/
function Places(name, latitude, longitude, array) {
	this.name = name;
	this.latitude = latitude;
	this.longitude = longitude;
	this.spot = {};
	this.spot.lat = latitude;
	this.spot.lng = longitude;
	array.push(this);
}

// buttonMaker function -> will create a button for every place object.
function buttonMaker(place) {
	var button = document.createElement('button');
	var value = place.name;
	
	if (place.name == 'São Conrado') {
		button.id = 'Sao_Conrado';		
	} else {
		button.id = value;
	}

	button.value = value;
	var lat = place.latitude;
	var lng = place.longitude;
	var buttonText = document.createTextNode(place.name);

	button.onclick = function(){

		// When any button is clicked the website's title will change from Rio de Janeiro to the location selected.
		title.innerHTML = button.value;
		
		// Create 11 table rows to display our results.
		for (var i = 0; i <= 120; i += 12) {
			document.getElementById(i).innerHTML = '';
		}

		// This function creates the Forecast API URL and adds it to the document so we overcome the browser's cross origin policy.
		function forecastAPIURL(lat, lng, time, i) {
			var src = 'https://api.forecast.io/forecast/e964d33cde30c141523b46f7f27e0007/';
			src += lat;
			src += ',';
			src += lng;
			src += ',';
			src += time;
			src += '?callback=getWeather';
			var script = document.createElement('script');
			script.src = src;
			document.head.appendChild(script);
			var forecastResults = new Forecast();
			document.head.removeChild(script);
		}

		// This loop enables us to create URLS for all the time periods we define.
		function forecastAPIURLLoop(array) {
			time = Math.round((Date.now()/1000));
			for (var i = 0; i < 11; i++) {
				forecastAPIURL(lat, lng, time, i);
				time += 43200;
			}
		}

		forecastAPIURLLoop(rows);	

	};

	button.appendChild(buttonText);
	buttonContainer.appendChild(button);
	buttons.push(button);

}
// End of buttonMaker function.

// makeButtons function -> calls Button Maker function in every element in a give array (we use the array where we stored our places objects).
function makeButtons(array) {

	for (var i = 0; i < array.length; i++) {
		buttonMaker(array[i]);
	}

}

/*
* Our Forecast constructor function -> enables our Forecast API's callback function (getWeather)
* to be a method of the window object and thus easily accessed by our forecastAPIURL function
* (the function above that  generates the Forecast API URLs).
*/
function Forecast() {
	this.init();
}

Forecast.prototype.init = function init(){
	window.getWeather = this.getWeather;
};

Forecast.prototype.getWeather = function getWeather(data){

		//This chunk of code defines the time that will be displayed and converts it from Unix time to now and hours from now.
		var agora = Date.now()/1000;
		agora = Math.round(agora);
		var horario = data.currently.time;	
		var tempo = horario - agora;

		if (tempo >= 12) {
			tempo -= 3600;
		} else {
			tempo = 0;
		}

		tempo = Math.round(tempo/12)*12;

		if (tempo != 0) {
			tempo /= 3600;
			tempo += 1;
		}
		
		var html = '<td>' + 'In ' + tempo + ' hours ' +'</td><td>' + data.currently.summary + '</td><td>'  + Math.round(data.currently.temperature) + ' &#8457 </td><td>' + data.currently.windSpeed + ' mph </td><td>' + Math.round(data.currently.precipProbability * 100) + '% </td><td>' + Math.round(data.currently.humidity * 100) + '% </td><td>' + Math.round(data.currently.pressure) + ' mb </td>';
		document.getElementById(tempo).innerHTML = html;

};

// Declared Arrays and Variables
var container;
var logoDiv;
var logoImg;
var topbar;
var buttonContainer;
var titleDiv;
var title;
var map;
var thTr;
var results;
var pictures;
var footerDiv;
var footerImages;
var urca;
var copacabana;
var ipanema;
var leblon;
var sanca;
var joatinga;
var barra;
var reserva;
var macumba;
var recreio;
var prainha;
var grumari;
var guaratiba;
var markers = [];
var buttons =[];
var places = [];
var rows = [];
var moment = 0;
/*
* Wiring Things Together
*  A Container div -> to hold all elements in our html page.
*/
container = document.createElement('div');
container.id = 'container';

// A Logo Div -> contains website logo and name.
logoDiv = document.createElement('div');
logoDiv.id = 'logoDiv';
container.appendChild(logoDiv);
logoImg = document.createElement('img');
logoImg.id = 'logoImg';
logoImg.src = 'images/logo.png';
logoDiv.appendChild(logoImg);

// A topbar div -> holds our buttons, search bar and logo.
topbar = document.createElement('div');
topbar.id = 'topbar';
container.appendChild(topbar);

// A Button Container
buttonContainer = document.createElement('div');
buttonContainer.id = 'buttonContainer';
topbar.appendChild(buttonContainer);

// Create a title
titleDiv = document.createElement('div');
titleDiv.id = 'titleDiv';
container.appendChild(titleDiv);
title = document.createElement('h2');
title.id = 'title';
title.innerHTML = 'Rio de Janeiro';
titleDiv.appendChild(title);

// Create a Map div -> will hold our Google Maps map.
map = document.createElement('div');
map.id = 'map';
container.appendChild(map);

// A Results table -> holds results for the current moment.
results = document.createElement('table');
results.id = 'results';
container.appendChild(results);

// A row for our headers.
thTr = document.createElement('tr');
thTr.id = 'thTr';
results.appendChild(thTr);

// This for loop creates a row for every result to be displayed.
for (var i = 0; i <= 120; i += 12) {
	var tr = document.createElement('tr');
	tr.id = i;
	results.appendChild(tr);
}

// A Pictures table (div for now) -> hold our pictures for each place.
pictures = document.createElement('div');
pictures.id = 'pictures';
container.appendChild(pictures);

// A Footer div -> to finish out our website.
footerDiv = document.createElement('div');
footerDiv.id = 'footerDiv';
container.appendChild(footerDiv);	  
footerTitle = document.createElement('h4');
footerTitle.innerHTML = 'Powered by';
footerTitle.id = 'footerTitle';
footerDiv.appendChild(footerTitle);
footerImages = document.createElement('table');
footerImages.id = 'footerImages';
footerDiv.appendChild(footerImages);
footerImages.innerHTML = '<tr><td><img class="footerImages" src="images/flickr.png"></td><td><img class="footerImages" src="images/forecast.png"></td><td><img class="footerImages" src="images/maps.png"></td>';

// Create all location objects.
urca = new Places('Urca', -22.955430, -43.164800, places);
copacabana = new Places('Copacabana', -22.9689662, -43.1844084, places);
ipanema = new Places('Ipanema', -22.986450, -43.205995, places);
leblon = new Places('Leblon', -22.987649, -43.221640, places);
sanca = new Places('São Conrado', -22.999373, -43.264027, places);
joatinga = new Places('Joatinga', -23.014354, -43.290364, places);
barra = new Places('Barra', -23.012240, -43.323770, places);
reserva = new Places('Reserva', -23.012849, -43.388988, places);
macumba = new Places('Macumba', -23.033037, -43.4862847, places);  
recreio = new Places('Recreio', -23.028383, -43.464918, places);
prainha = new Places('Prainha', -23.040962, -43.505379, places);
grumari = new Places('Grumari', -23.048466, -43.524417, places);
guaratiba = new Places('Guaratiba', -23.067656, -43.567932, places);

// Here we call the Make Buttons function giving it our Places array. 
makeButtons(places);

document.body.appendChild(container);	

document.addEventListener('click', function() {
	document.getElementById('thTr').innerHTML = '<tr><th>Moment</th><th>Summary</th><th>Temperature</th><th>Wind Speed</th><th>Chance of Rain</th><th>Humidity</th><th>Pressure</th></tr>';
});		