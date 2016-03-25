$(document).ready(function(){

	var apiKey = "d7406b223ea5ae42946d0344fa0567fb";
	var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&APPID=" + apiKey;

	$.getJSON(weatherURL, function(weatherData){
		console.log(weatherData);
		// we want temperature for starters. The temperature in their JSON is at:
		// weatherData.main
		var currTemp = weatherData.main.temp;
		console.log(currTemp);

		var canvas = $('#current-temp');
		var context = canvas[0].getContext('2d');
		console.log(context);
		var currPerc = 0;

		//Set up our circle and styling
		// set up our color based on temp (colder = bluer, hotter = redder)
		var shadeColor;
		if(currTemp < 32){
			shadeColor = '#D4F0FF';
		}else if((currTemp >= 32) && (currTemp < 59)){
			shadeColor = "#129793";
		}else if((currTemp >= 59) && (currTemp < 75)){
			shadeColor = "#7cfc00";
		}else if((currTemp >= 75) && (currTemp < 90)){
			shadeColor = "#FF6600";
		}else{
			shadeColor = '#E3170D';
		}
		// set up an animate function
		// update the appropriate variables
		function animate(current){
			context.fillStyle = '#ccc';
			context.beginPath();
			context.arc(155,75, 65,0,2*Math.PI);
			context.closePath();
			context.fill();

			context.lineWidth = 10;
			context.strokeStyle = "#ff0000";
			context.beginPath();
			context.arc(155, 75, 70, Math.PI*1.5, (Math.PI*2 * current) + Math.PI*1.5);
			context.stroke();

			// set the font of our temperature  		
			context.font = "48px Myriad Pro";
			// set the font color of our temp to blue
			context.fillStyle = "#0000ff";
			context.textBaseLine = "bottom";
			context.fillText(currTemp, 175-70, (85-70)*6);
			currPerc+= .01;
			if(currPerc < currTemp/100){
				requestAnimationFrame(function(){
					animate(currPerc);
				})
			}
		}
		animate();
	});

	
	
	$('#city-form').submit(function(event){
		var cityInput = $('#searchText').val();
		var searchURL = "http://api.openweathermap.org/data/2.5/weather?q=" + encodeURI(cityInput) + "&units=imperial&APPID=" + apiKey;
		console.log(searchURL);

		$.getJSON(searchURL, function(cityData){
			var currTemp = cityData.main.temp;
			console.log(currTemp);
			var canvas = $('#current-temp');
			var context = canvas[0].getContext('2d');
			console.log(context);
			var currPerc = 0;

			function animate(current){
				context.clearRect(0,0,500,500);
				context.fillStyle = '#ccc';
				context.beginPath();
				context.arc(155,75, 65,0,2*Math.PI);
				context.closePath();
				context.fill();

				context.lineWidth = 10;
				context.strokeStyle = "#ff0000";
				context.beginPath();
				context.arc(155, 75, 70, Math.PI*1.5, (Math.PI*2 * current) + Math.PI*1.5);
				context.stroke();

				// set the font of our temperature  		
				context.font = "48px Myriad Pro";
				// set the font color of our temp to blue
				context.fillStyle = "#0000ff";
				context.textBaseLine = "bottom";
				context.fillText(currTemp, 175-70, (85-70)*6);
				currPerc+= .01;
				if(currPerc < currTemp/100){
					requestAnimationFrame(function(){
						animate(currPerc);
					})
				}
			}
				
			animate();
		});
		event.preventDefault();
	});
		



});


	