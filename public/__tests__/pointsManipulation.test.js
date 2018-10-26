const { 
    merge,
} = require('../scripts/helpers/pointsManipulation');

const obj1 = {
    one: 1,
    other: "other",
}
const obj2 = {
    two: 2,
    other: "other",
}

test("Merge two identical objects", () => {
    expect(merge(obj1, obj1)).toEqual(obj1)
    expect(merge(obj2, obj2)).toEqual(obj2)
})
test("Merge adding new property", () => {
    const output = {
        one: 1,
        two: 2,
        other: "other"
    }
    expect(merge(obj1, obj2)).toEqual(output)
})
test("Merge updating a property", () => {
    const obj2 = {
        two: 2,
        other: "the other",
    }
    const output = {
        one: 1,
        two: 2,
        other: "the other"
    }
    expect(merge(obj1, obj2)).toEqual(output)
})