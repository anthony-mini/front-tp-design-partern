import { EIcon } from "../../enums/e-icon.js";
import { EItem } from "../../enums/e-item.js";
import { Item } from "./item.js";
export class ItemRabbit extends Item {
    // propriétés
    get type() {
        return EItem.Rabbit;
    }
    get icon() {
        return EIcon.Rabbit;
    }
    wakeUp(cell) {
        if (Math.random() < 0.2)
            this.move(cell);
    }
    move(cell) {
        // choisir une classe de destination
        const grid = cell.grid;
        const moves = [];
        grid.explore(cell, (near) => {
            if (!near.bomb)
                moves.push(near);
        });
        // Déplacer le lapin
        const i = Math.floor(Math.random() * moves.length);
        grid.swap(cell, moves[i]);
    }
}
