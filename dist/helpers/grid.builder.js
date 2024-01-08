import { Cell } from "../logic/entites/cell.js";
export class GridBuilder {
    constructor(grid) {
        this.width = 20;
        this.height = 20;
        this.density = 0.1;
        this.grid = grid;
    }
    build() {
        const nbCells = this.width * this.height;
        const nbBombs = Math.round(nbCells * this.density);
        // Création d'un tableau rempli au début
        const vector = Array(nbCells).fill(false);
        for (let i = 0; i < nbBombs; i++)
            vector[i] = true;
        // Mélange
        let nbShuffles = nbCells;
        for (let shuffle = 0; shuffle < nbShuffles; shuffle++) {
            let i = Math.floor(Math.random() * nbCells);
            let j = Math.floor(Math.random() * nbCells);
            if (i == j)
                continue;
            let a = vector[i];
            let b = vector[j];
            vector[i] = b;
            vector[j] = a;
        }
        // Transfert
        const rows = [];
        for (let y = 0; y < this.height; y++) {
            let row = [];
            for (let x = 0; x < this.width; x++) {
                const bomb = vector[y * this.width + x];
                const cell = new Cell(this.grid, x, y, bomb);
                row.push(cell);
            }
            rows.push(row);
        }
        return rows;
    }
}
