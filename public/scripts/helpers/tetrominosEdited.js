const { createPoint } = require('./pointHelpers');
const tetrominoTypes = require('./tetrominoTypes');

module.exports = function(colorPalette) {
    function reformedTypes(n) {
        return tetrominoTypes.map(type => type.centers
            .map(center => 
                createPoint(
                    center.x, 
                    center.y, 
                    {
                        name: type.name,
                        color: type.colors[n]
                    }
                )
            )
        );
    };

    if(!colorPalette || colorPalette === 'classic') {
        return reformedTypes(1);
    } else if(colorPalette === 'black') {
        return reformedTypes(0);
    };
};