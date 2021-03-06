/// @ts-check
/// <reference path="./libraries/ts-types/global.d.ts" />


let ridgeFactor = 10;

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(51);
	//noFill();
	beginShape();
	stroke(255);
	vertex(0, windowHeight)
	let noiceOff = 0
	for (let x = 0; x < windowWidth; x += ridgeFactor) {
		let y = noise(noiceOff)*height;
		vertex(x, y);

		noiceOff += 0.01;
	}
	vertex(windowWidth, windowHeight);
	endShape();
	noLoop();
}