import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from '../../core/services/advertisement.service';
import { AdvertisementResponse } from '../../core/models/advertisement.model';

@Component({
  selector: 'app-my-ad',
  standalone: false,
  templateUrl: './my-ad.component.html',
  styleUrl: './my-ad.component.css',
})
export class MyAdComponent implements OnInit {
  myAds: AdvertisementResponse[] = [];
  loading = false;
  error: string = '';

  constructor(private adService: AdvertisementService) {}

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
}
