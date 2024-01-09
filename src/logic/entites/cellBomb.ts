import { Grid } from "./grid.js";
import { Cell } from "./cell.js";
import { EItems } from "../../enums/e-items";

export class CellBomb extends Cell {
  constructor(grid: Grid, x: number, y: number) {
    super(grid, x, y, EItems.Bomb);
  }

  get icon() {
    return '<span class="icon material-symbols-outlined">bomb</span>';
  }
}
