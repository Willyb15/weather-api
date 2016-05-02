#Weather App created using an API and the ol' HTML Canvas tag
![alt text](ss.png "Description goes here")
### Retreived weather data from weathermap.org API
```js
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
```
###Using canvas created a dynamic arc coresponding to the current temperature.
```js
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
```
###Needs some styling love, but it's still pretty Sweet

