import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { BenhNhanModel } from '../../models/benhnhan.model';
import { BenhnhanService } from '../../services/BenhNhanServices/benhnhan.service';

@Component({
  selector: 'app-benh-nhan',
  imports: [CommonModule],
  templateUrl: './benh-nhan.html',
  styleUrl: './benh-nhan.css',
})
export class BenhNhan {
  public benhnhanlist$!: Observable<BenhNhanModel[]>;
  constructor(private benhnhanService: BenhnhanService) {}

  ngOnInit() {
    this.loadBenhNhan();
  }

  loadBenhNhan(){
    this.benhnhanlist$ = this.benhnhanService.getBenhNhan();
  }
}
