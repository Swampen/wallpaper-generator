/// @ts-check
/// <reference path="./libraries/ts-types/global.d.ts" />


let smoodness = 5;
let amplitude = 100;
let numberOfRidges = 4;

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(51);
	let spaceBetweenRidges = 100;
	let noiceOffset = 0;
	let redOffset = 0;
	let greenOffcet = 0;

	let moonHeight = height - spaceBetweenRidges*numberOfRidges - noise(noiceOffset) * amplitude*1.5;
	fill(230);
	ellipse(windowWidth/10*random(2, 8), moonHeight, 300)
	
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