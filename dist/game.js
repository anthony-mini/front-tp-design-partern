import { lose, win } from "./popup.js";
import { CELLS, HITS, BOMBS, WIDTH, HEIGHT } from "./grid.js";
let REMAINING = 0;
// Démarrage du jeu
export function start() {
    REMAINING = WIDTH * HEIGHT;
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            if (BOMBS[y][x])
                REMAINING -= 1;
        }
    }
}
// Gestion des clics
export function play(x, y) {
    if (HITS[y][x])
        return;
    const cell = CELLS[y][x];
    cell.classList.remove("mask");
    HITS[y][x] = true;
    if (BOMBS[y][x]) {
        lose();
    }
    else {
        let n = risk(x, y);
        let hint = n >= 1 ? `${n}` : "";
        CELLS[y][x].innerHTML = hint;
        REMAINING -= 1;
        if (REMAINING == 0) {
            win();
            return;
        }
        if (n == 0)
            explore(x, y, play);
    }
}
// Gestion d'un clic sur une cellule
export function risk(column, line) {
    let n = 0;
    explore(column, line, (x, y) => {
        if (BOMBS[y][x]) {
            n += 1;
        }
    });
    return n;
}
// Explore le voisinage d'une cellule
export function explore(column, line, visit) {
    const xmin = Math.max(column - 1, 0);
    const xmax = Math.min(column + 1, WIDTH - 1);
    const ymin = Math.max(line - 1, 0);
    const ymax = Math.min(line + 1, HEIGHT - 1);
    for (let x = xmin; x <= xmax; x++) {
        for (let y = ymin; y <= ymax; y++) {
            if (x !== column || y !== line)
                visit(x, y);
        }
    }
}
