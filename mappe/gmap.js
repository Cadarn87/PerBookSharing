(function ($) {
  Drupal.behaviors.mappe = {
    attach: function(context, settings) {
	  
	  

	  
	  if(document.getElementById("testomappa")){
	    var x = document.getElementById("testomappa");
	  }
	  
	  var locations =  [
					['Anagnina',41.842605, 12.586417],
					['Cinecittà',41.849413, 12.573865],
					['Subaugusta',41.853718, 12.567500],
					['Giulio Agricola',41.856627, 12.562661],
					['Lucio Sestio',41.859695, 12.557168],
					['Numidio Quadrato',41.862052, 12.552640],
					['Porta furba',41.863602, 12.548070],
					['Arco di travertino',41.865977, 12.536015],
					['Colli albani',41.869716, 12.529470],
					['Furio Camillo',41.874709, 12.522983],
					['Ponte lungo',41.877750, 12.519013],
					['Re di Roma',41.882153, 12.513857],
					['San Giovanni',41.885605, 12.509565],
					['Manzoni',41.890301, 12.506915],
					['Vittorio Emanuele',41.894510, 12.504437],
					['Repubblica',41.902188, 12.495825],
					['Barberini',41.903606, 12.488969],
					['Spagna',41.906547, 12.483055],
					['Flaminio',41.912708, 12.476386],
					['Lepanto',41.911453, 12.466481],
					['Ottaviano',41.909273, 12.458206],
					['Cipro',41.907695, 12.447519],
					['Valle Aurelia',41.902767, 12.441284],
					['Baldo degli Ubaldi',41.899112, 12.434394],
					['Cornelia',41.900477, 12.426216],
					['Battistini',41.906268, 12.414909],
					['Laurentina',41.827162, 12.480893],
					['Eur Fermi',41.828661, 12.470947],
					['Eur Palasport',41.830140, 12.466044],
					['Eur Magliana',41.839589, 12.463351],
					['Marconi',41.848780, 12.475571],
					['Basilica San Paolo',41.855952, 12.478375],
					['Garbatella',41.866512, 12.483178],
					['Piramide',41.875660, 12.482084],
					['Circo Massimo',41.883472, 12.487878],
					['Colosseo',41.891339, 12.491419],
					['Cavour',41.895051, 12.493818],
					['Termini',41.901031, 12.500149],
					['Castro pretorio',41.906191, 12.505501],
					['Policlinico',41.908685, 12.512212],
					['Metro bologna',41.913575, 12.520845],
					['Tiburtina',41.910090, 12.530265],
					['Quintiliani',41.914697, 12.539023],
					['Monti tiburtini',41.915942, 12.547606],
					['Pietralata',41.914936, 12.554912],
					['Santa maria del soccorso',41.915231, 12.561274],
					['Ponte mammolo',41.920883, 12.565233],
					['Rebibbia',41.925669, 12.572687],
					['S.Agnese/Annibaliano',41.923543, 12.516087],
					['Libia',41.931661, 12.519252],
					['Conca d oro',41.940368, 12.528511],
					['Jonio',41.947263, 12.527696],
					['Pantano',41.865612, 12.707644],
					['Graniti',41.865723, 12.697735],
					['Finocchio',41.865490, 12.687775],
					['Bolognetta',41.865234, 12.680946],
					['Borghesiana',41.864661, 12.666595],
					['Fontana candida',41.864858, 12.658159],
					['Grotte Celoni',41.862739, 12.646094],
					['Torre Gaia',41.864091, 12.635692],
					['Torre Angela',41.864240, 12.625675],
					['Torrenova',41.863335, 12.616862],
					['Giardinetti',41.863935, 12.610237],
					['Torre Maura',41.867315, 12.592484],
					['Torre spaccata',41.869288, 12.586540],
					['Alessandrino',41.871405, 12.578343],
					['Parco di Centocelle',41.874441, 12.568322],
					['Mirti',41.881265, 12.566388],
					['Gardenie',41.886161, 12.562021],
					['Teano',41.889638, 12.551296],
					['Malatesta',41.887398, 12.540540],
					['Pigneto',41.888597, 12.528213],
					['Lodi',41.886938, 12.518767]
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
		 var bounds = new google.maps.LatLngBounds();
		 bounds.extend(new google.maps.LatLng(lat, long));//mia posizione
		 bounds.extend(new google.maps.LatLng(minlat, minlong));//stazione più vicina
		 map.fitBounds(bounds);
		 
	  }//showPosition




    }
  };
})(jQuery);
