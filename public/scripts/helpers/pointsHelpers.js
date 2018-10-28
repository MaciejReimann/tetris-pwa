
const merge = (obj1, obj2) => Object.assign({}, obj1, obj2);

function createPoint(x, y) {
    return {
        x: x,
        y: y
    };
};

function addTwoPoints(p1, p2) {
    return {
        x: p1.x + p2.x,
        y: p1.y + p2.y
    };
};

function multiplyPoint(p1, n) {
    return {
        x: p1.x * n,
        y: p1.y * n
    };
};

function arePointsEqual(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
};

// function isPointWithinRange(point, xMin, yMin, yMin, yMax) {
//     point.x > 
//     return {}
// }


module.exports = {
    createPoint,
    addTwoPoints,
    multiplyPoint,
    arePointsEqual
} 