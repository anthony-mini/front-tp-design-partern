import { Grid } from "../logic/entites/grid.js";
import { Cell, CellBomb, CellRabbit } from "../logic/entites/cell.js";
import { EItems } from "../enums/e-items.js";

export class GridBuilder {
  grid: Grid;
  width = 20;
  height = 20;
  density = 0.1;
  rabbits = 0.1;

  constructor(grid: Grid) {
    this.grid = grid;
  }

  build(): Cell[][] {
    const nbCells = this.width * this.height;
    const nbBombs = Math.round(nbCells * this.density);

    // Création d'un tableau rempli au début
    const vector = Array(nbCells).fill(false) as boolean[];
    for (let i = 0; i < nbBombs; i++) vector[i] = true;

    // Mélange
    let nbShuffles = nbCells;
    for (let shuffle = 0; shuffle < nbShuffles; shuffle++) {
      let i = Math.floor(Math.random() * nbCells);
      let j = Math.floor(Math.random() * nbCells);

      if (i == j) continue;

      let a = vector[i];
      let b = vector[j];
      vector[i] = b;
      vector[j] = a;
    }

    // Transfert
    const rows: Cell[][] = [];
    for (let y = 0; y < this.height; y++) {
      let row = [] as Cell[];
      for (let x = 0; x < this.width; x++) {
        const bomb = vector[y * this.width + x];
        if (bomb) {
          row.push(new CellBomb(this.grid, x, y));
          continue;
        }
        const rabbit =
          Math.random() < this.rabbits ? EItems.Rabbit : EItems.Ground;
        if (rabbit) {
          row.push(new CellRabbit(this.grid, x, y));
          continue;
        }
        row.push(new Cell(this.grid, x, y));
      }
      rows.push(row);
    }
    return rows;
  }
}
