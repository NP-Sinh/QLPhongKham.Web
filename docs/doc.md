# 1. Hướng dẫn sử dụng Form Modal

## Form 1 cột (mặc định)

```ts
modalFields = [
  { key: 'id', label: 'ID', type: 'number', disabled: true, required: false, },
  { key: 'maVaiTro', label: 'Mã Vai Trò',  type: 'text', disabled: true, required: false, placeholder: 'Tự động tạo', }, 
  { key: 'tenVaiTro', label: 'Tên Vai Trò', type: 'text', required: true, placeholder: 'Nhập tên vai trò',},
];
```

**HTML:**

```html
<app-form-modal [columns]="1" ...></app-form-modal>
```

---

## Form 2 cột

```ts
modalFields = [
  { key: 'hoTen', label: 'Họ và Tên', type: 'text', required: true },
  { key: 'email', label: 'Email', type: 'email', required: true },
  { key: 'soDienThoai', label: 'Số Điện Thoại', type: 'text' },
  { key: 'ngaySinh', label: 'Ngày Sinh', type: 'date' },
  {
    key: 'gioiTinh',
    label: 'Giới Tính',
    type: 'select',
    options: [
      { value: 'Nam', label: 'Nam' },
      { value: 'Nữ', label: 'Nữ' },
    ],
  },
  { key: 'diaChi', label: 'Địa Chỉ', type: 'textarea', colspan: 12 },
  { key: 'anhDaiDien', label: 'Ảnh Đại Diện', type: 'file', accept: 'image/*', colspan: 12 }
];
```

**HTML:**

```html
<app-form-modal [columns]="2" [modalSize]="'lg'" ...></app-form-modal>
```

---

## Form 3 cột với custom colspan

```ts
modalFields = [
  { key: 'maBenhNhan', label: 'Mã Bệnh Nhân', type: 'text', required: true, colspan: 4 },
  { key: 'hoTen', label: 'Họ và Tên', type: 'text', required: true, colspan: 8 },

  { key: 'ngaySinh', label: 'Ngày Sinh', type: 'date', colspan: 4 },
  {
    key: 'gioiTinh',
    label: 'Giới Tính',
    type: 'select',
    colspan: 4,
    options: [
      { value: 'Nam', label: 'Nam' },
      { value: 'Nữ', label: 'Nữ' },
    ],
  },
  { key: 'soDienThoai', label: 'Số Điện Thoại', type: 'text', colspan: 4 },

  { key: 'email', label: 'Email', type: 'email', colspan: 6 },
  { key: 'cccd', label: 'CCCD', type: 'text', colspan: 6 },

  { key: 'diaChi', label: 'Địa Chỉ', type: 'textarea', colspan: 12, rows: 2 },
  { key: 'ghiChu', label: 'Ghi Chú', type: 'textarea', colspan: 12, rows: 3 },
  { key: 'taiLieu', label: 'Tài Liệu', type: 'file', accept: '.pdf,.doc,.docx', required: true, colspan: 12 }
];
```

**HTML:**

```html
<app-form-modal [columns]="3" [modalSize]="'xl'" ...></app-form-modal>
```

---

## Form phức tạp – Thông tin bệnh nhân

```ts
modalFields = [
  {
    key: 'maBenhNhan',
    label: 'Mã Bệnh Nhân',
    type: 'text',
    required: true,
    colspan: 4,
    disabled: true,
  },
  {
    key: 'hoTen',
    label: 'Họ và Tên',
    type: 'text',
    required: true,
    colspan: 8,
    placeholder: 'Nhập họ tên đầy đủ',
  },

  { key: 'ngaySinh', label: 'Ngày Sinh', type: 'date', required: true, colspan: 3 },
  {
    key: 'gioiTinh',
    label: 'Giới Tính',
    type: 'select',
    required: true,
    colspan: 3,
    options: [
      { value: 'Nam', label: 'Nam' },
      { value: 'Nữ', label: 'Nữ' },
      { value: 'Khác', label: 'Khác' },
    ],
  },
  {
    key: 'soDienThoai',
    label: 'Số Điện Thoại',
    type: 'text',
    required: true,
    colspan: 3,
    placeholder: '0123456789',
  },
  { key: 'email', label: 'Email', type: 'email', colspan: 3 },

  { key: 'cccd', label: 'CCCD/CMND', type: 'text', colspan: 4 },
  { key: 'bhyt', label: 'Mã BHYT', type: 'text', colspan: 4 },
  { key: 'ngheNghiep', label: 'Nghề Nghiệp', type: 'text', colspan: 4 },

  { key: 'diaChi', label: 'Địa Chỉ Thường Trú', type: 'textarea', colspan: 12, rows: 2 },

  { key: 'nguoiLienHe', label: 'Người Liên Hệ', type: 'text', colspan: 6 },
  { key: 'sdtLienHe', label: 'SĐT Liên Hệ', type: 'text', colspan: 6 },

  { key: 'tienSuBenh', label: 'Tiền Sử Bệnh', type: 'textarea', colspan: 12, rows: 3 },
  { key: 'ghiChu', label: 'Ghi Chú', type: 'textarea', colspan: 12, rows: 2 },
];
```

**HTML:**

```html
<app-form-modal [columns]="4" [modalSize]="'xl'" ...></app-form-modal>
```

---

## Sử dụng trong Component

```html
<app-form-modal
  [isOpen]="isModalOpen"
  [title]="'Thêm Bệnh Nhân'"
  [fields]="modalFields"
  [formData]="formData"
  [columns]="2"
  [modalSize]="'lg'"
  [isSaving]="isSaving"
  [errorMessage]="errorMessage"
  [submitButtonText]="'Lưu Thông Tin'"
  (closeModal)="closeModal()"
  (submitForm)="onSubmit($event)"
>
</app-form-modal>
```

---

# 2. Hướng dẫn sử dụng
