const { 
    createPoint,
    addTwoPoints,
    multiplyPoint
} = require('../../scripts/helpers/pointsHelpers');

const pointZero = {
    x: 0,
    y: 0
}

const pointOne = {
    x: 1,
    y: 1
}

const pointTwo = {
    x: 2,
    y: 2
}

const pointThree = {
    x: 3,
    y: 3
}

test("Create points", () => {
    expect(createPoint(0,0)).toEqual(pointZero)
    expect(createPoint(1,1)).toEqual(pointOne)
    expect(createPoint(2,2)).toEqual(pointTwo)
    expect(createPoint(3,3)).toEqual(pointThree)
})

test("Create points", () => {
    expect(multiplyPoint(pointOne, 2)).toEqual(pointTwo)
    expect(multiplyPoint(pointOne, 0)).toEqual(pointZero)
    expect(multiplyPoint(pointOne, -1)).toEqual({x: -1, y: -1})
})

test("Add two points", () => {
    expect(addTwoPoints(pointZero, pointZero)).toEqual(pointZero)
    expect(addTwoPoints(pointZero, pointOne)).toEqual(pointOne)
    expect(addTwoPoints(pointOne, {x: -1, y: -1})).toEqual(pointZero)
})



