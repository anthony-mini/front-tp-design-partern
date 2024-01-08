import { Cell } from "../logic/entites/cell.js";

export interface IGridView {
  show(cell: Cell): void;
  help(cell: Cell, hint: string): void;
}
