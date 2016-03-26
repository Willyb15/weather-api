$(document).ready(function(){

	var apiKey = "d7406b223ea5ae42946d0344fa0567fb";
	var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&APPID=" + apiKey;
	
	var weatherArray = [];

	
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
		
		var newHTML = ' ';
		var iconId = weatherData.weather[0].icon;
		var iconDes = weatherData.weather[0].description;
		var weatherIcon = "<img src=http://openweathermap.org/img/w/"+ iconId +".png>"
		var cityDefault = "Atlanta";
		var weatherHumid = "Humidity: " + weatherData.main.humidity;
		var weatherMax = "Max Temp: " + weatherData.main.temp_max;
		var weatherMin = "Min Temp " + weatherData.main.temp_min;
		var weatherPress = "Pressure: " + weatherData.main.pressure;
		var windSpeed = "Wind Speed: " + weatherData.wind.speed;
		
		console.log(iconId);
		console.log(weatherIcon);


		weatherArray.push(weatherHumid, weatherMax, weatherMin, weatherPress, windSpeed);
		for(var i=0; i<weatherArray.length; i++){
					
			newHTML += '<div class="col-sm-4 weather-info">';
			newHTML += '<p>' + weatherArray[i] + '</p>';
			newHTML += '</div>';	
		}
		newHTML += '<div class="col-sm-4 text-center weather-info"' + '<p>' + weatherIcon + iconDes + '<p>' + '</div>'; 
		newHTML += '<div class="row">'
		newHTML += '<div class="col-sm-12 text-center weather-info city"' + '<p>' + cityDefault + '<p>' + '</div>'; 
		newHTML += '</div>'
		newHTML +=	'<div class="col-sm-12 text-center weather-info">' + "<p>Current Temp: <p>" +'</div>';
		
		$('#weather-grid').html(newHTML);


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
			context.strokeStyle = shadeColor;
			context.beginPath();
			context.arc(155, 75, 70, Math.PI*1.5, (Math.PI*2 * current) + Math.PI*1.5);
			context.stroke();

			// set the font of our temperature  		
			context.font = "48px Myriad Pro";
			// set the font color of our temp to blue
			context.fillStyle = "#0000ff";
			context.textBaseLine = "bottom";
			context.fillText(currTemp, 175-70, (85-70)*6);
			currPerc+= .05;
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
		// console.log(searchURL);
		tempArray = [];

		$.getJSON(searchURL, function(cityData){
			var currTemp = cityData.main.temp;
			console.log(cityData);
			console.log(currTemp);
			var canvas = $('#current-temp');
			var context = canvas[0].getContext('2d');
			var currPerc = 0;
			var newHTML = ' ';
			var cityName = cityData.name;
			// console.log(cityData.name);
			var weatherHumid = "Humidity: " + cityData.main.humidity;
			var weatherMax = "Max Temp: " + cityData.main.temp_max;
			var weatherMin = "Min Temp " + cityData.main.temp_min;
			var weatherPress = "Pressure: " + cityData.main.pressure;
			var windSpeed = "Wind Speed: " + cityData.wind.speed;
			var iconId = cityData.weather[0].icon;
			var iconDes = cityData.weather[0].description;
			var weatherIcon = "<img src=http://openweathermap.org/img/w/"+ iconId +".png>"

			tempArray.push(weatherHumid, weatherMax, weatherMin, weatherPress, windSpeed);
			for(var i=0; i<tempArray.length; i++){
						
				newHTML += '<div class="col-sm-4 weather-info">';
				newHTML += '<p>' + tempArray[i] + '</p>';
				newHTML += '</div>';
			}
			newHTML += '<div class="col-sm-4 text-center weather-info"' + '<p>' + weatherIcon + iconDes + '<p>' + '</div>'; 
			newHTML += '<div class="row">'
			newHTML += '<div class="col-sm-12 text-center weather-info city"' + '<p>' + cityName + '<p>' + '</div>'; 
			newHTML += '</div>'	
			newHTML +=	'<div class="col-sm-12 text-center">' + "<p>Current Temp: <p>" +'</div>';
			
			$('#weather-grid').html(newHTML);


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


			function animate(current){
				context.clearRect(0,0,500,500);
				context.fillStyle = '#ccc';
				context.beginPath();
				context.arc(155,75, 65,0,2*Math.PI);
				context.closePath();
				context.fill();

				context.lineWidth = 10;
				context.strokeStyle = shadeColor;
				context.beginPath();
				context.arc(155, 75, 70, Math.PI*1.5, (Math.PI*2 * current) + Math.PI*1.5);
				context.stroke();

				// set the font of our temperature  		
				context.font = "48px Myriad Pro";
				// set the font color of our temp to blue
				context.fillStyle = "#0000ff";
				context.textBaseLine = "bottom";
				context.fillText("Current Temp", 175-20, (85-10)*6);
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


	