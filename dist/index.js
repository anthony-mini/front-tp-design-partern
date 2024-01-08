import { Grid } from "./logic/entites/grid.js";
import { Game } from "./logic/game.js";
import { GridView } from "./ui/grid.view.js";
window.addEventListener("load", () => {
    let grid = new Grid(20, 20, 0.1);
    let view = new GridView(grid);
    let game = new Game(grid);
    view.draw(game);
    game.start();
});
