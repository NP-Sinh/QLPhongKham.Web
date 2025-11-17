export interface BacSiModel{
  id: number,
  maBacSi: string,
  hoTen: string,
  ngaySinh: Date,
  gioiTinh: string,
  soDienThoai: string,
  bangCap: string,
  dangHoatDong: boolean,
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
