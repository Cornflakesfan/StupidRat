export default class Vector {

    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add (v: Vector): Vector {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    subtract (v: Vector): Vector {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    multiply (k: number): Vector {
        return new Vector(this.x * k, this.y * k);
    }

    divide (k: number): Vector {
        return new Vector(this.x / k, this.y / k);
    }

    dot (v: Vector): number {
        return (this.x * v.x) + (this.y * v.y);
    }

    magnitude (): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    norm (): Vector {
        if (this.x == 0 && this.y == 0) return this;
        else return this.divide(this.magnitude());
    }

    equals (v: Vector): boolean {
        return this.x == v.x && this.y == v.y; 
    }

    copy (): Vector {
        return new Vector(this.x, this.y);
    }

    projectedOn(v: Vector) {
        return v.multiply(this.dot(v) / v.dot(v));
    }

    rotatedBy (t: number) {
        let x = (this.x * Math.cos(t)) - (this.y * Math.sin(t));
        let y = (this.x * Math.sin(t)) + (this.y * Math.cos(t));
        return new Vector(x, y);
    }

    reversed () {
        return new Vector(-this.x, -this.y);
    }

    static fromAngle(theta: number): Vector {
        return new Vector(Math.cos(theta), Math.sin(theta));
    }

    static get gravity(): Vector {
        return new Vector(0, -9.8)
    }

    static get zero(): Vector {
        return new Vector(0, 0);
    }

    static get x(): Vector {
        return new Vector(1, 0);
    }

    static get y(): Vector {
        return new Vector(0, 1);
    }


    static add (v1: Vector, v2: Vector) {
        return v1.add(v2);
    }
}