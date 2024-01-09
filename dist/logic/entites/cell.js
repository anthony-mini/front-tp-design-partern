import { EIcon } from "../../enums/e-icon.js";
import { EItem } from "../../enums/e-item.js";
import { Game } from "../game.js";
export class Cell {
    // Création d'une grille
    constructor(grid, x, y, item) {
        this.hit = false;
        this.grid = grid;
        this.x = x;
        this.y = y;
        // this.item = item ?? EItem.Ground;
        Game.INSTANCE.onTic.listen(() => { var _a; return (_a = this.item) === null || _a === void 0 ? void 0 : _a.wakeUp(this); });
    }
    // Gestion d'un clic sur une cellule
    get icon() {
        var _a, _b;
        return (_b = (_a = this.item) === null || _a === void 0 ? void 0 : _a.icon) !== null && _b !== void 0 ? _b : EIcon._;
    }
    get bomb() {
        var _a;
        return ((_a = this.item) === null || _a === void 0 ? void 0 : _a.type) == EItem.Bomb;
    }
    get ground() {
        var _a;
        return ((_a = this.item) === null || _a === void 0 ? void 0 : _a.type) == EItem.Ground;
    }
    get risk() {
        let n = 0;
        this.grid.explore(this, (near) => (n += near.bomb ? 1 : 0));
        return n;
    }
}
