// Tetromino defined as their 4 squares' center points
// in relation to their local zero called pivot;
const _I = [
    { x: -1.5, y:  0.5 },
    { x: -0.5, y:  0.5 },
    { x:  0.5, y:  0.5 },
    { x:  1.5, y:  0.5 }
  ];
  const _J = [
    { x: -1.5, y: -0.5 },
    { x: -0.5, y: -0.5 },
    { x:  0.5, y: -0.5 },
    { x:  0.5, y:  0.5 }
  ];
  const _L = [
    { x: -0.5, y:  0.5 },
    { x: -0.5, y: -0.5 },
    { x:  0.5, y: -0.5 },
    { x:  1.5, y: -0.5 }
  ];
  const _O = [
    { x: -0.5, y: -0.5 },
    { x:  0.5, y: -0.5 },
    { x:  0.5, y:  0.5 },
    { x: -0.5, y:  0.5 }
  ];
  const _S = [
    { x: -0.5, y:  0.5 },
    { x:  0.5, y:  0.5 },
    { x:  0.5, y: -0.5 },
    { x:  1.5, y: -0.5 }
  ];
  const _T = [
    { x: -0.5, y: -0.5 },
    { x:  0.5, y: -0.5 },
    { x:  1.5, y: -0.5 },
    { x:  0.5, y:  0.5 }
  ];
  const _Z = [
    { x: -0.5, y: -0.5 },
    { x:  0.5, y: -0.5 },
    { x:  0.5, y:  0.5 },
    { x:  1.5, y:  0.5 }
  ];

  const allTetrominos = [_I, _J, _L, _O, _S, _T, _Z];
  module.exports = allTetrominos;