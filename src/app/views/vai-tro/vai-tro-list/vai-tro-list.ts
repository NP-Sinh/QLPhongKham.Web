import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { VaiTroModel } from '../../../models/vaitro.model';
import { VaiTroService } from '../../../services/VaiTroServices/vaitro.service';
import { LoadingOverlay } from '../../../components/loading-overlay/loading-overlay';


interface VaiTroState {
  loading: boolean;
  data: VaiTroModel[] | null;
  error: any | null;
}

@Component({
  selector: 'app-vai-tro-list',
  imports: [CommonModule, LoadingOverlay],
  templateUrl: './vai-tro-list.html',
  styleUrl: './vai-tro-list.css',
})
export class VaiTroList {

  public state$!: Observable<VaiTroState>;

  constructor(private vaiTroService: VaiTroService) {}

  ngOnInit() {
    this.loadVaiTros();
  }

  loadVaiTros() {
    this.state$ = this.vaiTroService.getVaiTros().pipe(
      map((data) => ({ loading: false, data: data, error: null })),
      startWith({ loading: true, data: null, error: null }),
      catchError((err) =>  of({ loading: false, data: null, error: err })
      )
    );
  }
}
