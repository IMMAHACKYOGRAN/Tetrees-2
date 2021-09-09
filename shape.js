class Shape {
    constructor() {
        this.I = {
            shape: [
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0]
                ]
        }

        this.O = {
            shape: [
                    [2, 2],
                    [2, 2]
                ]
        }

        this.L = {
            shape: [
                [0, 3, 0],
                [0, 3, 0],
                [0, 3, 3]
            ]
        }

        this.Z = {
            shape: [
                [0, 0, 0],
                [4, 4, 0],
                [0, 4, 4]
            ]
        }

        this.T = {
            shape: [
                [0, 0, 0],
                [5, 5, 5],
                [0, 5, 0]
            ]
        }

        this.J = {
            shape: [
                [0, 6, 0],
                [0, 6, 0],
                [6, 6, 0]
            ]
        }

        this.S = {
            shape: [
                [0, 0, 0],
                [0, 7, 7],
                [7, 7, 0]
            ]
        }

        this.colours = [
            '#00f0f0',
            '#f3f300',
            '#f0a000',
            '#f00000',
            '#a000f0',
            '#0000f0',
            '#00d800'
        ]
    }

    getDefaultShape(v) {
        var shape;
        switch(v) {
            case 0:
                break;
            case 1:
                shape = this.I;
                break;
            case 2:
                shape = this.O;
                break;
            case 3:
                shape = this.L;
                break;
            case 4:
                shape = this.Z;
                break;
            case 5:
                shape = this.T;
                break;
            case 6:
                shape = this.J;
                break;
            case 7:
                shape = this.S;
                break;
        }
        return shape;
    }

}

const shape = new Shape();