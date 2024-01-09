import { lose, win } from "../popup.js";
import { Cell } from "./entites/cell.js";
import { Subject } from "../helpers/subject.js";

// Refactor: extract functions

export class Game {
  // Singleton
  public static INSTANCE: Game = new Game();
  private constructor() {}

  // Slots de notifications
  onHit = new Subject<Cell>();
  onHelp = new Subject<{ cell: Cell; hint: string }>();

  // Démarrage du jeu
  // Ne fait rien pour l'instant, mais ça deviendra utile !
  // Ex : Démarrer un timer, initialiser un score, etc.

  start() {}

  // Gestion d'un clic sur une cellule
  play(cell: Cell) {
    if (cell.hit) return;

    cell.hit = true;
    this.onHit.raise(cell);
    if (cell.bomb) {
      lose();
    } else {
      let n = cell.risk;
      let hint = cell.ground && n >= 1 ? `${n}` : cell.icon;
      this.onHelp.raise({ cell, hint });
      let grid = cell.grid;

      if (grid.remaining == 0) {
        win();
        return;
      }

      if (n == 0) grid.explore(cell, (near) => this.play(near));
    }
  }
}
