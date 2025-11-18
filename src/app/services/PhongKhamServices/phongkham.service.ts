import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PhongKhamModel } from '../../models/phongkham.model';

@Injectable({
  providedIn: 'root',
})
export class PhongkhamService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient){}

  getPhongKham(): Observable<PhongKhamModel[]>{
    return this.http.get<PhongKhamModel[]>(`${this.apiUrl}/GetPhongKham`);
  }
  getPhongKhamId(id: number): Observable<PhongKhamModel>{
    return this.http.get<PhongKhamModel>(`${this.apiUrl}/GetPhongKhamId/${id}`);
  }
  modifyPhongKham(nguoidung: PhongKhamModel): Observable<PhongKhamModel>{
    return this.http.post<PhongKhamModel>(`${this.apiUrl}/Modify`, nguoidung);
  }
}
