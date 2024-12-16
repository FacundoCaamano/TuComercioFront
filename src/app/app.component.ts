import { Component } from '@angular/core';
import { LoaderService } from './core/service/loader/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tuComercio';
  loader$:Observable<boolean>
  constructor(private loaderService:LoaderService){
    this.loader$ = this.loaderService.loader$
  }
}
