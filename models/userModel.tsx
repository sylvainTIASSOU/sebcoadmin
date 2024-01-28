export default class UserModel {
  phone: number;
  password: string;
  role: string;
  admin_id: number;
  id?: number;
  constructor(
    phone: number,
    password: string,
    role: string,
    admin_id: number,
    id?: number,
  ) {
    this.phone = phone;
    this.password = password;
    this.role = role;
    this.admin_id = admin_id;
    this.id = id;
  }

}