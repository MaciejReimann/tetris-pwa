function isPoint(something) {
    return typeof something === "object"
        && something.hasOwnProperty("x") 
        && something.hasOwnProperty("y")
        && typeof something.x === 'number'
        && typeof something.y === 'number'
};

function createPoint(x, y, prop) {
    const property = prop || {};
    return {
        x: x,
        y: y,
        prop: property
    };
};

function movePoint(point, x, y) {
    return createPoint(point.x + x, point.y + y, point.prop);
};

function movePointOnY(point, y) {
    return movePoint(point, 0, y);
};

function movePointOnX(point, x) {
    return movePoint(point, x, 0);
};

function addTwoPoints(point1, point2) {
    const mergedProps = Object.assign({}, point1.prop, point2.prop);
    return createPoint(point1.x + point2.x, point1.y + point2.y, mergedProps);
};

function multiplyPoint(point, n) {
    return createPoint(point.x * n, point.y * n, point.prop)
};

function arePointsEqual(point1, point2) {
    return point1.x === point2.x && point1.y === point2.y;
};

function isPointWithinXRange(point, start, end) {
    return point.x > start && point.x < end; 
};

function isPointWithinYRange(point, start, end) {
    return point.y > start && point.y < end; 
};

function translatePointToPolar(point, angle) {
    return {
        r: Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2)),
        angle: Math.atan2(point.y, point.x) * (180 / Math.PI) + angle,
        prop: point.prop || {}
    };
};

function translatePointToCartesian(point) {
    const roundValue = n => Math.round(n * 1000) / 1000;
    return {
        x: roundValue(point.r * Math.cos(point.angle * (Math.PI / 180))),
        y: roundValue(point.r * Math.sin(point.angle * (Math.PI / 180))),
        prop: point.prop || {}
    };
};

function rotatePointOnGlobalZero(point, angle) {
    return translatePointToCartesian(translatePointToPolar(point, angle));
};

module.exports = {
    isPoint,
    createPoint,
    movePoint,
    movePointOnY,
    movePointOnX,
    addTwoPoints,
    multiplyPoint,
    arePointsEqual,
    isPointWithinXRange,
    isPointWithinYRange,
    translatePointToPolar,
    translatePointToCartesian,
    rotatePointOnGlobalZero
} 