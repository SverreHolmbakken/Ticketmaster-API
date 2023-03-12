export default async function takeScreenshot() {
	var canvas = document.createElement('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
 
	var context = canvas.getContext('2d');
	
	var image = new Image();
	image.onload = function() {
	  console.log('Image loaded successfully');
	  context.drawImage(image, 0, 0, window.innerWidth, window.innerHeight, 0, 0, window.innerWidth, window.innerHeight);
	  var dataURL = canvas.toDataURL();
	  localStorage.setItem('screenshot', dataURL);
	  console.log('Screenshot saved in local storage');
	};
	image.onerror = function() {
	  console.log('Error loading image');
	};
	image.src = window.location.href;
 }