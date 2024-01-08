export class Grid {
    constructor() {
        this.width = 20;
        this.height = 20;
        this.density = 0.1; // 10% de bombes;
        this.bombs = [];
        this.hits = [];
        this.cells = [];
    }
    // Dessin de la grille
    draw(Game) {
        // Création d'une grille à l'aide de listes imbriqués)
        const htmlMain = document.getElementById("ground");
        const htmlGrid = document.createElement("ul");
        htmlGrid.className = "ground_grid";
        for (let y = 0; y < this.height; y++) {
            this.bombs.push([]);
            this.hits.push([]);
            this.cells.push([]);
            //Dessin d'une ligne
            const htmlRow = document.createElement("li");
            const htmlCells = document.createElement("ul");
            htmlRow.className = "ground_row";
            htmlRow.appendChild(htmlCells);
            htmlGrid.appendChild(htmlRow);
            for (let x = 0; x < this.width; x++) {
                const bomb = Math.random() < this.density;
                this.bombs[y].push(bomb);
                this.hits[y].push(false);
                // Dessin d'une cellule
                const htmlCell = document.createElement("li");
                htmlCell.classList.add("ground_cell", "mask");
                htmlCell.innerHTML = bomb ? Grid.BOMB : "";
                htmlCell.onclick = () => {
                    Game.play(this, x, y);
                };
                htmlCells.appendChild(htmlCell);
                this.cells[y].push(htmlCell);
            }
        }
        //Insertion du tableau dans la page
        htmlMain.appendChild(htmlGrid);
        Game.start(this);
    }
}
Grid.BOMB = '<span class="icon material-symbols-outlined">bomb</span>';
