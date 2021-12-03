'use strict';
var currentWindowLocation = { x: 0, y: 0 };
var bodyTargetLocation = { x: 0, y: 0 };
var boobaTargetLocation = { x: 0, y: 0 };
var boobaCurrentLocation = { x: 0, y: 0 };
var boobaVelocity = { x: 0, y: 0 };
const boobaTargetLocationOnBody = { x: 258, y: 433 };
var bodyToWindowSizeRatio = 0.8; //try to be 80% of the windows height or width, depending which is the most restrictive
const boobaDragCoef = 0.90;
const boobaPullPerPixel = 0.12;
const boobaPullFromWindow = -0.1;
const boobaPullFromAcceleration = 1;

let laSensor = null;

navigator.permissions.query({ name: 'accelerometer' })
.then(result => {
  if (result.state === 'denied') {
    console.log('Permission to use accelerometer sensor is denied.');
    return;
  }
  laSensor = new LinearAccelerationSensor({frequency: 60});
});

function update() {
	let body = document.getElementById("body");
	let booba = document.getElementById("booba");
	//ajust images size based on the window size
	var scaling = 1;
	if (body.naturalHeight / window.innerHeight > body.naturalWidth / window.innerWidth) {
		scaling = bodyToWindowSizeRatio * window.innerHeight / body.naturalHeight;
	} else if (body.naturalHeight / window.innerHeight < body.naturalWidth / window.innerWidth) {
		scaling = bodyToWindowSizeRatio * window.innerWidth / body.naturalWidth;
	}
	body.style.height = body.naturalHeight * scaling + "px";
	body.style.width = body.naturalWidth * scaling + "px";
	booba.style.height = booba.naturalHeight * scaling + "px";
	booba.style.width = booba.naturalWidth * scaling + "px";
	
	//calculate the window/phone movement
	let nextWindowLocation = {
		x: window.screenX,
		y: window.screenY
	}

	let windowsVelocity = {//Todo: Make a phone version of it
		x: nextWindowLocation.x - currentWindowLocation.x,
		y: nextWindowLocation.y - currentWindowLocation.y
	}
	
	currentWindowLocation = nextWindowLocation;
	
	//deal with the position stuff
	bodyTargetLocation.x = (window.innerWidth - body.naturalWidth * scaling) / 2;
	bodyTargetLocation.y = (window.innerHeight - body.naturalHeight * scaling) / 2;
	
	boobaTargetLocation = {
		x: bodyTargetLocation.x + boobaTargetLocationOnBody.x * scaling,
		y:bodyTargetLocation.y + boobaTargetLocationOnBody.y * scaling
	};
	
	boobaVelocity = {
		x: boobaVelocity.x * boobaDragCoef + windowsVelocity.x * boobaPullFromWindow + (boobaTargetLocation.x - boobaCurrentLocation.x) * boobaPullPerPixel + (laSensor?.x ?? 0 * boobaPullFromAcceleration),
		y: boobaVelocity.y * boobaDragCoef + windowsVelocity.y * boobaPullFromWindow + (boobaTargetLocation.y - boobaCurrentLocation.y) * boobaPullPerPixel + (laSensor?.y ?? 0 * boobaPullFromAcceleration)
	}
	
	body.style.left = (body.offsetLeft || bodyTargetLocation.x) + (bodyTargetLocation.x - body.offsetLeft) * 0.2 + "px";
	body.style.top = (body.offsetTop || bodyTargetLocation.y) + (bodyTargetLocation.y - body.offsetTop) * 0.2 + "px";
	
	if(boobaTargetLocation.x == 0 && boobaTargetLocation.y == 0){// first frame
		boobaCurrentLocation = boobaTargetLocation;
		boobaVelocity.x = 0;
		boobaVelocity.y = 0;
	} else {
		boobaCurrentLocation.x += boobaVelocity.x;
		boobaCurrentLocation.y += boobaVelocity.y;
	}
	
	booba.style.left = boobaCurrentLocation.x + "px";
	booba.style.top = boobaCurrentLocation.y + "px";

}

setTimeout(update);// Update after the page is loaded, but before the first frame. Removes the initial visual glitch
setInterval(update, 1000 / 60); //60 fps

