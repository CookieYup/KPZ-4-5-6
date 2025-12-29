import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from '../customer/customer';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  status: string; // например, 'pending', 'delivered'

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;
}