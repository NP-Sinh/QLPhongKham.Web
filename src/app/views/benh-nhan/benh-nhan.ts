import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { BenhNhanModel } from '../../models/benhnhan.model';
import { BenhnhanService } from '../../services/BenhNhanServices/benhnhan.service';
import { LoadingOverlay } from '../../components/loading-overlay/loading-overlay';
import { FormField, FormModal } from '../../components/form-modal/form-modal';
import { ToastNotification } from '../../components/toast-notification/toast-notification';
import { convertToVNDate, convertVNDateToISO, getTodayISO } from '../../utils/utils';

interface BenhNhanState {
  loading: boolean;
  data: BenhNhanModel[] | null;
  error: any | null;
}

@Component({
  selector: 'app-benh-nhan',
  imports: [CommonModule, LoadingOverlay, FormModal, ToastNotification],
  templateUrl: './benh-nhan.html',
  styleUrl: './benh-nhan.css',
})
export class BenhNhan {
  public state$!: Observable<BenhNhanState>;

  // Modal state
  isModalOpen = false;
  modalTitle = '';
  modalFields: FormField[] = [];
  formData: any = {};
  isSaving = false;
  errorMessage = '';
  isEditMode = false;

  @ViewChild(ToastNotification) toast!: ToastNotification;

  constructor(private benhnhanService: BenhnhanService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadBenhNhan();
    this.initModalFields();
  }

  initModalFields() {
    this.modalFields = [
      {
        key: 'id',
        label: 'ID',
        type: 'number',
        disabled: true,
        colspan: 2
      },
      {
        key: 'maBenhNhan',
        label: 'Mã bệnh nhân',
        type: 'text',
        disabled: true,
        placeholder: 'Tự động tạo',
        colspan: 2
      },
      {
        key: 'hoTen',
        label: 'Họ và tên',
        type: 'text',
        required: true,
        placeholder: 'Nhập họ và tên',
      },
      {
        key: 'ngaySinh',
        label: 'Ngày sinh',
        type: 'datetime',
        required: true,
      },
      {
        key: 'gioiTinh',
        label: 'Giới Tính',
        type: 'select',
        required: true,
        colspan: 4,
        options: [
          { value: 'Nam', label: 'Nam' },
          { value: 'Nữ', label: 'Nữ' },
        ],
      },
      {
        key: 'soDienThoai',
        label: 'Số điện thoại',
        type: 'number',
        required: true,
        placeholder: 'Nhập số điện thoại',
      },
      {
        key: 'cmnd',
        label: 'Chứng minh nhân dân',
        type: 'number',
        required: true,
        placeholder: 'Nhập cmnd',
      },
      {
        key: 'nhomMau',
        label: 'Nhóm máu',
        type: 'select',
        required: false,
        colspan: 4,
        options: [
          { value: 'O+', label: 'O+' },
          { value: 'O-', label: 'O-' },
          { value: 'A+', label: 'A+' },
          { value: 'A-', label: 'A-' },
          { value: 'B+', label: 'B+' },
          { value: 'B-', label: 'B-' },
          { value: 'AB+', label: 'AB+' },
          { value: 'AB-', label: 'AB-' },
        ],
      },
      {
        key: 'diUng',
        label: 'Dị ứng',
        type: 'text',
        required: false,
        placeholder: 'Nhập rõ dị ứng',
      },
      {
        key: 'ngayTao',
        label: 'Ngày tạo',
        type: 'datetime',
        disabled: true,
        hidden:true
      },
      {
        key: 'diaChi',
        label: 'Địa chỉ',
        type: 'text',
        required: true,
        colspan: 8
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

  loadBenhNhan() {
    this.state$ = this.benhnhanService.getBenhNhan().pipe(
      map((data) => ({ loading: false, data: data, error: null })),
      startWith({ loading: true, data: null, error: null }),
      catchError((err) => of({ loading: false, data: null, error: err }))
    );
  }
  getBenhNhanId(id: number) {
    this.benhnhanService.getBenhNhanId(id).subscribe({
      next: (benhNhan) => {
        this.formData = {
          ...benhNhan,
          ngaySinh: convertToVNDate(benhNhan.ngaySinh),
        };
        this.isModalOpen = true;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Không thể tải thông tin bệnh nhân';
      },
    });
  }
  modifyBenhNhan(benhNhan: any) {
    this.benhnhanService.modifyBenhNhan(benhNhan).subscribe({
      next: () => {
        this.toast.showToast('Lưu thành công', 'success');
        this.closeModal();
        this.loadBenhNhan();
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Lỗi Lưu';
        this.isSaving = false;
        this.cdr.detectChanges();
      },
      complete: () => {
        this.isSaving = false;
        this.cdr.detectChanges();
      },
    });
  }
  // Add
  addModal() {
    this.isEditMode = false;
    this.modalTitle = 'Thêm bệnh nhân';
    this.formData = {
      id: 0,
      maBenhNhan: '',
      hoTen: '',
      ngaySinh: '',
      gioiTinh: '',
      soDienThoai: '',
      diaChi: '',
      cmnd: '',
      nhomMau: '',
      diUng: '',
      ngayTao: getTodayISO(),
    };
    this.errorMessage = '';
    this.isModalOpen = true;
  }
  // editModal
  editModal(id: number) {
    this.isEditMode = true;
    this.modalTitle = 'Sửa bệnh nhân';
    this.errorMessage = '';
    this.getBenhNhanId(id);
  }

  // submit form
  submitForm(data: any) {
    this.isSaving = true;
    this.errorMessage = '';
    const benhNhan = {
      id: data.id,
      maBenhNhan: data.maBenhNhan || '',
      hoTen: data.hoTen,
      ngaySinh: convertVNDateToISO(data.ngaySinh),
      gioiTinh: data.gioiTinh,
      soDienThoai: data.soDienThoai,
      diaChi: data.diaChi,
      cmnd: data.cmnd,
      nhomMau: data.nhomMau,
      diUng: data.diUng,
      ngayTao: data.ngayTao || getTodayISO(),
    };
    this.modifyBenhNhan(benhNhan);
  }
}
