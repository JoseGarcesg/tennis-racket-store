import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import(
                './features/home/pages/home-page/home-page'
            ).then(m => m.HomePage)
    },

    {
        path: 'cart',
        loadComponent: () =>
            import(
                './features/cart/pages/cart-page/cart-page'
            ).then(m => m.CartPage)
    },

    {
        path: 'checkout',
        loadComponent: () =>
            import(
                './features/checkout/pages/checkout-page/checkout-page'
            ).then(m => m.CheckoutPage)
    },

    {
        path: '**',
        redirectTo: ''
    }
];