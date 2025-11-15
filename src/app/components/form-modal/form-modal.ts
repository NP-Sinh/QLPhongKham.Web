import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'select' | 'textarea' | 'datetime' | 'password';
  required?: boolean;
  disabled?: boolean;
  options?: { value: any; label: string }[];
  placeholder?: string;
  colspan?: number;
  rows?: number;
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
  @Input() columns: number = 1;
  @Input() modalSize: 'sm' | 'md' | 'lg' | 'xl' = 'md';

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
  getColClass(field: FormField): string {
    if (field.colspan) {
      return `col-md-${field.colspan}`;
    }
    const colSize = 12 / this.columns;
    return `col-md-${colSize}`;
  }

  getModalSizeClass(): string {
    switch (this.modalSize) {
      case 'sm': return 'modal-sm';
      case 'lg': return 'modal-lg';
      case 'xl': return 'modal-xl';
      default: return '';
    }
  }
}
