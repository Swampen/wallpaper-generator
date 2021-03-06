/// @ts-check
/// <reference path="./libraries/ts-types/global.d.ts" />

var smoodness = 5;
var amplitude = 100;
var numberOfRidges = 4;
var moonXPosition = 0;

var gui;

function setup() {
	moonXPosition = windowWidth / 10 * random(2, 8)
	createCanvas(windowWidth, windowHeight);
	gui = createGui('Controlls');
	sliderRange(300, windowWidth-300)
	gui.addGlobals('moonXPosition')
	sliderRange(50, 200)
	gui.addGlobals('amplitude')
	sliderRange(2, 5)
	gui.addGlobals('numberOfRidges')

	noLoop();
}

function draw() {
	background(51);
	let spaceBetweenRidges = 100;
	let noiceOffset = 0;
	let redOffset = 0;
	let greenOffcet = 0;

	let moonYPosition = height - spaceBetweenRidges * numberOfRidges - noise(noiceOffset) * amplitude * 1.5;
	fill(230);
	ellipse(moonXPosition, moonYPosition, 300)

	for (let i = numberOfRidges; i >= 1; i--) {
		beginShape();
		noStroke();
		vertex(0, windowHeight);
		fill(115 + redOffset, 46 + greenOffcet, 9);
		
		for (let x = 0; x <= windowWidth; x += smoodness) {
			let y = height - spaceBetweenRidges*i - noise(noiceOffset) * amplitude;
			vertex(x, y);

			noiceOffset += 0.03;
		}
		vertex(windowWidth, windowHeight);
		endShape();

		redOffset += 30;
		greenOffcet += 20;
	}
	noLoop();
}