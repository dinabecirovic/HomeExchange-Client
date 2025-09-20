import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdvertisementService } from '../../core/services/advertisement.service';
import { FormGroup } from '@angular/forms';

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
      title: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
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

    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (!currentUser) {
      alert('Morate biti prijavljeni kao vlasnik da biste kreirali oglas.');
      return;
    }
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
      homeOwnerId: currentUser.id,
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
