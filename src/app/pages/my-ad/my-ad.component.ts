import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from '../../core/services/advertisement.service';
import { AdvertisementResponse } from '../../core/models/advertisement.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-ad',
  standalone: false,
  templateUrl: './my-ad.component.html',
  styleUrl: './my-ad.component.css',
})
export class MyAdComponent implements OnInit {
  myAds: AdvertisementResponse[] = [];
  form: FormGroup;
  loading = false;
  error = '';

  constructor(private adService: AdvertisementService, private fb: FormBuilder) {
    this.form = this.fb.group({
      city: [''],
      country: [''],
      minRooms: [''],
      minArea: [''],
    });
  }

  ngOnInit(): void {
    this.loadMyAdvertisements();
  }

  loadMyAdvertisements(): void {
    this.loading = true;
    this.adService.getMyAdvertisements().subscribe({
      next: (ads) => {
        this.myAds = ads;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Neuspešno učitavanje oglasa';
        this.loading = false;
      },
    });
  }

  open(ad: AdvertisementResponse): void {
    console.log('Otvoren oglas:', ad);
  }
}
