import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class Toast {

  toasts =
    signal<ToastMessage[]>([]);

  show(
    message: string,
    type: 'success' | 'error' | 'info' = 'info'
  ) {

    const toast = {
      id: Date.now(),
      message,
      type
    };

    this.toasts.update(
      items => [...items, toast]
    );

    setTimeout(() => {
      this.remove(toast.id);
    }, 3000);
  }

  remove(id: number) {

    this.toasts.update(
      items =>
        items.filter(
          toast => toast.id !== id
        )
    );
  }
}