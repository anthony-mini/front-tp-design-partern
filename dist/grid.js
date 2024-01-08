import { play, start } from "./game.js";
export const WIDTH = 20;
export const HEIGHT = 20;
export const DENSITY = 0.1; // 10% de bombes;
export const BOMB = '<span class="icon material-symbols-outlined">bomb</span>';
export const BOMBS = [];
export const HITS = [];
export const CELLS = [];
// Dessin de la grille
export function draw_grid() {
    // Création d(une grille à l'aide de listes imbriqués)
    const htmlMain = document.getElementById("ground");
    const htmlGrid = document.createElement("ul");
    htmlGrid.className = "ground_grid";
    for (let y = 0; y < HEIGHT; y++) {
        BOMBS.push([]);
        HITS.push([]);
        CELLS.push([]);
        //Dessin d'une ligne
        const htmlRow = document.createElement("li");
        const htmlCells = document.createElement("ul");
        htmlRow.className = "ground_row";
        htmlRow.appendChild(htmlCells);
        htmlGrid.appendChild(htmlRow);
        for (let x = 0; x < WIDTH; x++) {
            const bomb = Math.random() < DENSITY;
            BOMBS[y].push(bomb);
            HITS[y].push(false);
            // Dessin d'une cellule
            const htmlCell = document.createElement("li");
            htmlCell.classList.add("ground_cell", "mask");
            htmlCell.innerHTML = bomb ? BOMB : "";
            htmlCell.onclick = () => {
                play(x, y);
            };
            htmlCells.appendChild(htmlCell);
            CELLS[y].push(htmlCell);
        }
    }
    //Insertion du tableau dans la page
    htmlMain.appendChild(htmlGrid);
    start();
}
