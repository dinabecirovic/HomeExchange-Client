import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../core/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  model: LoginRequest = { email: '', password: '' };
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.auth.login(this.model).subscribe({
      next: (res) => {
        const role = this.auth.getRole();
        if (role === 'Administrator') this.router.navigate(['/ads-list']);
        else this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.error = err?.error?.message || 'Greška pri prijavi';
      },
    });
  }
}
