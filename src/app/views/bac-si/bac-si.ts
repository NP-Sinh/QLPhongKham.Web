import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { BacSiModel } from '../../models/bacsi.model';
import { CommonModule } from '@angular/common';
import { LoadingOverlay } from '../../components/loading-overlay/loading-overlay';
import { FormField, FormModal } from '../../components/form-modal/form-modal';
import { ToastNotification } from '../../components/toast-notification/toast-notification';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { NguoidungService } from '../../services/NguoiDungServices/nguoidung.service';
import { ChuyenkhoaService } from '../../services/ChuyenKhoaService/chuyenkhoa.service';
import { BacsiService } from '../../services/BacSiServices/bacsi.service';
import { convertToVNDate, convertVNDateToISO } from '../../utils/utils';

interface BacSiState {
  loading: boolean;
  data: BacSiModel[] | null;
  error: any | null;
}
@Component({
  selector: 'app-bac-si',
  imports: [CommonModule, LoadingOverlay, FormModal, ToastNotification],
  templateUrl: './bac-si.html',
  styleUrl: './bac-si.css',
})
export class BacSi {
  public state$!: Observable<BacSiState>;
  public chuyenKhoaOption$!: Observable<{ value: string; label: string }[]>;
  public nguoiDungOption$!: Observable<{ value: string; label: string }[]>;

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
    private bacSiService: BacsiService,
    private nguoidungService: NguoidungService,
    private chuyenKhoaService: ChuyenkhoaService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.getBacSi();
    this.initModalFields();
    this.loadSelect();
  }
  closeModal() {
    this.isModalOpen = false;
    this.formData = {};
    this.errorMessage = '';
    this.isSaving = false;
    this.cdr.detectChanges();
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
        key: 'maBacSi',
        label: 'Mã bác sĩ',
        type: 'text',
        disabled: true,
        placeholder: 'Tự động tạo',
      },
      {
        key: 'hoTen',
        label: 'Họ tên',
        type: 'text',
        required: true,
      },
      {
        key: 'ngaySinh',
        label: 'Ngày sinh',
        type: 'datetime',
        required: false,
      },
      {
        key: 'gioiTinh',
        label: 'Giới tính',
        type: 'select',
        required: false,
        options: [
          { value: 'Nam', label: 'Nam' },
          { value: 'Nữ', label: 'Nữ' },
        ],
      },
      {
        key: 'soDienThoai',
        label: 'Số điện thoại',
        type: 'text',
        required: false,
      },
      {
        key: 'bangCap',
        label: 'Bằng cấp',
        type: 'text',
        required: false,
      },
      {
        key: 'dangHoatDong',
        label: 'Hoạt động',
        type: 'select',
        required: false,
        colspan: 4,
        options: [
          { value: 'true', label: 'Hoạt động'},
          { value: 'false', label: 'Không hoạt động' },
        ],
      },
      {
        key: 'idNguoiDung',
        label: 'người dùng',
        type: 'select',
        required: false,
        colspan: 4,
        options: [],
      },
      {
        key: 'idChuyenKhoa',
        label: 'Chuyên khoa',
        type: 'select',
        required: false,
        colspan: 4,
        options: [],
      },
    ];
  }
   // select
  loadSelect() {
    this.nguoiDungOption$ = this.nguoidungService.getNguoiDung().pipe(
      map(nguoiDung => [
        ...nguoiDung.map(nd => ({
          value: nd.id.toString(),
          label: `${nd.maNguoiDung} - ${nd.hoTen || ''}`,
        }))
      ]),
      startWith([{ value: '', label: 'Đang tải...' }]),
      catchError(() => {
        return of([{ value: '', label: 'Lỗi tải dữ liệu' }]);
      })
    );
    this.nguoiDungOption$.subscribe({
      next: (options) => {
        const NguoiDungField = this.modalFields.find(f => f.key === 'idNguoiDung');
        if (NguoiDungField) {
          NguoiDungField.options = options;
          this.cdr.detectChanges();
        }
      }
    });

    this.chuyenKhoaOption$ = this.chuyenKhoaService.getChuyenKhoa().pipe(
      map((chuyenKhoa) => [
        ...chuyenKhoa.map((ck) => ({
          value: ck.id.toString(),
          label: ck.tenChuyenKhoa,
        })),
      ]),
      startWith([{ value: '', label: 'Đang tải...' }]),
      catchError(() => {
        return of([{ value: '', label: 'Lỗi tải dữ liệu' }]);
      })
    );

    this.chuyenKhoaOption$.subscribe({
      next: (options) => {
        const chuyenKhoaField = this.modalFields.find((f) => f.key === 'idChuyenKhoa');
        if (chuyenKhoaField) {
          chuyenKhoaField.options = options;
          this.cdr.detectChanges();
        }
      },
    });

  }
  getBacSi() {
    this.state$ = this.bacSiService.getBacSi().pipe(
      map((data) => ({ loading: false, data, error: null })),
      startWith({ loading: true, data: null, error: null }),
      catchError(() => of({ loading: false, data: null, error: 'Không tải được dữ liệu!' }))
    );
  }

  getBacSiId(id: number) {
    this.bacSiService.getBacSiId(id).subscribe({
      next: (bacsi) => {
        this.formData = {
          ...bacsi,
          ngaySinh: convertToVNDate(bacsi.ngaySinh),
          idNguoiDung: bacsi.nguoiDung?.id?.toString() || '',
          idChuyenKhoa: bacsi.chuyenKhoa?.id?.toString() || '',
        };
        this.isModalOpen = true;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Không tải được thông tin';
      },
    });
  }

  modifyBacSi(bacsi: any) {
    this.bacSiService.modifyBacSi(bacsi).subscribe({
      next: () => {
        this.toast?.showToast('Lưu thành công', 'success');
        this.closeModal();
        this.getBacSi();
      },
      error: () => {
        this.errorMessage = 'Đã xảy ra lỗi';
        this.isSaving = false;
        this.cdr.detectChanges();
      },
    });
  }
  // add
  addModal() {
    this.isEditMode = false;
    this.modalTitle = 'Thêm bác sĩ';
    (this.formData = {
      id: 0,
      maBacSi: '',
      hoTen: '',
      ngaySinh: '',
      gioiTinh: '',
      soDienThoai: '',
      bangCap: '',
      dangHoatDong: 'true',
      idNguoiDung: '',
      idChuyenKhoa: '',
    }),
      (this.errorMessage = ''),
      (this.isModalOpen = true);
  }

  // edit
  editModal(id: number) {
    this.isEditMode = true;
    this.modalTitle = 'Chỉnh Sửa bác sĩ';
    this.errorMessage = '';
    this.getBacSiId(id);
  }

  // submit form
  submitForm(data: any) {
    this.isSaving = true;
    this.errorMessage = '';
    const bacsi = {
      id: data.id,
      maBacSi: data.maBacSi || '',
      hoTen: data.hoTen,
      ngaySinh: convertVNDateToISO(data.ngaySinh),
      gioiTinh: data.gioiTinh,
      soDienThoai: data.soDienThoai,
      bangCap: data.bangCap,
      dangHoatDong: data.dangHoatDong === 'true',
      idChuyenKhoa: data.idChuyenKhoa,
      idNguoiDung: data.idNguoiDung,
    };
    this.modifyBacSi(bacsi);
  }
}
