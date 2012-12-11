	







function generateMarker(level,feeds,map,ov_){
	for(var i = 0; i<feeds.length; i++){

		var x = feeds[i].geo.coordinates[0];
		var y = feeds[i].geo.coordinates[1];

		var content = feeds[i].text;
		var username = feeds[i].from_user;

		// markers for level 0
		if(level == 0){

			var txt = username + ": " + content; 

			var point = new google.maps.LatLng(x, y);
			new google.maps.Marker({
				position: point,
				map: map,
				title: txt
			});
		}

		//markers for level 1
		else if(level == 1){

			var tempcanvas = document.createElement('canvas');
			processingInstance = new Processing(tempcanvas, drawObj);

			function drawObj(processing){

				processing.size(100, 100);
				processing.background(255,255,255);
				processing.fill(0, 0, 0);
				processing.noLoop();

				processing.text(content, 10, 10, 80, 80);

				var canvas = document.getElementById("canvas");
				
			}
			$("body").append(tempcanvas);


			var latlng = new google.maps.LatLng(x,y);
			var point = map.getProjection().fromLatLngToPoint(latlng);
			console.log(point);
			/*
			var url = tempcanvas.toDataURL();
			//var bounds = generateBounds(x,y,100,40);
			var swBound = new google.maps.LatLng(x,y);
			var neBound = new google.maps.LatLng(x,y);
			var bounds = new google.maps.LatLngBounds(swBound, neBound);

			var overlay ;
			USGSOverlay.prototype = new google.maps.OverlayView();
			overlay = new USGSOverlay(bounds, url, map);

			function USGSOverlay(bounds, image, map) {

				// Now initialize all properties.
				this.bounds_ = bounds;
				this.image_ = image;
				this.map_ = map;

				// We define a property to hold the image's
				// div. We'll actually create this div
				// upon receipt of the add() method so we'll
				// leave it null for now.
				this.div_ = null;

				// Explicitly call setMap() on this overlay
				this.setMap(map);
			}


			USGSOverlay.prototype.onAdd = function() {

				// Note: an overlay's receipt of onAdd() indicates that
				// the map's panes are now available for attaching
				// the overlay to the map via the DOM.

				// Create the DIV and set some basic attributes.
				var div = document.createElement('div');
				div.style.border = "none";
				div.style.borderWidth = "0px";
				div.style.position = "absolute";

				// Create an IMG element and attach it to the DIV.
				var img = document.createElement("img");
				img.src = this.image_;
				img.style.width = "100%";
				img.style.height = "100%";
				div.appendChild(img);

				// Set the overlay's div_ property to this DIV
				this.div_ = div;

				// We add an overlay to a map via one of the map's panes.
				// We'll add this overlay to the overlayImage pane.
				var panes = this.getPanes();
				panes.overlayLayer.appendChild(div);
			}
			USGSOverlay.prototype.draw = function() {

				// Size and position the overlay. We use a southwest and northeast
				// position of the overlay to peg it to the correct position and size.
				// We need to retrieve the projection from this overlay to do this.
				var overlayProjection = this.getProjection();

				// Retrieve the southwest and northeast coordinates of this overlay
				// in latlngs and convert them to pixels coordinates.
				// We'll use these coordinates to resize the DIV.
				var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
				var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

				// Resize the image's DIV to fit the indicated dimensions.
				var div = this.div_;
				div.style.left = sw.x + 'px';
				div.style.top = ne.y + 'px';
				div.style.width = (ne.x - sw.x) + 'px';
				div.style.height = (sw.y - ne.y) + 'px';
			}
			USGSOverlay.prototype.onRemove = function() {
				this.div_.parentNode.removeChild(this.div_);
				this.div_ = null;
			}
			// Note that the visibility property must be a string enclosed in quotes
			USGSOverlay.prototype.hide = function() {
				if (this.div_) {
					this.div_.style.visibility = "hidden";
				}
			}

			USGSOverlay.prototype.show = function() {
				if (this.div_) {
					this.div_.style.visibility = "visible";
				}
			}

			USGSOverlay.prototype.toggle = function() {
				if (this.div_) {
					if (this.div_.style.visibility == "hidden") {
						this.show();
					} else {
						this.hide();
					}
				}
			}

			USGSOverlay.prototype.toggleDOM = function() {
				if (this.getMap()) {
					this.setMap(null);
				} else {
					this.setMap(this.map_);
				}
			}
*/



		}

		//markers for level 2
		else if(level == 2){


		}
	}

}