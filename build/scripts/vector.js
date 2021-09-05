export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
    subtract(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }
    multiply(k) {
        return new Vector(this.x * k, this.y * k);
    }
    divide(k) {
        return new Vector(this.x / k, this.y / k);
    }
    dot(v) {
        return (this.x * v.x) + (this.y * v.y);
    }
    magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    norm() {
        if (this.x == 0 && this.y == 0)
            return this;
        else
            return this.divide(this.magnitude());
    }
    equals(v) {
        return this.x == v.x && this.y == v.y;
    }
    copy() {
        return new Vector(this.x, this.y);
    }
    projectedOn(v) {
        return v.multiply(this.dot(v) / v.dot(v));
    }
    rotatedBy(t) {
        let x = (this.x * Math.cos(t)) - (this.y * Math.sin(t));
        let y = (this.x * Math.sin(t)) + (this.y * Math.cos(t));
        return new Vector(x, y);
    }
    reversed() {
        return new Vector(-this.x, -this.y);
    }
    static fromAngle(theta) {
        return new Vector(Math.cos(theta), Math.sin(theta));
    }
    static get gravity() {
        return new Vector(0, -9.8);
    }
    static get zero() {
        return new Vector(0, 0);
    }
    static get x() {
        return new Vector(1, 0);
    }
    static get y() {
        return new Vector(0, 1);
    }
    static add(v1, v2) {
        return v1.add(v2);
    }
}
