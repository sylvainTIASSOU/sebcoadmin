export class AdminModel {
  pseudo: string;
  id?: number;

  constructor(
    pseudo: string,
    id?: number,
  ) {
    this.pseudo = pseudo;
    this.id = id;
  }
}