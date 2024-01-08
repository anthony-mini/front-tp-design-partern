import { Grid } from "./logic/grid.js";
import { Game } from "./logic/game.js";

window.addEventListener("load", () => {
  let grid = new Grid();
  let game = new Game();
  //@ts-ignore
  grid.draw(game);
});
