import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BacSiModel } from '../../models/bacsi.model';

@Injectable({
  providedIn: 'root',
})
export class BacsiService {
  private apiUrl = `${environment.apiUrl}/bacsi`;
  constructor(private http: HttpClient) {}

  getBacSi(): Observable<BacSiModel[]> {
    return this.http.get<BacSiModel[]>(`${this.apiUrl}/GetBacSi`);
  }
  getBacSiId(id: number): Observable<BacSiModel>{
    return this.http.get<BacSiModel>(`${this.apiUrl}/GetBacSiById/${id}`);
  }
  modifyBacSi(BacSiModel: BacSiModel): Observable<BacSiModel>{
    return this.http.post<BacSiModel>(`${this.apiUrl}/Modify`, BacSiModel);
  }
}
