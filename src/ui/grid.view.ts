import { Grid } from "../logic/entites/grid.js";
import { Game } from "../logic/game.js";
export class GridView {
  readonly grid: Grid;
  readonly cells: HTMLElement[][] = [];

  constructor(grid: Grid) {
    this.grid = grid;
  }

  // Dessin de la grille

  draw() {
    // Création d'une grille à l'aide de listes imbriqués)
    const htmlMain = document.getElementById("ground")!;
    const htmlGrid = document.createElement("ul")!;
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
        const cell = this.grid.cells[y][x];
        const htmlCell = document.createElement("li");
        htmlCell.classList.add("ground_cell", "mask");
        htmlCell.innerHTML = cell.icon;
        htmlCell.onclick = () => {
          Game.INSTANCE.play(cell);
        };
        htmlCells.appendChild(htmlCell);
        this.cells[y].push(htmlCell);
      }
    }

    // Abonnement aux notifications

    Game.INSTANCE.onHit.listen((cell) =>
      this.cells[cell.y][cell.x].classList.remove("mask")
    );
    Game.INSTANCE.onHelp.listen(
      (e) => (this.cells[e.cell.y][e.cell.x].innerHTML = e.hint)
    );

    // Ajout de la grille au DOM

    htmlMain.appendChild(htmlGrid);
  }
}
