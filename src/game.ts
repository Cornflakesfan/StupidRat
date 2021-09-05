import Painling from "./painling.js";
import Projectile from "./projectile.js";
import Rat from "./rat.js";
import Vector from "./vector.js";

export default class Game {

    private cvs: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private rat: Rat;
    private painling: Painling;
    private projectiles: Projectile[];
    private running: number;
    private time: number;

    public isOver: boolean;

    public constructor (cvs: HTMLCanvasElement) {
        this.isOver = false;
        this.time = 0;
        this.running = 0;
        this.cvs = cvs;
        this.ctx = cvs.getContext("2d")!;
        this.rat = new Rat(this.randomPosition(), this.lose);
        this.painling = new Painling(this.randomPosition(), this.spawnProjectiles);
        this.projectiles = [];
        this.loadAssets();
    }

    private randomPosition = () => 
        new Vector(Math.random() * (this.cvs.width - 300) + 150, Math.random() * (this.cvs.height - 300) + 150);

    private loadAssets() {
        let ratImg = new Image();
        ratImg.src = "./assets/rat.png";

        let painlingImg = new Image();
        painlingImg.src = "./assets/painling.png";

        let projectileImg = new Image();
        projectileImg.src = "./assets/projectile.png";

        const assets = 3;
        let assetsLoaded = 0;

        ratImg.onload = () => {
            assetsLoaded++;
            Rat.image = ratImg;
            if (assetsLoaded == assets)
                this.start();
        }

        painlingImg.onload = () => {
            assetsLoaded++;
            Painling.image = painlingImg;
            if (assetsLoaded == assets)
                this.start();
        }

        projectileImg.onload = () => {
            assetsLoaded++;
            Projectile.image = projectileImg;
            if (assetsLoaded == assets)
                this.start();
        }
    }

    private start() {
        this.time = performance.now();
        this.running = window.setInterval(this.gameLoop, 1000 / 60);
    }

    private gameLoop = () => {
        let t = performance.now();
        let delta = t - this.time;
        this.time = t;

        

        this.projectiles = this.projectiles.filter(proj => !proj.dead);
        this.projectiles?.forEach(proj => {
            proj.update(delta);
        });
        this.painling.update(delta);
        this.rat.update(delta, this.painling.pos);

        this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);

        this.projectiles?.forEach(proj => {
            this.rat.checkCollision(proj);
        });

        this.projectiles?.forEach(proj => {
            proj.draw(this.cvs, this.ctx);
        });
        if (!this.painling.dead)
            this.painling.draw(this.cvs, this.ctx);
        this.rat.draw(this.cvs, this.ctx);

        this.ctx.fillStyle = "black";
        this.ctx.font = "32px 'Open Sans'";
        this.ctx.fillText("kill the rat [SPACE]", this.cvs.width / 2 - 130, 50);

        if (this.painling.dead && this.projectiles.length == 0) {
            if (this.rat.dead)
                this.win()
            else
                this.lose();   
        }

        
    }

    private win = () => {
        window.clearInterval(this.running);
        window.setTimeout(() => { // rhlnherdohyigsg sgbaseg
            this.isOver = true;
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
            this.ctx.fillStyle = "white";
            this.ctx.font = "bold 72px 'Open Sans'";
            this.ctx.fillText("WINNER", this.cvs.width / 2 - 130, this.cvs.height / 2 - 50);
            this.ctx.font = "32px 'Open Sans'";
            this.ctx.fillText("[SPACE] to continue", this.cvs.width / 2 - 130, this.cvs.height / 2 + 25);
        }, 50);
    }

    private lose = () => {
        window.clearInterval(this.running);
        window.setTimeout(() => { //asdlkgjbwnr lhkdagrhbndtn
            this.isOver = true;
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
            this.ctx.fillStyle = "white";
            this.ctx.font = "bold 72px 'Open Sans'";
            this.ctx.fillText("LOSER", this.cvs.width / 2 - 100, this.cvs.height / 2 - 50);
            this.ctx.font = "32px 'Open Sans'";
            this.ctx.fillText("You did not kill rat", this.cvs.width / 2 - 120, this.cvs.height / 2 + 75);
            this.ctx.fillText("[SPACE] to continue", this.cvs.width / 2 - 130, this.cvs.height / 2 + 25);
        }, 50)
    }

    private spawnProjectiles = (pos: Vector) => {
        for (let i = 0; i < 10; i++) {
            let theta = i * Math.PI / 5;
            let proj = new Projectile(pos, theta);
            if (!this.projectiles)
                this.projectiles = [ proj ]
            else
                this.projectiles.push(proj);
        }
    }
   
}