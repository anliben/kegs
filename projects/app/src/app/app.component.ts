import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KegComponent } from '../../../keg/src/public-api';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent extends KegComponent<any> implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.base_api = 'http://localhost:3000'
    this.getApi().subscribe((res) => {
      console.log(res)
    })
  }
  title = 'app';


}
