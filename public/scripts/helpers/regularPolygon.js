const { 
    addTwoPoints,
    translatePointToCartesian
} = require('./pointHelpers');

// Returns cartesian global coordinates of a regular polygon vertices;
function regularPolygon(angle, center, sides, radius) {
    return Array(sides).fill().map((_, i) => addTwoPoints(
        translatePointToCartesian({
            r: radius, 
            angle: (360 / sides) * i + angle
        }),
        center
    ));
};

module.exports = {
    regularPolygon
};
