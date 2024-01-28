export class DriverModel {
    lastName: string;
    firstName: string;
    location: string;
    phone: number;
    image: string;
    status: string;

    constructor(
        lastName: string,
    firstName: string,
    location: string,
    phone: number,
    image: string,
    status: string,
    ) {
        this.firstName = firstName;
        this.image = image;
        this.lastName = lastName;
        this.status = status;
        this.phone = phone;
        this.location = location;
    }
}