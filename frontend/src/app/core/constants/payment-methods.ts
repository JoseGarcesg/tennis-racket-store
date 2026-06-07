import { PaymentMethod } from '../models/payment-method.model';

export const PAYMENT_METHODS: PaymentMethod[] = [
    {
        id: 1,
        name: 'Credit card',
        image: 'payments/credit-card.png'
    },
    {
        id: 2,
        name: 'Bank transfer',
        image: 'payments/bank-transfer.png'
    },
    {
        id: 3,
        name: 'PSE',
        image: 'payments/pse.png'
    }
];