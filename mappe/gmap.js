(function ($) {
  Drupal.behaviors.mappe = {
    attach: function(context, settings) {
	  
	  
	  //if (Drupal.settings.myModule.nome === 'termini') {
		//alert('myModule '+Drupal.settings.myModule);
	  //}
	  
	  if(document.getElementById("testomappa")){
	    var x = document.getElementById("testomappa");
	  }
	  
	  var locations =  [
					['Termini',41.901031, 12.500149],
					['Tiburtina',41.910090, 12.530265],
					['Metro bologna',41.913575, 12.520845]
					];
					
	   //creo la mappa centrata su termini
	   var mapProp = {
		  center:new google.maps.LatLng(41.901031,12.500149),
		  zoom:15,
		  mapTypeId:google.maps.MapTypeId.ROADMAP
	   };
	   var map=new google.maps.Map(document.getElementById("gmap"),mapProp); 
	   
	   

	   
	   //metto i marker per le stazioni
	   for (var i = 0; i < locations.length; i++) {
	   
		 var marker = new google.maps.Marker({
		   position: new google.maps.LatLng(locations[i][1], locations[i][2]),
		   map: map,
		   title: locations[i][0]
		 });
		 
		 var content = locations[i][0]; 
		 var infowindow = new google.maps.InfoWindow();  
		 google.maps.event.addListener(marker, 'click', (function(marker,content) {  
			   return function() {   
				   infowindow.setContent(content);  
				   infowindow.open(map, marker);  
			   }  
			 })(marker,content));  

	   };

	   


		

	  if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	  } else {
		//x.innerHTML = "Geolocation is not supported by this browser.";
	  }
	  
	  function showPosition(position) {
		  //x.innerHTML = "Latitude: " + position.coords.latitude +"<br>Longitude: " + position.coords.longitude;
		  var lat = position.coords.latitude;
		  var long = position.coords.longitude;
		
		 //metto il marker sulla mia posizione
		 var marker=new google.maps.Marker({
		  position:new google.maps.LatLng(lat,long),
		  map:map,
		  title:'Ti trovi qui',
		  //icon:'blue_MarkerH.png'
		 });
		 
		 var infoWindow = new google.maps.InfoWindow({
		   content: 'Ti trovi qui',
		   maxWidth: 200,
		 });
		 
		 google.maps.event.addListener(marker, 'click', function() {
		   infoWindow.open(map,marker);
		 });
		 
		 //calcolo la stazione più vicina

		 
		 var minlat = locations[0][1];
		 var minlong = locations[0][2];
		 var minloc = locations[0][0];
		 var minlatlong = new google.maps.LatLng(locations[0][1],locations[0][2]);
		 var mylatlong = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
		 var mindist = google.maps.geometry.spherical.computeDistanceBetween(mylatlong, minlatlong);
		 //x.innerHTML = "distanza minima tra me("+ mylatlong + ") e "+ locations[0][0]+" ("+ minlatlong +") è" + mindist ;
		 for (var i = 1; i < locations.length; i++) {
		   var templatlong = new google.maps.LatLng(locations[i][1],locations[i][2]); 
		   var tempdist = google.maps.geometry.spherical.computeDistanceBetween(mylatlong, templatlong);
		   if(tempdist < mindist){
			minlat = locations[i][1];
			minlong = locations[i][2];
			mindist = tempdist;
			minloc = locations[i][0];
		   }else{
		   }
		 };
		 
		 if(document.getElementById("testomappa")){
	       x.innerHTML = "La stazione più vicina è "+ minloc + " ( " + minlat +" , " + minlong + "), si trova a "+mindist + " metri.";
		 }
		 
		 
		 //centro la mappa tra la mia posizione e la stazione più vicina
		 //DA FARE 
		 var bounds = new google.maps.LatLngBounds();
		 bounds.extend(new google.maps.LatLng(lat, long));//mia posizione
		 bounds.extend(new google.maps.LatLng(minlat, minlong));//stazione più vicina
		 map.fitBounds(bounds);
		 
	  }//showPosition




    }
  };
})(jQuery);
