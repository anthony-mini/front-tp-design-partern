import { lose, win } from "../popup.js";
// Refactor: extract functions
export class Game {
    constructor(grid) {
        this._remaining = 0;
        this._grid = grid;
    }
    // Démarrage du jeu
    start() {
        let w = this._grid.width;
        let h = this._grid.height;
        this._remaining = w * h;
        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                if (this._grid.bombs[y][x])
                    this._remaining -= 1;
            }
        }
    }
    // Gestion d'un clic sur une cellule
    play(view, x, y) {
        if (this._grid.hits[y][x])
            return;
        const cell = view.cells[y][x];
        cell.classList.remove("mask");
        this._grid.hits[y][x] = true;
        if (this._grid.bombs[y][x]) {
            lose();
        }
        else {
            let n = this.risk(x, y);
            let hint = n >= 1 ? `${n}` : "";
            view.cells[y][x].innerHTML = hint;
            this._remaining -= 1;
            if (this._remaining == 0) {
                win();
                return;
            }
            if (n == 0)
                this._grid.explore(x, y, (xi, yi) => this.play(view, xi, yi));
        }
    }
    // Gestion d'un clic sur une cellule
    risk(column, line) {
        let n = 0;
        this._grid.explore(column, line, (x, y) => {
            if (this._grid.bombs[y][x]) {
                n += 1;
            }
        });
        return n;
    }
}
