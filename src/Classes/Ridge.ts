import p5Types from "p5";

export class Ridge{
    Fill: p5Types.Color;
    RidgeXStart: number;
    RidgeYStart: number;
    Smoodness: number;
    Amplitude: number;
    NoiceStart: number;
    
    constructor(Fill: p5Types.Color, RidgeYStart: number, Smoodness: number, Amplitude: number, NoiceStart: number) {
        this.Fill = Fill;
        this.RidgeXStart = 0;
        this.RidgeYStart = RidgeYStart;
        this.Smoodness = Smoodness;
        this.Amplitude = Amplitude;
        this.NoiceStart = NoiceStart;
    }

    DrawRidge(p5: p5Types) {
        p5.beginShape();
        p5.noStroke();
        p5.fill(this.Fill);
        p5.vertex(0, p5.windowHeight);
        p5.noiseDetail(this.Smoodness, 0.7)
        let noiceOffset = this.NoiceStart;
        let y = this.RidgeYStart - p5.noise(noiceOffset) * this.Amplitude;
        p5.vertex(0, y)
        for (let x = 0; x <= p5.windowWidth; x += 4) {
            p5.vertex(x, y);
            noiceOffset += 0.03;
            y = this.RidgeYStart - p5.noise(noiceOffset) * this.Amplitude ;
        }
        p5.vertex(p5.windowWidth, y);
        p5.vertex(p5.windowWidth, p5.windowHeight);
        p5.endShape(p5.CLOSE);
    }
}