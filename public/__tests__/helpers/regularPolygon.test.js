const { 
    regularPolygon
} = require('../../scripts/helpers/regularPolygon');
const {
    carouselArray
} = require('../../scripts/helpers/arrayHelpers');
const {
    createPoint,
    addTwoPoints,
    multiplyPoint,
} = require('../../scripts/helpers/pointHelpers');

const defaultAngle = 0;
const defaultCenter = { x: 0, y: 0 };

describe("Test a square", () => {
    const sides = 4; 
    const parallelSquareVertices = [
        createPoint( 1, 1),
        createPoint(-1, 1),
        createPoint(-1,-1),
        createPoint( 1,-1)
    ];
    const rot45degSquareVertices = [
        createPoint( 1, 0),
        createPoint( 0, 1),
        createPoint(-1, 0),
        createPoint( 0,-1)
    ];
    test("Parallel to x and y axis, side length = 2", () => {
        const angle = defaultAngle + 45;
        const center = defaultCenter;
        const radius = Math.sqrt(2);
        const vertices = parallelSquareVertices;
        expect(regularPolygon(angle, center, sides, radius)).toEqual(vertices);
        expect(regularPolygon(angle + 90, center, sides, radius)).toEqual(carouselArray(vertices, 1));
        expect(regularPolygon(angle + 180, center, sides, radius)).toEqual(carouselArray(vertices, 2));
        expect(regularPolygon(angle + 270, center, sides, radius)).toEqual(carouselArray(vertices, 3));
        expect(regularPolygon(angle - 90, center, sides, radius)).toEqual(carouselArray(vertices, -1));
        expect(regularPolygon(angle - 180, center, sides, radius)).toEqual(carouselArray(vertices, -2));
        expect(regularPolygon(angle - 270, center, sides, radius)).toEqual(carouselArray(vertices, -3));
    });
    test("Rotated 45deg to x and y axes, side length of 2 * sqrt(2)", () => {
        const angle = defaultAngle;
        const center = defaultCenter;
        const radius = 1;
        const vertices = rot45degSquareVertices;
        expect(regularPolygon(angle, center, sides, radius)).toEqual(vertices);
        expect(regularPolygon(angle + 90, center, sides, radius)).toEqual(carouselArray(vertices, 1));
        expect(regularPolygon(angle + 180, center, sides, radius)).toEqual(carouselArray(vertices, 2));
        expect(regularPolygon(angle + 270, center, sides, radius)).toEqual(carouselArray(vertices, 3));
        expect(regularPolygon(angle - 90, center, sides, radius)).toEqual(carouselArray(vertices, -1));
        expect(regularPolygon(angle - 180, center, sides, radius)).toEqual(carouselArray(vertices, -2));
        expect(regularPolygon(angle - 270, center, sides, radius)).toEqual(carouselArray(vertices, -3));
    });
    test("Rotated 45deg to x and y axis, side length = 4", () => {
        const angle = defaultAngle;
        const center = defaultCenter;
        const radius = 2;
        const vertices = rot45degSquareVertices.map(vertex => multiplyPoint(vertex, 2));
        expect(regularPolygon(angle, center, sides, radius)).toEqual(vertices);
        expect(regularPolygon(angle + 90, center, sides, radius)).toEqual(carouselArray(vertices, 1));
        expect(regularPolygon(angle + 180, center, sides, radius)).toEqual(carouselArray(vertices, 2));
        expect(regularPolygon(angle + 270, center, sides, radius)).toEqual(carouselArray(vertices, 3));
        expect(regularPolygon(angle - 90, center, sides, radius)).toEqual(carouselArray(vertices, -1));
        expect(regularPolygon(angle - 180, center, sides, radius)).toEqual(carouselArray(vertices, -2));
        expect(regularPolygon(angle - 270, center, sides, radius)).toEqual(carouselArray(vertices, -3));
    });
    test("Rotated 45deg to x and y axis, side length = 4, moved", () => {
        const angle = defaultAngle;
        const move = {x: 2, y: 2};
        const center = addTwoPoints(defaultCenter, move) ;
        const radius = 2;
        const vertices = rot45degSquareVertices
            .map(vertex => multiplyPoint(vertex, 2))
            .map(vertex => addTwoPoints(vertex, move));
        expect(regularPolygon(angle, center, sides, radius)).toEqual(vertices);
        expect(regularPolygon(angle + 90, center, sides, radius)).toEqual(carouselArray(vertices, 1));
        expect(regularPolygon(angle + 180, center, sides, radius)).toEqual(carouselArray(vertices, 2));
        expect(regularPolygon(angle + 270, center, sides, radius)).toEqual(carouselArray(vertices, 3));
        expect(regularPolygon(angle - 90, center, sides, radius)).toEqual(carouselArray(vertices, -1));
        expect(regularPolygon(angle - 180, center, sides, radius)).toEqual(carouselArray(vertices, -2));
        expect(regularPolygon(angle - 270, center, sides, radius)).toEqual(carouselArray(vertices, -3));
    });
});