import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { VaiTroModel } from '../../../models/vai-tro-model';
import { VaiTro } from '../../../services/VaiTroServices/vai-tro';

@Component({
  selector: 'app-vai-tro-list',
  imports: [CommonModule],
  templateUrl: './vai-tro-list.html',
  styleUrl: './vai-tro-list.css',
})
export class VaiTroList {
  public vaiTros$!: Observable<VaiTroModel[]>;
  constructor(private vaiTroService: VaiTro) {};

  ngOnInit(): void {
    this.loadVaiTros();
  }

  loadVaiTros(): void {
    this.vaiTros$ = this.vaiTroService.getVaiTros();
  }

}
