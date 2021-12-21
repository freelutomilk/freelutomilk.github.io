export default // Using js since json import are not a thing in vanilla js
	{
		"image": "./bodyParts/Rita/RitaBody.png",
		"bodyToWindowSizeRatio": 0.8,
		"index": 0,
		"parts": [
			{
				"type": "part",
				"image": "./bodyParts/Rita/RitaLen.png",
				"position": { "x": 823, "y": 317 },
				"index": 1,
				"physics": {
					"dragCoef": 0.91,
					"dragStatic": -0.051,
					"distancePull": 0.029,
					"windowMovePull": -0.049,
					"accelerationXPull": 0.81,
					"accelerationYPull": 0.79,
				},
				"parts": []
			},
			{
				"type": "part",
				"image": "./bodyParts/Rita/RitaRin.png",
				"position": { "x": 230, "y": 324 },
				"index": 1,
				"physics": {
					"dragCoef": 0.90,
					"dragStatic": -0.05,
					"distancePull": 0.03,
					"windowMovePull": -0.05,
					"accelerationXPull": 0.79,
					"accelerationYPull": 0.81,
				},
				"parts": []
			},
			{
				"type": "part",
				"image": "./bodyParts/Rita/RitaHaloBack.png",
				"position": { "x": 466, "y": 30 },
				"index": -1,
				"physics": {
					"dragCoef": 0.20,
					"dragStatic": 1,
					"distancePull": 0.35,
					"windowMovePull": -0.15,
					"accelerationXPull": 4,
					"accelerationYPull": 1.5,
					"hover": {
						"cycleTimeSecX": 10,
						"cycleTimeSecY": 6,
						"radiusX": 3,
						"radiusY": 20
					}
				},
				"parts": []
			},
			{
				"type": "part",
				"image": "./bodyParts/Rita/RitaHaloFront.png",
				"position": { "x": 466, "y": 30 },
				"index": 1,
				"physics": {
					"dragCoef": 0.20,
					"dragStatic": 1,
					"distancePull": 0.35,
					"windowMovePull": -0.15,
					"accelerationXPull": 4,
					"accelerationYPull": 1.5,
					"hover": {
						"cycleTimeSecX": 10,
						"cycleTimeSecY": 6,
						"radiusX": 3,
						"radiusY": 20
					},
				},
				"parts": []
			}
		]
	}
