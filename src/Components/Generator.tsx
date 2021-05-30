import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import { Ridge } from "../Classes/Ridge";
import * as dat from "dat.gui"

const Generator: React.FC = () => {
	let Settings = {
		Seed: 0,
		Amplitude: 100,
		Smoodness: 4,
		NumberOfRidges: 4,
		SpaceBetweenRidges: 100,
		BackRidgeColor: "#6a6a6e",
		FrontRidgeColor: "#000064",
		MoonXPosition: 0,
		MoonYPosition: 0,
		MoonSize: 300
	}
	let canvas: HTMLCanvasElement;

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef).id("canvas");
		Settings.Seed = p5.random(-99999, 99999)
		Settings.MoonXPosition = p5.windowWidth / 10 * p5.random(2, 8)
		Settings.MoonYPosition = p5.windowHeight - Settings.SpaceBetweenRidges * Settings.NumberOfRidges - p5.noise(0) * Settings.Amplitude * 1.5;
		let gui = new dat.GUI();
		gui.useLocalStorage = true;
		gui.add(Settings, "Seed", -99999, 99999, 5).onChange(() => p5.redraw());
		let mountainsSettings = gui.addFolder("Mountains");
		mountainsSettings.open();
		mountainsSettings.add(Settings, "Amplitude", 0, 300, 5).onChange(() => p5.redraw());
		mountainsSettings.add(Settings, "Smoodness", 1, 12, 1).onChange(() => p5.redraw());
		mountainsSettings
			.add(Settings, "NumberOfRidges", 1, 10, 1)
			.name("Number of Ridges")
			.onChange(() => p5.redraw());
		mountainsSettings
			.add(Settings, "SpaceBetweenRidges", 50, 200, 5)
			.name("Space")
			.onChange(() => p5.redraw());
		mountainsSettings.addColor(Settings, "BackRidgeColor")
			.name("Back Color")
			.onChange(() => p5.redraw());
		mountainsSettings.addColor(Settings, "FrontRidgeColor")
			.name("Front Color")
			.onChange(() => p5.redraw());
		let moonSettings = gui.addFolder("Moon");
		moonSettings.open();
		moonSettings
			.add(Settings, "MoonXPosition", 0, p5.windowWidth, 1)
			.name("X Pos")
			.onChange(() => p5.redraw());
		moonSettings
			.add(Settings, "MoonYPosition", 0, p5.windowHeight, 1)
			.name("Y Pos")
			.onChange(() => p5.redraw());
		moonSettings
			.add(Settings, "MoonSize", 0, 1000, 1)
			.name("Size")
			.onChange(() => p5.redraw());

		p5.noLoop()

		canvas = document.getElementById("canvas") as HTMLCanvasElement;
	};


	const draw = (p5: p5Types) => {
		p5.noiseSeed(Settings.Seed)
		let startColor = p5.color(Settings.BackRidgeColor);
		let endColor = p5.color(Settings.FrontRidgeColor);
		let colorDelta = 1 / Settings.NumberOfRidges;
		let lerpStart = 0;

		p5.background(51);
		p5.fill(230);
		let drawingContext = canvas.getContext("2d") as CanvasRenderingContext2D;
		drawingContext.shadowBlur = 50;
		drawingContext.shadowColor = 'white';
		p5.noStroke()
		p5.ellipse(Settings.MoonXPosition, Settings.MoonYPosition, Settings.MoonSize)
		drawingContext.shadowBlur = 0;
		for (let i = Settings.NumberOfRidges; i >= 1; i--) {
			let color = p5.lerpColor(startColor, endColor, lerpStart)
			let y = p5.height - Settings.SpaceBetweenRidges * i - 0.3 * Settings.Amplitude;
			let ridge = new Ridge(color, y, Settings.Smoodness, Settings.Amplitude, Settings.Seed * i);
			ridge.DrawRidge(p5)
			lerpStart += colorDelta
		}
	};

	const windowResized = (p5: p5Types) => {
		p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
	}

	return (
		<Sketch setup={setup} draw={draw} windowResized={windowResized} />
	);
};

export default Generator;