import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-sidenav',
  standalone:false,
  templateUrl: './dashboard-sidenav.component.html',
  styleUrl: './dashboard-sidenav.component.scss'
})
export class DashboardSidenavComponent {
  @Input() actions: string[] = [];
  @Input() roles: string[] = [];
}
