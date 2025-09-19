import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-pending-users',
  standalone: false,
  templateUrl: './pending-users.component.html',
  styleUrl: './pending-users.component.css',
})
export class PendingUsersComponent implements OnInit {
  users: any[] = [];
  constructor(private admin: AdminService) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.admin.getPendingUsers().subscribe((u) => (this.users = u));
  }
  approve(id: number) {
    this.admin.approveUser(id).subscribe(() => this.load());
  }
}
