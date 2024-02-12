export class Subject<T> {
  // T est un principe de polymorphisme, cela permet de déclaré qu'une seul fois la classe et de la réutiliser avec des types différents (voir class Game ou l'on déclare un Subject<Cell>. T est donc Cell dans ce cas là. Cela permet de ne pas avoir à créer une classe SubjectCell, SubjectGame, SubjectPlayer, etc... Egalement T, U, V, etc... sont des conventions de nommage pour les types génériques. voir https://www.typescriptlang.org/docs/handbook/generics.html)
  private listeners: ((t: T) => void)[] = [];

  listen(listener: (t: T) => void) {
    this.listeners.push(listener);
  }

  raise(event: T) {
    for (var listener of this.listeners) {
      listener(event);
    }
  }
}
