import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import { Ridge } from "../Classes/Ridge";
import { Pane } from 'tweakpane';


const Generator: React.FC = () => {
	let Settings = {
		Seed: 0,
		Amplitude: 100,
		Smoodness: 4,
		NumberOfRidges: 4,
		SpaceBetweenRidges: 100,
		BackRidgeColor: "#6a6a6e",
		FrontRidgeColor: "#000064",
		EnableMoon: true,
		MoonXPosition: 0,
		MoonYPosition: 0,
		MoonSize: 300
	}
	let canvas: HTMLCanvasElement;

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef).id("canvas");
		let date = new Date();
		Settings.Seed = date.getTime();
		Settings.MoonXPosition = p5.windowWidth / 10 * p5.random(2, 8);
		Settings.MoonYPosition = p5.windowHeight - Settings.SpaceBetweenRidges * Settings.NumberOfRidges - p5.noise(0) * Settings.Amplitude * 1.5;
		const pane = new Pane();
		const tabs = pane.addTab({
			pages: [
				{ title: "Settings" },
				{ title: "Export" } //todo
			]
		});
		let settingsTab = tabs.pages[0];
		// Seed
		settingsTab.addInput(Settings, "Seed").on("change", () => p5.redraw());
		// Montain settings
		let mountainFolder = settingsTab.addFolder({ title: "Mountain", expanded: true });
		// Montain settings - Amplitude
		mountainFolder.addInput(Settings, "Amplitude", { min: 0, max: 300, step: 5 }).on("change", () => p5.redraw());
		// Montain settings - Smoodness
		mountainFolder.addInput(Settings, "Smoodness", { min: 1, max: 12, step: 1 }).on("change", () => p5.redraw());
		// Montain settings - NumberOfRidges
		let numberOfRidgesInput = mountainFolder.addInput(
			Settings, "NumberOfRidges",
			{ min: 1, max: 10, step: 1 }
		);
		numberOfRidgesInput.label = "Quantity";
		numberOfRidgesInput.on("change", () => p5.redraw());
		// Montain settings - Space
		let spaceBetweenRidgesInput = mountainFolder.addInput(
			Settings, "SpaceBetweenRidges",
			{ min: 50, max: 200, step: 5 }
		);
		spaceBetweenRidgesInput.label = "Space";
		spaceBetweenRidgesInput.on("change", () => p5.redraw());
		// Montain settings - BackRidgeColor
		let backRidgeColorInput = mountainFolder.addInput(
			Settings, "BackRidgeColor"
		);
		backRidgeColorInput.label = "Back Color";
		backRidgeColorInput.on("change", () => p5.redraw());
		// Montain settings - BackRidgeColor
		let frontRidgeColorInput = mountainFolder.addInput(
			Settings, "FrontRidgeColor"
		);
		frontRidgeColorInput.label = "Front Color";
		frontRidgeColorInput.on("change", () => p5.redraw());
		// Moon toggle
		let enableMoonInput = settingsTab.addInput(Settings, "EnableMoon");
		enableMoonInput.label = "Moon"
		// Moon settings
		let moonFolder = settingsTab.addFolder({ title: "Moon", expanded: true });
		enableMoonInput.on("change", (e) => {
			moonFolder.hidden = !e.value;
			p5.redraw();
		});
		// Moon settings - MoonXPosition
		let moonXPositionInput = moonFolder.addInput(
			Settings, "MoonXPosition",
			{ min: 0, max: p5.windowWidth, step: 5 }
		);
		moonXPositionInput.label = "X Pos";
		moonXPositionInput.on("change", () => p5.redraw());
		// Moon settings - MoonXPosition
		let moonYPositionInput = moonFolder.addInput(
			Settings, "MoonYPosition",
			{ min: 0, max: p5.windowHeight, step: 5 }
		);
		moonYPositionInput.label = "Y Pos";
		moonYPositionInput.on("change", () => p5.redraw());
		// Moon settings - MoonXPosition
		let moonSizeInput = moonFolder.addInput(
			Settings, "MoonSize",
			{ min: 0, max: 1000, step: 5 }
		);
		moonSizeInput.label = "Size";
		moonSizeInput.on("change", () => p5.redraw());

		p5.noLoop();
		canvas = document.getElementById("canvas") as HTMLCanvasElement;
	};


	const draw = (p5: p5Types) => {
		p5.noiseSeed(Settings.Seed)
		let startColor = p5.color(Settings.BackRidgeColor);
		let endColor = p5.color(Settings.FrontRidgeColor);
		let colorDelta = 1 / Settings.NumberOfRidges;
		let lerpStart = 0;

		p5.background(51);

		if (Settings.EnableMoon) {
			p5.fill(230);
			let drawingContext = canvas.getContext("2d") as CanvasRenderingContext2D;
			drawingContext.shadowBlur = 50;
			drawingContext.shadowColor = 'white';
			p5.noStroke()
			p5.ellipse(Settings.MoonXPosition, Settings.MoonYPosition, Settings.MoonSize)
			drawingContext.shadowBlur = 0;
		}
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