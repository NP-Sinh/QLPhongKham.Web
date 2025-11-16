import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { VaiTroModel } from '../../../models/vaitro.model';
import { VaiTroService } from '../../../services/VaiTroServices/vaitro.service';
import { LoadingOverlay } from '../../../components/loading-overlay/loading-overlay';
import { ToastNotification } from '../../../components/toast-notification/toast-notification';
import { FormField, FormModal } from '../../../components/form-modal/form-modal';

interface VaiTroState {
  loading: boolean;
  data: VaiTroModel[] | null;
  error: string | null;
}

@Component({
  selector: 'app-vai-tro-list',
  standalone: true,
  imports: [CommonModule, LoadingOverlay, FormModal, ToastNotification],
  templateUrl: './vai-tro-list.html',
  styleUrl: './vai-tro-list.css',
})
export class VaiTroList {
  state$!: Observable<VaiTroState>;

  // Modal state
  isModalOpen = false;
  modalTitle = '';
  modalFields: FormField[] = [];
  formData: any = {};
  isSaving = false;
  errorMessage = '';
  isEditMode = false;

  @ViewChild(ToastNotification) toast!: ToastNotification;

  constructor(
    private vaiTroService: VaiTroService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initModalFields();
    this.loadVaiTros();
  }

  initModalFields() {
    this.modalFields = [
      {
        key: 'id',
        label: 'ID',
        type: 'number',
        disabled: true,
      },
      {
        key: 'maVaiTro',
        label: 'Mã Vai Trò',
        type: 'text',
        disabled: true,
        placeholder: 'Tự động tạo',
      },
      {
        key: 'tenVaiTro',
        label: 'Tên Vai Trò',
        type: 'text',
        required: true,
        placeholder: 'Nhập tên vai trò',
      },
    ];
  }

  loadVaiTros() {
    this.state$ = this.vaiTroService.getVaiTros().pipe(
      map((data) => ({ loading: false, data, error: null })),
      startWith({ loading: true, data: null, error: null }),
      catchError((err) =>
        of({ loading: false, data: null, error: 'Không tải được dữ liệu!' })
      )
    );
  }
  getVaiTroId(id: number){
    this.vaiTroService.getVaiTroId(id).subscribe({
      next: (vaiTro) => {
        this.formData = { ...vaiTro };
        this.isModalOpen = true;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Không thể tải thông tin vai trò.';
      },
    });
  }
  modifyVaiTro(vaiTro: any) {
  this.vaiTroService.modifyVaiTro(vaiTro).subscribe({
    next: () => {
      this.toast?.showToast('Lưu thành công!', 'success');
      this.closeModal();
      this.loadVaiTros();
    },
    error: () => {
      this.errorMessage = 'Đã xảy ra lỗi khi lưu dữ liệu.';
      this.isSaving = false;
      this.cdr.detectChanges();
    },
    complete: () => {
      this.isSaving = false;
      this.cdr.detectChanges();
    }
  });
}


  // Add
  openAddModal() {
    this.isEditMode = false;
    this.modalTitle = 'Thêm Vai Trò Mới';
    this.formData = {
      id: 0,
      maVaiTro: '',
      tenVaiTro: '',
    };
    this.errorMessage = '';
    this.isModalOpen = true;
  }

  // edit
  openEditModal(id: number) {
    this.isEditMode = true;
    this.modalTitle = 'Chỉnh Sửa Vai Trò';
    this.errorMessage = '';
    this.getVaiTroId(id);
  }

  closeModal() {
    this.isModalOpen = false;
    this.formData = {};
    this.errorMessage = '';
    this.isSaving = false;
    this.cdr.detectChanges();
  }


  // SUBMIT FORM
  onSubmit(data: any) {
    this.isSaving = true;
    this.errorMessage = '';

    const payload = {
      id: data.id,
      tenVaiTro: data.tenVaiTro,
      maVaiTro: data.maVaiTro || '',
    };
    this.modifyVaiTro(payload);
  }
}
