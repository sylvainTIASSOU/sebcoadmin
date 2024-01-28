export class MaterialProductModel {
  categorieId: number
  name: string;
  quantity: number;
  priceUnit: number;
  priceStock: number;
  image: string;
  id?: number;

  constructor(
    categorieId: number,
    name: string,
    quantity: number,
    priceUnit: number,
    priceStock: number,
    image: string,
    id?: number,
  ) {
    this.categorieId = categorieId;
    this.name = name;
    this.quantity = quantity;
    this.priceUnit = priceUnit;
    this.priceStock = priceStock;
    this.image = image;
    this.id = id;
  }
}