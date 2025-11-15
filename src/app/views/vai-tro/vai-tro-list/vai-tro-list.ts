import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of, firstValueFrom } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { VaiTroModel } from '../../../models/vaitro.model';
import { VaiTroService } from '../../../services/VaiTroServices/vaitro.service';
import { LoadingOverlay } from '../../../components/loading-overlay/loading-overlay';
import { ToastNotification } from '../../../components/toast-notification/toast-notification';
import { FormField, FormModal } from '../../../components/form-modal/form-modal';

interface VaiTroState {
  loading: boolean;
  data: VaiTroModel[] | null;
  error: any | null;
}

@Component({
  selector: 'app-vai-tro-list',
  standalone: true,
  imports: [CommonModule, LoadingOverlay, FormModal, ToastNotification],
  templateUrl: './vai-tro-list.html',
  styleUrl: './vai-tro-list.css',
})
export class VaiTroList {
  public state$!: Observable<VaiTroState>;

  // Modal state
  isModalOpen = false;
  modalTitle = '';
  modalFields: FormField[] = [];
  formData: any = {};
  isSaving = false;
  errorMessage = '';
  isEditMode = false;

  // Toast reference
  @ViewChild(ToastNotification) toast!: ToastNotification;

  constructor(
    private vaiTroService: VaiTroService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initModalFields();
    this.loadVaiTros();
  }

  // fields cho modal
  initModalFields() {
    this.modalFields = [
      {
        key: 'id',
        label: 'ID',
        type: 'number',
        disabled: true,
        required: false
      },
      {
        key: 'maVaiTro',
        label: 'Mã Vai Trò',
        type: 'text',
        disabled: true,
        required: false,
        placeholder: 'Tự động tạo'
      },
      {
        key: 'tenVaiTro',
        label: 'Tên Vai Trò',
        type: 'text',
        required: true,
        placeholder: 'Nhập tên vai trò'
      }
    ];
  }

  loadVaiTros() {
    this.state$ = this.vaiTroService.getVaiTros().pipe(
      map((data) => ({ loading: false, data, error: null })),
      startWith({ loading: true, data: null, error: null }),
      catchError((err) => of({ loading: false, data: null, error: err }))
    );
  }
  async getVaiTroById(id: number){
    try {
      return await firstValueFrom(this.vaiTroService.getVaiTroId(id));
    } catch (error) {
      return console.error('Thất bại', error);
    }
  }

  async modifyVaiTro(payload: any) {
    try {
      return await firstValueFrom(this.vaiTroService.modifyVaiTro(payload));
    } catch (error) {
      return console.error('Lưu thất bại', error);
    }
  }

  // Mở modal thêm mới
  openAddModal() {
    this.isEditMode = false;
    this.modalTitle = 'Thêm Vai Trò Mới';
    this.formData = {
      id: 0,
      maVaiTro: '',
      tenVaiTro: ''
    };
    this.errorMessage = '';
    this.isModalOpen = true;
  }

  // Mở modal chỉnh sửa
  async openEditModal(id: number) {
    this.isEditMode = true;
    this.modalTitle = 'Chỉnh Sửa Vai Trò';
    this.errorMessage = '';

    try {
      const vaiTro = await this.getVaiTroById(id);
      this.formData = { ...vaiTro };
      this.isModalOpen = true;
    } catch (error) {
      this.errorMessage = 'Không thể tải thông tin vai trò';
    }
  }

  // Đóng modal
  closeModal() {
    this.isModalOpen = false;
    this.formData = {};
    this.errorMessage = '';
    this.isSaving = false;
    this.cdr.detectChanges();
  }

  // Submit form
  async onSubmit(data: any) {
    this.isSaving = true;
    this.errorMessage = '';

    const payload = {
        id: data.id || 0,
        tenVaiTro: data.tenVaiTro,
        maVaiTro: data.maVaiTro || ''
      };

    try {
      await this.modifyVaiTro(payload)
      this.closeModal();
      this.loadVaiTros();
      this.toast?.showToast('Lưu thành công!', 'success');
    } catch (error: any) {
      this.errorMessage = 'Đã xảy ra lỗi khi lưu dữ liệu.' + error;
    } finally {
      this.isSaving = false;
      this.cdr.detectChanges();
    }
  }
}
