// Tetromino defined as an object with name property
// and their 4 squares' center points later referred 
// to as pivot;
module.exports = [
    {
        name: "I_type",
        centers: [
            { x: -1.5, y:  0.5 },
            { x: -0.5, y:  0.5 },
            { x:  0.5, y:  0.5 },
            { x:  1.5, y:  0.5 }
        ]
    },
    {
        name: "J_type",
        centers: [
            { x: -1.5, y: -0.5 },
            { x: -0.5, y: -0.5 },
            { x:  0.5, y: -0.5 },
            { x:  0.5, y:  0.5 }
        ]
    },
    {
        name: "L_type",
        centers: [
            { x: -0.5, y:  0.5 },
            { x: -0.5, y: -0.5 },
            { x:  0.5, y: -0.5 },
            { x:  1.5, y: -0.5 }
        ]
    },
    {
        name: "O_type",
        centers: [
            { x: -0.5, y: -0.5 },
            { x:  0.5, y: -0.5 },
            { x:  0.5, y:  0.5 },
            { x: -0.5, y:  0.5 }
        ]
    },
    {
        name: "S_type",
        centers: [
            { x: -0.5, y:  0.5 },
            { x:  0.5, y:  0.5 },
            { x:  0.5, y: -0.5 },
            { x:  1.5, y: -0.5 }
        ]
    },
    {
        name: "T_type",
        centers: [
            { x: -0.5, y: -0.5 },
            { x:  0.5, y: -0.5 },
            { x:  1.5, y: -0.5 },
            { x:  0.5, y:  0.5 }
        ]
    },
    {
        name: "T_type",
        centers: [
            { x: -0.5, y: -0.5 },
            { x:  0.5, y: -0.5 },
            { x:  0.5, y:  0.5 },
            { x:  1.5, y:  0.5 }
        ]
    }
]