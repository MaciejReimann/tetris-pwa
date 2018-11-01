const { 
    createPoint,
    addTwoPoints,
    multiplyPoint,
    arePointsEqual,
    translatePointToPolar,
    translatePointToCartesian,
    rotatePointOnGlobalZero
} = require('../../scripts/helpers/pointHelpers');

const pointZero = {
    x: 0,
    y: 0
};

const pointOne = {
    x: 1,
    y: 1
};

const pointTwo = {
    x: 2,
    y: 2
};

const pointThree = {
    x: 3,
    y: 3
};

test("Create a point", () => {
    expect(createPoint(0,0)).toEqual(pointZero);
    expect(createPoint(1,1)).toEqual(pointOne);
    expect(createPoint(2,2)).toEqual(pointTwo);
    expect(createPoint(3,3)).toEqual(pointThree);
});

test("Add two points", () => {
    expect(addTwoPoints(pointZero, pointZero)).toEqual(pointZero);
    expect(addTwoPoints(pointZero, pointOne)).toEqual(pointOne);
    expect(addTwoPoints(pointOne, {x: -1, y: -1})).toEqual(pointZero);
});

test("Multiply a point", () => {
    expect(multiplyPoint(pointOne, 0)).toEqual(pointZero);
    expect(multiplyPoint(pointOne, 2)).toEqual(pointTwo);
    expect(multiplyPoint(pointOne, 3)).toEqual(pointThree);
    expect(multiplyPoint(pointTwo, .5)).toEqual(pointOne);   
    expect(multiplyPoint(pointOne, -1)).toEqual({x: -1, y: -1});
    expect(multiplyPoint(pointOne, -2)).toEqual({x: -2, y: -2});
});

test("Two points are equal", () => {
    expect(arePointsEqual( pointOne, { x: -1, y: -1 } )).toBeFalsy();
    expect(arePointsEqual( pointZero, {} )).toBeFalsy();
    expect(arePointsEqual( pointOne, { x: 1, y: 1 } )).toBeTruthy();
    expect(arePointsEqual( pointTwo, { x: 2, y: 2, z: 0 } )).toBeTruthy();
});

test("Translate a point to polar coordinates", () => {
    expect(translatePointToPolar( pointOne, 0 )).toEqual({
        r: 1.4142135623730951,
        angle: 45
    });
    expect(translatePointToPolar( pointOne, 90 )).toEqual({
        r: 1.4142135623730951,
        angle: 135
    });
    expect(translatePointToPolar( { x: 1, y: 0 }, 0 )).toEqual({
        r: 1,
        angle: 0
    });
});

test("Translate a point to cartesian coordinates", () => {
    expect(translatePointToCartesian({ 
        r: 0, 
        angle: 0 
    })).toEqual(
        pointZero
    );
    expect(translatePointToCartesian({ 
        r: 1.4142135623730951, 
        angle: 45 
    })).toEqual(
        pointOne
    );
    expect(translatePointToCartesian({ 
        r: 2.82842712475,
        angle: -45 
    })).toEqual({  
        x: 2,
        y: -2
    })
    expect(translatePointToCartesian({ 
        r: 2,
        angle: -90 
    })).toEqual({  
        x: 0,
        y: -2
    })
});

test("Rotate a point on local zero", () => {
    const point = { x: 1, y: 1 };
    let angle = 1;
    while (angle < 360 - 1) {   
        angle ++ 
        expect(rotatePointOnGlobalZero(point, angle)).not.toEqual(point);       
    };
    expect(rotatePointOnGlobalZero(point, 0)).toEqual(point);
    expect(rotatePointOnGlobalZero(point, 90)).toEqual({ 
        x: -1, 
        y: 1 
    });
    expect(rotatePointOnGlobalZero(point, 180)).toEqual({ 
        x: -1, 
        y: -1 
    });
    expect(rotatePointOnGlobalZero(point, 270)).toEqual({ 
        x: 1, 
        y: -1 
    });
    expect(rotatePointOnGlobalZero(point, 360)).toEqual(point);
});





