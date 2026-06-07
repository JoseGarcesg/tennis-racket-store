import { PaymentMethod } from '../models/payment-method.model';

export const PAYMENT_METHODS: PaymentMethod[] = [
    {
        id: 1,
        name: 'Tarjeta de crédito',
        image: 'payments/credit-card.png'
    },
    {
        id: 2,
        name: 'Consignación / transferencia bancaria',
        image: 'payments/bank-transfer.png'
    },
    {
        id: 3,
        name: 'PSE',
        image: 'payments/pse.png'
    }
];