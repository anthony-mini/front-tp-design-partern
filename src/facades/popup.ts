// Affichage de la popup de victoire

export class Popup {
  public static readonly INSTANCE: Popup = new Popup();
  private constructor() {}

  win() {
    this.show("win");
  }

  lose() {
    this.show("lose");
  }

  show(popup: string) {
    const div = document.getElementById(popup);
    div?.classList.remove("hidden");
  }
}
