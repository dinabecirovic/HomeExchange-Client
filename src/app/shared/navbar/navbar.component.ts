import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../core/models/auth.model';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  user: User | null = null;
  logged = false;
  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit() {
    this.auth.user$.subscribe((u) => {
      this.user = u;
      this.logged = !!u;
    });
  }

  get isAdmin() {
    return this.user?.roles?.includes('Administrator');
  }
  get isHomeOwner() {
    return this.user?.roles?.includes('HomeOwner');
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
