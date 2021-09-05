import Vector from "./vector.js";
export default class Rat {
    constructor(pos, onEscape) {
        this.dead = false;
        this.pos = pos;
        this.hp = 75;
        this.vel = Vector.zero;
        this.onEscape = onEscape;
    }
    update(delta, pos) {
        let t = delta / 1000;
        this.vel = this.pos.subtract(pos).norm();
        this.pos = this.pos.add(this.vel.multiply(45 * t));
    }
    checkCollision(proj) {
        if (proj.pos.subtract(this.pos).magnitude() < 100) {
            proj.dead = true;
            this.hp -= 12;
            if (this.hp <= 0)
                this.dead = true;
        }
    }
    draw(cvs, ctx) {
        // looool why tf am I doing this here
        if (this.pos.x < 0 || this.pos.x > cvs.width || this.pos.y < 0 || this.pos.y > cvs.height)
            this.onEscape();
        ctx.drawImage(Rat.img, this.pos.x - 64, this.pos.y - 64, 128, 128);
        ctx.fillStyle = "black";
        ctx.fillRect(this.pos.x - 54, this.pos.y + 64, 108, 20);
        ctx.fillStyle = "red";
        ctx.fillRect(this.pos.x - 52, this.pos.y + 66, 104, 16);
        ctx.fillStyle = "#00ff00";
        ctx.fillRect(this.pos.x - 52, this.pos.y + 66, (Math.max(this.hp / 100, 0)) * 104, 16);
    }
    static set image(img) {
        var _a;
        (_a = Rat.img) !== null && _a !== void 0 ? _a : (Rat.img = img);
    }
}
