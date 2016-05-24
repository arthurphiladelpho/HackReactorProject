/**
* Flickr API
* First, we declare our beach variable in the global scope so it can be acessed by all functions.
*/

var beach;

/**
* Next, we declare our Flickr constructor function: this  function enables our Flickr API's 
* callback function to be a method of the window object and thus easily accessed by our getJSON
* function that generates the specific Flickr API URL for the user's selected location.
*/
function Flickr(beach) {
	this.init();
}

Flickr.prototype.init = function init() {
	window.getPhotos = this.getPhotos;
};

Flickr.prototype.getPhotos = function getPhotos(data) {

	var resultsHTML = '<h3>' + 'Recent Pictures at ' + beach + '</h3>'
	resultsHTML += '<ul>';

		// Create a list item for each picture
		for (var i = 0; i < data.items.length; i++) {
	 		resultsHTML += '<li class="images">';
			resultsHTML += '<a href="' + data.items[i]['link'] + ' " class="image">';
			resultsHTML += '<img src="' + data.items[i]['media']['m'] + ' "></a>';
			resultsHTML += '</li>';	
		}

		resultsHTML += '</ul>';
		pictures.innerHTML = resultsHTML;

};

/**
* This for loop makes all buttons create a specific URL when clicked. 
* This URL uses the button's text as the tag it searches for and the getPhotos function as the callback.
* The complete URL is then added to the document, this is done to overcome the browser's cross origin policy.
*/
for (var i = 0; i < buttons.length; i++) {

		document.getElementById(buttons[i].id).addEventListener('click', function() {

			beach = this.value;

			var getJSON = function() {

				var src = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=';
				src += beach;
				src += '&format=json&jsoncallback=getPhotos';
				var script = document.createElement('script');
				script.src = src;
				document.head.appendChild(script);
				document.head.removeChild(script);
				
			};

			getJSON();

			var flickrPics = new Flickr();

		});  	
}	