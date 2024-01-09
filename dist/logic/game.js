import { lose, win } from "../popup.js";
import { Subject } from "../helpers/subject.js";
// Refactor: extract functions
export class Game {
    constructor() {
        // Slots de notifications
        this.onHit = new Subject();
        this.onHelp = new Subject();
    }
    // Démarrage du jeu
    // Ne fait rien pour l'instant, mais ça deviendra utile !
    // Ex : Démarrer un timer, initialiser un score, etc.
    start() { }
    // Gestion d'un clic sur une cellule
    play(cell) {
        if (cell.hit)
            return;
        cell.hit = true;
        this.onHit.raise(cell);
        if (cell.bomb) {
            lose();
        }
        else {
            let n = cell.risk;
            let hint = cell.ground && n >= 1 ? `${n}` : cell.icon;
            this.onHelp.raise({ cell, hint });
            let grid = cell.grid;
            if (grid.remaining == 0) {
                win();
                return;
            }
            if (n == 0)
                grid.explore(cell, (near) => this.play(near));
        }
    }
}
// Singleton
Game.INSTANCE = new Game();
