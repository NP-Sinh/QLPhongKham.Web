# Sử dụng Modal – Hướng dẫn cấu hình Form linh hoạt

## 📌 VÍ DỤ 1: Form 1 cột (mặc định)

```ts
modalFields = [
  { key: 'hoTen', label: 'Họ và Tên', type: 'text', required: true },
  { key: 'email', label: 'Email', type: 'email', required: true },
  { key: 'soDienThoai', label: 'Số Điện Thoại', type: 'text', required: true }
];
```

**HTML:**

```html
<app-form-modal [columns]="1" ...>
```

---

## 📌 VÍ DỤ 2: Form 2 cột

```ts
modalFields = [
  { key: 'hoTen', label: 'Họ và Tên', type: 'text', required: true },
  { key: 'email', label: 'Email', type: 'email', required: true },
  { key: 'soDienThoai', label: 'Số Điện Thoại', type: 'text' },
  { key: 'ngaySinh', label: 'Ngày Sinh', type: 'date' },
  { key: 'gioiTinh', label: 'Giới Tính', type: 'select',
    options: [
      { value: 'Nam', label: 'Nam' },
      { value: 'Nữ', label: 'Nữ' }
    ]
  },
  { key: 'diaChi', label: 'Địa Chỉ', type: 'textarea', colspan: 12 }
];
```

**HTML:**

```html
<app-form-modal [columns]="2" [modalSize]="'lg'" ...>
```

---

## 📌 VÍ DỤ 3: Form 3 cột với custom colspan

```ts
modalFields = [
  { key: 'maBenhNhan', label: 'Mã Bệnh Nhân', type: 'text', required: true, colspan: 4 },
  { key: 'hoTen', label: 'Họ và Tên', type: 'text', required: true, colspan: 8 },

  { key: 'ngaySinh', label: 'Ngày Sinh', type: 'date', colspan: 4 },
  { key: 'gioiTinh', label: 'Giới Tính', type: 'select', colspan: 4,
    options: [
      { value: 'Nam', label: 'Nam' },
      { value: 'Nữ', label: 'Nữ' }
    ]
  },
  { key: 'soDienThoai', label: 'Số Điện Thoại', type: 'text', colspan: 4 },

  { key: 'email', label: 'Email', type: 'email', colspan: 6 },
  { key: 'cccd', label: 'CCCD', type: 'text', colspan: 6 },

  { key: 'diaChi', label: 'Địa Chỉ', type: 'textarea', colspan: 12, rows: 2 },
  { key: 'ghiChu', label: 'Ghi Chú', type: 'textarea', colspan: 12, rows: 3 }
];
```

**HTML:**

```html
<app-form-modal [columns]="3" [modalSize]="'xl'" ...>
```

---

## 📌 VÍ DỤ 4: Form phức tạp – Thông tin bệnh nhân

```ts
modalFields = [
  { key: 'maBenhNhan', label: 'Mã Bệnh Nhân', type: 'text', required: true, colspan: 4, disabled: true },
  { key: 'hoTen', label: 'Họ và Tên', type: 'text', required: true, colspan: 8, placeholder: 'Nhập họ tên đầy đủ' },

  { key: 'ngaySinh', label: 'Ngày Sinh', type: 'date', required: true, colspan: 3 },
  { key: 'gioiTinh', label: 'Giới Tính', type: 'select', required: true, colspan: 3,
    options: [
      { value: 'Nam', label: 'Nam' },
      { value: 'Nữ', label: 'Nữ' },
      { value: 'Khác', label: 'Khác' }
    ]
  },
  { key: 'soDienThoai', label: 'Số Điện Thoại', type: 'text', required: true, colspan: 3, placeholder: '0123456789' },
  { key: 'email', label: 'Email', type: 'email', colspan: 3 },

  { key: 'cccd', label: 'CCCD/CMND', type: 'text', colspan: 4 },
  { key: 'bhyt', label: 'Mã BHYT', type: 'text', colspan: 4 },
  { key: 'ngheNghiep', label: 'Nghề Nghiệp', type: 'text', colspan: 4 },

  { key: 'diaChi', label: 'Địa Chỉ Thường Trú', type: 'textarea', colspan: 12, rows: 2 },

  { key: 'nguoiLienHe', label: 'Người Liên Hệ', type: 'text', colspan: 6 },
  { key: 'sdtLienHe', label: 'SĐT Liên Hệ', type: 'text', colspan: 6 },

  { key: 'tienSuBenh', label: 'Tiền Sử Bệnh', type: 'textarea', colspan: 12, rows: 3 },
  { key: 'ghiChu', label: 'Ghi Chú', type: 'textarea', colspan: 12, rows: 2 }
];
```

**HTML:**

```html
<app-form-modal [columns]="4" [modalSize]="'xl'" ...>
```

---

## 📌 Sử dụng trong Component

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
  (submitForm)="onSubmit($event)">
</app-form-modal>
```

---

## 📌 Giải thích `colspan` (Bootstrap Grid – tổng 12 cột)

* `12` → full width (100%)
* `6` → 50%
* `4` → 33.33%
* `3` → 25%
* `8` → 66.66%

**Ví dụ:**

* `4 + 8 = 12`
* `6 + 6 = 12`
