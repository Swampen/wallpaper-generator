import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import QuickSettings from "quicksettings";
import { Ridge } from "../Classes/Ridge";

class InitialSettings {
	Amplitude = 100;
	Smoodness = 5;
	NumberOfRidges = 4;
	SpaceBetweenRidges = 100;
	RidgeColor = "#732e09";
	MoonXPosition = 0;
	MoonYPosition = 0;
	MoonSize = 300;
}

const Generator: React.FC = () => {
	let Settings = new InitialSettings()

	//See annotations in JS for more information
	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
		Settings.MoonXPosition = p5.windowWidth / 10 * p5.random(2, 8)
		Settings.MoonYPosition = p5.height - Settings.SpaceBetweenRidges * Settings.NumberOfRidges - p5.noise(0) * Settings.Amplitude * 1.5;

		let gui = QuickSettings.create(20, 20, "Settings")
		gui.bindRange("Amplitude", 0, 300, Settings.Amplitude, 1, Settings);
		gui.bindRange("Smoodness", 1, 10, Settings.Smoodness, 0.2, Settings);
		gui.bindRange("NumberOfRidges", 1, 10, Settings.NumberOfRidges, 1, Settings);
		gui.bindRange("SpaceBetweenRidges", 50, 200, Settings.SpaceBetweenRidges, 1, Settings);
		gui.bindColor("RidgeColor", "#732e09", Settings)
		gui.bindRange("MoonXPosition", 0, p5.windowWidth, Settings.MoonXPosition, 1, Settings);
		gui.bindRange("MoonYPosition", 0, p5.windowHeight, Settings.MoonYPosition, 1, Settings);
		gui.bindRange("MoonSize", 0, 1000, Settings.MoonSize, 1, Settings);
		gui.setGlobalChangeHandler(() => p5.redraw());

		p5.noLoop()
	};


	const draw = (p5: p5Types) => {		
		let color = p5.color(Settings.RidgeColor)
		let red = p5.red(color);
		let green = p5.green(color);
		let blue = p5.blue(color);
		let redOffset = 0;
		let greenOffcet = 0;

		p5.background(51); 
		p5.fill(230);
		p5.ellipse(Settings.MoonXPosition, Settings.MoonYPosition, Settings.MoonSize)
		for (let i = Settings.NumberOfRidges; i >= 1; i--) {
			let y = p5.height - Settings.SpaceBetweenRidges * i - 0.3 * Settings.Amplitude;
			let ridge = new Ridge(p5.color(red+redOffset, green + greenOffcet, blue), y, Settings.Smoodness, Settings.Amplitude, i^(i*10));
			ridge.DrawRidge(p5)

			redOffset += 30;
			greenOffcet += 20;
		}
	};

	const windowResized = (p5: p5Types) => {
		p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
	}

	return (
		<div>
			<Sketch setup={setup} draw={draw} windowResized={windowResized} />
		</div>
	);
};

export default Generator;