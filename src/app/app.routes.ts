import { Routes } from '@angular/router';
import { VaiTroList } from './views/vai-tro/vai-tro-list/vai-tro-list';
import { MainLayout } from './shared/main-layout/main-layout';
import { Login } from './views/login/login';
import { BenhNhan } from './views/benh-nhan/benh-nhan';
import { Home } from './views/home/home';
import { ChuyenKhoa } from './views/chuyen-khoa/chuyen-khoa';
import { NguoiDung } from './views/nguoi-dung/nguoi-dung';

export const routes: Routes = [
  // {
  //   path: 'login',
  //   component: Login,
  // },
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'vai-tro',
        component: VaiTroList,
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
      },

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
