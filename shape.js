class Shape {
    constructor() {
        this.I = {
            shape: [
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0]
                ],
            colour: '#00f0f0'
        }

        this.O = {
            shape: [
                    [1, 1],
                    [1, 1]
                ],
            colour: '#f3f300' 
        }

        this.L = {
            shape: [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 1]
            ],
            colour: '#f0a000'
        }

        this.Z = {
            shape: [
                [0, 0, 0],
                [1, 1, 0],
                [0, 1, 1]
            ],
            colour: '#f00000'
        }

        this.T = {
            shape: [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0]
            ],
            colour: '#a000f0'
        }

        this.J = {
            shape: [
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0]
            ],
            colour: '#0000f0'
        }

        this.S = {
            shape: [
                [0, 0, 0],
                [0, 1, 1],
                [1, 1, 0]
            ],
            colour: '#00d800'
        }
    }
}

const shape = new Shape();