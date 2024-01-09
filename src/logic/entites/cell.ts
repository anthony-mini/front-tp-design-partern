import { EItems } from "../../enums/e-items.js";
import { Grid } from "./grid.js";

export class Cell {
  readonly grid: Grid;
  readonly x: number;
  readonly y: number;
  readonly item: EItems;
  hit = false;

  get icon(): string {
    return "";
  }

  get bomb(): boolean {
    return this.item == EItems.Bomb;
  }

  get ground(): boolean {
    return this.item == EItems.Ground;
  }

  // Création d'une grille
  constructor(grid: Grid, x: number, y: number, item?: EItems) {
    this.grid = grid;
    this.x = x;
    this.y = y;
    // this.bomb = bomb;
    this.item = item ?? EItems.Ground;
  }

  // Gestion d'un clic sur une cellule

  get risk(): number {
    let n = 0;
    this.grid.explore(this, (near) => {
      if (near.bomb) n += 1;
    });
    return n;
  }
}

export class CellBomb extends Cell {
  constructor(grid: Grid, x: number, y: number) {
    super(grid, x, y, EItems.Bomb);
  }

  get icon(): string {
    return '<span class="icon material-symbols-outlined">bomb</span>';
  }
}

export class CellRabbit extends Cell {
  constructor(grid: Grid, x: number, y: number) {
    super(grid, x, y, EItems.Rabbit);
  }

  get icon(): string {
    return '<span class="icon material-symbols-outlined">cruelty_free</span>';
  }
}
