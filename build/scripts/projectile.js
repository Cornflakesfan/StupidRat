import Vector from "./vector.js";
export default class Projectile {
    constructor(pos, ang) {
        this.pos = pos;
        this.ang = ang;
        let dir = Vector.fromAngle(ang);
        this.vel = dir.multiply(1024);
        this.ellapsedTime = 0;
        this.dead = false;
    }
    update(delta) {
        const t = delta / 1000;
        this.ellapsedTime += delta;
        this.pos = this.pos.add(this.vel.multiply(t));
        if (this.ellapsedTime >= Projectile.lifeTime)
            this.dead = true;
    }
    draw(cvs, ctx) {
        ctx.save();
        let x = this.pos.x;
        let y = this.pos.y;
        ctx.translate(x, y);
        ctx.rotate(this.ang);
        ctx.drawImage(Projectile.img, -48, -24, 96, 48);
        ctx.restore();
    }
    static set image(img) {
        var _a;
        (_a = Projectile.img) !== null && _a !== void 0 ? _a : (Projectile.img = img);
    }
}
Projectile.lifeTime = 500;
