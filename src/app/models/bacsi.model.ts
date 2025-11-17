export interface BacSiModel{
  id: number,
  maBacSi: string,
  hoTen: string,
  ngaySinh: Date,
  gioiTinh: string,
  soDienThoai: string,
  bangCap: string,
  dangHoatDong: boolean,
  idChuyenKhoa?: number,
  tenChuyenKhoa: string,
  idNguoiDung?: number,
  maNguoidung: string,
  chuyenKhoa?: {
    id: number,
    maChuyenKhoa: string,
    tenChuyenKhoa: string
  },
  nguoiDung?: {
    id: number,
    maNguoiDung: string,
  }
}
