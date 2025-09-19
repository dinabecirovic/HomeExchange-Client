import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../../core/models/auth.model';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  form;
  loading = false;
  error = '';
  success = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      roles: ['HomeOwner'],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    console.log('Submit clicked', this.form.value);

    if (this.form.invalid) return;
    this.loading = true;

    this.auth.register(this.form.getRawValue() as RegisterRequest).subscribe({
      next: (res) => {
        console.log('Response:', res);
        this.loading = false;
        this.success = 'Registracija uspešna. Sačekajte odobrenje administratora.';
        setTimeout(() => this.router.navigate(['/auth/login']), 1500);
      },
      error: (err: any) => {
        console.error('Error:', err);
        this.loading = false;
        this.error = err?.error?.message || 'Registration failed';
      },
    });
  }
}
