import { EItems } from "../../enums/e-items.js";
export class Cell {
    get icon() {
        return "";
    }
    get bomb() {
        return this.item == EItems.Bomb;
    }
    get ground() {
        return this.item == EItems.Ground;
    }
    // Création d'une grille
    constructor(grid, x, y, item) {
        this.hit = false;
        this.grid = grid;
        this.x = x;
        this.y = y;
        // this.bomb = bomb;
        this.item = item !== null && item !== void 0 ? item : EItems.Ground;
    }
    // Gestion d'un clic sur une cellule
    get risk() {
        let n = 0;
        this.grid.explore(this, (near) => {
            if (near.bomb)
                n += 1;
        });
        return n;
    }
}
export class CellBomb extends Cell {
    constructor(grid, x, y) {
        super(grid, x, y, EItems.Bomb);
    }
    get icon() {
        return '<span class="icon material-symbols-outlined">bomb</span>';
    }
}
export class CellRabbit extends Cell {
    constructor(grid, x, y) {
        super(grid, x, y, EItems.Rabbit);
    }
    get icon() {
        return '<span class="icon material-symbols-outlined">cruelty_free</span>';
    }
}
