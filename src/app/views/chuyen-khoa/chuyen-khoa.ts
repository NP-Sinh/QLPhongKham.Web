import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ChuyenKhoaModel } from '../../models/chuyenkhoa.model';
import { CommonModule } from '@angular/common';
import { LoadingOverlay } from '../../components/loading-overlay/loading-overlay';
import { FormField, FormModal } from '../../components/form-modal/form-modal';
import { ToastNotification } from '../../components/toast-notification/toast-notification';
import { Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { ChuyenkhoaService } from '../../services/ChuyenKhoaService/chuyenkhoa.service';

interface ChuyenKhoaState {
  loading: boolean;
  data: ChuyenKhoaModel[] | null;
  error: string | null;
}
@Component({
  selector: 'app-chuyen-khoa',
  imports: [CommonModule, LoadingOverlay, FormModal, ToastNotification],
  templateUrl: './chuyen-khoa.html',
  styleUrl: './chuyen-khoa.css',
})
export class ChuyenKhoa {
  state$!: Observable<ChuyenKhoaState>;

  // Modal state
  isModalOpen = false;
  modalTitle = '';
  modalFields: FormField[] = [];
  formData: any = {};
  isSaving = false;
  errorMessage = '';
  isEditMode = false;

  @ViewChild(ToastNotification) toast!: ToastNotification;

  constructor(private chuyenKhoaService: ChuyenkhoaService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getChuyenKhoa();
    this.initModalFields();
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
        key: 'maChuyenKhoa',
        label: 'Mã chuyên khoa',
        type: 'text',
        disabled: true,
        placeholder: 'Tự động tạo',
      },
      {
        key: 'tenChuyenKhoa',
        label: 'Tên chuyên khoa',
        type: 'text',
        required: true,
        placeholder: 'Nhập tên chuyên khoa',
      },
    ];
  }
  closeModal() {
    this.isModalOpen = false;
    this.formData = {};
    this.errorMessage = '';
    this.isSaving = false;
    this.cdr.detectChanges();
  }

  getChuyenKhoa() {
    this.state$ = this.chuyenKhoaService.getChuyenKhoa().pipe(
      map((data) => ({ loading: false, data, error: null })),
      startWith({ loading: true, data: null, error: null }),
      catchError(() => of({ loading: false, data: null, error: 'Không tải được dữ liệu!' }))
    );
  }
  getChuyenKhoaId(id: number){
    this.chuyenKhoaService.getChuyenKhoaId(id).subscribe({
      next: (chuyenkhoa) => {
        this.formData = {...chuyenkhoa};
        this.isModalOpen = true;
        this.cdr.detectChanges();
      },
      error: () =>{
        this.errorMessage = "Không tải được thông tin chuyên khoa";
      }
    });
  }
  modifyChuyenKhoa(chuyenkhoa: any){
    this.chuyenKhoaService.modifyChuyenKhoa(chuyenkhoa).subscribe({
      next: () =>{
        this.toast?.showToast("Lưu thành công","success");
        this.closeModal();
        this.getChuyenKhoa();
      },
      error: () => {
        this.errorMessage = "Đã xảy ra lỗi";
        this.isSaving = false;
        this.cdr.detectChanges();
      }
    });
  }
  // add
  addModal(){
    this.isEditMode = false;
    this.modalTitle = "Thêm Chuyên khoa";
    this.formData = {
      id: 0,
      maChuyenKhoa: "",
      tenChuyenKhoa: "",
    },
    this.errorMessage = "",
    this.isModalOpen = true
  }
   // edit
  editModal(id: number) {
    this.isEditMode = true;
    this.modalTitle = 'Chỉnh Sửa Chuyên Khoa';
    this.errorMessage = '';
    this.getChuyenKhoaId(id);
  }

  // submit form
  submitForm(data: any) {
    this.isSaving = true;
    this.errorMessage = '';
    const chuyenkhoa = {
      id: data.id,
      maChuyenKhoa: data.maChuyenKhoa || '',
      tenChuyenKhoa: data.tenChuyenKhoa
    };
    this.modifyChuyenKhoa(chuyenkhoa);
  }
}
