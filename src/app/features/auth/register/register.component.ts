import { Component } from '@angular/core';
import { Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../../core/models/auth.model';

function capitalLetterValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value && value.length > 0 && value[0] !== value[0].toUpperCase()) {
    return { capitalLetter: true };
  }
  return null;
}

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
      firstName: ['', [Validators.required, capitalLetterValidator]],
      lastName: ['', [Validators.required, capitalLetterValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$'),
        ],
      ],
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
        this.error = err?.error?.message || 'Registracija nije uspela.';
      },
    });
  }
}
