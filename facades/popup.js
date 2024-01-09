// Affichage de la popup de victoire
export class Popup {
    constructor() { }
    win() {
        this.show("win");
    }
    lose() {
        this.show("lose");
    }
    show(popup) {
        const div = document.getElementById(popup);
        div === null || div === void 0 ? void 0 : div.classList.remove("hidden");
    }
}
Popup.INSTANCE = new Popup();
