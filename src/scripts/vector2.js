
export default class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static get zero() {
        return new Vector2(0, 0);
    }

    static r2d(rad) {
        //converts radian into degrees
        return 360 * rad / (2 * Math.PI);
    }

    static d2r(deg) {
        return (deg / 360) * 2 * Math.PI;
    }

    toObject() {
        return {
            x: this.x,
            y: this.y
        };
    }

    toArray() {
        return [this.x, this.y];
    }

    rotateAround(angle, pivot) {
        //rotate this vector by angle, around pivot point, another vector2
        return this.add(pivot.mul(-1)).rotate(angle).add(pivot);
    }

    rotate(angle) {
        //rotates this vector by angle in radians, then return the rotated vector.

        let cos = Math.cos(angle);
        let sin = Math.sin(angle)

        let x = 0;
        let y = 0;

        x = this.x * cos - this.y * sin;
        y = this.x * sin + this.y * cos;

        return new Vector2(x, y);
    }

    mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    magSqr() {
        return this.dot(this);
    }

    angle() {
        //returns angle relative to x-axis in radians
        return Math.atan2(this.y, this.x);
    }

    dot(v2) {
        //returns the dot product of the 2 vectors, does not change either.
        return (this.x * v2.x) + (this.y * v2.y);
    }

    add(vec) {
        //adds another vector onto this one, and return result

        return new Vector2(this.x + vec.x, this.y + vec.y);
    }

    mulP(x, y) {
        //multiply x and y seperately

        return new Vector2(this.x * x, this.y * y);
    }

    mul(float) {
        //mutipleis this vector with a float, and returns result

        return new Vector2(float * this.x, float * this.y);
    }

    distTo(vec) {
        return vec.add(this.mul(-1)).mag();
    }

    normalized() {
        //returns the direction of this vector with unit length.
        let mag = this.mag()
        if (mag === 0) {
            return Vector2.zero;
        }
        return new Vector2(this.x / mag, this.y / mag);
    }

    toString() {
        return `Vector2 (${this.x} , ${this.y})`
    }
}


