import Painling from "./painling.js";
import Projectile from "./projectile.js";
import Rat from "./rat.js";
import Vector from "./vector.js";
export default class Game {
    constructor(cvs) {
        this.randomPosition = () => new Vector(Math.random() * (this.cvs.width - 300) + 150, Math.random() * (this.cvs.height - 300) + 150);
        this.gameLoop = () => {
            var _a, _b, _c;
            let t = performance.now();
            let delta = t - this.time;
            this.time = t;
            this.projectiles = this.projectiles.filter(proj => !proj.dead);
            (_a = this.projectiles) === null || _a === void 0 ? void 0 : _a.forEach(proj => {
                proj.update(delta);
            });
            this.painling.update(delta);
            this.rat.update(delta, this.painling.pos);
            this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
            (_b = this.projectiles) === null || _b === void 0 ? void 0 : _b.forEach(proj => {
                this.rat.checkCollision(proj);
            });
            (_c = this.projectiles) === null || _c === void 0 ? void 0 : _c.forEach(proj => {
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
                    this.win();
                else
                    this.lose();
            }
        };
        this.win = () => {
            window.clearInterval(this.running);
            window.setTimeout(() => {
                this.isOver = true;
                this.ctx.fillStyle = "black";
                this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
                this.ctx.fillStyle = "white";
                this.ctx.font = "bold 72px 'Open Sans'";
                this.ctx.fillText("WINNER", this.cvs.width / 2 - 130, this.cvs.height / 2 - 50);
                this.ctx.font = "32px 'Open Sans'";
                this.ctx.fillText("[SPACE] to continue", this.cvs.width / 2 - 130, this.cvs.height / 2 + 25);
            }, 50);
        };
        this.lose = () => {
            window.clearInterval(this.running);
            window.setTimeout(() => {
                this.isOver = true;
                this.ctx.fillStyle = "black";
                this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
                this.ctx.fillStyle = "white";
                this.ctx.font = "bold 72px 'Open Sans'";
                this.ctx.fillText("LOSER", this.cvs.width / 2 - 100, this.cvs.height / 2 - 50);
                this.ctx.font = "32px 'Open Sans'";
                this.ctx.fillText("You did not kill rat", this.cvs.width / 2 - 120, this.cvs.height / 2 + 75);
                this.ctx.fillText("[SPACE] to continue", this.cvs.width / 2 - 130, this.cvs.height / 2 + 25);
            }, 50);
        };
        this.spawnProjectiles = (pos) => {
            for (let i = 0; i < 10; i++) {
                let theta = i * Math.PI / 5;
                let proj = new Projectile(pos, theta);
                if (!this.projectiles)
                    this.projectiles = [proj];
                else
                    this.projectiles.push(proj);
            }
        };
        this.isOver = false;
        this.time = 0;
        this.running = 0;
        this.cvs = cvs;
        this.ctx = cvs.getContext("2d");
        this.rat = new Rat(this.randomPosition(), this.lose);
        this.painling = new Painling(this.randomPosition(), this.spawnProjectiles);
        this.projectiles = [];
        this.loadAssets();
    }
    loadAssets() {
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
        };
        painlingImg.onload = () => {
            assetsLoaded++;
            Painling.image = painlingImg;
            if (assetsLoaded == assets)
                this.start();
        };
        projectileImg.onload = () => {
            assetsLoaded++;
            Projectile.image = projectileImg;
            if (assetsLoaded == assets)
                this.start();
        };
    }
    start() {
        this.time = performance.now();
        this.running = window.setInterval(this.gameLoop, 1000 / 60);
    }
}
