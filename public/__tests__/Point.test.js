const Point = require('../scripts/helpers/Point');
const pointZero = new Point(0,0)

test("Create a {0, 0}", () => {
    expect(pointZero.x).toBe(0)
    expect(pointZero.y).toBe(0)
})