import { lose, win } from "./popup.js";
// Refactor: extract functions
export class Game {
    constructor() {
        this.REMAINING = 0;
    }
    // Démarrage du jeu
    start(grid) {
        this.REMAINING = grid.width * grid.height;
        for (let x = 0; x < grid.width; x++) {
            for (let y = 0; y < grid.height; y++) {
                if (grid.bombs[y][x])
                    this.REMAINING -= 1;
            }
        }
    }
    // Gestion d'un clic sur une cellule
    play(grid, x, y) {
        if (grid.hits[y][x])
            return;
        const cell = grid.cells[y][x];
        cell.classList.remove("mask");
        grid.hits[y][x] = true;
        if (grid.bombs[y][x]) {
            lose();
        }
        else {
            let n = Game.risk(grid, x, y);
            let hint = n >= 1 ? `${n}` : "";
            grid.cells[y][x].innerHTML = hint;
            this.REMAINING -= 1;
            if (this.REMAINING == 0) {
                win();
                return;
            }
            if (n == 0)
                Game.explore(grid, x, y, (xi, yi) => this.play(grid, xi, yi));
        }
    }
    // Gestion d'un clic sur une cellule
    static risk(grid, column, line) {
        let n = 0;
        Game.explore(grid, column, line, (x, y) => {
            if (grid.bombs[y][x]) {
                n += 1;
            }
        });
        return n;
    }
    // Explore le voisinage d'une cellule
    static explore(grid, column, line, visit) {
        const xmin = Math.max(column - 1, 0);
        const xmax = Math.min(column + 1, grid.width - 1);
        const ymin = Math.max(line - 1, 0);
        const ymax = Math.min(line + 1, grid.height - 1);
        for (let x = xmin; x <= xmax; x++) {
            for (let y = ymin; y <= ymax; y++) {
                if (x !== column || y !== line)
                    visit(x, y);
            }
        }
    }
}
