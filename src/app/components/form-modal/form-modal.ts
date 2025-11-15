import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'select' | 'textarea' | 'datetime';
  required?: boolean;
  disabled?: boolean;
  options?: { value: any; label: string }[];
  placeholder?: string;
}

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-modal.html' ,
  styleUrl: './form-modal.css',
})
export class FormModal {
  @Input() isOpen = false;
  @Input() title = 'Form';
  @Input() fields: FormField[] = [];
  @Input() formData: any = {};
  @Input() submitButtonText = 'Lưu';
  @Input() isSaving = false;
  @Input() errorMessage = '';

  @Output() closeModal = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<any>();

  onClose() {
    if (!this.isSaving) {
      this.closeModal.emit();
    }
  }
  onBackdropClick() {
    this.onClose();
  }
  onSubmit(form: any) {
    if (form.valid && !this.isSaving) {
      this.submitForm.emit({ ...this.formData });
    }
  }
}
