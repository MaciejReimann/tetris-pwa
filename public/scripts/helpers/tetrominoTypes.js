const {
    createPoint
} = require('./pointHelpers')

// Tetromino defined as an object with name property
// and their 4 squares' center points later referred 
// to as pivot;

const types = [
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
];

module.exports = function(colorPalette) {
    const editedTypes = types
        .map(type => type.centers
            .map(center => 
                createPoint(center.x, center.y, {name: type.name})
            )
        );
    const classicColors = ['cyan']
    function addColors(array, color) {        
        return array.map(
            type => type.centers.map(center => 
                Object.assign({}, center, {color: color})))
    }


    if(!colorPalette || colorPalette === 'classic') {
       return editedTypes;
    } else if(colorPalette === 'test') {
        return types.map(type => type.centers.map(center => Object.assign(center, {color: 'red'})))
    };
};