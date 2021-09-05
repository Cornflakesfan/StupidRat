import Vector from "./vector.js";

export default class Projectile {

    private static img: CanvasImageSource;
    private static lifeTime: number = 500;
    private ellapsedTime: number;
    public pos: Vector;
    private vel: Vector;
    private ang: number;

    public dead: boolean;

    constructor(pos: Vector, ang: number) {
        this.pos = pos;
        this.ang = ang;
        let dir = Vector.fromAngle(ang);
        this.vel = dir.multiply(1024);
        this.ellapsedTime = 0;
        this.dead = false;
    }

    public update(delta: number) {
        const t = delta / 1000;
        this.ellapsedTime += delta;
        this.pos = this.pos.add(this.vel.multiply(t));
        if (this.ellapsedTime >= Projectile.lifeTime)
            this.dead = true;
    }

    public draw(cvs: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        ctx.save();
        let x = this.pos.x;
        let y = this.pos.y;
        ctx.translate(x, y);
        ctx.rotate(this.ang);
        ctx.drawImage(Projectile.img, -48, -24, 96, 48);
        ctx.restore();
    }

    public static set image(img: CanvasImageSource) {
        Projectile.img ??=  img;
    }

}