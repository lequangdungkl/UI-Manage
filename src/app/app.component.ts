import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatIconModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'List-People';
}
