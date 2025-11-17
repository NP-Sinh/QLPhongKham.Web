import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NguoiDungModel } from '../../models/nguoidung.model';
import { CommonModule } from '@angular/common';
import { LoadingOverlay } from '../../components/loading-overlay/loading-overlay';
import { FormField, FormModal } from '../../components/form-modal/form-modal';
import { ToastNotification } from '../../components/toast-notification/toast-notification';
import { catchError, map, Observable, of, shareReplay, startWith } from 'rxjs';
import { NguoidungService } from '../../services/NguoiDungServices/nguoidung.service';
import { convertToVNDate, getTodayISO } from '../../utils/utils';
import { flush } from '@angular/core/testing';
import { VaiTroService } from '../../services/VaiTroServices/vaitro.service';

interface NguoiDungState {
  loading: boolean;
  data: NguoiDungModel[] | null;
  error: any | null;
}
@Component({
  selector: 'app-nguoi-dung',
  imports: [CommonModule, LoadingOverlay, FormModal, ToastNotification],
  templateUrl: './nguoi-dung.html',
  styleUrl: './nguoi-dung.css',
})
export class NguoiDung {
  public state$!: Observable<NguoiDungState>;
  public vaiTroOptions$ !: Observable<{value: string, label: string}[]>;

  // Modal state
  isModalOpen = false;
  modalTitle = '';
  modalFields: FormField[] = [];
  formData: any = {};
  isSaving = false;
  errorMessage = '';
  isEditMode = false;

  @ViewChild(ToastNotification) toast!: ToastNotification;

  constructor(private nguoidungService: NguoidungService, private vaiTroService: VaiTroService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getNguoiDung();
    this.initModalFields();
    this.loadVaiTroOptions();
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
        key: 'maNguoiDung',
        label: 'Mã người dùng',
        type: 'text',
        disabled: true,
        placeholder: 'Tự động tạo',
      },
      {
        key: 'tenDangNhap',
        label: 'Tên đăng nhập',
        type: 'text',
        required: true,
      },
      {
        key: 'matKhau',
        label: 'Mật khẩu',
        type: 'text',
        required: true,
      },
      {
        key: 'hoTen',
        label: 'Họ tên',
        type: 'text',
        required: true,
        placeholder: 'Nhập họ tên',
      },
      {
        key: 'email',
        label: 'Email',
        type: 'text',
        required: false,
      },
      {
        key: 'soDienThoai',
        label: 'Số điện thoại',
        type: 'text',
        required: false,
      },
      {
        key: 'idVaiTro',
        label: 'Vai trò',
        type: 'select',
        required: false,
        colspan: 4,
        options: [],
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
        key: 'ngayTao',
        label: 'Ngày tạo',
        type: 'datetime',
        disabled: true,
        hidden: true
      },
    ];
  }


  // select vai trò
  loadVaiTroOptions() {
    this.vaiTroOptions$ = this.vaiTroService.getVaiTros().pipe(
      map(vaiTros => [
        ...vaiTros.map(vt => ({
          value: vt.id.toString(),
          label: vt.tenVaiTro
        }))
      ]),
      startWith([{ value: '', label: 'Đang tải...' }]),
      catchError(() => {
        return of([{ value: '', label: 'Lỗi tải dữ liệu' }]);
      })
    );
    this.vaiTroOptions$.subscribe({
      next: (options) => {
        const vaiTroField = this.modalFields.find(f => f.key === 'idVaiTro');
        if (vaiTroField) {
          vaiTroField.options = options;
          this.cdr.detectChanges();
        }
      }
    });
  }



  closeModal() {
    this.isModalOpen = false;
    this.formData = {};
    this.errorMessage = '';
    this.isSaving = false;
    this.cdr.detectChanges();
  }
  getNguoiDung() {
    this.state$ = this.nguoidungService.getNguoiDung().pipe(
      map((data) => ({ loading: false, data, error: null })),
      startWith({ loading: true, data: null, error: null }),
      catchError(() => of({ loading: false, data: null, error: 'Không tải được dữ liệu!' }))
    );
  }

  getNguoiDungId(id: number) {
    this.nguoidungService.getNguoiDungId(id).subscribe({
      next: (nguoidung) => {
        this.formData = {
          ...nguoidung,
          idVaiTro:  nguoidung.vaiTro?.id?.toString(),
        };
        this.isModalOpen = true;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = "Không tải được thông tin";
      }
    });
  }

  modifyNguoiDung(nguoidung: any){
    this.nguoidungService.modifyNguoiDung(nguoidung).subscribe({
      next: () =>{
        this.toast?.showToast("Lưu thành công","success");
        this.closeModal();
        this.getNguoiDung();
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
    this.modalTitle = "Thêm người dùng";
    this.formData = {
      id: 0,
      maNguoiDung: "",
      tenDangNhap: "",
      matKhau: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
      idVaiTro: "",
      dangHoatDong: "",
      ngayTao: getTodayISO(),
    },
    this.errorMessage = "",
    this.isModalOpen = true
  }

   // edit
  editModal(id: number) {
    this.isEditMode = true;
    this.modalTitle = 'Chỉnh Sửa người dùng';
    this.errorMessage = '';

    const ngayTaoField = this.modalFields.find(f => f.key === 'ngayTao');
    if (ngayTaoField) {
      ngayTaoField.hidden = !this.isEditMode;
      this.cdr.detectChanges();
    }

    this.getNguoiDungId(id);
  }

  // submit form
  submitForm(data: any) {
    this.isSaving = true;
    this.errorMessage = '';
    const nguoidung = {
      id: data.id,
      maNguoiDung: data.maNguoiDung || '',
      tenDangNhap: data.tenDangNhap,
      matKhau: data.matKhau,
      hoTen: data.hoTen,
      soDienThoai: data.soDienThoai,
      email: data.email,
      idVaiTro: data.idVaiTro,
      dangHoatDong: data.dangHoatDong === 'true',
      ngayTao: data.ngayTao || getTodayISO(),

    };
    this.modifyNguoiDung(nguoidung);
  }
}
