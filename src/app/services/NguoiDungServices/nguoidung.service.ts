import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NguoiDungModel } from '../../models/nguoidung.model';

@Injectable({
  providedIn: 'root',
})
export class NguoidungService {
  private apiUrl = `${environment.apiUrl}/NguoiDung`;

  constructor(private http: HttpClient){}

  getNguoiDung(): Observable<NguoiDungModel[]>{
    return this.http.get<NguoiDungModel[]>(`${this.apiUrl}/GetNguoiDung`);
  }
  getNguoiDungId(id: number): Observable<NguoiDungModel>{
    return this.http.get<NguoiDungModel>(`${this.apiUrl}/GetNguoiDungId/${id}`);
  }
  modifyNguoiDung(nguoidung: NguoiDungModel): Observable<NguoiDungModel>{
    return this.http.post<NguoiDungModel>(`${this.apiUrl}/Modify`, nguoidung);
  }
}
