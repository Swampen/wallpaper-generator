import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import QuickSettings from "quicksettings";

interface Props {
}

const Generator: React.FC<Props> = (props: Props) => {
	let Settings = {
		Amplitude: 100,
		Smoodness: 5,
		NumberOfRidges: 4,
		SpaceBetweenRidges: 100,
		MoonXPosition: 0,
		MoonYPosition: 0,
		MoonSize: 300
	}

	

	//See annotations in JS for more information
	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
		Settings.MoonXPosition = p5.windowWidth / 10 * p5.random(2, 8)
		Settings.MoonYPosition = p5.height - Settings.SpaceBetweenRidges * Settings.NumberOfRidges - p5.noise(0) * Settings.Amplitude * 1.5;

		let gui = QuickSettings.create(20, 20, "Settings")
		gui.bindRange("Amplitude", 0, 300, Settings.Amplitude, 1, Settings);
		gui.bindRange("Smoodness", 1, 50, Settings.Smoodness, 1, Settings);
		gui.bindRange("NumberOfRidges", 1, 10, Settings.NumberOfRidges, 1, Settings);
		gui.bindRange("SpaceBetweenRidges", 50, 500, Settings.SpaceBetweenRidges, 1, Settings);
		gui.bindRange("MoonXPosition", 0, p5.windowWidth, Settings.MoonXPosition, 1, Settings);
		gui.bindRange("MoonYPosition", 0, p5.windowHeight, Settings.MoonYPosition, 1, Settings);
		gui.bindRange("MoonSize", 0, 1000, Settings.MoonSize, 1, Settings);
		gui.setGlobalChangeHandler(() => p5.redraw());

		p5.noLoop()
	};


	const draw = (p5: p5Types) => {		
		let noiceOffset = 0;
		let redOffset = 0;
		let greenOffcet = 0;

		p5.background(51); 
		p5.fill(230);
		p5.ellipse(Settings.MoonXPosition, Settings.MoonYPosition, Settings.MoonSize)

		for (let i = Settings.NumberOfRidges; i >= 1; i--) {
			p5.beginShape();
			p5.noStroke();
			p5.vertex(0, p5.windowHeight);
			p5.fill(115 + redOffset, 46 + greenOffcet, 9);
			let y = p5.height - Settings.SpaceBetweenRidges * i - p5.noise(noiceOffset) * Settings.Amplitude;

			for (let x = 0; x <= p5.windowWidth; x += Settings.Smoodness) {
				p5.vertex(x, y);
				noiceOffset += 0.03;
				y = p5.height - Settings.SpaceBetweenRidges * i - p5.noise(noiceOffset) * Settings.Amplitude;

			}
			p5.vertex(p5.windowWidth, y);
			p5.vertex(p5.windowWidth, p5.windowHeight);
			p5.endShape();

			redOffset += 30;
			greenOffcet += 20;
		}
	};

	return (
		<div>
			<Sketch setup={setup} draw={draw} />
		</div>
	);
};

export default Generator;