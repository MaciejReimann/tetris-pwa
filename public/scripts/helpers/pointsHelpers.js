


function createPoint(x, y) {
    return {
        x: x,
        y: y
    };
};

function movePoint(point, x, y) {
    return createPoint(point.x + x, point.y + y);
};

function movePointOnY(point, y) {
    return movePoint(point, 0, y);
};

function movePointOnX(point, x) {
    return movePoint(point, x, 0);
};

function addTwoPoints(point1, point2) {
    return createPoint(point1.x + point2.x, point1.y + point2.y);
};

function multiplyPoint(point, n) {
    return createPoint(point.x * n, point.y * n)
};

function arePointsEqual(point1, point2) {
    return point1.x === point2.x && point1.y === point2.y;
};

function translatePointToPolar(point, angle) {
    return {
        r: Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2)),
        angle: Math.atan2(point.y, point.x) * (180 / Math.PI) + angle
    };
};

function translatePointToCartesian(point) {
    const roundValue = n => Math.round(n * 1000) / 1000;
    return {
        x: roundValue(point.r * Math.cos(point.angle * (Math.PI / 180))),
        y: roundValue(point.r * Math.sin(point.angle * (Math.PI / 180)))
    };
};

function rotatePointOnGlobalZero(point, angle) {
    return translatePointToCartesian(translatePointToPolar(point, angle));
};

module.exports = {
    createPoint,
    movePoint,
    movePointOnY,
    movePointOnX,
    addTwoPoints,
    multiplyPoint,
    arePointsEqual,
    translatePointToPolar,
    translatePointToCartesian,
    rotatePointOnGlobalZero
} 