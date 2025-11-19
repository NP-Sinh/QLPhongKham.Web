import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/AuthServices/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VaiTroService } from '../../services/VaiTroServices/vaitro.service';
import { VaiTroModel } from '../../models/vaitro.model';
import { CommonModule } from '@angular/common';
import { ToastNotification } from '../../components/toast-notification/toast-notification';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastNotification],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  tenDangNhap: string = '';
  matKhau: string = '';
  idVaiTro: number = 0;
  vaiTros: VaiTroModel[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;

  @ViewChild(ToastNotification) toast!: ToastNotification;

  constructor(
    private authService: AuthService,
    private vaiTroService: VaiTroService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
    this.loadRoles();
  }

  loadRoles() {
    this.vaiTroService.getVaiTros().subscribe({
      next: (roles) => {
        this.vaiTros = roles;
      },
      error: (err) => {
        this.errorMessage = 'Không thể tải danh sách vai trò';
      },
    });
  }
  onSubmit() {
    if (!this.tenDangNhap || !this.matKhau || !this.idVaiTro) {
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const loginModel = {
      tenDangNhap: this.tenDangNhap,
      matKhau: this.matKhau,
      idVaiTro: this.idVaiTro,
    };

    this.authService.login(loginModel).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.authService.saveToken(response.token);
          this.authService.saveUserInfo(response.data);

          // Chuyển hướng đến trang home
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = response.message || 'Đăng nhập thất bại';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Đã xảy ra lỗi khi đăng nhập';
        this.isLoading = false;
      },
    });
  }
}
