import { EIcon } from "../../enums/e-icon.js";
import { EItem } from "../../enums/e-item.js";
import { Grid } from "./grid.js";
import { Game } from "../game.js";
import { Item } from "./item.js";

export class Cell {
  readonly grid: Grid;
  readonly x: number;
  readonly y: number;
  // readonly item: EItem;
  item?: Item;
  hit = false;

  // Création d'une grille
  constructor(grid: Grid, x: number, y: number, item?: EItem) {
    this.grid = grid;
    this.x = x;
    this.y = y;
    // this.item = item ?? EItem.Ground;
    Game.INSTANCE.onTic.listen(() => this.item?.wakeUp(this));
  }

  // Gestion d'un clic sur une cellule

  get icon(): EIcon {
    return this.item?.icon ?? EIcon._;
  }
  get bomb(): boolean {
    return this.item?.type == EItem.Bomb;
  }
  get ground(): boolean {
    return this.item?.type == EItem.Ground;
  }
  get risk(): number {
    let n = 0;
    this.grid.explore(this, (near) => (n += near.bomb ? 1 : 0));
    return n;
  }
}
