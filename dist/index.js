import { Grid } from "./grid.js";
import { Game } from "./game.js";
window.addEventListener("load", () => {
    let grid = new Grid();
    let game = new Game();
    //@ts-ignore
    grid.draw(game);
});
