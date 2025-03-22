import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {JsonViewComponent} from './components/json-view/json-view.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'neurocaster';
}
