import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Cần cho *ngIf

@Component({
  selector: 'app-login',
  standalone: true,

  // Đây là các "công cụ" để file HTML chạy được
  imports: [
    CommonModule,          // Cung cấp *ngIf
    ReactiveFormsModule,   // Cung cấp [formGroup], formControlName
    RouterLink             // Cung cấp [routerLink]
  ],

  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // Inject các service cần thiết
  private fb = inject(FormBuilder);
  private router = inject(Router); // Vẫn inject, dù chưa dùng trong onSubmit

  // Khai báo form
  public loginForm: FormGroup;

  // Biến kiểm soát việc đã bấm submit chưa (để hiển thị lỗi)
  public submitted = false;

  constructor() {
    // Khởi tạo form với các trường và Validators
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Getter tiện lợi để lấy control trong HTML
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Xử lý khi người dùng nhấn nút Đăng nhập
   */
  onSubmit(): void {
    this.submitted = true;

    // Kiểm tra form hợp lệ
    if (this.loginForm.invalid) {
      console.log('Form không hợp lệ');
      return;
    }

    // --- CHƯA XỬ LÝ LOGIC ---
    // Đúng như bạn nói, chúng ta sẽ không xử lý logic đăng nhập ở đây
    // Chỉ in ra console để kiểm tra
    console.log('Dữ liệu form (chưa xử lý):', this.loginForm.value);

    // (Trong tương lai, bạn sẽ gọi AuthService ở đây và điều hướng)
    // this.router.navigate(['/app']);
  }
}
