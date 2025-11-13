import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BenhNhanModel } from '../../models/benhnhan.model';

@Injectable({
  providedIn: 'root',
})
export class BenhnhanService {
  private apiUrl = `${environment.apiUrl}/benhnhan`;
  constructor(private http: HttpClient) {}

  getBenhNhan(): Observable<BenhNhanModel[]> {
    return this.http.get<BenhNhanModel[]>(`${this.apiUrl}/GetBenhNhan`);
  }
}
