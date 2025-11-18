import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { PhongKhamModel } from '../../models/phongkham.model';
import { CommonModule } from '@angular/common';
import { LoadingOverlay } from '../../components/loading-overlay/loading-overlay';
import { FormField, FormModal } from '../../components/form-modal/form-modal';
import { ToastNotification } from '../../components/toast-notification/toast-notification';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { PhongkhamService } from '../../services/PhongKhamServices/phongkham.service';

interface PhongKhamState {
  loading: boolean;
  data: PhongKhamModel[] | null;
  error: string | null;
}
@Component({
  selector: 'app-phong-kham',
  imports: [CommonModule, LoadingOverlay, FormModal, ToastNotification],
  templateUrl: './phong-kham.html',
  styleUrl: './phong-kham.css',
})
export class PhongKham {
  state$!: Observable<PhongKhamState>;

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
    private phongKhamService: PhongkhamService,
    private cdr: ChangeDetectorRef
  ) {}

   ngOnInit() {
    this.getPhongKham();
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
        key: 'maPhong',
        label: 'Mã phòng',
        type: 'text',
        disabled: true,
        placeholder: 'Tự động tạo',
      },
      {
        key: 'tenPhong',
        label: 'Tên phòng',
        type: 'text',
        required: true,
        placeholder: 'Nhập tên phòng',
      },
      {
        key: 'loaiPhong',
        label: 'Loại phòng',
        type: 'select',
        required: true,
        options: [
          { value: 'Khám bệnh', label: 'Khám bệnh' },
          { value: 'Xét nghiệm', label: 'Xét nghiệm' },
          { value: 'Thủ thuật', label: 'Thủ thuật' },
        ],
      },
      {
        key: 'tang',
        label: 'Tầng',
        type: 'select',
        required: true,
         options: [
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
        ],
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
  getPhongKham(){
    this.state$ = this.phongKhamService.getPhongKham().pipe(
      map((data) => ({ loading: false, data, error: null })),
      startWith({ loading: true, data: null, error: null }),
      catchError(() => of({ loading: false, data: null, error: 'Không tải được dữ liệu!' }))
    );
  }
  getPhongKhamId(id: number){
    this.phongKhamService.getPhongKhamId(id).subscribe({
      next: (phongkham) =>{
        this.formData = {...phongkham};
        this.isModalOpen = true;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Không thể tải thông tin bệnh nhân';
      },
    });
  }
   modifyPhongKham(phongKham: any) {
    this.phongKhamService.modifyPhongKham(phongKham).subscribe({
      next: () => {
        this.toast.showToast('Lưu thành công', 'success');
        this.closeModal();
        this.getPhongKham();
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Lỗi Lưu';
        this.isSaving = false;
        this.cdr.detectChanges();
      },
    });
  }
   // Add
  addModal() {
    this.isEditMode = false;
    this.modalTitle = 'Thêm phòng khám';
    this.formData = {
      id: 0,
      maPhong: '',
      tenPhong: '',
      loaiPhong: '',
      tang: '',
    };
    this.errorMessage = '';
    this.isModalOpen = true;
  }
   // editModal
  editModal(id: number) {
    this.isEditMode = true;
    this.modalTitle = 'Sửa phòng khám';
    this.errorMessage = '';
    this.getPhongKhamId(id);
  }
   // submit form
  submitForm(data: any) {
    this.isSaving = true;
    this.errorMessage = '';
    const pk = {
      id: data.id,
      maPhong: data.maPhong || '',
      tenPhong: data.tenPhong,
      loaiPhong: data.loaiPhong,
      tang: data.tang
    };
    this.modifyPhongKham(pk);
  }
}
