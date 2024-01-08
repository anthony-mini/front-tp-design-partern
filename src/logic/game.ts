import { lose, win } from "../popup.js";
import { GridView } from "../ui/grid.view.js";
import { Grid } from "./entites/grid.js";
import { Cell } from "./entites/cell.js";
import { IGridView } from "../interfaces/i-grid-view.js";

// Refactor: extract functions

export class Game {
  private _remaining = 0;
  private _grid: Grid;

  constructor(grid: Grid) {
    this._grid = grid;
  }

  // Démarrage du jeu
  // Ne fait rien pour l'instant, mais ça deviendra utile !
  // Ex : Démarrer un timer, initialiser un score, etc.

  start() {}

  // Gestion d'un clic sur une cellule
  play(view: IGridView, cell: Cell) {
    if (cell.hit) return;

    cell.hit = true;
    view.show(cell);
    if (cell.bomb) {
      lose();
    } else {
      let n = cell.risk;
      let hint = n >= 1 ? `${n}` : "";
      view.help(cell, hint);
      let grid = cell.grid;

      if (grid.remaining == 0) {
        win();
        return;
      }

      if (n == 0) this._grid.explore(cell, (near) => this.play(view, near));
    }
  }

  // Gestion d'un clic sur une cellule

  private risk(cell: Cell): number {
    let n = 0;
    this._grid.explore(cell, (near) => {
      if (near.bomb) n += 1;
    });
    return n;
  }
}
