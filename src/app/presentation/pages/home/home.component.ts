import { Component } from '@angular/core';
import { DataTableComponent } from '@components/data-table/data-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}

