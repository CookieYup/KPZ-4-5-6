import { getRepository } from 'typeorm';
import { Customer } from '../orm/entities/customer/customer';

export class CustomerService {
    // В сервис переносим работу с репозиторием [cite: 22, 33]
    private get repository() {
        return getRepository(Customer);
    }

    async create(customerData: { fullName: string; email: string }): Promise<Customer> {
        // Проверка бизнес-логики теперь в сервисе [cite: 17]
        const existingCustomer = await this.repository.findOne({ where: { email: customerData.email } });
        if (existingCustomer) {
            throw new Error('Customer with this email already exists');
        }

        const customer = this.repository.create(customerData);
        return await this.repository.save(customer); 
    }

    async findAll(): Promise<Customer[]> {
        return await this.repository.find(); 
    }

    async findOne(id: number): Promise<Customer | undefined> {
        return await this.repository.findOne({ where: { id }, relations: ['orders'] }); 
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id); 
    }
}