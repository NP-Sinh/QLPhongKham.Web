import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast-notification',
  imports: [CommonModule],
  templateUrl: './toast-notification.html',
  styleUrl: './toast-notification.css',
})
export class ToastNotification {
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'warning' = 'success';
  @Input() duration = 3000;

  show = false;

  showToast(message: string, type: 'success' | 'error' | 'warning' = 'success') {
    this.message = message;
    this.type = type;
    this.show = true;

    setTimeout(() => {
      this.hide();
    }, this.duration);
  }

  hide() {
    this.show = false;
  }
}
