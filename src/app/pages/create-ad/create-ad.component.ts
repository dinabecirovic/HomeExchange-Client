import { Component } from '@angular/core';
import { Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdvertisementService } from '../../core/services/advertisement.service';
import { FormGroup } from '@angular/forms';

function capitalLetterValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value && value.length > 0 && value[0] !== value[0].toUpperCase()) {
    return { capitalLetter: true };
  }
  return null;
}

@Component({
  selector: 'app-create-ad',
  standalone: false,
  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.css',
})
export class CreateAdComponent {
  form: FormGroup;
  files: File[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private adService: AdvertisementService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, capitalLetterValidator]],
      description: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', [Validators.required, capitalLetterValidator]],
      country: ['', [Validators.required, capitalLetterValidator]],
      numberOfRooms: [1, Validators.required],
      homeArea: [10, Validators.required],
      garden: [false],
      parkingSpace: [false],
      swimmingPool: [false],
      photos: [null],
    });
  }

  onFileChange(event: any) {
    const list: FileList = event.target.files;
    this.files = [];
    for (let i = 0; i < list.length; i++) this.files.push(list.item(i)!);
  }

  submit() {
    if (this.form.invalid) return;
    const payload = {
      title: this.form.value.title,
      description: this.form.value.description,
      address: this.form.value.address,
      city: this.form.value.city,
      country: this.form.value.country,
      numberOfRooms: this.form.value.numberOfRooms,
      homeArea: this.form.value.homeArea,
      garden: this.form.value.garden,
      parkingSpace: this.form.value.parkingSpace,
      swimmingPool: this.form.value.swimmingPool,
      photos: this.files,
    };
    this.loading = true;
    this.adService.create(payload as any).subscribe({
      next: () => {
        this.loading = false;
        alert('Oglas je kreiran - čekajte odobrenje admina.');
        this.router.navigate(['/my-ad']);
      },
      error: (e) => {
        this.loading = false;
        alert(e?.error?.message || 'Error creating ad');
      },
    });
  }
}
