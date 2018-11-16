

function drawVerticalLine(canvas, offset, color) {
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(offset, 0);
    ctx.lineTo(offset, canvas.height);
    ctx.stroke();
    return canvas;
};

function drawHorizontalLine(canvas, offset, color) {
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, offset);
    ctx.lineTo(canvas.width, offset);
    ctx.stroke();
    return canvas;
};

function drawOffsetVerticalLines(canvas, offset, color) {
    return Array(canvas.width / offset)
        .fill()
        .map((_, i) => drawVerticalLine(canvas, offset * i, color))
};

function drawOffsetHorizontalLines(canvas, offset, color) {
    return Array(canvas.height / offset)
        .fill()
        .map((_, i) => drawHorizontalLine(canvas, offset * i, color))
};

function drawRectangularGrid(canvas, offset, color) {
    drawOffsetVerticalLines(canvas, offset, color)
    drawOffsetHorizontalLines(canvas, offset, color)
};

function drawSquare(vertices, canvas, color) {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(vertices[0].x, vertices[0].y);
    ctx.lineTo(vertices[1].x, vertices[1].y);
    ctx.lineTo(vertices[2].x, vertices[2].y);
    ctx.lineTo(vertices[3].x, vertices[3].y);
    return ctx;
};

function clear(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

module.exports = {
    drawVerticalLine,
    drawHorizontalLine,
    drawOffsetVerticalLines,
    drawOffsetHorizontalLines,
    drawRectangularGrid,
    drawSquare,
    clear
};

