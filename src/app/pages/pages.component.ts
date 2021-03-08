import { Component, OnInit, OnDestroy } from '@angular/core';

// Services
import { HeaderService } from '../core/services/header.service';
import { LoadingService } from '../core/services/loading.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit, OnDestroy {

  constructor(
    private headerService: HeaderService,
    private loadingService: LoadingService 
  ) { 
    this.loadingService.loading.emit(false);
  }

  ngOnDestroy(): void {
    this.headerService.dashBoardLogin.emit(false);
  }

  ngOnInit(): void {
    this.headerService.dashBoardLogin.emit(true);
  }

}
