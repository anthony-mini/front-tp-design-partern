export class Grid {
  readonly width: number;
  readonly height: number;
  readonly density: number;
  readonly bombs: boolean[][] = [];
  readonly hits: boolean[][] = [];

  // Création d'une grille à l'aide de listes imbriqués)

  constructor(width: number, height: number, density: number) {
    this.width = width;
    this.height = height;
    this.density = density;
    for (let y = 0; y < this.height; y++) {
      this.bombs.push([]);
      this.hits.push([]);
      for (let x = 0; x < this.width; x++) {
        const bomb = Math.random() < this.density;
        this.bombs[y].push(bomb);
        this.hits[y].push(false);
      }
    }
  }

  // Explore le voisinage d'une cellule
  explore(column: number, line: number, visit: (x: number, y: number) => void) {
    const xmin = Math.max(column - 1, 0);
    const xmax = Math.min(column + 1, this.width - 1);
    const ymin = Math.max(line - 1, 0);
    const ymax = Math.min(line + 1, this.height - 1);

    for (let x = xmin; x <= xmax; x++)
      for (let y = ymin; y <= ymax; y++)
        if (x !== column || y !== line) visit(x, y);
  }
}
