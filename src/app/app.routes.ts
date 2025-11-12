import { Routes } from '@angular/router';
import { VaiTroList } from './views/vai-tro/vai-tro-list/vai-tro-list';
import { MainLayout } from './shared/main-layout/main-layout';
import { Login } from './views/login/login';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'vai-tro',
        component: VaiTroList
      },


      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
