export interface CreateOrderDto {
  address: string;
  status: string;
  customerId: number; // ID клиента, к которому привязываем заказ
}