class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    get() {
        return this;
    }
    moveOnY(i) {
        this.y = this.y + i;
        return this;
    }
}



module.exports = Point;