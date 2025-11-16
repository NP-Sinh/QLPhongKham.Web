import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChuyenKhoaModel } from '../../models/chuyenkhoa.model';

@Injectable({
  providedIn: 'root',
})
export class ChuyenkhoaService {
  private apiUrl = `${environment.apiUrl}/ChuyenKhoa`;

  constructor(private http: HttpClient){}

  getChuyenKhoa(): Observable<ChuyenKhoaModel[]>{
    return this.http.get<ChuyenKhoaModel[]>(`${this.apiUrl}/getChuyenKhoa`);
  }
  getChuyenKhoaId(id: number): Observable<ChuyenKhoaModel>{
    return this.http.get<ChuyenKhoaModel>(`${this.apiUrl}/getChuyenKhoaId/${id}`);
  }
  modifyChuyenKhoa(chuyenKhoaModel: ChuyenKhoaModel): Observable<ChuyenKhoaModel>{
    return this.http.post<ChuyenKhoaModel>(`${this.apiUrl}/modify`, chuyenKhoaModel);
  }
}
