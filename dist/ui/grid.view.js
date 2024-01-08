export class GridView {
    constructor(grid) {
        this.cells = [];
        this.grid = grid;
    }
    // Dessin de la grille
    draw(game) {
        // Création d'une grille à l'aide de listes imbriqués)
        const htmlMain = document.getElementById("ground");
        const htmlGrid = document.createElement("ul");
        htmlGrid.className = "ground_grid";
        let w = this.grid.width;
        let h = this.grid.height;
        for (let y = 0; y < h; y++) {
            this.cells.push([]);
            //Dessin d'une ligne
            const htmlRow = document.createElement("li");
            const htmlCells = document.createElement("ul");
            htmlRow.className = "ground_row";
            htmlRow.appendChild(htmlCells);
            htmlGrid.appendChild(htmlRow);
            for (let x = 0; x < w; x++) {
                // Dessin d'une cellule
                const htmlCell = document.createElement("li");
                htmlCell.classList.add("ground_cell", "mask");
                htmlCell.innerHTML = this.grid.bombs[y][x] ? GridView.BOMB : "";
                htmlCell.onclick = () => {
                    game.play(this, x, y);
                };
                htmlCells.appendChild(htmlCell);
                this.cells[y].push(htmlCell);
            }
        }
        //Insertion du tableau dans la page
        htmlMain.appendChild(htmlGrid);
        game.start();
    }
}
GridView.BOMB = '<span class="icon material-symbols-outlined">bomb</span>';
