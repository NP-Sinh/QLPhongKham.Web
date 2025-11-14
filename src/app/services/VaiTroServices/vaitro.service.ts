import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { VaiTroModel } from '../../models/vaitro.model';

@Injectable({
  providedIn: 'root',
})
export class VaiTroService {
  private apiUrl = `${environment.apiUrl}/VaiTro`;

  constructor(private http: HttpClient) {}

  getVaiTros(): Observable<VaiTroModel[]> {
    return this.http.get<VaiTroModel[]>(`${this.apiUrl}/getVaiTro`);
  }
  getVaiTroId(id : number): Observable<VaiTroModel> {
    return this.http.get<VaiTroModel>(`${this.apiUrl}/getVaiTroId/${id}`);
  }
  modifyVaiTro(vaiTroModel: VaiTroModel): Observable<VaiTroModel> {
    return this.http.post<VaiTroModel>(`${this.apiUrl}/modify`, vaiTroModel);
  }
}
