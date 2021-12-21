"use strict";
import Part from "./part.js";

class Body {
	parent;
	anchor;
	img;
	bodyToWindowSizeRatio;
	parts = [];

	constructor({ image, bodyToWindowSizeRatio, parts }, parent) {
		this.anchor = document.createElement("div");
		this.anchor.className += " anchor";
		this.img = document.createElement("img");
		this.img.src = image;
		this.parent = parent;
		this.parent.appendChild(this.anchor);
		this.anchor.appendChild(this.img);
		this.bodyToWindowSizeRatio = bodyToWindowSizeRatio;
		this.Tick = this.Tick.bind(this);
		parts.forEach(partData => {
			let part = new Part(partData, this.anchor);
			this.parts.push(part);
		})
	}

	Tick(windowsVelocity, phoneMovement) {
		var scaling = 1;
		if (this.img.naturalHeight / window.innerHeight > this.img.naturalWidth / window.innerWidth) {
			scaling = this.bodyToWindowSizeRatio * window.innerHeight / this.img.naturalHeight;
		} else if (this.img.naturalHeight / window.innerHeight < this.img.naturalWidth / window.innerWidth) {
			scaling = this.bodyToWindowSizeRatio * window.innerWidth / this.img.naturalWidth;
		}
		this.img.style.height = this.img.naturalHeight * scaling + "px";
		this.img.style.width = this.img.naturalWidth * scaling + "px";
		var bodyTargetLocation = {};
		bodyTargetLocation.x = (window.innerWidth - this.img.naturalWidth * scaling) / 2;
		bodyTargetLocation.y = (window.innerHeight - this.img.naturalHeight * scaling) / 2;

		this.anchor.style.left = (this.anchor.offsetLeft || bodyTargetLocation.x) + (bodyTargetLocation.x - this.anchor.offsetLeft) * 0.2 + "px";
		this.anchor.style.top = (this.anchor.offsetTop || bodyTargetLocation.y) + (bodyTargetLocation.y - this.anchor.offsetTop) * 0.2 + "px";
		this.parts.forEach(part => {
			part.Tick(windowsVelocity, phoneMovement, scaling);
		})
	}
}

export default Body;
