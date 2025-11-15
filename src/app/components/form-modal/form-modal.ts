import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'select' | 'textarea' | 'datetime' | 'password' | 'file';
  required?: boolean;
  disabled?: boolean;
  options?: { value: any; label: string }[];
  placeholder?: string;
  colspan?: number;
  rows?: number;
  accept?: string;
  multiple?: boolean;
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

  filePreviews: { [key: string]: any } = {};

  onClose() {
    if (!this.isSaving) {
      this.closeModal.emit();
      this.filePreviews = {};
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
  // Xử lý file upload
  onFileChange(event: any, fieldKey: string) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.formData[fieldKey] = file;

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.filePreviews[fieldKey] = {
            type: 'image',
            url: e.target.result,
            name: file.name
          };
        };
        reader.readAsDataURL(file);
      } else {
        this.filePreviews[fieldKey] = {
          type: 'file',
          name: file.name,
          size: this.formatFileSize(file.size)
        };
      }
    }
  }
   removeFile(fieldKey: string) {
    this.formData[fieldKey] = null;
    delete this.filePreviews[fieldKey];
  }
  // Format file size
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
  // Kiểm tra có preview không
  hasPreview(fieldKey: string): boolean {
    return !!this.filePreviews[fieldKey];
  }

  // Lấy preview
  getPreview(fieldKey: string): any {
    return this.filePreviews[fieldKey];
  }
}
