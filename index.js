'use strict';
import LutoModel from "./bodyDescriptors/luto.js";
import RitaModel from "./bodyDescriptors/rita.js";
import Body from "./body.js";

const Models = { LutoModel, RitaModel };

var currentWindowLocation = { x: 0, y: 0 };

let laSensor = null;

navigator.permissions.query({ name: 'accelerometer' })
	.then(result => {
		if (result.state === 'denied') {
			console.log('Permission to use accelerometer sensor is denied.');
			return;
		}
		laSensor = new LinearAccelerationSensor({ frequency: 60 });
		laSensor.start();
	});

setTimeout(() => {
	//Instructions
	let instructionText = document.getElementById("instructionText");
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		instructionText.innerText = "Mobile mode detected, shake your phone/tablet around to trigger the totally accurate physics";
	} else {
		instructionText.innerText = "Desktop mode detected, move the window around your monitor(s) to trigger the totally accurate physics";
	}

	let closeButton = document.getElementById("instructionClose");
	closeButton.addEventListener("click", function () {
		let instruction = document.getElementById("instruction");
		instruction.remove();
	});
});

var elementsToTick = [];

function GenerateBody(bodyData, parent) {
	elementsToTick = [];
	parent.innerHTML = "";
	let body = new Body(bodyData, parent);
	elementsToTick.push(body);

}

function tick() {
	//calculate the window/phone movement
	let nextWindowLocation = {
		x: window.screenX,
		y: window.screenY
	}

	let windowsVelocity = {
		x: nextWindowLocation.x - currentWindowLocation.x,
		y: nextWindowLocation.y - currentWindowLocation.y
	}
	currentWindowLocation = nextWindowLocation;

	let phoneMovement;
	if (laSensor?.activated) {
		switch (screen.orientation.angle) {
			case 0:
				phoneMovement = {
					x: -laSensor.x,
					y: -laSensor.y
				}
				break;
			case 90:
				phoneMovement = {
					x: laSensor.y,
					y: -laSensor.x
				}
				break
			case 180:
				phoneMovement = {
					x: laSensor.x,
					y: laSensor.y
				}
				break
			case 270:
				phoneMovement = {
					x: -laSensor.y,
					y: laSensor.x
				}
				break
			default:// How the heck did you get here
				phoneMovement = {// default to normal orientation because what device do you have to allow non 90 degree rotation
					x: -laSensor.x,
					y: -laSensor.y
				}
				break;
		}
	} else {
		phoneMovement = { x: 0, y: 0 };
	}

	elementsToTick.forEach(element => {
		element.Tick(windowsVelocity, phoneMovement);
	});
}

let selector = document.getElementById("ModelSelect");
selector.onchange = (e) => {
	console.log(e.target.value);
	GenerateBody(Models[e.target.value], document.getElementById("BodyContainer"))
}

GenerateBody(LutoModel, document.getElementById("BodyContainer"));
setTimeout(tick);// Update after the page is loaded, but before the first frame. Removes the initial visual glitch
setInterval(tick, 1000 / 60); //60 fps

