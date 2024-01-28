export class ProductModel {
  categorieId: number
  name: string;
  image: string;
  granulometrie: string;
  forme: string;
  couleur: string;
  description: string;
  usage: string;
  price6: number;
  price10: number;
  price12: number;
  price14: number;
  price16: number;
  price20: number;
  id?: number;

  constructor(
    categorieId: number,
    name: string,
    image: string,
    granulometrie: string,
    forme: string,
    couleur: string,
    description: string,
    usage: string,
    price6: number,
    price10: number,
    price12: number,
    price14: number,
    price16: number,
    price20: number,
    id?: number,
  ) {
    this.categorieId = categorieId;
    this.name = name;
    this.image = image;
    this.id = id;
    this.granulometrie = granulometrie;
    this.forme = forme;
    this.couleur = couleur;
    this.description = description;
    this.usage = usage;
    this.price6 = price6;
    this.price10 = price10;
    this.price12 = price12;
    this.price14 = price14;
    this.price16 = price16;
    this.price20 = price20;
  }
}