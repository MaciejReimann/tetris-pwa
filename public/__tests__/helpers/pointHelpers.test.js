const { 
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
} = require('../../scripts/helpers/pointHelpers');

const pointZero = {
    x: 0,
    y: 0,
    prop: {color: 'white'}
};
const pointOne = {
    x: 1,
    y: 1,
    prop: {color: 'blue'}
};
const pointTwo = {
    x: 2,
    y: 2,
    prop: {color: 'yellow'}
};
const pointThree = {
    x: 3,
    y: 3,
    prop: {color: 'red'}
};

test("Is it a point?", () => {
    expect(isPoint(pointZero)).toBeTruthy();
    expect(isPoint(pointOne)).toBeTruthy();
    expect(isPoint({x: 4, y: 2, name: "point"})).toBeTruthy();
    expect(isPoint({x: 4, y: 2, z: 42, name: "also a point"})).toBeTruthy();
    expect(isPoint({x: 4, name: "not a point"})).toBeFalsy();
    expect(isPoint({x: 4, y: '2', name: "this IS NOT a point however"})).toBeFalsy();
    expect(isPoint({x: '4', y: 'zwei', name: "nor is this"})).toBeFalsy();
});

test("Move point", () => {
    expect(movePointOnX(pointZero,  1)).toEqual({x:  1, y:  0, prop: {color: 'white'}});
    expect(movePointOnX(pointZero, -1)).toEqual({x: -1, y:  0, prop: {color: 'white'}});
    expect(movePointOnY(pointZero,  1)).toEqual({x:  0, y:  1, prop: {color: 'white'}});
    expect(movePointOnY(pointZero, -1)).toEqual({x:  0, y: -1, prop: {color: 'white'}});
    expect(movePointOnX(movePointOnY(pointOne,   1),  1).x).toEqual(pointTwo.x);
    expect(movePointOnX(movePointOnY(pointOne,   1),  1).y).toEqual(pointTwo.y);
    expect(movePointOnX(movePointOnY(pointTwo,  -1), -1).x).toEqual(pointOne.x);
    expect(movePointOnX(movePointOnY(pointTwo,  -1), -1).y).toEqual(pointOne.y);
});

test("Create a point", () => {
    expect(createPoint(0, 0, {color: 'white'})).toEqual(pointZero);
    expect(createPoint(1, 1, {color: 'blue'})).toEqual(pointOne);
    expect(createPoint(2, 2, {color: 'yellow'})).toEqual(pointTwo);
    expect(createPoint(3, 3, {color: 'red'})).toEqual(pointThree);
});

test("Add two points", () => {
    expect(addTwoPoints(pointZero, pointZero)).toEqual(pointZero);
    expect(addTwoPoints(pointZero, pointOne).x).toEqual(pointOne.x);
    expect(addTwoPoints(pointZero, pointOne).y).toEqual(pointOne.y);
    expect(addTwoPoints(pointOne, {x: -1, y: -1}).x).toEqual(pointZero.x);
    expect(addTwoPoints(pointOne, {x: -1, y: -1}).y).toEqual(pointZero.y);
});

test("Multiply a point", () => {
    expect(multiplyPoint(pointOne, 0).x).toEqual(pointZero.x);
    expect(multiplyPoint(pointOne, 0).y).toEqual(pointZero.y);
    expect(multiplyPoint(pointOne, 2).x).toEqual(pointTwo.x);
    expect(multiplyPoint(pointOne, 2).y).toEqual(pointTwo.y);
    expect(multiplyPoint(pointOne, 3).x).toEqual(pointThree.x);
    expect(multiplyPoint(pointOne, 3).y).toEqual(pointThree.y);
    expect(multiplyPoint(pointTwo, .5).x).toEqual(pointOne.x);
    expect(multiplyPoint(pointTwo, .5).y).toEqual(pointOne.y);
    expect(multiplyPoint(pointOne, -1)).toEqual(createPoint(-1,-1, {color: 'blue'}));
    expect(multiplyPoint(pointOne, -2)).toEqual(createPoint(-2,-2, {color: 'blue'}));
});

test("Two points are equal", () => {
    expect(arePointsEqual( pointOne, { x: -1, y: -1 } )).toBeFalsy();
    expect(arePointsEqual( pointZero, {} )).toBeFalsy();
    expect(arePointsEqual( pointOne, { x: 1, y: 1 } )).toBeTruthy();
    expect(arePointsEqual( pointTwo, { x: 2, y: 2, z: 0 } )).toBeTruthy();
});

test("Points are in range", () => {
    expect(isPointWithinXRange(pointZero, -1, 1)).toBeTruthy()
    expect(isPointWithinYRange(pointZero, -1, 1)).toBeTruthy()
    expect(isPointWithinXRange(pointTwo,  -1, 1)).toBeFalsy()
    expect(isPointWithinYRange(pointTwo,  -1, 1)).toBeFalsy()
})

test("Translate a point to polar coordinates", () => {
    expect(translatePointToPolar( pointOne, 0 )).toEqual({
        r: 1.4142135623730951,
        angle: 45,
        prop: {color: 'blue'}
    });
    expect(translatePointToPolar( pointOne, 90 )).toEqual({
        r: 1.4142135623730951,
        angle: 135,
        prop: {color: 'blue'}
    });
    expect(translatePointToPolar( { x: 1, y: 0, prop: {color: 'blue'} }, 0 )).toEqual({
        r: 1,
        angle: 0,
        prop: {color: 'blue'}
    });
});

test("Translate a point to cartesian coordinates", () => {
    expect(translatePointToCartesian({ 
        r: 0, 
        angle: 0,
        prop: {color: 'white'}
    })).toEqual(
        pointZero
    );
    expect(translatePointToCartesian({ 
        r: 1.4142135623730951, 
        angle: 45,
        prop: {color: 'blue'}
    })).toEqual(
        pointOne
    );
    expect(translatePointToCartesian({ 
        r: 2.82842712475,
        angle: -45,
        prop: {color: 'white'}
    })).toEqual({  
        x: 2,
        y: -2,
        prop: {color: 'white'}
    })
    expect(translatePointToCartesian({ 
        r: 2,
        angle: -90,
        prop: {color: 'white'}
    })).toEqual({  
        x: 0,
        y: -2,
        prop: {color: 'white'}
    })
});

test("Rotate a point on local zero", () => {
    const point = createPoint(1, 1);
    let angle = 1;
    while (angle < 360 - 1) {   
        angle ++ 
        expect(rotatePointOnGlobalZero(point, angle)).not.toEqual(point);       
    };
    expect(rotatePointOnGlobalZero(point, 0)).toEqual(point);
    expect(rotatePointOnGlobalZero(point, 90)).toEqual(createPoint(-1, 1));
    expect(rotatePointOnGlobalZero(point, 180)).toEqual(createPoint(-1,-1));
    expect(rotatePointOnGlobalZero(point, 270)).toEqual(createPoint(1, -1));
    expect(rotatePointOnGlobalZero(point, 360)).toEqual(point);
});





