export interface NguoiDungModel {
  id: number;
  maNguoiDung: string;
  tenDangNhap: string;
  matKhau: string;
  hoTen: string;
  email?: string;
  soDienThoai?: string;
  dangHoatDong: boolean;
  ngayTao: string;
  vaiTro?: {
    id: number;
    maVaiTro: string;
    tenVaiTro: string;
  };
  idVaiTro?: number;
  tenVaiTro?: string
}
