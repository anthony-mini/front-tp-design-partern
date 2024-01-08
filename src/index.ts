import { draw_grid } from "./grid.js";
import { play } from "./game.js";

window.addEventListener("load", () => {
  draw_grid();
  // @ts-ignore
  play();
});
