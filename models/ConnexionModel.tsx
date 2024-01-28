export default class ConnexionModel{
  phone: number;
  password: string;

  constructor(
    phone: number,
    password: string,
  ) {
    this.password = password;
    this.phone= phone;
  }
}