import Game from "./game.js";
const cvs = document.getElementById("cvs");
let game = new Game(cvs);
window.addEventListener("keydown", (e) => {
    if (e.code == "Space" && game.isOver)
        game = new Game(cvs);
});
