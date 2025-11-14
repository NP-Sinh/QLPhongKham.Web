import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { BenhNhanModel } from '../../models/benhnhan.model';
import { BenhnhanService } from '../../services/BenhNhanServices/benhnhan.service';
import { LoadingOverlay } from '../../components/loading-overlay/loading-overlay';

interface BenhNhanState {
  loading: boolean;
  data: BenhNhanModel[] | null;
  error: any | null;
}

@Component({
  selector: 'app-benh-nhan',
  imports: [CommonModule, LoadingOverlay],
  templateUrl: './benh-nhan.html',
  styleUrl: './benh-nhan.css',
})
export class BenhNhan {

  public state$!: Observable<BenhNhanState>;

  constructor(private benhnhanService: BenhnhanService) {}

  ngOnInit() {
    this.loadBenhNhan();
  }

  loadBenhNhan() {
    this.state$ = this.benhnhanService.getBenhNhan().pipe(
      map((data) => ({ loading: false, data: data, error: null })),
      startWith({ loading: true, data: null, error: null }),
      catchError((err) =>  of({ loading: false, data: null, error: err })
      )
    );
  }
}
