"use strict";

class Part {
	parent;
	anchor;
	img;
	position;
	physics;
	partVelocity = { x: 0, y: 0 };

	constructor({ image, position, parts, index, physics }, parent) {
		this.anchor = document.createElement("div");
		this.anchor.className += " anchor";
		this.anchor.style["z-index"] = index;
		this.img = document.createElement("img");
		this.img.src = image;
		this.parent = parent;
		this.parent.appendChild(this.anchor);
		this.anchor.appendChild(this.img);
		this.position = position;
		this.physics = physics;
		this.Tick = this.Tick.bind(this);
	}

	Tick(windowsVelocity, phoneMovement, scaling) {
		this.img.style.height = this.img.naturalHeight * scaling + "px";
		this.img.style.width = this.img.naturalWidth * scaling + "px";

		let targetLocation;
		if (this.physics.hover) {
			let cycleOffset = {
				x: Math.sin(2 * Math.PI * (Date.now() % (this.physics.hover.cycleTimeSecX * 1000)) / (this.physics.hover.cycleTimeSecX * 1000) - Math.PI),
				y: Math.sin(2 * Math.PI * (Date.now() % (this.physics.hover.cycleTimeSecY * 1000)) / (this.physics.hover.cycleTimeSecY * 1000) - Math.PI)
			};
			targetLocation = {
				x: (this.position.x + cycleOffset.x * this.physics.hover.radiusX) * scaling,
				y: (this.position.y + cycleOffset.y * this.physics.hover.radiusY) * scaling
			};
		} else {
			targetLocation = {
				x: this.position.x * scaling,
				y: this.position.y * scaling
			};

		}


		let currentPosition = {
			x: this.anchor.getBoundingClientRect().left - this.parent.getBoundingClientRect().left,
			y: this.anchor.getBoundingClientRect().top - this.parent.getBoundingClientRect().top
		}

		this.partVelocity = {
			x: this.partVelocity.x * this.physics.dragCoef + windowsVelocity.x * this.physics.windowMovePull + (targetLocation.x - currentPosition.x) * this.physics.distancePull + phoneMovement.x * this.physics.accelerationXPull * scaling,
			y: this.partVelocity.y * this.physics.dragCoef + windowsVelocity.y * this.physics.windowMovePull + (targetLocation.y - currentPosition.y) * this.physics.distancePull + phoneMovement.y * this.physics.accelerationYPull * scaling
		};

		let nextPosition = {
			x: currentPosition.x + this.partVelocity.x,
			y: currentPosition.y + this.partVelocity.y
		};

		(["x", "y"]).forEach(axis => {
			if (this.partVelocity[axis] > 0) {
				if (this.partVelocity[axis] <= this.physics.dragStatic) {
					if (Math.abs(targetLocation[axis] - currentPosition[axis]) < this.physics.dragStatic) {// Prevent snapping when the part start moving
						this.partVelocity[axis] = 0;
						nextPosition[axis] = targetLocation[axis]
					}
				} else {
					this.partVelocity[axis] -= this.physics.dragStatic;
				}
			} else if (this.partVelocity[axis] < 0) {
				if (this.partVelocity[axis] >= -this.physics.dragStatic) {
					if (Math.abs(targetLocation[axis] - currentPosition[axis]) < this.physics.dragStatic) {
						this.partVelocity[axis] = 0;
						nextPosition[axis] = targetLocation[axis]
					}
				} else {
					this.partVelocity[axis] += this.physics.dragStatic;
				}
			}
		});


		this.anchor.style.left = nextPosition.x + "px";
		this.anchor.style.top = nextPosition.y + "px";

	}
}

export default Part;
