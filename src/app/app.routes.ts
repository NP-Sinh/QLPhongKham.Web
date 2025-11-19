import { Routes } from '@angular/router';
import { VaiTroList } from './views/vai-tro/vai-tro-list/vai-tro-list';
import { MainLayout } from './shared/main-layout/main-layout';
import { Login } from './views/login/login';
import { BenhNhan } from './views/benh-nhan/benh-nhan';
import { Home } from './views/home/home';
import { ChuyenKhoa } from './views/chuyen-khoa/chuyen-khoa';
import { NguoiDung } from './views/nguoi-dung/nguoi-dung';
import { BacSi } from './views/bac-si/bac-si';
import { PhongKham } from './views/phong-kham/phong-kham';
import { AuthGuard, RoleGuard } from './guards/auth.guard';
import { NotFound } from './shared/not-found/not-found';
import { Unauthorized } from './shared/unauthorized/unauthorized';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'vai-tro',
        component: VaiTroList,
        canActivate: [RoleGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'phong-kham',
        component: PhongKham,
      },
      {
        path: 'benh-nhan',
        component: BenhNhan,
      },
      {
        path: 'chuyen-khoa',
        component: ChuyenKhoa,
      },
      {
        path: 'nguoi-dung',
        component: NguoiDung,
        canActivate: [RoleGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'bac-si',
        component: BacSi,
      },
    ],
  },

  // Trang unauthorized - không có quyền truy cập
 {
    path: 'unauthorized',
    component: Unauthorized
  },

  // Redirect root path
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
   // 404 - Not Found
  {
    path: '**',
    component: NotFound
  },
];
