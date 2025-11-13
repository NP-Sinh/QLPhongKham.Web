import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { VaiTroModel } from '../../../models/vai-tro-model';
import { VaiTroService } from '../../../services/VaiTroServices/vaitro.service';

@Component({
  selector: 'app-vai-tro-list',
  imports: [CommonModule],
  templateUrl: './vai-tro-list.html',
  styleUrl: './vai-tro-list.css',
})
export class VaiTroList {
  public vaiTros$!: Observable<VaiTroModel[]>;
  constructor(private vaiTroService: VaiTroService) {};

  ngOnInit(): void {
    this.loadVaiTros();
  }

  loadVaiTros(): void {
    this.vaiTros$ = this.vaiTroService.getVaiTros();
  }

}
