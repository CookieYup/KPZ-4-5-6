import { Customer } from '../orm/entities/customer/customer';

export class CustomerResponseDTO {
    id: number;
    name: string; // Переименовываем для API [cite: 86]
    contactEmail: string;

    constructor(customer: Customer) {
        this.id = customer.id;
        this.name = customer.fullName;
        this.contactEmail = customer.email;
    }
}