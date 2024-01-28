export class CategoryModel {
  name: string;
  id?: number;
  image?: string;

  constructor(
      name: string,
      image?: string,
      id?: number,

  ) {
    this.name = name;
    this.id= id;
    this.image = image;
  }
}