import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { VaiTroModel } from '../../models/vai-tro-model';

@Injectable({
  providedIn: 'root',
})
export class VaiTro {
  private apiUrl = `${environment.apiUrl}/VaiTro`;

  constructor(private http: HttpClient) {}

  getVaiTros(): Observable<VaiTroModel[]> {
    return this.http.get<VaiTroModel[]>(`${this.apiUrl}/getVaiTro`);
  }
}
