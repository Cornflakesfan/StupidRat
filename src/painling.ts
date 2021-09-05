import Vector from "./vector.js";

export default class Painling {
    
    public static img: CanvasImageSource;
    public dead: boolean;
    public pos: Vector;
    private vel: Vector;
    private onExplode: (pos: Vector) => void;
    private inputs = {
        w: false,
        a: false,
        s: false,
        d: false
    }

    public constructor (pos: Vector, onExplode: (pos: Vector) => void) {
        this.pos = pos;
        this.vel = Vector.zero;
        this.dead = false;
        this.onExplode = onExplode;
        this.addListeners();
    }

    public update (delta: number) {
        const t = delta / 1000;
        this.vel = Vector.zero;
        if (this.inputs.w)
            this.vel = this.vel.add(new Vector(0, -1));
        if (this.inputs.a)
            this.vel = this.vel.add(new Vector(-1, 0));
        if (this.inputs.s)
            this.vel = this.vel.add(new Vector(0, 1));
        if (this.inputs.d)
            this.vel = this.vel.add(new Vector(1, 0));

        this.vel = this.vel.norm();

        if (t > 0.0001)
            this.pos = this.pos.add(this.vel.multiply(t * 768));
    }

    public draw(cvs: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        ctx.drawImage(Painling.img, this.pos.x - 48, this.pos.y - 48, 96, 96);
    }

    public static set image(img: CanvasImageSource) {
        Painling.img ??= img;
    }

    private explode() {
        window.setTimeout(() => { console.log(this); this.dead = true; }, 50); // this is a disgusting trick
        this.onExplode(this.pos);
    }

    private addListeners() {
        window.addEventListener("keydown", (e) => {
            if (e.repeat) return;
            switch(e.code) {
                case "KeyW":
                    this.inputs.w = true;
                    break;
                case "KeyA":
                    this.inputs.a = true;
                    break;
                case "KeyS":
                    this.inputs.s = true;
                    break;
                case "KeyD":
                    this.inputs.d = true;
                    break;
                case "Space":
                    this.explode();
                    break;
            }
        });

        window.addEventListener("keyup", (e) => {
            switch(e.code) {
                case "KeyW":
                    this.inputs.w = false;
                    break;
                case "KeyA":
                    this.inputs.a = false;
                    break;
                case "KeyS":
                    this.inputs.s = false;
                    break;
                case "KeyD":
                    this.inputs.d = false;
                    break;
            }
        });
    }

}