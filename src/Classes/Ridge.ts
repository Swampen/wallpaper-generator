import p5 from "p5";

export class Ridge{
    Fill: p5.Color;
    RidgeXStart = 0
    RidgeYEnd: number;

    constructor(Fill: p5.Color, RidgeYEnd: number) {
        this.Fill = Fill,
        this.RidgeYEnd = RidgeYEnd
    }
}