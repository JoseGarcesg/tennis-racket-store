export interface OrderItem {
    racketId: number;
    quantity: number;
    price: number;
}

export interface CreateOrder {
    customerName: string;
    email: string;
    paymentMethod: string;
    items: OrderItem[];
}