var map;

function initMap() {

	// Create Google Maps map
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat:-22.98, lng: -43.26},
	  zoom: 12
	});    

	// Create Google Maps Markers
	for (var i = 0; i < places.length; i++) {
  	var name = places[i]['name'];
  	var label = name.charAt(0);
    var marker = new google.maps.Marker({
	    position: places[i]['spot'],
	    map: map,
	    title: name,
	    id : label,
	    label: label,
	    animation: google.maps.Animation.DROP
		});

  	// Add Zoom Functionality
		marker.addListener('click', function() {
			map = marker.getMap();
			map.setZoom(16);
			map.setCenter(this.getPosition());
		});

		// Add Zoom Out Functionality
		marker.addListener('dblclick', function() {
			map = marker.getMap();
			map.setZoom(12);
			map.setCenter({lat:-22.98, lng: -43.26});
		});

		// Group Markers in an Array
		markers.push([marker, places[i]['name']]);
	} 
} 

// Create functionality to make Google Maps zoom look nicer
function smoothZoom(map, zoom, count) {

	if (count >= zoom) {
		return	
	}	else {

		var z = google.maps.event.addListener(map, 'zoom_changed', function(event) {
			google.maps.event.removeListener(z);
			self.smoothZoom(map, zoom, count + 1);
		});

		setTimeout( function() {
			map.setZoom(count)
		}, 100);

	}

}

function smoothZoomOut (map, zoom, count) {

	if (count >= zoom) {

		var z = google.maps.event.addListener(map, 'zoom_changed', function(event){

			google.maps.event.removeListener(z);
			self.smoothZoomOut(map, zoom, count - 1);
			
		});

		setTimeout( function() {
			map.setZoom(count)
		}, 100);

	}	else {

		return

	}		

}

// Add zoom functionality to all buttons.
for (var i = 0; i < buttons.length; i++) {

	document.getElementById(buttons[i].id).addEventListener('click', function() {

		var btnValue = this.value;

		for (var i = 0; i < places.length; i++) {

			if (btnValue === places[i]['name']) {
				btnValue = places[i]['spot'];
			}

		}

		if (map.zoom <= 12) {
			map.setCenter(btnValue);
			smoothZoom(map, 16, map.getZoom());
		} else {
			map.setCenter(btnValue);
			smoothZoomOut(map, 12, map.getZoom());
		}	
		
	});
	  		
}